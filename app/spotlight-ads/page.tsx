import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "./sp.css";
import PrismBackground from "@/components/PrismBackground";
import { LineIcon } from "@/components/LineIcon";
import { GuaranteeSeal, MagnetArt, SiennaArt, SpotlightAds } from "@/components/home/SystemArt";
import { AdStudioArt, OfferPageArt, AudienceArt, AdReportArt, MonthlyReportArt } from "@/components/home/SpotlightArt";

// Spotlight Ads service page (2026-11-03 draft). The Services menu points here;
// /medspa-advertising/ stays as the SEO page. Same layout and styles as
// /booking-systems/ (bs- classes), with ad-specific pieces in sp.css.
// No prices (the $3,000/mo ad-spend minimum is a fit fact, paid to Meta, not
// our fee). No results promised: the only guarantees allowed are the two
// booking-system ones, so the seal here is about ownership, not outcomes.
export const metadata: Metadata = {
  title: "Spotlight Ads: Meta Ads For Med Spas And Plastic Surgeons",
  description:
    "Facebook and Instagram ads for med spas and plastic surgeons, built around your best first-visit offer, sent to a page built to book, with every lead called in 60 seconds. Runs in your own ad account, ad spend paid straight to Meta with no markup.",
  alternates: { canonical: "/spotlight-ads/" },
};

const CALL = "/demo/";

// Where each part sits in a new client's path (the hero map).
const PATH = [
  { k: "Sees your ad", part: "Fresh ads", id: "ads", icon: "megaphone" },
  { k: "Taps the offer", part: "Offer page", id: "offer-page", icon: "file" },
  { k: "Sends a request", part: "Sienna AI™", id: "sienna-ai", icon: "call" },
  { k: "Books the consult", part: "Ad report", id: "ad-report", icon: "calendar" },
];

const PARTS = [
  {
    id: "ads",
    n: "01",
    cat: "Creative",
    name: "Fresh ads every month",
    tag: "Ads that stop the scroll, before they go stale.",
    why: "The same ad shown to the same people for months stops working, quietly. So new ads go out every month, each one testing a different reason to book.",
    build: [
      "8–12 new Facebook and Instagram ads a month, written and designed for your spa",
      "Different angles each month: the offer, the injector, the first-timer, the result",
      "Every ad checked against Meta's health and wellness ad rules before it runs",
      "Your photos where you have them, your brand's look and voice everywhere",
    ],
    get: [
      "You approve the ads, we do the writing, design and launching",
      "The ads that book the most consults get more of your budget",
    ],
    Art: AdStudioArt,
  },
  {
    id: "offer-page",
    n: "02",
    cat: "Landing page",
    name: "A page built for the offer",
    tag: "Clicks land on the offer, not your homepage.",
    why: "Your homepage is built for people who already know you. Someone who just tapped an Instagram ad needs one clear way to claim the offer they saw, so that is all this page does.",
    build: [
      "One landing page for your offer, matching the ad people tapped",
      "No menu and no exits: one treatment, one promise, one short form",
      "Built for phones first, since that's where the ads are seen",
      "One A/B test on the page every month: headline, offer, form or proof",
    ],
    get: [
      "Your website stays as it is",
      "More of the people you pay to reach turn into booking requests",
    ],
    Art: OfferPageArt,
  },
  {
    id: "audiences",
    n: "03",
    cat: "Audiences + tracking",
    name: "The right people, tracked properly",
    tag: "Reach adults near you, then the ones who almost booked.",
    why: "Meta can only find more people like your best clients if it can see who booked. Most accounts never tell it, so it optimizes for cheap clicks instead.",
    build: [
      "The Meta pixel and Conversions API, set up before a dollar is spent",
      "Campaigns aimed at adults within driving distance of your spa",
      "Retargeting for people who saw the offer page and didn't book yet",
      "Tracking kept off sensitive pages, so patient details never reach ad platforms",
    ],
    get: [
      "Meta learns from booked consults, not just clicks",
      "Everything runs in your own ad account, so the data stays yours",
    ],
    Art: AudienceArt,
  },
  {
    id: "sienna-ai",
    n: "04",
    cat: "Follow-up",
    name: "Sienna AI calls every ad lead",
    tag: "A lead called in 60 seconds books more than one called tomorrow.",
    why: "People who tap an ad are curious, not committed. By the time someone calls back the next day, many have moved on. Sienna calls while they're still holding their phone.",
    build: [
      "Your AI receptionist, set up with your treatments, the offer and your tone",
      "A call script you read and approve before anything goes live",
      "Hand-off rules: when Sienna books, and when it passes the call to your team",
    ],
    get: [
      "Every request from your ads gets a call within a minute, day or night",
      "Your front desk spends its time on people ready to book",
    ],
    Art: SiennaArt,
  },
  {
    id: "ad-report",
    n: "05",
    cat: "Reporting",
    name: "Every ad traced to booked consults",
    tag: "Know what each ad brings back, not just what it costs.",
    why: "Clicks and cheap leads look good in a report and pay no bills. We follow each ad all the way to booked consults, so you can see what your budget actually bought.",
    build: [
      "Each ad tracked from click to request to booked consult",
      "Cost per booked consult, ad by ad and month by month",
      "A plain-English monthly report: what ran, what won, what lost, what's next",
    ],
    get: [
      "A straight answer to \"are the ads working?\" whenever you ask",
      "Budget moves to the ads that book, away from the ones that don't",
    ],
    Art: AdReportArt,
  },
];

