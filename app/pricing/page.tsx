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
import { GlidePathArt, SiennaArt, SecondGlanceArt, LeakFinderArt, MagnetArt } from "@/components/home/SystemArt";
import { TreatmentPagesArt } from "@/components/home/LocalSeoArt";
import { RaveLoopArt, MonthlyReportArt } from "@/components/home/FullBookArt";
import SeeExample from "@/components/pricing/SeeExample";
import { B, PlanCards } from "@/components/pricing/PlanCards";

// Picture for each system in the "8 Systems" section (existing site art).
const ART: Record<string, { Art: () => ReactNode; note: string }> = {
  atlas: { Art: TreatmentPagesArt, note: "Example: a page for each treatment people search for in your city." },
  "glide-path": { Art: GlidePathArt, note: "Example: visitors pick their goal, answer quick questions, then book." },
  sienna: { Art: SiennaArt, note: "Example: Sienna answering a call and texting the booking link." },
  "second-glance": { Art: SecondGlanceArt, note: "Example: an exit offer shown to a visitor about to leave." },
  "consult-magnet": { Art: MagnetArt, note: "Example: a first-visit offer built for one treatment." },
  "leak-finder": { Art: LeakFinderArt, note: "Example with sample data: the step where visitors give up." },
  "rave-loop": { Art: RaveLoopArt, note: "Example: the review text a client gets after a visit." },
  "clear-view": { Art: MonthlyReportArt, note: "Example with sample data: your plain-numbers monthly report." },
};

// Pricing (2026-11-18, Gabe): website as the front door. Front Desk $299,
// Full Book $499 and Full Book Pro $749 (website included, 12-month minimum).
// Plan cards live in components/pricing/PlanCards.tsx (also on the homepage).
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Med spa marketing plans with listed prices: Front Desk $299/mo (AI receptionist), Full Book $499/mo (a new website designed to book, 20 Google pages a month) and Full Book Pro $749/mo. Works with Boulevard, Vagaro and GlossGenius.",
  alternates: { canonical: "/pricing/" },
};

const CALL = "/demo/";

type MarkId = Parameters<typeof ProductMark>[0]["id"];

// href = the page that explains the system in detail (none yet for Consult Magnet, Rave Loop).
const SYSTEM_INFO: { id: MarkId; name: string; p: string; plans: string; href?: string }[] = [
  { id: "atlas", name: "Authority Atlas", p: "New pages for every treatment, cost and nearby town people search for.", plans: "Full Book + Pro", href: "/local-seo/" },
  { id: "glide-path", name: "Glide Path", p: "A highly optimized, multi-step booking flow that hands clients to your booking app.", plans: "Full Book + Pro", href: "/booking-systems/#glide-path" },
  { id: "sienna", name: "Sienna AI", p: "An AI receptionist that answers every call and texts your booking link.", plans: "All plans", href: "/booking-systems/#sienna-ai" },
  { id: "second-glance", name: "Second Glance", p: "A well-timed offer that brings leaving visitors back to book.", plans: "Full Book + Pro", href: "/booking-systems/#second-glance" },
  { id: "consult-magnet", name: "Consult Magnet", p: "A first-visit offer that turns browsers into booked consults.", plans: "Full Book + Pro" },
  { id: "leak-finder", name: "Leak Finder", p: "Tracking that shows the exact step where people give up.", plans: "Full Book + Pro", href: "/booking-systems/#leak-finder" },
  { id: "rave-loop", name: "Rave Loop", p: "Review requests after each visit. Unhappy clients reach you first.", plans: "All plans" },
  { id: "clear-view", name: "Clear View", p: "One plain-numbers report: calls, new clients booked, reviews.", plans: "All plans", href: "/booking-systems/#clear-view" },
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
        Yes. Most of Full Book is your new website and Google: <B n="Glide Path" />, <B n="Second Glance" />,{" "}
        <B n="Leak Finder" />, 2 design updates and 20 new pages every month. Keep the receptionist you have;{" "}
        <B n="Sienna AI" /> is there if you ever want to switch.
      </>
    ),
  },
  {
    q: "I already pay for Boulevard. Do I need you too?",
    a: "They do different jobs. Boulevard (or Vagaro, GlossGenius, Aesthetic Record) runs your day: the calendar, charts, payments and memberships. We bring new clients to that calendar. You keep your software; we work in front of it.",
  },
  {
    q: "Do I really get a new website?",
    a: "Yes. On Full Book and Full Book Pro we design and build your website, on your own domain, as part of the plan. It's designed around one job: turning visitors into booked consults. If you already have a site you love, we can redesign the pages that matter most for booking instead.",
  },
  {
    q: "What's a design update?",
    a: "Each month we keep improving your site based on what your numbers show: a new offer, a clearer booking step, a better page for a top treatment, a faster phone layout. Each one is measured against the month before, and we keep only what books more.",
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
    a: "Yes. That's who Full Book is built for: we build your website as part of the plan. Front Desk works with just a booking page.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes, move up anytime. Your setup, pages and numbers carry over.",
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
          <h1 data-prism-calm="0.8">A New Website That Books, From $499 A Month</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            We design your website so visitors turn into booked consults, add new Google pages every month and
            answer every call. You keep the booking software you already use.
          </p>
          <ul className="bs-chips">
            <li><LineIcon name="dollar" /> Prices listed, no surprises</li>
            <li><LineIcon name="calendar" /> Works with your booking app</li>
            <li><LineIcon name="monitor" /> Website included on Full Book</li>
          </ul>

          <PlanCards />

          <div className="pr-bundle pv-anchor">
            <span className="pr-bundle-ic">
              <LineIcon name="search" />
            </span>
            <p>
              <b>SEO agencies charge med spas $1,000 to $2,500 a month, and that&apos;s before paying for a website.</b> Full Book includes the website, 20 pages a month and an AI receptionist for $499.
            </p>
          </div>

          <p className="pv-site">
            <LineIcon name="monitor" /> Prefer to buy the website outright? One-time builds from $1,997.{" "}
            <a href={CALL}>Ask about a one-time build →</a>
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
                <p>{s.p}</p>
                {s.href && (
                  <Link className="pv-more" href={s.href}>
                    How {s.name}™ works →
                  </Link>
                )}
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
