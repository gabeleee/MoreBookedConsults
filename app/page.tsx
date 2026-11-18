/* eslint-disable @next/next/no-img-element -- small static logo PNGs */
import type { Metadata } from "next";
import Link from "next/link";
import "./home-v2.css";
import "./pricing/pr.css";
import "./pricing/pv.css";
import "./pricing/pv3.css";
import "./local-seo/ls.css";
import "./full-book/fb.css";
import { PlanCards, FREE_SITE_TERMS } from "@/components/pricing/PlanCards";
import LaserAwayProof from "@/components/home/LaserAwayProof";
import PrismBackground from "@/components/PrismBackground";
import ProofLine from "@/components/home/ProofLine";
import { LineIcon } from "@/components/LineIcon";
import { ProductTitle, ProductMark, MARK_FOR } from "@/components/home/ProductMark";
import HomeHeroArt from "@/components/home/HomeHeroArt";
import { SpotlightAds, AdMoneyFlow, GuaranteeSeal, MagnetArt, LoopLeakArt, LoopTestArt, LoopWinArt, FastArt, KeepArt, DoneArt, MeasuredArt, GlidePathArt, SiennaArt, SecondGlanceArt, LeakFinderArt, LiftLabArt, ClearViewArt } from "@/components/home/SystemArt";

// Homepage v2 (2026-11-03): sold like a product. Branded systems from the
// proposals, a call as the main CTA, the founder named once inside the proof
// section. Since 2026-11-18 the three plan cards from /pricing/ show here too.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Aesthetic practice marketing for med spas and plastic surgeons: we build six booking systems into your website in 14 days, then keep improving them every month.",
};

const CALL = "/pricing/"; // 2026-11-18: every CTA = Get started (demo is secondary, on /pricing/)

const SYSTEMS = [
  {
    n: "01",
    cat: "Booking flow",
    name: "Glide Path",
    tag: "A booking path people actually finish.",
    pts: [
      "A short, step-by-step booking form built for your treatments, written and designed for your brand.",
      "Asks the easy questions first and the contact details later, so more people get to the end.",
      "Every request lands in the booking software you already use.",
    ],
    Art: GlidePathArt,
  },
  {
    n: "02",
    cat: "Follow-up agent",
    name: "Sienna AI",
    tag: "Every lead gets a call in 60 seconds.",
    pts: [
      "Your AI receptionist calls each new booking request within a minute, day or night.",
      "Answers questions about your treatments, books the consult, or hands the call to your front desk.",
      "Anyone who stops halfway, or calls when nobody can pick up, gets a text with your booking link.",
    ],
    Art: SiennaArt,
  },
  {
    n: "03",
    cat: "Exit offer",
    name: "Second Glance",
    tag: "Win back the people about to leave.",
    pts: [
      "A branded popup with a first-visit offer, shown only when someone is about to leave.",
      "We write the offer, design it, build it and track it.",
      "Visitors who were going to disappear leave their details instead.",
    ],
    Art: SecondGlanceArt,
  },
  {
    n: "04",
    cat: "Drop-off analytics",
    name: "Leak Finder",
    tag: "See exactly where bookings slip away.",
    pts: [
      "Tracking on every step of your booking path, on phones and computers.",
      "Shows the one step where the most people quit.",
      "We fix the worst step first, so every month starts with the biggest win.",
    ],
    Art: LeakFinderArt,
  },
  {
    n: "05",
    cat: "Design tests",
    name: "Lift Lab",
    tag: "Your booking rate climbs every month.",
    pts: [
      "2 new design tests on your site every month: offers, booking steps, layouts and treatment pages.",
      "Picked from what your numbers show, starting with the biggest leak.",
      "We keep the winners, so each month starts from a higher booking rate.",
    ],
    Art: LiftLabArt,
  },
  {
    n: "06",
    cat: "Live dashboard",
    name: "Clear View",
    tag: "Know what's working, any time.",
    pts: [
      "Your own private link with visitors, booking requests and booking rate, updated live.",
      "Before vs. after on every change we make.",
      "No monthly slide deck to wait for.",
    ],
    Art: ClearViewArt,
  },
];

