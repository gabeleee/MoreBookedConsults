/* eslint-disable @next/next/no-img-element -- small static images */
import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "./rs.css";
import PrismBackground from "@/components/PrismBackground";
import ProofLine from "@/components/home/ProofLine";
import ConversionChart from "@/components/ConversionChart";
import { LineIcon } from "@/components/LineIcon";
import { GlidePathArt, SecondGlanceArt, LeakFinderArt } from "@/components/home/SystemArt";

export const metadata: Metadata = {
  title: "Results",
  description:
    "The track record behind More Booked Consults: 3% to 11% sitewide conversion, 210x ROI, and 2,600+ variations tested by Gabe Meierotto as Director of CRO at LaserAway. Every number sourced, with the published case study to download.",
  alternates: { canonical: "/results/" },
};

// Results / track record (2026-11-03 redesign in the service-page style).
// LaserAway numbers are Gabe's personally, from his former role, never this
// company's client results. Program stats come from the Intellimize case study
// (PDF in /public). No promises about the reader's results.
const PDF = "/laseraway-intellimize-case-study.pdf";
const CALL = "/demo/";

const HERO_STATS = [
  { n: "3% → 11%", l: "Sitewide conversion", s: "LaserAway · 2018–2023" },
  { n: "210x", l: "ROI on the testing program", s: "Intellimize case study" },
  { n: "2,600+", l: "Page variations tested", s: "Intellimize case study" },
  { n: "200%", l: "Average lift on core pages", s: "Intellimize case study" },
];

const LIFTS = [
  { k: "Core service pages", v: "+200%", w: 100 },
  { k: "Page versions sitewide*", v: "+100%", w: 50 },
  { k: "Exit-intent modal variations", v: "2x", w: 50 },
];

// What was tested at LaserAway, and the system it became.
const ORIGINS = [
  {
    id: "booking-form",
    k: "Multi-step booking form",
    sys: "Glide Path™",
    href: "/booking-systems/#glide-path",
    tag: "The main lead engine, tested combination by combination.",
    tested: [
      "How many steps the form should have",
      "Icons vs. text-only answers",
      "Alphabetized options within each step",
      "Moving to the next step automatically",
      "A confirmation check on each step",
    ],
    became: [
      "A step-by-step booking form for your top treatments",
      "Easy questions first, contact details last",
    ],
    Art: GlidePathArt,
  },
  {
    id: "exit-intent",
    k: "Exit-intent recovery",
    sys: "Second Glance™",
    href: "/booking-systems/#second-glance",
    tag: "Catching visitors on their way out, instead of losing them silently.",
    tested: [
      "Exit modal variations, tested continuously",
      "An average 2x lift over running no modal at all",
    ],
    became: [
      "A branded exit offer built around your first-visit package",
      "Shown only to people who are about to leave",
    ],
    Art: SecondGlanceArt,
  },
  {
    id: "core-pages",
    k: "Core service pages",
    sys: "Leak Finder™ + monthly improvements",
    href: "/booking-systems/#leak-finder",
    tag: "The pages that sell laser hair removal, tattoo removal and more.",
    tested: [
      "A 200% average lift across core service pages",
      "Page versions matched to each visitor",
      "Winners built into the base site as they proved out",
    ],
    became: [
      "Tracking that shows the step where your visitors quit",
      "2 improvements a month, starting with the biggest leak",
    ],
    Art: LeakFinderArt,
  },
];

const CARRY = [
  "The method: one controlled change at a time, measured against a baseline",
  "The booking-form and exit-offer patterns that won at LaserAway",
  "Fixing the biggest leak first, every month",
  "The person who ran it: Gabe leads every project",
];
const NOT_CARRY = [
  "The exact numbers: your market, site and starting point are different",
  "LaserAway's traffic: smaller sites get proven changes, not big split tests",
  "Any promise beyond our 90-day booking guarantee",
];

const FAQ = [
  {
    q: "Are these client results of More Booked Consults?",
    a: "No. They're Gabe Meierotto's results from his six years as LaserAway's in-house Director of CRO, before More Booked Consults existed. We say so everywhere they appear.",
  },
  {
    q: "Can I check these numbers?",
    a: "Yes. The testing program was documented by Intellimize, the platform LaserAway ran it on, in a published case study that names Gabe. You can read it on this page or download the PDF.",
  },
  {
    q: "Will my site go from 3% to 11%?",
    a: "Nobody can promise that. Every market, site and starting point is different. What carries over is the method and the patterns that won. The only promise we make is our guarantee: your booking rate goes up in 90 days, or we keep working free until it does.",
  },
  {
    q: "My site is much smaller than LaserAway's. Does this still apply?",
    a: "Yes, with one difference. LaserAway had enough traffic to split-test almost anything. On a smaller site, we start with changes that already won there and compare your bookings before and after, then split-test where your traffic allows.",
  },
];

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

