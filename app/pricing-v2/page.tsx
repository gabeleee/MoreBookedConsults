import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "../pricing/pr.css";
import "./pv.css";
import PrismBackground from "@/components/PrismBackground";
import { LineIcon } from "@/components/LineIcon";
import { ProductMark } from "@/components/home/ProductMark";

// DRAFT v2 (2026-11-18): three low-price plans ($299 / $499 / $749).
// Local only, noindex. Every plan lists every system (no "everything in X,
// plus"), branded names in bold with ™.
export const metadata: Metadata = {
  title: "Pricing (draft)",
  robots: { index: false, follow: false },
};

const CALL = "/demo/";

type MarkId = Parameters<typeof ProductMark>[0]["id"];

// The brand name, bold, with ™
function B({ n }: { n: string }) {
  return (
    <b className="pv-b">
      {n}
      <sup>™</sup>
    </b>
  );
}

const SYS: { id: MarkId; name: string }[] = [
  { id: "sienna", name: "Sienna AI" },
  { id: "rave-loop", name: "Rave Loop" },
  { id: "clear-view", name: "Clear View" },
  { id: "glide-path", name: "Glide Path" },
  { id: "second-glance", name: "Second Glance" },
  { id: "leak-finder", name: "Leak Finder" },
  { id: "consult-magnet", name: "Consult Magnet" },
  { id: "atlas", name: "Authority Atlas" },
];

type Plan = {
  id: string;
  tag?: string;
  name: string;
  who: string;
  price: string;
  terms: string;
  hi: string[]; // the "every month" headline
  rows: Partial<Record<MarkId, string>>; // missing = not included
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "front-desk",
    name: "Front Desk",
    who: "Every call answered and every happy client asked for a review.",
    price: "$299",
    terms: "Month to month",
    hi: ["Every call answered, 24/7"],
    rows: {
      sienna: "Answers every call with your menu and prices, texts your booking link",
      "rave-loop": "Review texts after every visit. Unhappy clients reach you first",
      "clear-view": "Monthly report: calls, after-hours calls, new clients booked",
    },
  },
  {
    id: "full-book",
    tag: "Most value",
    name: "Full Book",
    who: "Your website turned into a booking machine, and a lot more of it on Google.",
    price: "$499",
    terms: "3-month minimum",
    hi: ["20 new Google pages a month", "2 booking upgrades a month"],
    rows: {
      sienna: "Answers every call with your menu and prices, texts your booking link",
      "rave-loop": "Review texts after every visit. Unhappy clients reach you first",
      "clear-view": "Monthly report plus a live dashboard of visits, calls and bookings",
      "glide-path": "A goal-first booking path that hands clients to your booking app with the treatment picked",
      "second-glance": "An exit offer that wins back visitors about to leave",
      "leak-finder": "Shows exactly where visitors drop off before booking",
      "consult-magnet": "Your first-visit offer, written and designed for you",
      atlas: "20 new treatment, cost and city pages every month, with photos",
    },
    featured: true,
  },
  {
    id: "full-book-pro",
    name: "Full Book Pro",
    who: "For practices that want to own Google for every treatment in their city.",
    price: "$749",
    terms: "6-month minimum",
    hi: ["150-page site in 90 days", "4 booking upgrades a month"],
    rows: {
      sienna: "Answers every call with your menu and prices, texts your booking link",
      "rave-loop": "Review texts, plus a reply written to every Google review",
      "clear-view": "Monthly report, live dashboard and a monthly 20-minute review call",
      "glide-path": "A goal-first booking path that hands clients to your booking app with the treatment picked",
      "second-glance": "An exit offer that wins back visitors about to leave",
      "leak-finder": "Shows exactly where visitors drop off before booking",
      "consult-magnet": "A first-visit offer for each of your top treatments",
      atlas: "Your full 150-page Atlas in 90 days, then 30 new pages a month, plus weekly Google profile posts",
    },
  },
];

