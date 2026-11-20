// One-click "yes" from a client proposal page (Gabe 11-20-2026: the owner clicks one button and Gabe gets an email,
// with no mail app and nothing to type). Called by the pay-per-client proposals in audits-html/leads/<slug>.html
// (built in ~/mbc-proposals/pay-per-client). Public endpoint, so it only accepts slugs that are real proposal pages,
// trims every field, and rate-limits per IP. Emails SITE.email through SES (lib/ses.ts); logs only without SES env.
import { existsSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";
import { sesConfigured, sesSend } from "@/lib/ses";
import { captureServerEvent, posthogIdsFromRequest } from "@/lib/posthog-server";

const DIR = path.join(process.cwd(), "audits-html", "leads");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\r\n\t]+/g, " ").trim().slice(0, max) : "";

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "too many" }, { status: 429 });

  let data: Record<string, unknown>;
  try {
    data = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  const slug = clean(data.slug, 80);
  if (!SLUG.test(slug) || !existsSync(path.join(DIR, `${slug}.html`))) {
    return NextResponse.json({ ok: false, error: "unknown proposal" }, { status: 404 });
  }
  const business = clean(data.business, 100) || slug;
  const offer = clean(data.offer, 120) || "proposal";
  const button = clean(data.button, 60) || "yes";

  const when = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" });
  const subject = `YES: ${business} clicked "${button}"`;
  const text = [
    `${business} clicked "${button}" on their proposal.`,
    "",
    `Offer:    ${offer}`,
    `Page:     ${SITE.url}/audits/${slug}/`,
    `When:     ${when} (Chicago)`,
    "",
    `They were sent straight to their onboarding form: ${SITE.url}/onboarding/${slug.replace(/-free-site$/, "")}/`,
  ].join("\n");

  if (sesConfigured()) {
    try {
      await sesSend({
        from: process.env.AUDIT_FROM_EMAIL || "More Booked Consults <audits@morebookedconsults.com>",
        to: [SITE.email],
        subject,
        text,
      });
    } catch (err) {
      console.error("[proposal-yes] SES send failed", err);
      return NextResponse.json({ ok: false, error: "send failed" }, { status: 502 });
    }
  } else {
    console.info("[proposal-yes] (no SES env; logging only)", subject);
  }

  const ph = posthogIdsFromRequest(req);
  await captureServerEvent({
    distinctId: ph.distinctId ?? crypto.randomUUID(),
    sessionId: ph.sessionId,
    event: "proposal_yes_clicked",
    properties: { slug, offer },
  });
  return NextResponse.json({ ok: true });
}
