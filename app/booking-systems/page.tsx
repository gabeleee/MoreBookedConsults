import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "./bs.css";
import PrismBackground from "@/components/PrismBackground";
import { LineIcon } from "@/components/LineIcon";
import { GuaranteeSeal, MagnetArt, GlidePathArt, SiennaArt, SecondGlanceArt, LeakFinderArt, ClearViewArt } from "@/components/home/SystemArt";

// Booking Systems service page (2026-11-03 draft). The Services menu points
// here; /medspa-cro/ stays as the SEO page. The homepage gives one card per
// system; this page goes deeper: where each one sits in the visitor's path,
// what we build, what changes for the practice, plus fit, comparison and a
// service FAQ. No prices, CTA = /demo/.
export const metadata: Metadata = {
  title: "Booking Systems For Med Spas And Plastic Surgeons",
  description:
    "Five booking systems installed on your med spa or plastic surgery website in 14 days: a booking flow people finish, an AI receptionist that calls every lead in 60 seconds, an exit offer, drop-off tracking and a live dashboard.",
  alternates: { canonical: "/booking-systems/" },
};

const CALL = "/demo/";

// Where each system sits in a visitor's path (the hero map).
const PATH = [
  { k: "Taps Book", sys: "Glide Path", icon: "calendar" },
  { k: "About to leave", sys: "Second Glance", icon: "gift" },
  { k: "Sends a request", sys: "Sienna AI", icon: "call" },
  { k: "Books the consult", sys: "Clear View", icon: "chart" },
];

const SYSTEMS = [
  {
    id: "glide-path",
    n: "01",
    cat: "Booking flow",
    name: "Glide Path",
    tag: "A booking path people actually finish.",
    why: "Most Book buttons open a long page of treatments, prices and time slots. Glide Path asks one easy question at a time, so people keep going.",
    build: [
      "A step-by-step booking form for your top treatments, in your brand's look and voice",
      "Easy questions first (treatment, goal, timing), contact details last",
      "Built for phones first, then computers",
      "Every Book button on your site opens it, so there's one clear path",
    ],
    get: [
      "Requests land in the booking software you already use, or with your front desk",
      "You see each person's treatment and goal before anyone calls them",
    ],
    Art: GlidePathArt,
  },
  {
    id: "sienna-ai",
    n: "02",
    cat: "Follow-up agent",
    name: "Sienna AI",
    tag: "Every lead gets a call in 60 seconds.",
    why: "A request that comes in at 9 PM and gets a call back tomorrow has often booked somewhere else by then. Sienna calls while they're still on your site.",
    build: [
      "Your AI receptionist, set up with your treatments, policies and tone",
      "A call script you read and approve before anything goes live",
      "Hand-off rules: when Sienna books, and when it passes the call to your team",
      "A text with your booking link for anyone who stops halfway or calls when nobody can pick up",
    ],
    get: [
      "Every new request gets a call within a minute, day or night",
      "Sienna never gives medical advice, and passes the call to a person whenever that's better",
    ],
    Art: SiennaArt,
  },
  {
    id: "second-glance",
    n: "03",
    cat: "Exit offer",
    name: "Second Glance",
    tag: "Win back the people about to leave.",
    why: "Most visitors leave without booking or saying who they are. Second Glance gives them one good reason to stay: a first-visit offer worth claiming.",
    build: [
      "A branded popup that only shows when someone is about to leave",
      "Built around your Consult Magnet offer (below), not a generic discount",
      "A short 3-step form, so claiming the offer takes seconds",
      "We write, design, build and track it",
    ],
    get: [
      "Visitors who were going to disappear leave their details instead",
      "Sienna calls them like any other request",
    ],
    Art: SecondGlanceArt,
  },
  {
    id: "leak-finder",
    n: "04",
    cat: "Drop-off analytics",
    name: "Leak Finder",
    tag: "See exactly where bookings slip away.",
    why: "Your analytics show how many people visit. They don't show the one question in your form where half of them quit. Leak Finder does.",
    build: [
      "Tracking on every step of your booking path",
      "Phones and computers measured separately, since they leak in different places",
      "Exit offer and follow-up results tracked next to the form",
    ],
    get: [
      "The single step where the most people quit, shown plainly",
      "We fix the worst step first, so each month starts with the biggest win",
    ],
    Art: LeakFinderArt,
  },
  {
    id: "clear-view",
    n: "05",
    cat: "Live dashboard",
    name: "Clear View",
    tag: "Know what's working, any time.",
    why: "You shouldn't have to wait for a monthly slide deck to know if your website is booking more. Clear View is your numbers, live.",
    build: [
      "Your own private link, with no login to remember",
      "Visitors, booking requests and booking rate, updated live",
      "Your week-1 baseline, so every number has a before",
    ],
    get: [
      "Before vs. after on every change we make",
      "A plain answer to \"is this working?\" whenever you want one",
    ],
    Art: ClearViewArt,
  },
];

