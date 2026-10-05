import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { captureServerEvent, posthogIdsFromRequest } from "@/lib/posthog-server";

// "Run this for me" submissions from the Consult Magnet builder
// (/medspa-offer-builder/). Same delivery as /api/audit: Resend email to
// SITE.email + optional CRM webhook, both log-only when env vars are absent.
type OfferLead = {
  name?: string;
  email?: string;
  website?: string;
  offer?: {
    concern?: string;
    name?: string;
    parts?: string[];
    priced?: boolean;
    value?: number;
    price?: number;
    spa?: string;
    city?: string;
  };
};

const clip = (v: unknown, n = 300) => String(v ?? "").slice(0, n);

export async function POST(req: Request) {
  let data: OfferLead;
  try {
    data = (await req.json()) as OfferLead;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(data.email))) {
    return NextResponse.json({ ok: false, error: "email required" }, { status: 400 });
  }

  const o = data.offer ?? {};
  const lines = [
    "New Consult Magnet from morebookedconsults.com/medspa-offer-builder/",
    "",
    `Name:     ${clip(data.name)}`,
    `Email:    ${clip(data.email)}`,
    `Website:  ${clip(data.website)}`,
    `Practice: ${clip(o.spa)}${o.city ? ` (${clip(o.city)})` : ""}`,
    "",
    `Concern:  ${clip(o.concern)}`,
    `Offer:    ${clip(o.name)}`,
    ...(o.parts ?? []).slice(0, 3).map((p) => `  - ${clip(p)}`),
    o.priced ? `Value $${o.value} -> offer price $${o.price}` : "No prices (free assessment + $ off)",
  ];

  await Promise.allSettled([sendToCrm({ ...data, source: "consult-magnet" }), sendEmail(data, lines.join("\n"))]);
  const ph = posthogIdsFromRequest(req);
  await captureServerEvent({
    distinctId: ph.distinctId ?? crypto.randomUUID(),
    sessionId: ph.sessionId,
    event: "consult_magnet_lead_submitted",
    properties: { concern: o.concern ?? "unknown", priced: Boolean(o.priced) },
  });
  return NextResponse.json({ ok: true });
}

async function sendToCrm(data: unknown) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    console.info("[offer] CRM (no CRM_WEBHOOK_URL; logging only) ->", data);
    return;
  }
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  if (!res.ok) console.error("[offer] CRM webhook failed", res.status, await res.text());
}

async function sendEmail(data: OfferLead, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AUDIT_FROM_EMAIL || "More Booked Consults <audits@morebookedconsults.com>";
  if (!apiKey) {
    console.info(`[offer] email notify -> ${SITE.email} (no RESEND_API_KEY; logging only)\n${text}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: SITE.email,
      reply_to: data.email,
      subject: `Consult Magnet: ${clip(data.offer?.name, 80) || "offer"} (${clip(data.offer?.spa || data.name, 80)})`,
      text,
    }),
  });
  if (!res.ok) console.error("[offer] email send failed", res.status, await res.text());
}