const SYSTEM_INFO: { id: MarkId; name: string; p: string; plans: string }[] = [
  { id: "sienna", name: "Sienna AI", p: "An AI receptionist that answers every call, day or night, knows your treatments and prices, and texts a booking link when someone can't book on the call.", plans: "All plans" },
  { id: "rave-loop", name: "Rave Loop", p: "A text after each visit asks happy clients for a Google review. Anyone unhappy reaches you privately first.", plans: "All plans" },
  { id: "clear-view", name: "Clear View", p: "One plain-numbers report: calls answered, after-hours calls, new clients booked, new reviews.", plans: "All plans" },
  { id: "glide-path", name: "Glide Path", p: "Visitors pick their goal first, answer a couple of quick questions, then land in your booking app with the right treatment chosen.", plans: "Full Book + Pro" },
  { id: "second-glance", name: "Second Glance", p: "When a visitor is about to leave, a well-timed offer brings them back to book.", plans: "Full Book + Pro" },
  { id: "leak-finder", name: "Leak Finder", p: "Tracking that shows the exact step where people give up, so every upgrade fixes a real drop-off.", plans: "Full Book + Pro" },
  { id: "consult-magnet", name: "Consult Magnet", p: "A first-visit offer built to turn browsers into booked consults.", plans: "Full Book + Pro" },
  { id: "atlas", name: "Authority Atlas", p: "A map of every search people make for your treatments in your city, turned into pages: treatments, costs, comparisons, before-and-after guides and nearby towns.", plans: "Full Book + Pro" },
];

const SOFTWARE = [
  ["calendar", "Your calendar, rooms and providers"],
  ["clipboard", "Charts, consents and intake forms"],
  ["card", "Payments, deposits and memberships"],
  ["message", "Reminders for clients you already have"],
];
const US = [
  ["phone", "Every call answered, even mid-treatment"],
  ["search", "Pages that show up on Google for your treatments"],
  ["funnel", "A booking path that sends new clients into your calendar"],
  ["star", "More reviews, and a monthly count of new clients"],
];
const APPS = ["Boulevard", "Vagaro", "GlossGenius", "Aesthetic Record", "Zenoti", "Mangomint"];

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "I already have an AI receptionist. Is Full Book still worth it?",
    a: (
      <>
        Yes. Most of Full Book is your website and Google: <B n="Glide Path" />, <B n="Second Glance" />,{" "}
        <B n="Leak Finder" />, 2 booking upgrades and 20 new pages every month. Keep the receptionist you have;{" "}
        <B n="Sienna AI" /> is there if you ever want to switch.
      </>
    ),
  },
  {
    q: "I already pay for Boulevard. Do I need you too?",
    a: "They do different jobs. Boulevard (or Vagaro, GlossGenius, Aesthetic Record) runs your day: the calendar, charts, payments and memberships. We bring new clients to that calendar. You keep your software; we work in front of it.",
  },
  {
    q: "What's a booking upgrade?",
    a: "A change to your site picked from what your numbers show: a new offer, a clearer booking step, a better page for a top treatment, a faster mobile layout. Each one is measured against the month before, and we keep only what books more.",
  },
  {
    q: "Are 20 pages a month really any good?",
    a: (
      <>
        Every page comes from your <B n="Authority Atlas" />: a real search people make for a treatment in your
        city. Each is written from an SEO brief, fact-checked, uses your own treatments and prices, and goes live
        only after you can review it.
      </>
    ),
  },
  {
    q: "I don't have a website, just a booking page. Can I still join?",
    a: "Full Book and Full Book Pro need a website we can build on. Front Desk works with just a booking page. If you need a site first, we build one for a one-time fee and you start on any plan once it's live.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes, move up anytime. Your setup, pages and numbers carry over.",
  },
  {
    q: "What happens if I cancel?",
    a: (
      <>
        After any minimum, cancel with 30 days&apos; notice by email. Every page we built stays on your website.{" "}
        <B n="Sienna AI" /> and the dashboard run on our system, so they switch off.
      </>
    ),
  },
];

