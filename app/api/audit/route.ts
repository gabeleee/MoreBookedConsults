import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { sesConfigured, sesSend } from "@/lib/ses";
import { captureServerEvent, posthogIdsFromRequest } from "@/lib/posthog-server";
import type { AuditSubmission } from "@/lib/submitAudit";

// Single ingest point for audit-form submissions. Fans out to the CRM webhook
// and an email notification. Both no-op gracefully (log only) when their env
// vars are absent, so local dev works without secrets.
//
// Env (set in Vercel):
//   AWS_SES_ACCESS_KEY_ID, AWS_SES_SECRET_ACCESS_KEY — when both are set the email
//                      goes through Amazon SES (lib/ses.ts; optional AWS_SES_REGION,
//                      AWS_SES_CONFIGURATION_SET)
//   RESEND_API_KEY   — fallback email send when SES is not configured (Resend's HTTP API)
//   AUDIT_FROM_EMAIL — verified Resend sender, e.g. "More Booked Consults <audits@morebookedconsults.com>"
//   CRM_WEBHOOK_URL  — optional; the submission JSON is POSTed here (Zapier/Make/CRM)
export async function POST(req: Request) {
  let data: AuditSubmission;
  try {
    data = (await req.json()) as AuditSubmission;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid json" },
      { status: 400 },
    );
  }

  await Promise.allSettled([sendToCrm(data), sendEmailNotification(data)]);
  const ph = posthogIdsFromRequest(req);
  await captureServerEvent({
    distinctId: ph.distinctId ?? crypto.randomUUID(),
    sessionId: ph.sessionId,
    event: "audit_request_submitted",
    properties: {
      practice_type: data.practice ?? "unknown",
      growth_goal: data.need ?? "unknown",
      consult_value_provided: data.worth != null,
      market_provided: Boolean(data.market),
    },
  });
  return NextResponse.json({ ok: true });
}

async function sendToCrm(data: AuditSubmission) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.info("[audit] CRM (no CRM_WEBHOOK_URL; logging only) ->", data);
    return;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.error("[audit] CRM webhook failed", res.status, await res.text());
  }
}

async function sendEmailNotification(data: AuditSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.AUDIT_FROM_EMAIL ||
    "More Booked Consults <audits@morebookedconsults.com>";

  const body = [
    "New free-audit request from morebookedconsults.com",
    "",
    `Name:          ${data.name}`,
    `Email:         ${data.email}`,
    `Website:       ${data.website}`,
    `Mobile:        ${data.phone ?? "n/a"}`,
    `Source:        ${data.source ?? "n/a"}`,
    `Practice type: ${data.practice ?? "n/a"}`,
    `Looking for:   ${data.need ?? "n/a"}`,
    `Market/city:   ${data.market ?? "n/a"}`,
    `Consult value: ${data.worth != null ? "$" + data.worth : "not provided"}`,
  ].join("\n");
  const subject = `New audit request: ${data.name || "unknown"} (${data.practice ?? "n/a"})`;

  if (sesConfigured()) {
    try {
      await sesSend({
        from,
        to: [SITE.email],
        replyTo: data.email ? [data.email] : undefined,
        subject,
        text: body,
      });
    } catch (err) {
      console.error("[audit] SES email send failed", err);
    }
    return;
  }

  if (!apiKey) {
    console.info(
      `[audit] email notify -> ${SITE.email} (no RESEND_API_KEY; logging only) ->`,
      data,
    );
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: SITE.email,
      reply_to: data.email,
      subject,
      text: body,
    }),
  });

  if (!res.ok) {
    console.error("[audit] email send failed", res.status, await res.text());
  }
}
