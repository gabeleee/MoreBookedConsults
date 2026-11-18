import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "./pr.css";
import "../local-seo/ls.css";
import "../full-book/fb.css";
import "./pv.css";
import "./pv3.css";
import PrismBackground from "@/components/PrismBackground";
import { LineIcon } from "@/components/LineIcon";
import { ProductMark } from "@/components/home/ProductMark";
import SeeExample from "@/components/pricing/SeeExample";
import LaserAwayProof from "@/components/home/LaserAwayProof";
import { B, PlanCards, ITEMS, TOTAL, PRICE, usd, WebsiteOptional, Tip, MIN_WHY, FREE_SITE_TERMS, EXAMPLES as ART, BUY_URL } from "@/components/pricing/PlanCards";


// Pricing (2026-11-18, Gabe): website as the front door. ONE plan, Optimized Booking System
// $499/mo, month to month (no minimum), website optional (free with 12 months) + add-ons; no second plan.
// Value stack (crossed-out year-one values) mirrors the proposals.
// Plan cards live in components/pricing/PlanCards.tsx (also on the homepage).
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One plan, everything included: the Optimized Booking System is $499/mo for 20 new Google pages a month, a booking flow built to convert and an AI receptionist that answers every call. Works with Boulevard, Vagaro and GlossGenius.",
  alternates: { canonical: "/pricing/" },
};

const CALL = "/demo/";

type MarkId = Parameters<typeof ProductMark>[0]["id"];

// href = the page that explains the system in detail (none yet for Consult Magnet, Rave Loop).
const SYSTEM_INFO: { id: MarkId; name: string; p: string; href?: string }[] = [
  { id: "atlas", name: "Authority Atlas", p: "New pages for every treatment, cost and nearby town people search for.", href: "/local-seo/" },
  { id: "glide-path", name: "Glide Path", p: "A highly optimized, multi-step booking flow that hands clients to your booking app.", href: "/booking-systems/#glide-path" },
  { id: "sienna", name: "Sienna AI", p: "An AI receptionist that answers every call and texts your booking link.", href: "/booking-systems/#sienna-ai" },
  { id: "lift-lab", name: "Lift Lab", p: "2 design tests a month on your site. We keep the winners, so your conversion rate climbs over time." },
  { id: "second-glance", name: "Second Glance", p: "A well-timed offer that brings leaving visitors back to book.", href: "/booking-systems/#second-glance" },
  { id: "consult-magnet", name: "Consult Magnet", p: "A first-visit offer that turns browsers into booked consults." },
  { id: "leak-finder", name: "Leak Finder", p: "Tracking that shows the exact step where people give up.", href: "/booking-systems/#leak-finder" },
  { id: "rave-loop", name: "Rave Loop", p: "Review requests after each visit. Unhappy clients reach you first." },
  { id: "clear-view", name: "Clear View", p: "One plain-numbers report: calls, new clients booked, reviews.", href: "/booking-systems/#clear-view" },
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

// Add-on prices are Gabe's working numbers (11-18): pages ~$150-200/mo.
const ADDONS: { mark: MarkId; name: string; brand?: boolean; price: string; p: string }[] = [
  { mark: "atlas", name: "More Google pages", price: "+$150 a month", p: "20 more Google pages every month, so you cover more treatments, costs and nearby towns, faster." },
  { mark: "leak-finder", name: "More design tests", price: "+$150 a month", p: "2 more measured design tests every month, for busy sites with plenty of traffic." },
  { mark: "spotlight", name: "Spotlight Ads", brand: true, price: "Priced on the demo", p: "Meta ads built around your best offer. Ad spend paid straight to Meta, never marked up." },
];

const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: "I already have an AI receptionist. Is the Optimized Booking System still worth it?",
    a: (
      <>
        Yes. Most of the Optimized Booking System is your website and Google: <B n="Glide Path" />, <B n="Second Glance" />,{" "}
        <B n="Leak Finder" />, <B n="Lift Lab" /> design tests and 20 new pages every month. Keep the receptionist you have;{" "}
        <B n="Sienna AI" /> is there if you ever want to switch.
      </>
    ),
  },
  {
    q: "I already pay for Boulevard. Do I need you too?",
    a: "They do different jobs. Boulevard (or Vagaro, GlossGenius, Aesthetic Record) runs your day: the calendar, charts, payments and memberships. We bring new clients to that calendar. You keep your software; we work in front of it.",
  },
  {
    q: "Do I need a new website?",
    a: "No. Most of what you get works on the website you already have: new Google pages, the booking flow, the exit offer, Sienna AI and the monthly design tests. If you do need a new site, or yours is just a booking-app page, we build one for you free, on your own domain, with a 12-month minimum.",
  },
  {
    q: "Is there a contract?",
    a: "No. It's month to month, and you can cancel anytime with 30 days' notice. The only exception is the free website, which needs a 12-month commitment. New Google pages usually take 3 to 6 months to rank, so most practices see the biggest gains after month three.",
  },
  {
    q: "What's Lift Lab?",
    a: "Lift Lab is our design testing program. Each month we test 2 changes to your site based on what your numbers show: a new offer, a clearer booking step, a better page for a top treatment, a faster phone layout. We keep what books more, so your conversion rate climbs over time.",
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
    a: "Yes. We build you a website free as part of the plan, then everything else runs on it.",
  },
  {
    q: "Can I get more pages or more design tests?",
    a: "Yes. Add 20 more Google pages a month, or 2 more design tests a month, for $150 each. Add or drop them month to month.",
  },
  {
    q: "Can I get just the AI receptionist?",
    a: "The Optimized Booking System is the one plan we offer, because the website, Google pages and calls work best together. If you only need one piece, ask on the demo and we'll tell you honestly whether it makes sense.",
  },
  {
    q: "What happens if I cancel?",
    a: (
      <>
        After any minimum, cancel with 30 days&apos; notice by email. Your website and every page we built stay yours.{" "}
        <B n="Sienna AI" /> and the dashboard run on our system, so they switch off.
      </>
    ),
  },
];