const BENEFITS = [
  { Art: FastArt, t: "Live in 14 days", p: "Your new booking flow is on your site within two weeks of our kickoff." },
  { Art: KeepArt, t: "Keep your website and software", p: "We add to the site and booking system you already have. No rebuild, no migration." },
  { Art: DoneArt, t: "Done for you", p: "We write, design, build and track everything. You approve it." },
  { Art: MeasuredArt, t: "Every change measured", p: "Each improvement is checked against your numbers from before, on your dashboard." },
];

const STEPS = [
  { when: "Day 0", t: "Free demo", p: "20 minutes. We look at your site together and show you where bookings are slipping." },
  { when: "Week 1", t: "Baseline + plan", p: "We measure your booking rate today, before anything changes." },
  { when: "Day 14", t: "Systems go live", p: "Booking flow, Sienna AI, exit offer, tracking and dashboard, all switched on." },
  { when: "Every month", t: "2 improvements", p: "We fix the next biggest leak, measure it, and keep what wins." },
];

// Logos from each company's own site, shown as one-tone marks. "Works with"
// only: we hand requests to these systems, we are not their partner.
const PLATFORMS = [
  { name: "Boulevard", file: "boulevard.svg", h: 17 },
  { name: "Vagaro", file: "vagaro.svg", h: 22 },
  { name: "Aesthetic Record", file: "aestheticrecord.png", h: 28 },
  { name: "Mangomint", file: "mangomint.svg", h: 24 },
  { name: "Zenoti", file: "zenoti.svg", h: 24 },
  { name: "PatientNow", file: "patientnow.svg", h: 24 },
  { name: "Square", file: "square.svg", h: 24 },
];

const FAQ = [
  {
    q: "How much does it cost?",
    a: "One plan, everything included: the Optimized Booking System is $499 a month for 20 new Google pages a month, a booking flow built to convert and an AI receptionist that answers every call, on your website or a new one we build free. Need more pages or design tests? Add them anytime. It's all on our pricing page.",
  },
  {
    q: "Does it work with my booking software?",
    a: "Yes. Glide Path hands every request to the system you already use, like Boulevard, Vagaro, Aesthetic Record, Mangomint or Zenoti. If you book by phone or email, requests go straight to your front desk.",
  },
  {
    q: "Do I need a new website?",
    a: "No. Everything works on the website you already have. If you need a new one, or you only have a booking-app page, we build it free with a 12-month minimum.",
  },
  {
    q: "How long until it's live?",
    a: "Your booking flow is live within 14 days of kickoff, or month one is free. The rest of the systems switch on alongside it.",
  },
  {
    q: "What does Sienna say on the call? Can I hear it first?",
    a: "Sienna is set up with your treatments, policies and tone, and you approve the script before it goes live. It never gives medical advice, and it hands the call to your front desk whenever a person is better. Call (773) 249-0840 to hear it now: Sienna answers for a sample med spa called Glow Aesthetics.",
  },
  {
    q: "How do you measure results?",
    a: "In week 1 we record your booking rate (booking requests divided by website visitors) before anything changes. Every change after that is compared against that baseline on your Clear View dashboard.",
  },
  {
    q: "What happens after the first month?",
    a: "We keep improving. Each month we ship 2 new improvements, starting with the biggest leak your numbers show, and measure each one. Your booking path comes first, then the rest of your site.",
  },
  {
    q: "Who is this for?",
    a: "Med spas, plastic surgeons, injectors and laser clinics, from solo studios to busy multi-provider practices.",
  },
  {
    q: "Do you run ads or SEO too?",
    a: "SEO is built into the Optimized Booking System: Authority Atlas adds new Google pages for your treatments every month. Meta ads (Spotlight Ads) are an add-on once your site books more of the visitors it already gets.",
  },
  {
    q: "Who will I work with?",
    a: "Every project is led by Gabe Meierotto, LaserAway's former Director of CRO. You get one point of contact and a shared channel for questions.",
  },
  {
    q: "Is there a contract? What if I cancel?",
    a: "No. The Optimized Booking System is month to month, and you can cancel anytime with 30 days' notice. The free website is the one exception: it needs 12 months. You keep your website and every page we built. Sienna AI and the dashboard run on our system, so they switch off when you leave.",
  },
];