const INCLUDED = [
  {
    h: "At setup",
    icon: "zap",
    items: [
      "Meta pixel and Conversions API, tracked to booked consults",
      "Your Consult Magnet first-visit offer",
      "A landing page built for that offer",
      "Your first batch of ads, checked against Meta's health ad rules",
      "Audiences near your spa, plus retargeting",
      "Sienna AI set up to call every ad lead",
    ],
  },
  {
    h: "Every month after",
    icon: "repeat",
    items: [
      "8–12 fresh ads, each testing a new angle",
      "Campaign management, with budget moved to the winners",
      "One A/B test on your landing page",
      "Sienna calls every new lead within 60 seconds",
      "A plain-English report, plus one point of contact for questions",
    ],
  },
];

const FIT_YES = [
  "You run a med spa, plastic surgery practice, injector studio or laser clinic",
  "You can put at least $3,000 a month into ads, paid straight to Meta",
  "You can give it 3 months, since Meta campaigns need time to learn",
  "Your team has room in the calendar for new clients",
];
const FIT_NO = [
  "Your ad budget is under $3,000 a month (Booking Systems or local SEO will help more)",
  "You want a set number of leads or a fixed cost per lead promised up front",
  "You're outside aesthetics",
];

// Comparison rows: [label, Spotlight Ads, % of spend agency, boosting posts yourself]
const COMPARE: [string, string, string, string][] = [
  ["Fee stays flat when your budget grows", "yes", "no", "No fee"],
  ["Ad spend paid straight to Meta, no markup", "yes", "Sometimes", "yes"],
  ["Runs in your own ad account", "yes", "Sometimes", "yes"],
  ["Clicks land on a page built for the offer", "yes", "Sometimes", "no"],
  ["Every lead called within 60 seconds", "yes", "no", "no"],
  ["Fresh ads every month", "8–12", "Sometimes", "no"],
  ["Landing page tested every month", "yes", "no", "no"],
  ["Each ad traced to booked consults", "yes", "Sometimes", "no"],
  ["Done for you", "yes", "yes", "no"],
];