export default function Results() {
  return (
    <main className="hv bs rs">
      {/* ---------------- Hero + headline stats ---------------- */}
      <section className="bs-hero">
        <PrismBackground tone="light" gain={1.2} tilt={0.36} phase={70} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">The results behind everything we build</h1>
          <ProofLine />
          <p className="hv-lede" data-prism-calm="0.6">
            From 2018 to 2023, Gabe Meierotto ran conversion testing at LaserAway, the largest med spa chain in the U.S.
            These are his results from that role, documented in a published case study, and the playbook every More Booked Consults system comes from.
          </p>
          <div className="hv-ctas rs-ctas">
            <HeroCta />
            <a className="rs-dl" href={PDF} download>
              <LineIcon name="file" /> Download the case study
            </a>
          </div>

          <div className="bs-map rs-stats-card">
            <p className="rs-stats-top">
              <img src="/logos/laseraway.png" alt="LaserAway" className="hv-la-logo" />
              <span>Testing program, 2018–2023</span>
            </p>
            <div className="rs-stats">
              {HERO_STATS.map((s) => (
                <div key={s.n}>
                  <b>{s.n}</b>
                  <span>{s.l}</span>
                  <em>{s.s}</em>
                </div>
              ))}
            </div>
            <a className="bs-watch" href="#source">
              <span className="bs-scan" aria-hidden="true" />
              <LineIcon name="shield" />
              <span>
                <b>Gabe&apos;s results as LaserAway&apos;s Director of CRO,</b> not client results of More Booked Consults
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- The headline number (dark) ---------------- */}
      <section className="hv-proof" id="conversion">
        <PrismBackground tilt={0.42} phase={260} gain={0.85} />
        <div className="wrap">
          <div className="hv-head light" data-prism-calm="0.7">
            <h2>Sitewide conversion, 3% → 11% in six years</h2>
            <p>One controlled test at a time, compounding quarter after quarter.</p>
          </div>
          <div className="hv-proof-grid">
            <div className="hv-proof-chart">
              <p className="hv-chart-t">
                <img src="/logos/laseraway.png" alt="LaserAway" className="hv-la-logo" />
                <span>Sitewide conversion, 2018–2023</span>
              </p>
              <ConversionChart />
              <p className="hv-chart-c">Sitewide conversion during Gabe&apos;s six years running the testing program at LaserAway.</p>
            </div>
            <div className="hv-stats">
              <div className="hv-stat-la">
                <img src="/logos/laseraway-white.png" alt="LaserAway" />
                <b>+267%</b>
                <span>Relative lift, from a 3% baseline to 11%</span>
              </div>
              <div>
                <b>6 years</b>
                <span>One owner of the testing roadmap, 2018–2023</span>
              </div>
              <div>
                <b>115+</b>
                <span>LaserAway locations fed by the online booking funnel</span>
              </div>
              <div>
                <b>Billions</b>
                <span>Of possible page versions shown to real visitors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- The testing program ---------------- */}
      <section className="hv-sec rs-prog-sec" id="program">
        <div className="wrap">
          <div className="hv-head">
            <h2>What 2,600+ variations actually produced</h2>
            <p>Average lift by test area, as documented in the published case study.</p>
          </div>
          <div className="rs-prog">
            <div className="bs-stairs-card rs-lifts">
              <div className="bs-stairs-top">
                <h3>Average lift by test area</h3>
                <span className="bs-stairs-tag">Intellimize case study</span>
              </div>
              {LIFTS.map((l) => (
                <div key={l.k} className="rs-lift">
                  <div className="rs-lift-l">
                    <span>{l.k}</span>
                    <b>{l.v}</b>
                  </div>
                  <div className="rs-lift-t">
                    <span style={{ width: `${l.w}%` }} />
                  </div>
                </div>
              ))}
              <p className="bs-plan-note">
                *Average lift across page versions shown, August 2020 to November 2021. Winning combinations were built back into the base site as they proved out.
              </p>
            </div>
            <div className="rs-side">
              <div>
                <b>2,600+</b>
                <span>Variations launched across the booking form, core service pages and exit modals</span>
              </div>
              <div>
                <b>11x</b>
                <span>Testing velocity vs. the previous tooling, which made 2,600+ variations possible</span>
              </div>
              <div className="hl">
                <b>210x</b>
                <span>Return on the program, with minimal internal development resources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- From LaserAway to your site ---------------- */}
      <section className="hv-sec bs-systems" id="tested">
        <div className="wrap">
          <div className="hv-head">
            <h2>From LaserAway&apos;s tests to your website</h2>
            <p>No redesign-and-pray. Every system we build traces back to a specific experiment Gabe ran.</p>
          </div>
          <div className="bs-list">
            {ORIGINS.map(({ id, k, sys, href, tag, tested, became, Art }, i) => (
              <article key={id} id={id} className={`bs-sys${i % 2 ? " flip" : ""}`}>
                <div className="bs-sys-art">
                  <Art />
                </div>
                <div className="bs-sys-copy">
                  <p className="hv-sys-k">Tested at LaserAway</p>
                  <h3>{k}</h3>
                  <p className="hv-sys-tag">{tag}</p>
                  <div className="bs-cols">
                    <div>
                      <p className="bs-col-h">What got tested</p>
                      <ul>
                        {tested.map((x) => (
                          <li key={x}>
                            <LineIcon name="check" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bs-get">
                      <p className="bs-col-h">What it became for you</p>
                      <ul>
                        {became.map((x) => (
                          <li key={x}>
                            <LineIcon name="arrow" />
                            {x}
                          </li>
                        ))}
                      </ul>
                      <Link className="rs-sys-link" href={href}>
                        {sys} →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="hv-bonus">
            <div className="hv-bonus-copy">
              <p className="hv-sys-k">Tested at LaserAway · 2020</p>
              <h3>Agility when it counted</h3>
              <p className="hv-sys-tag">When COVID shut down in-person consults, the funnel changed in weeks.</p>
              <p>
                Virtual consultation messaging was tested and shipped for the sales team, and the booking setup was repointed so revenue kept flowing through the shutdown.
              </p>
            </div>
            <div className="rs-pivot" aria-hidden="true">
              <div className="rs-pv off">
                <span className="rs-pv-ic"><LineIcon name="building" /></span>
                <div>
                  <b>In-person consult</b>
                  <em>Paused</em>
                </div>
              </div>
              <span className="rs-pv-arrow">→</span>
              <div className="rs-pv on">
                <span className="rs-pv-ic"><LineIcon name="video" /></span>
                <div>
                  <b>Virtual consult</b>
                  <em>Tested and live in weeks</em>
                </div>
              </div>
              <div className="rs-pv-chip">
                <LineIcon name="calendar" /> Booking kept flowing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Source document ---------------- */}
      <section className="hv-sec bs-inc-sec" id="source">
        <div className="wrap">
          <div className="rs-doc">
            <div className="rs-doc-info">
              <h2>Don&apos;t take our word for it</h2>
              <p>The program was documented by Intellimize, the testing platform LaserAway ran it on, in a published case study.</p>
              <div className="rs-facts">
                <div><span>Title</span>LaserAway Drives 200% Growth with Intellimize</div>
                <div><span>Named</span>Gabe Meierotto, Conversion Rate Optimization Director</div>
                <div><span>Company</span>LaserAway · 115+ locations · Health &amp; Beauty</div>
                <div><span>Publisher</span>Intellimize (now a Webflow company)</div>
              </div>
              <div className="rs-doc-btns">
                <a className="btn" href={PDF} download>
                  Download the PDF
                </a>
                <a className="btn-ghost" href={PDF} target="_blank" rel="noopener">
                  Open full screen
                </a>
              </div>
            </div>
            <a className="rs-doc-view" href={PDF} target="_blank" rel="noopener" aria-label="Open the LaserAway Intellimize case study PDF">
              <span className="rs-doc-bar">
                <img src="/logos/intellimize-white.png" alt="" />
                laseraway-intellimize-case-study.pdf
              </span>
              <img src="/case-study-preview.jpg" alt="First page of the case study: LaserAway Drives 200% Growth with Intellimize" loading="lazy" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- What carries over ---------------- */}
      <section className="hv-sec rs-fit-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>What these numbers mean for your practice</h2>
            <p>They&apos;re a track record, not a promise.</p>
          </div>
          <div className="bs-fit">
            <div className="bs-fit-card yes">
              <p className="bs-fit-h">
                <LineIcon name="check" /> What carries over
              </p>
              <ul>
                {CARRY.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="bs-fit-card no">
              <p className="bs-fit-h">
                <LineIcon name="ban" /> What doesn&apos;t
              </p>
              <ul>
                {NOT_CARRY.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Results, answered</h2>
            <p>Anything else, ask Gabe on the demo.</p>
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
          <h2>Put the same playbook to work on your site</h2>
          <p>A free 20-minute demo. Answer 5 quick questions, then pick your time.</p>
          <ul>
            <li><LineIcon name="check" /> Where your site loses bookings today</li>
            <li><LineIcon name="check" /> Which LaserAway wins fit your practice</li>
            <li><LineIcon name="check" /> A fixed monthly price, no pressure</li>
          </ul>
          <HeroCta />
          <p className="hv-book-alt">
            See what we build: <Link href="/booking-systems/">Booking Systems</Link>, <Link href="/spotlight-ads/">Spotlight™ Ads</Link> and{" "}
            <Link href="/local-seo/">Authority Atlas™ Local SEO</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
