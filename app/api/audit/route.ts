import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import type { AuditSubmission } from "@/lib/submitAudit";

// Single ingest point for audit-form submissions. Fans out to the CRM webhook
// and an email notification. Both no-op gracefully (log only) when their env
// vars are absent, so local dev works without secrets.
//
// Env (set in Vercel):
//   RESEND_API_KEY   — enables the email send (via Resend's HTTP API)
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

  if (!apiKey) {
    console.info(
      `[audit] email notify -> ${SITE.email} (no RESEND_API_KEY; logging only) ->`,
      data,
    );
    return;
  }

  const body = [
    "New free-audit request from morebookedconsults.com",
    "",
    `Name:          ${data.name}`,
    `Email:         ${data.email}`,
    `Website:       ${data.website}`,
    `Practice type: ${data.practice ?? "n/a"}`,
    `Looking for:   ${data.need ?? "n/a"}`,
    `Consult value: ${data.worth != null ? "$" + data.worth : "not provided"}`,
  ].join("\n");

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
      subject: `New audit request: ${data.name || "unknown"} (${data.practice ?? "n/a"})`,
      text: body,
    }),
  });

  if (!res.ok) {
    console.error("[audit] email send failed", res.status, await res.text());
  }
}