export default function Pricing() {
  return (
    <main className="hv bs pr pv">

      {/* ---------------- Hero + plans ---------------- */}
      <section className="bs-hero pr-hero">
        <PrismBackground tone="light" gain={1.25} tilt={0.46} phase={30} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">Turn Your Website Into A Booking Machine, $499 A Month</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            New Google pages, a booking flow that converts, and every call answered.
          </p>
          <ul className="bs-chips">
            <li><LineIcon name="dollar" /> One plan, everything included</li>
            <li><LineIcon name="calendar" /> Works with your booking app</li>
            <li><LineIcon name="monitor" /> New website optional, built free*</li>
          </ul>

          <PlanCards />

          <p className="pv-site">
            <LineIcon name="help" /> Just need an AI receptionist?{" "}
            <a href={CALL}>Ask on the demo →</a>
          </p>
        </div>
      </section>

      {/* ---------------- The systems ---------------- */}
      <section className="hv-sec pv-sys-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>9 Systems, One Monthly Price</h2>
            <p>Each one is built and run for you. Here&apos;s what each would cost you on its own for a year.</p>
          </div>
          <div className="pv-sys">
            {SYSTEM_INFO.map((s) => (
              <div key={s.id} className="pv-sys-card has-art">
                {(() => {
                  const { Art, note } = ART[s.id];
                  return (
                    <SeeExample name={s.name} note={note}>
                      <Art />
                    </SeeExample>
                  );
                })()}
                <div className="pv-sys-head">
                  <ProductMark id={s.id} />
                  <h3><B n={s.name} /></h3>
                </div>
                {(() => {
                  const it = ITEMS.find((i) => i.mark === s.id);
                  return it ? (
                    <p className="pv-sys-val">
                      <s>{usd(it.value)}</s>
                      <em>Included</em>
                      <span>{it.basis}</span>
                    </p>
                  ) : null;
                })()}
                <p>{s.p}</p>
                {s.href && (
                  <Link className="pv-more" href={s.href}>
                    How {s.name}™ works →
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="pv-stack-sum">
            <WebsiteOptional />
            <div className="pv-stack-total">
              <div>
                <span>Total value in year one</span>
                <s>{usd(TOTAL)}</s>
              </div>
              <div className="pv-stack-price">
                <span>Your price</span>
                <b>
                  {usd(PRICE)}
                  <small>/month</small>
                </b>
                <em>
                  No contract · cancel anytime <Tip text={MIN_WHY} label="When will I see results?" />
                </em>
              </div>
              <a className="btn" href={BUY_URL || CALL}>
                {BUY_URL ? "Get started" : "Get a free demo"}
              </a>
            </div>
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
              <p className="pv-col-foot">$499 a month, on top of the software you already have</p>
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

      {/* ---------------- Add-ons (scale up without a second plan) ---------------- */}
      <section className="hv-sec pv-add-sec" id="add-ons">
        <div className="wrap">
          <div className="hv-head">
            <h2>Want More? Add It Anytime.</h2>
            <p>One plan to start. Scale it up whenever you&apos;re ready, month to month.</p>
          </div>
          <div className="pv-adds three">
            {ADDONS.map((a) => (
              <div key={a.name} className="pv-add">
                <ProductMark id={a.mark} />
                <div>
                  <h3>{a.brand ? <B n={a.name} /> : a.name}</h3>
                  <p className="pv-add-price">{a.price}</p>
                  <p>{a.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- LaserAway proof ---------------- */}
      <LaserAwayProof
        title="We've Done This Before, At LaserAway"
        lede="Before More Booked Consults, Gabe Meierotto ran five years of booking tests as LaserAway's Director of CRO. Every system here comes from that work."
      />

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Pricing, Answered</h2>
            <p>Still deciding? Book a <Link href="/demo/">free demo</Link> and ask us anything.</p>
            <a className="btn" href={BUY_URL || CALL}>Get started</a>
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
          <p>Call our demo line: <a href="tel:+17732490840">(773) 249-0840</a>. Then get started in minutes.</p>
          <a className="btn hv-cta-hero" href={BUY_URL || CALL}>
            Get started, $499/month <span className="hv-cta-arrow" aria-hidden="true">→</span>
          </a>
          <p className="hv-book-alt">Or see <Link href="/results/">the track record</Link>.</p>
          <p className="pv-fine" id="fine-print">{FREE_SITE_TERMS}</p>
        </div>
      </section>
    </main>
  );
}
