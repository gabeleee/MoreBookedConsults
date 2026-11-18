import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { sesConfigured, sesSend } from "@/lib/ses";
import { clientBySlug, intakeAsText, type IntakeSubmission } from "@/lib/onboarding";

// Client onboarding intake (/onboarding/<slug>/). Emails the answers to the
// MBC inbox as readable text plus the raw JSON (so they can be loaded into the
// client's file), and POSTs the JSON to CRM_WEBHOOK_URL when set. Same env as
// /api/audit; logs only when no email provider is configured.
export async function POST(req: Request) {
  let data: IntakeSubmission;
  try {
    data = (await req.json()) as IntakeSubmission;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  if (!data || typeof data.values !== "object") {
    return NextResponse.json({ ok: false, error: "missing values" }, { status: 400 });
  }

  const v = data.values;
  const c = clientBySlug(String(data.client ?? ""));
  const name = c?.found.businessName ?? `Unknown client (${String(data.client)})`;
  const replyTo = c?.found.email && /.+@.+\..+/.test(c.found.email) ? c.found.email : undefined;
  const subject = `Onboarding intake: ${name}`;
  const text = [
    `Onboarding intake from ${name} (link: /onboarding/${data.client}/)\nText number: ${String(v.text_number ?? "")}`,
    intakeAsText(v),
    "",
    "== RAW JSON ==",
    JSON.stringify({ client: data.client, submitted: new Date().toISOString(), values: v }, null, 2),
  ].join("\n");

  const results = await Promise.allSettled([sendEmail(subject, text, replyTo), sendToCrm(data)]);
  const emailFailed = results[0].status === "rejected";
  return NextResponse.json({ ok: !emailFailed }, { status: emailFailed ? 502 : 200 });
}

async function sendEmail(subject: string, text: string, replyTo?: string) {
  const from = process.env.AUDIT_FROM_EMAIL || "More Booked Consults <audits@morebookedconsults.com>";
  if (sesConfigured()) {
    await sesSend({ from, to: [SITE.email], replyTo: replyTo ? [replyTo] : undefined, subject, text });
    return;
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[onboarding] email -> ${SITE.email} (no email provider; logging only)\n${subject}\n${text}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: SITE.email, reply_to: replyTo, subject, text }),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
}

async function sendToCrm(data: IntakeSubmission) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "onboarding_intake", ...data }),
  });
}