const INCLUDED = [
  {
    h: "In your first 14 days",
    items: [
      "Your booking rate measured before anything changes",
      "Glide Path booking flow for your top treatments",
      "Sienna AI set up, scripted and approved by you",
      "Your Consult Magnet first-visit offer",
      "Second Glance exit popup built around it",
      "Leak Finder tracking on every step",
      "Your Clear View dashboard link",
    ],
  },
  {
    h: "Every month after",
    items: [
      "2 new improvements to your site, starting with the biggest leak",
      "Each one measured against your baseline",
      "Winners stay live, the rest get switched off",
      "Sienna's script and timing tuned from real calls",
      "One point of contact and a shared channel for questions",
    ],
  },
];

const FIT_YES = [
  "You run a med spa, plastic surgery practice, injector studio or laser clinic",
  "Your website gets at least 300 visitors a month",
  "People visit, but too few of them book",
  "You want it done for you, not another tool to learn",
];
const FIT_NO = [
  "Your site gets fewer than 300 visitors a month (we'll tell you what helps more)",
  "You want a whole new website from scratch",
  "You're outside aesthetics",
];

// Comparison rows: [label, booking systems, new website, booking widget alone]
const COMPARE: [string, string, string, string][] = [
  ["Live on your site", "14 days", "Weeks to months", "Days"],
  ["Keeps your website and booking software", "yes", "no", "yes"],
  ["Booking form built for consults", "yes", "Sometimes", "no"],
  ["Calls every new lead within 60 seconds", "yes", "no", "no"],
  ["Catches visitors about to leave", "yes", "no", "no"],
  ["Shows the step where people quit", "yes", "no", "no"],
  ["Gets better every month", "yes", "no", "no"],
  ["Done for you", "yes", "yes", "no"],
];

