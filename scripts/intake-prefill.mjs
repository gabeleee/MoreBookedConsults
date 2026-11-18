#!/usr/bin/env node
// Fill a new client's onboarding file from their public booking page, so the
// intake form only asks what we can't find ourselves.
//
//   node scripts/intake-prefill.mjs <slug> <booking-page-url>
//   node scripts/intake-prefill.mjs land-aesthetics https://landaesthetics.glossgenius.com
//
// Writes content/onboarding/<slug>.json → { found: {...} }. Anything else in
// that file (firstName, plan, offers, domains, written by hand) is kept.
// Supported today: GlossGenius. Other booking apps: add a parser below.

import fs from "node:fs";
import path from "node:path";

const [slug, url] = process.argv.slice(2);
if (!slug || !url) {
  console.error("usage: node scripts/intake-prefill.mjs <slug> <booking-page-url>");
  process.exit(1);
}

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const hr = (h) => {
  const ap = h >= 12 ? "pm" : "am";
  const n = h % 12 || 12;
  return `${n}${ap}`;
};

function phone(p) {
  const d = String(p ?? "").replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : p ?? null;
}

// Group consecutive days with the same hours: "Mon–Fri 10am–5pm".
function hoursText(bh) {
  const label = (d) => d[0].toUpperCase() + d.slice(1, 3);
  const rows = DAYS.map((d) => ({ d, v: bh?.[d]?.working ? `${hr(bh[d].start)}–${hr(bh[d].end)}` : "Closed" }));
  const out = [];
  for (const r of rows) {
    const last = out[out.length - 1];
    if (last && last.v === r.v) last.to = r.d;
    else out.push({ from: r.d, to: r.d, v: r.v });
  }
  return out.map((g) => `${label(g.from)}${g.to !== g.from ? "–" + label(g.to) : ""} ${g.v}`);
}

async function glossgenius(base) {
  const html = await (await fetch(base, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  const m = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!m) throw new Error("No GlossGenius page data found at " + base);
  const sc = JSON.parse(m[1]).props.serverContext;
  const pu = sc.publicUser;
  const pr = pu.preferences ?? {};
  const owner = pu.users?.[0] ?? {};
  const a = sc.locations?.[0]?.contactInfo?.address ?? {};
  const services = (owner.services ?? []).map((s) => ({
    name: s.name.trim(),
    category: (s.category_name ?? "").trim() || null,
    price: s.price_hidden ? null : Number(s.price),
    priceVaries: Boolean(s.price_varies),
    minutes: s.total_duration,
    description: s.description ?? "",
    image: s.image ?? null,
    bookUrl: `${base.replace(/\/$/, "")}/services?service_token=${s.token}`,
  }));
  // Treatment groups for "what do you want more of": named categories, plus
  // uncategorised services grouped by a shared leading phrase.
  const groups = {};
  for (const s of services) {
    let g = s.category;
    if (!g || g === "None") g = /laser hair|^lhr/i.test(s.name) ? "Laser Hair Removal" : null;
    if (!g || /consult|friday|special|promo|gift/i.test(g)) continue;
    groups[g] = (groups[g] ?? 0) + 1;
  }
  const ig = pu.instagram_url || owner.instagram_url;
  return {
    source: "GlossGenius",
    sourceUrl: base,
    fetched: new Date().toISOString().slice(0, 10),
    businessName: /[a-z]/.test(pu.business_name) ? pu.business_name : pu.business_name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    ownerName: [owner.first_name, owner.last_name].filter(Boolean).join(" ") || null,
    email: pu.business_email ?? null,
    phone: phone(pu.business_phone || pu.phone),
    address: [a.street_line_1, a.street_line_2, a.locality && `${a.locality}, ${String(a.administrative_area ?? "").replace(/^us_/, "").toUpperCase()} ${a.postal_code ?? ""}`.trim()]
      .filter(Boolean)
      .join(", "),
    hours: hoursText(pr.business_hours),
    about: (typeof pu.about === "string" ? pu.about : owner.about ?? "").trim(),
    instagram: ig ? `https://instagram.com/${ig.replace(/^@|https?:\/\/(www\.)?instagram\.com\//g, "")}` : null,
    facebook: pu.facebook_url || owner.facebook_url || null,
    website: pu.website_url || owner.website_url || null,
    googleReviewUrl: pr.review_with_google_url || null,
    cardRequired: pr.credit_card_preference === "always_require",
    cancellationPolicy: pr.cancellation_policy ?? null,
    coverImage: pu.cover_image_original ?? null,
    photos: [...new Set(services.map((s) => s.image).filter(Boolean))],
    treatmentGroups: Object.entries(groups)
      .sort((x, y) => y[1] - x[1])
      .map(([name, count]) => ({ name, count })),
    services,
  };
}

const host = new URL(url).hostname;
let found;
if (host.endsWith("glossgenius.com")) found = await glossgenius(url);
else {
  console.error(`No parser for ${host} yet. Add one in scripts/intake-prefill.mjs.`);
  process.exit(1);
}

const file = path.join("content", "onboarding", `${slug}.json`);
fs.mkdirSync(path.dirname(file), { recursive: true });
const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : {};
fs.writeFileSync(file, JSON.stringify({ ...prev, found }, null, 2) + "\n");
console.log(
  `${file}: ${found.businessName} · ${found.services.length} services · ${found.treatmentGroups.length} treatment groups · ${found.photos.length} photos · hours ${found.hours.join(", ")}`,
);