export default function PricingDraft() {
  return (
    <main className="hv bs pr pv">
      <div className="pv-draft">DRAFT mockup v2 · local only · prices are working numbers</div>

      {/* ---------------- Hero + plans ---------------- */}
      <section className="bs-hero pr-hero">
        <PrismBackground tone="light" gain={1.25} tilt={0.46} phase={30} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">Agency Results At Software Prices</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            Calls answered, your site upgraded and new Google pages every month. Plans from $299, and you keep
            the booking software you already use.
          </p>
          <ul className="bs-chips">
            <li><LineIcon name="dollar" /> Prices listed, no surprises</li>
            <li><LineIcon name="calendar" /> Works with your booking app</li>
            <li><LineIcon name="lock" /> Every page stays yours</li>
          </ul>

          <div className="pr-plans pv-plans">
            {PLANS.map((p) => (
              <div key={p.id} id={p.id} className={`pr-plan pv-plan${p.featured ? " featured" : ""}`}>
                {p.tag && <span className="pr-tag">{p.tag}</span>}
                <h2 className="pr-name">{p.name}</h2>
                <p className="pr-sub">{p.who}</p>
                <p className="pr-price">
                  {p.price}
                  <span>/month</span>
                </p>
                <p className="pr-terms">{p.terms}</p>
                <div className="pv-hi">
                  <span>Highlights</span>
                  {p.hi.map((h) => (
                    <b key={h}>{h}</b>
                  ))}
                </div>
                <ul className="pv-rows">
                  {SYS.map((s) => {
                    const d = p.rows[s.id];
                    return (
                      <li key={s.id} className={d ? "" : "off"}>
                        <ProductMark id={s.id} />
                        <div>
                          <B n={s.name} />
                          <span>{d ?? "Not included"}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <a className={p.featured ? "btn" : "btn-ghost"} href={CALL}>
                  Get a free demo
                </a>
              </div>
            ))}
          </div>

          <div className="pr-bundle pv-anchor">
            <span className="pr-bundle-ic">
              <LineIcon name="search" />
            </span>
            <p>
              <b>Med spa SEO agencies charge $1,000 to $2,500 a month for SEO alone.</b> Full Book adds 20 pages
              a month, booking upgrades and an AI receptionist for $499.
            </p>
          </div>

          <p className="pv-site">
            <LineIcon name="monitor" /> Need a new website first? We also build one-time websites from $1,997.{" "}
            <a href={CALL}>Ask about a website →</a>
          </p>
        </div>
      </section>

      {/* ---------------- The systems ---------------- */}
      <section className="hv-sec pv-sys-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>8 Systems, One Monthly Price</h2>
            <p>Each one is built and run for you. Nothing to learn, nothing to log into.</p>
          </div>
          <div className="pv-sys">
            {SYSTEM_INFO.map((s) => (
              <div key={s.id} className="pv-sys-card">
                <ProductMark id={s.id} />
                <h3><B n={s.name} /></h3>
                <p>{s.p}</p>
                <span className="pv-sys-plans">{s.plans}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Booking software vs us ---------------- */}
      <section className="hv-sec pv-vs-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Already On Boulevard Or Vagaro? Keep It.</h2>
            <p>Your booking software runs your day. We fill it with new clients. You need both.</p>
          </div>
          <div className="pv-vs">
            <div className="pv-col">
              <span className="pv-col-tag">Your booking software</span>
              <h3>Runs The Spa</h3>
              <ul>
                {SOFTWARE.map(([ic, t]) => (
                  <li key={t}><LineIcon name={ic} />{t}</li>
                ))}
              </ul>
              <p className="pv-col-foot">Boulevard, Vagaro, GlossGenius and others, about $150–$400 a month</p>
            </div>
            <div className="pv-join" aria-hidden="true"><span>+</span></div>
            <div className="pv-col us">
              <span className="pv-col-tag">More Booked Consults</span>
              <h3>Fills The Calendar</h3>
              <ul>
                {US.map(([ic, t]) => (
                  <li key={t}><LineIcon name={ic} />{t}</li>
                ))}
              </ul>
              <p className="pv-col-foot">From $299 a month, on top of the software you already have</p>
            </div>
          </div>
          <div className="pv-flow" aria-label="How a new client reaches your calendar">
            <div><LineIcon name="search" /><b>Finds you</b><span>Google, Instagram, a friend</span></div>
            <i>→</i>
            <div><LineIcon name="phone" /><b>Calls or visits</b><span>Sienna answers, your site guides</span></div>
            <i>→</i>
            <div className="end"><LineIcon name="calendar" /><b>Books</b><span>in your existing booking app</span></div>
          </div>
          <ul className="pv-apps">
            <li className="lbl">Works with</li>
            {APPS.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      </section>

      {/* ---------------- Add-on ---------------- */}
      <section className="hv-sec pv-add-sec">
        <div className="wrap">
          <div className="pv-adds one">
            <div className="pv-add">
              <ProductMark id="spotlight" />
              <div>
                <span className="pv-col-tag">Add when you&apos;re ready</span>
                <h3><B n="Spotlight Ads" /></h3>
                <p>Meta ads built around your best offer, sent to a page that books. Ad spend paid straight to Meta, never marked up. Priced on the demo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Pricing, Answered</h2>
            <p>Not sure which plan fits? We&apos;ll tell you on the demo.</p>
            <a className="btn" href={CALL}>Get a free demo</a>
          </div>
          <div className="hv-faq">
            {FAQ.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="hv-plus" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="hv-book">
        <div className="wrap hv-final">
          <h2>Hear Sienna Answer Before You Decide</h2>
          <p>Call our demo line: <a href="tel:+17732490840">(773) 249-0840</a>. Then book a free 20-minute demo.</p>
          <a className="btn hv-cta-hero" href={CALL}>
            Get a free demo <span className="hv-cta-arrow" aria-hidden="true">→</span>
          </a>
          <p className="hv-book-alt">Or see <Link href="/results/">the track record</Link>.</p>
        </div>
      </section>
    </main>
  );
}
