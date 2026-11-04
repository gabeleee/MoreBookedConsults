import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "./pr.css";
import PrismBackground from "@/components/PrismBackground";
import ProofLine from "@/components/home/ProofLine";
import { LineIcon } from "@/components/LineIcon";
import { GuaranteeSeal } from "@/components/home/SystemArt";
import { MegaArt } from "@/components/Header";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flat monthly pricing for med spas and plastic surgeons: Booking Systems $2,500/mo with no contract, Authority Atlas local SEO $2,500/mo, both $5,000/mo, or Spotlight Ads (managed Meta ads) $3,000/mo. Ad spend paid straight to Meta, never marked up.",
  alternates: { canonical: "/pricing/" },
};

// Pricing (2026-11-04 redesign in the service-page style). Prices and terms
// are the ones in the repo CLAUDE.md. The only guarantees allowed are the two
// Booking Systems ones. No bundle discount on ads.
const CALL = "/demo/";

const PLANS = [
  {
    id: "booking-systems",
    art: "book",
    tag: "Start here",
    name: "Booking Systems",
    price: "$2,500",
    sub: "Turn more of the visitors you already get into booked consults.",
    terms: "No contract · cancel anytime",
    pts: [
      "All five systems: Glide Path, Sienna AI, Second Glance, Leak Finder, Clear View",
      "Your Consult Magnet first-visit offer",
      "Live in 14 days, or month one is free",
      "2 improvements every month, each measured against your baseline",
      "90-day booking guarantee",
    ],
    href: "/booking-systems/",
    featured: true,
  },
  {
    id: "authority-atlas",
    art: "seo",
    name: "Authority Atlas™ Local SEO",
    price: "$2,500",
    sub: "Show up first when people near you search for your treatments.",
    terms: "6-month minimum",
    pts: [
      "Your Atlas: a plan of every page worth ranking",
      "Google Business Profile cleaned up and kept current",
      "A page for every treatment in your city",
      "Citations, speed and schema fixed",
      "Monthly report on rankings and what they booked",
    ],
    href: "/local-seo/",
  },
  {
    id: "spotlight-ads",
    art: "ads",
    name: "Spotlight™ Ads",
    price: "$3,000",
    sub: "Meta ads built around your best offer, sent to a page that books.",
    terms: "$2,500 one-time setup · 3-month minimum",
    pts: [
      "Setup: tracking, your offer page and the first batch of ads",
      "8–12 fresh ads every month",
      "One A/B test on your landing page every month",
      "Sienna AI calls every ad lead in 60 seconds",
      "Ad spend paid by you straight to Meta, never marked up",
    ],
    href: "/spotlight-ads/",
  },
];

// [label, Booking Systems, Authority Atlas, Spotlight Ads]
const COMPARE: [string, string, string, string][] = [
  ["Monthly fee", "$2,500", "$2,500", "$3,000"],
  ["One-time setup", "None", "None", "$2,500"],
  ["Minimum term", "None", "6 months", "3 months"],
  ["Ad spend", "n/a", "n/a", "Paid to Meta, $3,000/mo min."],
  ["Every month", "2 site improvements", "New treatment pages", "8–12 new ads + 1 page test"],
  ["Sienna AI calls every new lead", "yes", "no", "yes"],
  ["Guarantee", "90-day booking guarantee", "no", "no"],
  ["Plain-English monthly report", "yes", "yes", "yes"],
  ["You own everything we build", "yes", "yes", "yes"],
];

const STEPS = [
  { when: "Step 1", h: "Free demo", p: "20 minutes on your own site: where you lose bookings and what we'd build first." },
  { when: "Step 2", h: "Your price", p: "One flat monthly price for the plan that fits, before you commit to anything." },
  { when: "Step 3", h: "Kickoff", p: "A kickoff call and your approvals. We write, design, build and track the rest." },
  { when: "After", h: "Month to month", p: "After any minimum, cancel with 30 days' notice by email. No cancellation fee." },
];

const OWN = [
  "Your Meta ad account and pixel, in your own Business Manager",
  "Your website, Google Business Profile and analytics, in your name",
  "The pages, ads, offers, test results and reports we build",
  "Your booking flow, exit offer and lead history if you leave",
];

const FAQ = [
  {
    q: "Is there a contract?",
    a: "Booking Systems runs month to month with no contract. Authority Atlas has a 6-month minimum, because rankings take that long to show what they're worth. Spotlight Ads has a 3-month minimum, because Meta campaigns need time to learn. After any minimum, every plan continues month to month.",
  },
  {
    q: "Why a flat fee instead of a percentage of ad spend?",
    a: "A percentage fee rewards spending more, not booking more. Our fee stays the same when your ad budget grows, and your ad spend is billed to you directly by Meta, never marked up.",
  },
  {
    q: "Can I combine plans?",
    a: "Yes. Booking Systems and Authority Atlas together are $5,000 a month with a 6-month minimum. Spotlight Ads can be added to either at its normal price; there's no bundle discount on ads.",
  },
  {
    q: "Which plan should I start with?",
    a: "Usually Booking Systems. More traffic only pays off once your site turns visitors into consults, so we fix that first, then add local SEO or ads to bring in more people.",
  },
  {
    q: "What does the 90-day guarantee cover?",
    a: "Booking Systems only: your booking rate goes up in 90 days, or we keep working free until it does. Booking rate is booking requests divided by website visitors, measured against your week-1 baseline, for sites with at least 300 visitors a month. Your booking flow is also live in 14 days, or month one is free.",
  },
  {
    q: "What happens if I cancel?",
    a: "Email us with 30 days' notice after any minimum. You keep your accounts, pages, ads, offers and reports. Sienna AI and the live dashboard run on our system, so they switch off when you leave.",
  },
];