const FAQ = [
  {
    q: "Whose ad account do the ads run from?",
    a: "Yours. The ads run in your Meta ad account and Meta bills your card directly. We manage the campaigns, the ads and the landing page, and you keep the account, the data and the pixel history if you ever leave.",
  },
  {
    q: "Why don't the ads go to my website?",
    a: "Your website is built for people who already know you: a menu of treatments, an about page and a dozen ways to wander off. Someone who just tapped an ad needs one fast way to claim the offer they saw. A page built for that offer turns more of those taps into booking requests.",
  },
  {
    q: "Why a flat fee instead of a percentage of ad spend?",
    a: "A percentage fee rewards spending more, not booking more. A flat fee keeps the focus on getting more consults out of the budget you already have.",
  },
  {
    q: "Can you advertise Botox on Facebook and Instagram?",
    a: "You can advertise the result and your offer, but brand names of prescription drugs like Botox are restricted on Meta. So the ad leads with the outcome and the offer, and the landing page explains the treatment. Every ad is checked against Meta's current health ad rules before it runs.",
  },
  {
    q: "Are before-and-after photos allowed?",
    a: "Meta's health and wellness rules currently allow before-and-after photos for cosmetic treatments in ads shown to adults, as long as the copy doesn't criticize how the viewer looks. Meta has changed this rule more than once, so we check it before every launch, and every photo needs the patient's written consent.",
  },
  {
    q: "How much does it cost?",
    a: "You get one flat monthly fee on the demo call, before you commit to anything. Your ad budget is separate and goes straight to Meta, with a $3,000 a month minimum. There's a 3-month minimum, since Meta campaigns need that long to learn.",
  },
  {
    q: "Can you promise a number of leads?",
    a: "No, and be careful with anyone who does. Results depend on your market, your offer, your budget and how quickly your team follows up. What we promise is the work: tracking set up right, fresh ads every month, a landing page tested every month, and a report that tells you plainly what happened.",
  },
  {
    q: "Do I need Booking Systems too?",
    a: "No. Spotlight Ads send people to their own offer page, so they work on their own. Many practices add Booking Systems later, because people who found you through an ad usually visit your website before they book again.",
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

const LOOP = [
  {
    icon: "search",
    h: "Read the numbers",
    p: "Which ads booked consults, which only got clicks, and where people left the offer page.",
  },
  {
    icon: "sparkles",
    h: "Launch fresh ads",
    p: "Tired ads come down and 8–12 new ones go up, with more of them on the angle that's winning.",
  },
  {
    icon: "chart",
    h: "Test the page",
    p: "One A/B test on the landing page. The better version stays, so every ad dollar works harder next month.",
  },
] as const;

export default function SpotlightAdsPage() {
  return (
    <main className="hv bs sp">
      {/* ---------------- Hero + path map ---------------- */}
      <section className="bs-hero">
        <PrismBackground tone="light" gain={1.2} tilt={-0.25} phase={420} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">Meta ads that fill your calendar with new med spa clients</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            Facebook and Instagram ads built around your best first-visit offer, sent to a page built to book, with every lead called in 60 seconds.
            You pay Meta directly, with no markup.
          </p>
          <div className="hv-ctas">
            <HeroCta />
          </div>
          <ul className="bs-chips">
            <li><LineIcon name="sparkles" /> 8–12 fresh ads a month</li>
            <li><LineIcon name="call" /> Leads called in 60 seconds</li>
            <li><LineIcon name="lock" /> Your account, no markup</li>
          </ul>

          <div className="bs-map" aria-label="Where each part works in a new client's path">
            <ol className="bs-path">
              {PATH.map((p, i) => (
                <li key={p.k}>
                  <span className="bs-node">
                    <LineIcon name={p.icon} />
                  </span>
                  <span className="bs-step">Step {i + 1}</span>
                  <b>{p.k}</b>
                  <a className="bs-pill" href={`#${p.id}`}>
                    {p.part}
                  </a>
                </li>
              ))}
            </ol>
            <a className="bs-watch" href="#audiences">
              <span className="bs-scan" aria-hidden="true" />
              <LineIcon name="eye" />
              <span>
                <b>Pixel + Conversions API</b> track every step, so Meta learns who actually books
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Example ads ---------------- */}
      <section className="hv-sec sp-ex-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Ads that look like your spa, not a template</h2>
            <p>Every ad leads with an offer worth booking, and every click is tracked to what it brings back.</p>
          </div>
          <SpotlightAds />
          <p className="hv-addon-note">Example ads for a made-up med spa. We write your real ads with you.</p>
        </div>
      </section>

      {/* ---------------- Parts in depth ---------------- */}
      <section className="hv-sec bs-systems">
        <div className="wrap">
          <div className="hv-head">
            <h2>What each part does, and what we build</h2>
            <p>All five are written, designed, built and tracked by us. You approve everything before it goes live.</p>
          </div>
          <div className="bs-list">
            {PARTS.map(({ id, n, cat, name, tag, why, build, get, Art }, i) => (
              <article key={id} id={id} className={`bs-sys${i % 2 ? " flip" : ""}`}>
                <div className="bs-sys-art">
                  <Art />
                </div>
                <div className="bs-sys-copy">
                  <p className="hv-sys-k">
                    Part {n} · {cat}
                  </p>
                  <h3>{name}</h3>
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
              <p className="hv-sys-tag">The offer every ad is built around.</p>
              <p>
                The strongest ad can&apos;t rescue a weak offer. Before any ads are made, we build a named first-visit package for your top treatment, simple enough to understand in one glance. It becomes the hook in your ads, the headline on your offer page and the reason Sienna gives people to book.
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
            <p>One flat monthly fee covers all of it. Your ad budget goes straight to Meta.</p>
          </div>
          <div className="bs-inc">
            {INCLUDED.map((g, gi) => (
              <div key={g.h} className={`bs-inc-card${gi ? " later" : ""}`}>
                <p className="bs-inc-h">
                  <span className="sp-inc-ic">
                    <LineIcon name={g.icon} />
                  </span>
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
            <h2>Why not a typical ad agency, or boosting posts yourself?</h2>
            <p>Getting clicks is the easy part. Turning them into booked consults is the job.</p>
          </div>
          <div className="bs-cmp-scroll">
            <table className="bs-cmp">
              <thead>
                <tr>
                  <th />
                  <th className="us">
                    <span>More Booked Consults</span>Spotlight Ads
                  </th>
                  <th>% of spend agency</th>
                  <th>Boosting posts yourself</th>
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

      {/* ---------------- Launch timeline ---------------- */}
      <section className="hv-sec hv-how bs-how">
        <div className="wrap">
          <div className="hv-head">
            <h2>From kickoff to live ads</h2>
            <p>A kickoff call and your approvals. We do the rest.</p>
          </div>
          <ol className="bs-tl">
            <li>
              <span className="bs-tl-when">Day 1</span>
              <b>Kickoff</b>
              <p>We learn your treatments, your best offer and your market, and you give us access to your Meta ad account.</p>
            </li>
            <li>
              <span className="bs-tl-when">Week 1</span>
              <b>Tracking + offer</b>
              <p>The pixel and Conversions API go in, and we build your Consult Magnet offer and the page for it.</p>
            </li>
            <li>
              <span className="bs-tl-when">Week 2</span>
              <b>You approve</b>
              <p>You see the first batch of ads, the offer page and Sienna&apos;s script, and we change anything you want changed.</p>
            </li>
            <li>
              <span className="bs-tl-when">Launch</span>
              <b>Live</b>
              <p>The ads switch on, Sienna starts calling every new lead, and your report starts filling in.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ---------------- Every month after ---------------- */}
      <section className="hv-sec bs-after">
        <div className="wrap">
          <div className="hv-head">
            <h2>Launch is the start. Every month the ads get sharper.</h2>
            <p>New ads, a tested page and a report you can read in two minutes.</p>
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
          <MonthlyReportArt />
          <p className="hv-addon-note">Sample report for a made-up med spa. Yours is built from your own numbers.</p>
        </div>
      </section>

      {/* ---------------- Ownership promise (not a results guarantee) ---------------- */}
      <section className="hv-guar-wrap bs-guar">
        <div className="wrap">
          <div className="hv-guar">
            <GuaranteeSeal text="Your account, your data" />
            <h2>
              You own the ad account, the pixel and every lead, <span className="hv-u">even if you leave</span>.
            </h2>
            <ul>
              <li>
                <LineIcon name="dollar" /> Ad spend paid straight to Meta, never marked up
              </li>
              <li>
                <LineIcon name="lock" /> Our fee never grows with your ad budget
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Spotlight Ads, answered</h2>
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
          <h2>See what Spotlight Ads would look like for your spa</h2>
          <p>A free 20-minute demo. Answer 5 quick questions, then pick your time.</p>
          <ul>
            <li><LineIcon name="check" /> The offer we&apos;d lead with for your top treatment</li>
            <li><LineIcon name="check" /> Hear Sienna AI make a live call</li>
            <li><LineIcon name="check" /> A flat monthly fee, no pressure</li>
          </ul>
          <HeroCta />
          <p className="hv-book-alt">
            Want more of your website visitors to book too? See <Link href="/booking-systems/">Booking Systems</Link> and{" "}
            <Link href="/medspa-seo/">Authority Atlas™ Local SEO</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