const FAQ = [
  {
    q: "How is this different from getting a new website?",
    a: "A new website changes how your site looks. Booking systems change what happens when someone wants to book: the form, the follow-up call, the exit offer and the tracking. We add them to the site you already have, so there's nothing to rebuild.",
  },
  {
    q: "Does Glide Path replace my booking software?",
    a: "No. It sits in front of it. Glide Path collects the request in a few easy steps, then hands it to Boulevard, Vagaro, Aesthetic Record, Mangomint, Zenoti or whatever you use. If you book by phone, requests go to your front desk.",
  },
  {
    q: "Is Sienna AI a real person?",
    a: "No. Sienna is an AI receptionist with a natural voice, set up with your treatments, policies and tone. You approve the script first, and Sienna passes the call to your team whenever a person is better.",
  },
  {
    q: "What do you need from me?",
    a: "A kickoff call, access to your website and booking software, and your approval on the form, the offer and Sienna's script. We do the writing, design, building and tracking.",
  },
  {
    q: "How do you choose what to improve each month?",
    a: "Leak Finder shows which step loses the most people. We fix that one first, measure it against your baseline, and move to the next biggest leak. Your booking path comes first, then the rest of your site.",
  },
  {
    q: "Will the exit popup annoy my visitors?",
    a: "It only shows when someone is about to leave, and it leads with an offer they'd actually want. People who are busy booking never see it.",
  },
  {
    q: "How much does it cost?",
    a: "You get one fixed monthly price on the demo call, based on your site, before you commit to anything. There's no contract.",
  },
  {
    q: "What if I cancel?",
    a: "You keep your booking flow, your exit offer and your lead history. Sienna AI and the dashboard run on our system, so they switch off when you leave.",
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

// "Every month after" section (2026-11-03). Heights are illustrative, and two
// months are flat on purpose: not every change wins, and the copy says so.
const LOOP = [
  {
    icon: "search",
    h: "Find the biggest leak",
    p: "Leak Finder shows the one step that lost the most people last month, in your booking path or anywhere else on your site.",
  },
  {
    icon: "wrench",
    h: "Ship 2 improvements",
    p: "We pick changes that already won real tests on other sites, so even a smaller site gets proven ideas, not guesses.",
  },
  {
    icon: "chart",
    h: "Keep what wins",
    p: "Every change is measured against your baseline in Clear View. Winners stay live, the rest get switched off.",
  },
] as const;

const STAIRS = [
  { m: "Before", h: 34 },
  { m: "Month 1", h: 52, tag: "Install" },
  { m: "Month 2", h: 59, tag: "Win" },
  { m: "Month 3", h: 59, tag: "Held" },
  { m: "Month 4", h: 67, tag: "Win" },
  { m: "Month 5", h: 73, tag: "Win" },
  { m: "Month 6", h: 73, tag: "Held" },
];

const PLAN = [
  { m: "Month 1", t: "Glide Path, Sienna AI and Second Glance go live" },
  { m: "Month 2", t: "Booking forms built for your top 3 treatments" },
  { m: "Month 3", t: "Second Glance offer A vs. offer B" },
  { m: "Month 4", t: "Sienna's call script and callback timing" },
  { m: "Month 5", t: "A before-and-after gallery that links to booking" },
  { m: "Month 6", t: "A seasonal offer on your homepage" },
];

export default function BookingSystems() {
  return (
    <main className="hv bs">
      {/* ---------------- Hero + visitor path map ---------------- */}
      <section className="bs-hero">
        <PrismBackground tone="light" gain={1.2} tilt={0.3} phase={200} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">Booking systems that turn med spa visitors into booked consults</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            Five systems, installed on the website you already have in 14 days.
            Each one fixes a different place where people who want a consult slip away.
          </p>
          <div className="hv-ctas">
            <HeroCta />
          </div>
          <ul className="bs-chips">
            <li><LineIcon name="clock" /> Live in 14 days</li>
            <li><LineIcon name="call" /> Leads called in 60 seconds</li>
            <li><LineIcon name="repeat" /> 2 improvements every month</li>
          </ul>

          <div className="bs-map" aria-label="Where each system works in a visitor's path">
            <ol className="bs-path">
              {PATH.map((p, i) => (
                <li key={p.k}>
                  <span className="bs-node">
                    <LineIcon name={p.icon} />
                  </span>
                  <span className="bs-step">Step {i + 1}</span>
                  <b>{p.k}</b>
                  <a className="bs-pill" href={`#${p.sys.toLowerCase().replace(/ /g, "-")}`}>
                    {p.sys}
                    <sup>™</sup>
                  </a>
                </li>
              ))}
            </ol>
            <a className="bs-watch" href="#leak-finder">
              <span className="bs-scan" aria-hidden="true" />
              <LineIcon name="eye" />
              <span>
                <b>Leak Finder™</b> watches every step and shows where people quit
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Systems in depth ---------------- */}
      <section className="hv-sec bs-systems">
        <div className="wrap">
          <div className="hv-head">
            <h2>What each system does, and what we build</h2>
            <p>All five are written, designed, built and tracked by us. You approve everything before it goes live.</p>
          </div>
          <div className="bs-list">
            {SYSTEMS.map(({ id, n, cat, name, tag, why, build, get, Art }, i) => (
              <article key={id} id={id} className={`bs-sys${i % 2 ? " flip" : ""}`}>
                <div className="bs-sys-art">
                  <Art />
                </div>
                <div className="bs-sys-copy">
                  <p className="hv-sys-k">
                    System {n} · {cat}
                  </p>
                  <h3>
                    {name}
                    <sup>™</sup>
                  </h3>
                  <p className="hv-sys-tag">{tag}</p>
                  <p className="bs-why">{why}</p>
                  <div className="bs-cols">
                    <div>
                      <p className="bs-col-h">What we build</p>
                      <ul>
                        {build.map((x) => (
                          <li key={x}>
                            <LineIcon name="check" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bs-get">
                      <p className="bs-col-h">What changes for you</p>
                      <ul>
                        {get.map((x) => (
                          <li key={x}>
                            <LineIcon name="arrow" />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="hv-bonus">
            <div className="hv-bonus-copy">
              <p className="hv-sys-k">Included · Offer builder</p>
              <h3>
                Consult Magnet<sup>™</sup>
              </h3>
              <p className="hv-sys-tag">The offer that makes the other systems work harder.</p>
              <p>
                We build a named first-visit package for your top treatment. It becomes the offer in Second Glance, the reason Sienna gives people to book, and the hook in your ads if you run them.
              </p>
            </div>
            <MagnetArt />
          </div>
        </div>
      </section>

      {/* ---------------- What's included ---------------- */}
      <section className="hv-sec bs-inc-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Everything that&apos;s included</h2>
            <p>One fixed monthly price covers all of it, with no contract.</p>
          </div>
          <div className="bs-inc">
            {INCLUDED.map((g, gi) => (
              <div key={g.h} className={`bs-inc-card${gi ? " later" : ""}`}>
                <p className="bs-inc-h">
                  <span>{gi ? "∞" : "14"}</span>
                  {g.h}
                </p>
                <ul>
                  {g.items.map((x) => (
                    <li key={x}>
                      <LineIcon name="check" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Comparison ---------------- */}
      <section className="hv-sec bs-cmp-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Why not just get a new website?</h2>
            <p>A new site changes how you look. These systems change how many visitors book.</p>
          </div>
          <div className="bs-cmp-scroll">
            <table className="bs-cmp">
              <thead>
                <tr>
                  <th />
                  <th className="us">
                    <span>More Booked Consults</span>Booking Systems
                  </th>
                  <th>New website</th>
                  <th>Booking widget alone</th>
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

      {/* ---------------- Fit check ---------------- */}
      <section className="hv-sec bs-fit-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Who it&apos;s for</h2>
          </div>
          <div className="bs-fit">
            <div className="bs-fit-card yes">
              <p className="bs-fit-h">
                <LineIcon name="check" /> A strong fit if
              </p>
              <ul>
                {FIT_YES.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="bs-fit-card no">
              <p className="bs-fit-h">
                <LineIcon name="ban" /> Not the right fit if
              </p>
              <ul>
                {FIT_NO.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Install timeline ---------------- */}
      <section className="hv-sec hv-how bs-how">
        <div className="wrap">
          <div className="hv-head">
            <h2>The 14-day install</h2>
            <p>A kickoff call and your approvals. We do the rest.</p>
          </div>
          <ol className="bs-tl">
            <li>
              <span className="bs-tl-when">Day 1</span>
              <b>Kickoff</b>
              <p>We learn your treatments, offers and booking software, and you share access to your site.</p>
            </li>
            <li>
              <span className="bs-tl-when">Week 1</span>
              <b>Baseline + build</b>
              <p>Leak Finder records your booking rate today while we build the form, the offer and Sienna&apos;s script.</p>
            </li>
            <li>
              <span className="bs-tl-when">Week 2</span>
              <b>You approve</b>
              <p>You see every piece on a private preview, and we change anything you want changed.</p>
            </li>
            <li>
              <span className="bs-tl-when">Day 14</span>
              <b>Live</b>
              <p>All five systems switch on, and your Clear View link starts showing before vs. after.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ---------------- Every month after ---------------- */}
      <section className="hv-sec bs-after">
        <div className="wrap">
          <div className="hv-head">
            <h2>Month one builds it. Every month after makes it better.</h2>
            <p>The install is the start, not the finish.</p>
          </div>
          <ol className="bs-loop">
            {LOOP.map((l) => (
              <li key={l.h}>
                <span className="bs-loop-ic">
                  <LineIcon name={l.icon} />
                </span>
                <b>{l.h}</b>
                <p>{l.p}</p>
              </li>
            ))}
          </ol>
          <div className="bs-stairs-card">
            <div className="bs-stairs-top">
              <h3>Each win stacks on the last.</h3>
              <span className="bs-stairs-tag">Illustrative</span>
            </div>
            <p className="bs-stairs-sub">Booking rate, month by month. Some months a change doesn&apos;t beat what&apos;s live, so we switch it off and nothing drops.</p>
            <div className="bs-stairs" role="img" aria-label="Illustrative chart: booking rate rises after the install, then steps up most months as winning changes stack, and holds flat in months where a test didn't win.">
              {STAIRS.map((b, i) => {
                const prev = i > 0 ? STAIRS[i - 1].h : b.h;
                const gain = i > 0 ? b.h - prev : 0;
                return (
                  <div key={b.m} className={`bs-stair${i === 0 ? " is-before" : ""}`}>
                    {b.tag && (
                      <span className={`bs-stair-tag${b.tag === "Held" ? " is-held" : ""}`} style={{ bottom: `calc(${b.h}% + 8px)` }}>
                        {b.tag}
                      </span>
                    )}
                    <div className="bs-stair-col" style={{ height: `${b.h}%` }}>
                      {gain > 0 && <span className="bs-stair-gain" style={{ height: `${(gain / b.h) * 100}%` }} />}
                    </div>
                    <span className="bs-stair-m">{b.m}</span>
                  </div>
                );
              })}
            </div>
            <div className="bs-plan">
              <p className="bs-plan-h">A sample 6-month plan</p>
              <ul>
                {PLAN.map((p) => (
                  <li key={p.m}>
                    <span>{p.m}</span>
                    {p.t}
                  </li>
                ))}
              </ul>
              <p className="bs-plan-note">Sample plan for illustration. Yours is chosen from what your Leak Finder numbers show, so no two spas get the same plan.</p>
              <p className="bs-plan-note">With enough traffic, we split-test: half your visitors see the new version and half see the old one. With less, we make bigger changes that already won elsewhere and compare your bookings before and after.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Guarantee ---------------- */}
      <section className="hv-guar-wrap bs-guar">
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
                <LineIcon name="lock" /> No contract, cancel anytime
              </li>
            </ul>
            <p className="hv-fine">Booking rate = booking requests ÷ website visitors, measured against your week-1 baseline. For sites with at least 300 visitors a month.</p>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Booking systems, answered</h2>
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
          <h2>See all five on your own site</h2>
          <p>A free 20-minute demo. Answer 5 quick questions, then pick your time.</p>
          <ul>
            <li><LineIcon name="check" /> Where your site loses bookings today</li>
            <li><LineIcon name="check" /> Hear Sienna AI make a live call</li>
            <li><LineIcon name="check" /> A fixed monthly price, no pressure</li>
          </ul>
          <HeroCta />
          <p className="hv-book-alt">
            Want more traffic too? See <Link href="/medspa-advertising/">Spotlight™ Ads</Link> and{" "}
            <Link href="/medspa-seo/">Authority Atlas™ Local SEO</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