function Mark({ v }: { v: string }) {
  if (v === "yes")
    return (
      <span className="bs-yes" aria-label="Yes">
        <LineIcon name="check" />
      </span>
    );
  if (v === "no")
    return (
      <span className="bs-no" aria-label="No">
        <LineIcon name="ban" />
      </span>
    );
  return <span className="bs-txt">{v}</span>;
}

function HeroCta() {
  return (
    <a className="btn hv-cta-hero" href={CALL}>
      <span className="hv-cta-ic" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M9 7.5v9l7.5-4.5z" />
        </svg>
      </span>
      Get a free demo
      <span className="hv-cta-arrow" aria-hidden="true">→</span>
    </a>
  );
}

export default function Pricing() {
  return (
    <main className="hv bs pr">
      {/* ---------------- Hero + plans ---------------- */}
      <section className="bs-hero pr-hero">
        <PrismBackground tone="light" gain={1.25} tilt={0.46} phase={30} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">Simple, flat monthly pricing</h1>
          <ProofLine />
          <p className="hv-lede" data-prism-calm="0.6">
            No agency layers, no percentage of your ad spend, and no contract on Booking Systems.
            Pick the plan that fixes your biggest problem first.
          </p>
          <ul className="bs-chips">
            <li><LineIcon name="dollar" /> One flat monthly fee</li>
            <li><LineIcon name="lock" /> You own every account</li>
            <li><LineIcon name="shield" /> 90-day booking guarantee</li>
          </ul>

          <div className="pr-plans">
            {PLANS.map((p) => (
              <div key={p.id} id={p.id} className={`pr-plan${p.featured ? " featured" : ""}`}>
                {p.tag && <span className="pr-tag">{p.tag}</span>}
                <MegaArt kind={p.art} />
                <h2 className="pr-name">{p.name}</h2>
                <p className="pr-sub">{p.sub}</p>
                <p className="pr-price">
                  {p.price}
                  <span>/month</span>
                </p>
                <p className="pr-terms">{p.terms}</p>
                <ul>
                  {p.pts.map((x) => (
                    <li key={x}>
                      <LineIcon name="check" />
                      {x}
                    </li>
                  ))}
                </ul>
                <a className={p.featured ? "btn" : "btn-ghost"} href={CALL}>
                  Get a free demo
                </a>
                <Link className="pr-more" href={p.href}>
                  See how it works →
                </Link>
              </div>
            ))}
          </div>

          <div className="pr-bundle">
            <span className="pr-bundle-ic">
              <LineIcon name="layers" />
            </span>
            <p>
              <b>Booking Systems + Authority Atlas: $5,000/month.</b> Both together, one plan, one monthly report, 6-month minimum.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Compare ---------------- */}
      <section className="hv-sec bs-cmp-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Compare the plans</h2>
            <p>Every plan is a flat monthly fee for the work itself.</p>
          </div>
          <div className="bs-cmp-scroll">
            <table className="bs-cmp pr-cmp">
              <thead>
                <tr>
                  <th />
                  <th className="us">
                    <span>Start here</span>Booking Systems
                  </th>
                  <th>Authority Atlas</th>
                  <th>Spotlight Ads</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, a, b, c]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td className="us">
                      <Mark v={a} />
                    </td>
                    <td>
                      <Mark v={b} />
                    </td>
                    <td>
                      <Mark v={c} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="hv-sec hv-how bs-how">
        <div className="wrap">
          <div className="hv-head">
            <h2>How pricing works</h2>
            <p>You know your price before you commit to anything.</p>
          </div>
          <ol className="bs-tl">
            {STEPS.map((s) => (
              <li key={s.h}>
                <span className="bs-tl-when">{s.when}</span>
                <b>{s.h}</b>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Guarantee ---------------- */}
      <section className="hv-guar-wrap bs-guar">
        <div className="wrap">
          <div className="hv-guar">
            <GuaranteeSeal />
            <h2>
              On Booking Systems, your booking rate goes up in 90 days, or <span className="hv-u">we keep working free until it does</span>.
            </h2>
            <ul>
              <li>
                <LineIcon name="clock" /> Booking flow live in 14 days, or month one is free
              </li>
              <li>
                <LineIcon name="lock" /> No contract, cancel anytime
              </li>
            </ul>
            <p className="hv-fine">Booking rate = booking requests ÷ website visitors, measured against your week-1 baseline. For sites with at least 300 visitors a month.</p>
          </div>
        </div>
      </section>

      {/* ---------------- What you own ---------------- */}
      <section className="hv-sec pr-own-sec">
        <div className="wrap">
          <div className="pr-own">
            <div>
              <h2>Everything stays yours</h2>
              <p>From the first day, your accounts are in your name. If you ever leave, the work leaves with you.</p>
            </div>
            <ul>
              {OWN.map((x) => (
                <li key={x}>
                  <LineIcon name="check" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Pricing, answered</h2>
            <p>Anything else, ask us on the demo.</p>
            <a className="btn" href={CALL}>
              Get a free demo
            </a>
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

      {/* ---------------- Final CTA ---------------- */}
      <section className="hv-book">
        <div className="wrap hv-final">
          <h2>Find out which plan fits your practice</h2>
          <p>A free 20-minute demo. Answer 5 quick questions, then pick your time.</p>
          <ul>
            <li><LineIcon name="check" /> Where your site loses bookings today</li>
            <li><LineIcon name="check" /> The plan we&apos;d start with, and why</li>
            <li><LineIcon name="check" /> Your exact monthly price, no pressure</li>
          </ul>
          <HeroCta />
          <p className="hv-book-alt">
            Or see <Link href="/results/">the track record</Link> behind every plan.
          </p>
        </div>
      </section>
    </main>
  );
}
