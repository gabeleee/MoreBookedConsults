import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

// Single ingest point for audit-form submissions. Fans out to the CRM and an
// email notification. Both are stubs until their integrations are wired.
export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid json" },
      { status: 400 },
    );
  }

  await Promise.allSettled([sendToCrm(data), sendEmailNotification(data)]);
  return NextResponse.json({ ok: true });
}

async function sendToCrm(data: unknown) {
  // TODO: POST to the CRM once it exists (e.g. via env CRM_WEBHOOK_URL).
  console.info("[audit] CRM (stub) ->", data);
}

async function sendEmailNotification(data: unknown) {
  // TODO: send via an email provider (e.g. Resend/Postmark) to SITE.email.
  // Recipient: hello@morebookedconsults.com (confirm the inbox is live).
  console.info(`[audit] email notify -> ${SITE.email} (stub) ->`, data);
}