function CallButton({ children = "Get started", className = "btn" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={CALL}>
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="hv">
      {/* ---------------- Hero (two columns, 2026-11-18) ---------------- */}
      <section className="hv-hero hx-hero" id="top">
        <PrismBackground tone="light" gain={1.25} tilt={0.38} phase={70} />
        <div className="wrap hx-in">
          <div className="hx-copy">
            <ProofLine />
            <h1 data-prism-calm="0.8">Turn More Of Your Website Visitors Into Booked Consults</h1>
            <ul className="hx-bullets" data-prism-calm="0.6">
              <li><LineIcon name="check" /> New Google pages every month</li>
              <li><LineIcon name="check" /> A booking flow that converts</li>
              <li><LineIcon name="check" /> An AI receptionist that answers every call</li>
              <li><LineIcon name="check" /> One plan, done for you, $499 a month</li>
            </ul>
            <div className="hx-ctas">
              <Link className="btn hv-cta-hero" href="/pricing/">
                Get started
                <span className="hv-cta-arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="hx-demo" href="/demo/">
                Prefer to talk first? <span>Book a free demo</span>
              </Link>
            </div>
            <a className="fb-hear" href="tel:+17732490840">
              <span className="fb-hear-ic" aria-hidden="true">
                <LineIcon name="call" />
              </span>
              <span>
                Hear Sienna<span className="fb-hear-long"> AI answer now</span>: <b>(773) 249-0840</b>
              </span>
            </a>
          </div>
          <HomeHeroArt />
        </div>
      </section>

      {/* ---------------- Booking software band ---------------- */}
      <section className="hv-band" aria-label="Booking software we work with">
        <div className="wrap">
          <p className="hv-band-l">Works with the booking software you already use</p>
          <ul className="hv-platforms">
            {PLATFORMS.map((p) => (
              <li key={p.name}>
                <img src={`/logos/booking/${p.file}`} alt={p.name} style={{ height: p.h }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Systems ---------------- */}
      <section className="hv-sec hv-systems" id="systems">
        <div className="wrap">
          <div className="hv-head">
            <h2>6 Systems That Turn More Visitors Into Booked Consults</h2>
            <p>Each one is built and run for you, and each one raises how many of your visitors book.</p>
          </div>
          <div className="hv-sys-list">
            {SYSTEMS.map(({ n, cat, name, tag, pts, Art }, i) => (
              <article key={n} className={`hv-sys${i % 2 ? " flip" : ""}`}>
                <div className="hv-sys-art">
                  <Art />
                </div>
                <div className="hv-sys-copy">
                  <p className="hv-sys-k">
                    System {n} · {cat}
                  </p>
                  <ProductTitle id={MARK_FOR[name]} name={name} />
                  <p className="hv-sys-tag">{tag}</p>
                  <ul>
                    {pts.map((p) => (
                      <li key={p}>
                        <LineIcon name="check" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <p className="hv-sys-more">
            <Link href="/booking-systems/">See how each system works, in detail →</Link>
          </p>

          <div className="hv-bonus">
            <div className="hv-bonus-copy">
              <p className="hv-sys-k">Bonus · Offer builder</p>
              <ProductTitle id="consult-magnet" name="Consult Magnet" />
              <p className="hv-sys-tag">A first-visit offer people actually want to claim.</p>
              <p>We build a named package for your top treatment, then use it everywhere: your exit offer, your follow-up texts and your ads.</p>
              <CallButton className="btn-ghost">Get all six, plus the bonus</CallButton>
            </div>
            <MagnetArt />
          </div>
        </div>
      </section>

      {/* ---------------- Engine ---------------- */}
      <section className="hv-sec hv-engine">
        <div className="wrap">
          <div className="hv-head">
            <h2>Month one builds it. Every month after makes it better.</h2>
            <p>Each month we ship 2 improvements to your site and measure every one.</p>
          </div>
          <ol className="hv-loop has-art">
            <li>
              <LoopLeakArt />
              <b>Find the biggest leak</b>
              <p>Leak Finder shows where your site loses the most people that month.</p>
            </li>
            <li>
              <LoopTestArt />
              <b>Ship 2 fixes</b>
              <p>New forms for your top treatments, sharper offers, better follow-up timing, whatever the numbers point to.</p>
            </li>
            <li>
              <LoopWinArt />
              <b>Keep what wins</b>
              <p>Winners stay live, the rest get switched off, and you see both on Clear View.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ---------------- Benefits ---------------- */}
      <section className="hv-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>More consults. No new software. No extra work for your team.</h2>
          </div>
          <div className="hv-benefits">
            {BENEFITS.map(({ Art, ...b }) => (
              <div key={b.t} className="hv-benefit has-art">
                <Art />
                <h3>{b.t}</h3>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="hv-sec hv-how">
        <div className="wrap">
          <div className="hv-head">
            <h2>From first call to live in 14 days</h2>
          </div>
          <ol className="hv-steps">
            {STEPS.map((s, i) => (
              <li key={s.t}>
                <span className="hv-step-n">{i + 1}</span>
                <span className="hv-step-when">{s.when}</span>
                <b>{s.t}</b>
                <p>{s.p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Guarantee ---------------- */}
      <section className="hv-guar-wrap">
        <div className="wrap">
          <div className="hv-guar">
            <GuaranteeSeal />
            <h2>
              Your booking rate goes up in 90 days, or <span className="hv-u">we keep working free until it does</span>.
            </h2>
            <ul>
              <li>
                <LineIcon name="clock" /> Booking flow live in 14 days, or month one is free
              </li>
              <li>
                <LineIcon name="dollar" /> One plan, $499 a month
              </li>
            </ul>
            <p className="hv-fine">Booking rate = booking requests ÷ website visitors, measured against your week-1 baseline. For sites with at least 300 visitors a month.</p>
          </div>
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <LaserAwayProof />

      {/* ---------------- Pricing (same cards as /pricing/) ---------------- */}
      <section className="hv-sec pr pv hv-pricing" id="pricing">
        <div className="wrap">
          <div className="hv-head">
            <h2>One Plan, Everything Included</h2>
            <p>One plan, everything included. Keep the booking software you already use.</p>
          </div>
          <PlanCards />
          <p className="hv-sys-more hv-pricing-more">
            <Link href="/pricing/">See what each piece is worth, plus add-ons →</Link>
          </p>
          <p className="pv-fine" id="fine-print">{FREE_SITE_TERMS}</p>
        </div>
      </section>

      {/* ---------------- Add-ons ---------------- */}
      <section className="hv-sec hv-addons-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>When you&apos;re booking more, add more traffic</h2>
            <p>Once your site turns visitors into consults, every new visitor is worth more.</p>
          </div>

          <div className="hv-addon-big">
            <div className="hv-addon-top">
              <div>
                <p className="hv-sys-k">Add-on · Facebook &amp; Instagram ads</p>
                <h3 className="pm-title">
                  <ProductMark id="spotlight" />
                  <span>
                    Spotlight<sup>™</sup> Ads
                  </span>
                </h3>
                <p className="hv-sys-tag">Ads built to bring back more than they cost.</p>
                <ul className="hv-addon-pts">
                  <li><LineIcon name="check" />Built around your best first-visit offer, not a generic discount</li>
                  <li><LineIcon name="check" />8–12 fresh ads every month, written to Meta&apos;s healthcare rules</li>
                  <li><LineIcon name="check" />Every click lands on a page built to book, with Sienna AI calling each lead</li>
                  <li><LineIcon name="check" />You pay Meta directly, with no markup on your ad budget</li>
                </ul>
              </div>
              <AdMoneyFlow />
            </div>
            <SpotlightAds />
            <p className="hv-addon-note">Example ads for a made-up med spa. We write your real ads with you.</p>
            <p className="hv-sys-more sp-more">
              <Link href="/spotlight-ads/">See how Spotlight™ Ads work, in detail →</Link>
            </p>
          </div>

        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec" id="faq">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Questions, answered</h2>
            <p>Anything else, ask us on the call.</p>
            <CallButton />
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
      <section className="hv-book" id="book">
        <div className="wrap hv-final">
          <h2>One Plan, Everything Included</h2>
          <p>The Optimized Booking System™ is $499 a month. See everything that&apos;s included, then get started in minutes.</p>
          <ul>
            <li><LineIcon name="check" /> 20 new Google pages every month</li>
            <li><LineIcon name="check" /> A booking flow built to convert</li>
            <li><LineIcon name="check" /> Every call answered, 24/7</li>
          </ul>
          <a className="btn hv-cta-hero" href={CALL}>
            Get started
            <span className="hv-cta-arrow" aria-hidden="true">→</span>
          </a>
          <p className="hv-book-alt">
            Not ready yet? <Link href="/tools/">Try our free tools</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
