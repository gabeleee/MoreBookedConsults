import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "./ls.css";
import PrismBackground from "@/components/PrismBackground";
import ProofLine from "@/components/home/ProofLine";
import { LineIcon } from "@/components/LineIcon";
import { GuaranteeSeal } from "@/components/home/SystemArt";
import { TopicalMapArt, ProfileArt, TreatmentPagesArt, CitationsArt, RankGridArt, ReviewReplyArt } from "@/components/home/LocalSeoArt";

// Authority Atlas (local SEO) service page (2026-11-03 draft). The Services
// menu points here; /medspa-seo/ stays as the SEO page. Same layout and styles
// as /booking-systems/ and /spotlight-ads/. No prices (the 6-month minimum is
// a fit fact). Never promise a ranking: the seal is about ownership.
export const metadata: Metadata = {
  title: "Authority Atlas: Local SEO For Med Spas And Plastic Surgeons",
  description:
    "Local SEO for med spas and plastic surgeons: show up in Google Maps and for the treatments your city searches. Google Business Profile, a page for every treatment, citations, technical fixes and a monthly report on the searches you gain.",
  alternates: { canonical: "/local-seo/" },
};

const CALL = "/demo/";

// Where each part sits in a searcher's path (the hero map).
const PATH = [
  { k: "Searches near you", part: "The Atlas", id: "atlas", icon: "search" },
  { k: "Sees you on the map", part: "Google profile", id: "google-profile", icon: "pin" },
  { k: "Reads your page", part: "Treatment pages", id: "treatment-pages", icon: "file" },
  { k: "Books the consult", part: "Ranking report", id: "ranking-report", icon: "calendar" },
];

const PARTS = [
  {
    id: "atlas",
    n: "01",
    cat: "Topical map",
    name: "The Atlas",
    tag: "A map of every search your future clients make.",
    why: "Most spa websites have one Services page trying to rank for everything. Google rewards the practice that answers every treatment, cost and question in depth, so we map all of them before writing a word.",
    build: [
      "Every treatment, concern and question people near you search, in one plan",
      "Each one matched to a page on your site, new or existing",
      "Links between them, so Google sees you as the expert on each treatment",
      "An order to build them in, starting with the treatment worth the most to you",
    ],
    get: [
      "You see the whole plan before anything gets written",
      "No random blog posts: every page has a job",
    ],
    Art: TopicalMapArt,
  },
  {
    id: "google-profile",
    n: "02",
    cat: "Google Maps",
    name: "Your Google profile, done right",
    tag: "The map pack is where most local searches end.",
    why: "When someone searches for \"med spa near me\", three businesses show on the map before any website does. Your Google Business Profile decides whether you're one of them.",
    build: [
      "The right main category, plus every service you actually offer",
      "Treatments, hours, photos and booking link filled in and kept current",
      "Your profile linked to the matching pages on your site",
      "Guidance for your team on asking for reviews and replying safely",
    ],
    get: [
      "More calls, direction requests and bookings from the map",
      "Your profile looks as good as the spa itself",
    ],
    Art: ProfileArt,
  },
  {
    id: "treatment-pages",
    n: "03",
    cat: "Treatment pages",
    name: "A page for every treatment",
    tag: "Rank for \"lip filler in your city\", not just your name.",
    why: "People rarely search for a spa by name. They search for the treatment and the city. Each of your top treatments needs its own page that answers what they want to know and makes booking easy.",
    build: [
      "One page per treatment, in your city, starting with the most valuable",
      "Cost, results, recovery and FAQs, written for the people searching",
      "Your providers' names and credentials on every page",
      "A clear path to book on each one, using what we know about conversion",
    ],
    get: [
      "You show up for the treatments that bring in the most revenue",
      "Visitors land on the exact treatment they searched for",
    ],
    Art: TreatmentPagesArt,
  },
  {
    id: "foundation",
    n: "04",
    cat: "Citations + technical",
    name: "A foundation Google trusts",
    tag: "Small mismatches quietly cost you rankings.",
    why: "An old phone number on Yelp or a slow mobile page tells Google you might not be reliable. We clean these up first, so the rest of the work isn't held back.",
    build: [
      "Your name, address and phone number made consistent across directories",
      "Speed and mobile fixes on the pages that matter",
      "Schema markup that matches your Google profile",
      "Tracking kept off sensitive pages, so patient details stay private",
    ],
    get: [
      "Google can trust what it reads about you",
      "Your site loads fast on the phones people search from",
    ],
    Art: CitationsArt,
  },
  {
    id: "ranking-report",
    n: "05",
    cat: "Reporting",
    name: "A report on what it books",
    tag: "Rankings only matter if they bring in consults.",
    why: "A report full of keyword positions doesn't tell you if the phone is ringing. Ours shows where you rank around your spa, and what those rankings turned into.",
    build: [
      "Map-pack rank for your core searches, mapped around your location",
      "Google profile calls, website clicks and direction requests",
      "Consult requests from the pages we build",
      "The searches you gained this month, in plain English",
    ],
    get: [
      "A straight answer to \"is SEO working?\" every month",
      "You see what's next before we build it",
    ],
    Art: RankGridArt,
  },
];

const INCLUDED = [
  {
    h: "In your first month",
    icon: "zap",
    items: [
      "Where you rank today, next to the 3 practices in your map pack",
      "Your Atlas: the full plan of pages and links",
      "Google Business Profile cleaned up and completed",
      "Citations fixed across the main directories",
      "Speed, mobile and schema fixes",
      "Your ranking baseline, so every gain has a before",
    ],
  },
  {
    h: "Every month after",
    icon: "repeat",
    items: [
      "New treatment pages, built in the order of the Atlas",
      "Pages close to the top 3 strengthened first",
      "Your Google profile kept current",
      "A plain-English report on rankings and what they booked",
      "One point of contact for questions",
    ],
  },
];

const FIT_YES = [
  "You run a med spa, plastic surgery practice, injector studio or laser clinic",
  "You want clients who find you on their own, without paying for every click",
  "You can give it 6 months, since rankings build over months",
  "Your website already turns visitors into consults, or you're adding Booking Systems",
];
const FIT_NO = [
  "You need new bookings this month (Spotlight Ads is faster)",
  "You want a #1 ranking promised up front",
  "You're outside aesthetics",
];

// Comparison rows: [label, Authority Atlas, generic SEO agency, Google Ads]
const COMPARE: [string, string, string, string][] = [
  ["No cost for each click", "yes", "yes", "no"],
  ["Keeps bringing visitors if you pause", "yes", "yes", "no"],
  ["Built only for aesthetic practices", "yes", "Sometimes", "n/a"],
  ["A page for every treatment in your city", "yes", "Sometimes", "no"],
  ["Pages built to turn visitors into consults", "yes", "no", "no"],
  ["Report shows calls and consult requests", "yes", "Sometimes", "yes"],
  ["Promises a #1 ranking", "Never", "Sometimes", "n/a"],
  ["Time to first results", "Months", "Months", "Days"],
];

const FAQ = [
  {
    q: "How long does local SEO take?",
    a: "Google profile improvements can show in weeks. Ranking for competitive treatment-and-city searches usually takes a few months of steady work, which is why there's a 6-month minimum.",
  },
  {
    q: "Do you guarantee first-page rankings?",
    a: "No. Nobody controls Google, and anyone guaranteeing a ranking is selling you something. We promise the work, a clear plan and honest reporting on the searches you gain.",
  },
  {
    q: "How much does it cost?",
    a: "You get one flat monthly fee on the demo call, before you commit to anything. There's a 6-month minimum, since rankings take months to build.",
  },
  {
    q: "Do you run review campaigns?",
    a: "No. Reviews come from your clients and your front desk. We give your team guidance on asking for reviews and replying safely, and the retainer goes into your profile, citations and treatment pages.",
  },
  {
    q: "How should we reply to reviews without breaking HIPAA?",
    a: "Reply to every review, but never confirm that the reviewer is a patient or mention a treatment, even if they did first. Thank them, keep it general, and move anything specific to a private conversation.",
  },
  {
    q: "Which Google category should a med spa choose?",
    a: "The most specific one that describes the business as a whole, which for most med spas is Medical spa. Add other categories only for services you genuinely offer, because the main category shapes which searches you can show up for.",
  },
  {
    q: "Do I own the pages you build?",
    a: "Yes. The pages live on your website, so they're yours, and they keep working if you leave.",
  },
  {
    q: "What if my website doesn't convert well?",
    a: "Then SEO just sends more people to a page that loses them. That's a conversion problem, and it's cheaper to fix first. Booking Systems fixes it, and the two work well together.",
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
    h: "Check the rankings",
    p: "Where you moved, which searches are close to the top 3, and which pages brought in calls and consults.",
  },
  {
    icon: "file",
    h: "Build the next page",
    p: "The next treatment in your Atlas goes live, in the order that's worth the most to you.",
  },
  {
    icon: "trending",
    h: "Push what's close",
    p: "Pages sitting just outside the top 3 get strengthened first, since they're the quickest wins.",
  },
] as const;

// Illustrative: SEO starts slow, then compounds as pages build on each other.
const STAIRS = [
  { m: "Month 1", h: 8, tag: "Foundation" },
  { m: "Month 2", h: 14 },
  { m: "Month 3", h: 24 },
  { m: "Month 4", h: 38 },
  { m: "Month 5", h: 52 },
  { m: "Month 6", h: 66 },
  { m: "Month 9", h: 88 },
];

export default function LocalSeoPage() {
  return (
    <main className="hv bs ls">
      {/* ---------------- Hero + path map ---------------- */}
      <section className="bs-hero">
        <PrismBackground tone="light" gain={1.2} tilt={0.18} phase={640} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">Show up first when people near you search for your treatments</h1>
          <ProofLine />
          <p className="hv-lede" data-prism-calm="0.6">
            Local SEO for med spas and plastic surgeons: the Google Maps pack, a page for every treatment in your city, and a monthly report on what it all books.
            Every visitor it brings in is a click you didn&apos;t pay for.
          </p>
          <div className="hv-ctas">
            <HeroCta />
          </div>
          <ul className="bs-chips">
            <li><LineIcon name="pin" /> Google Maps + local pack</li>
            <li><LineIcon name="file" /> A page for every treatment</li>
            <li><LineIcon name="chart" /> Monthly ranking report</li>
          </ul>

          <div className="bs-map" aria-label="Where each part works in a searcher's path">
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
            <a className="bs-watch" href="#foundation">
              <span className="bs-scan" aria-hidden="true" />
              <LineIcon name="shield" />
              <span>
                <b>Citations + technical fixes</b> keep Google trusting every step
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Parts in depth ---------------- */}
      <section className="hv-sec bs-systems">
        <div className="wrap">
          <div className="hv-head">
            <h2>What each part does, and what we build</h2>
            <p>All five are planned, written, built and tracked by us. You approve every page before it goes live.</p>
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
              <p className="hv-sys-k">Included · Review guidance</p>
              <h3>Reviews, replied to safely</h3>
              <p className="hv-sys-tag">Reviews move you up the map. A careless reply can break HIPAA.</p>
              <p>
                We give your team a simple way to ask happy clients for reviews, and reply templates that thank people without confirming they&apos;re a patient or naming a treatment.
              </p>
            </div>
            <ReviewReplyArt />
          </div>
        </div>
      </section>

      {/* ---------------- What's included ---------------- */}
      <section className="hv-sec bs-inc-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Everything that&apos;s included</h2>
            <p>One flat monthly fee covers all of it.</p>
          </div>
          <div className="bs-inc">
            {INCLUDED.map((g, gi) => (
              <div key={g.h} className={`bs-inc-card${gi ? " later" : ""}`}>
                <p className="bs-inc-h">
                  <span className="ls-inc-ic">
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
            <h2>Why not a generic SEO agency, or Google Ads?</h2>
            <p>SEO is slower than ads. It&apos;s also the only channel that keeps working when you stop paying for clicks.</p>
          </div>
          <div className="bs-cmp-scroll">
            <table className="bs-cmp">
              <thead>
                <tr>
                  <th />
                  <th className="us">
                    <span>More Booked Consults</span>Authority Atlas
                  </th>
                  <th>Generic SEO agency</th>
                  <th>Google Ads</th>
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

      {/* ---------------- First month timeline ---------------- */}
      <section className="hv-sec hv-how bs-how">
        <div className="wrap">
          <div className="hv-head">
            <h2>How the first month goes</h2>
            <p>A kickoff call and your approvals. We do the rest.</p>
          </div>
          <ol className="bs-tl">
            <li>
              <span className="bs-tl-when">Week 1</span>
              <b>Audit</b>
              <p>Where you rank today for your top treatments, and how your profile compares with the 3 practices in your map pack.</p>
            </li>
            <li>
              <span className="bs-tl-when">Week 2</span>
              <b>Your Atlas</b>
              <p>The full plan of pages, in the order we&apos;ll build them. You see it and sign off before any writing starts.</p>
            </li>
            <li>
              <span className="bs-tl-when">Weeks 3–4</span>
              <b>Foundation</b>
              <p>Your Google profile, citations, speed and schema get fixed, so new pages have something solid to stand on.</p>
            </li>
            <li>
              <span className="bs-tl-when">Month 2 on</span>
              <b>Pages go live</b>
              <p>Treatment pages go up one at a time, starting with the one worth the most to your spa.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* ---------------- Every month after ---------------- */}
      <section className="hv-sec bs-after">
        <div className="wrap">
          <div className="hv-head">
            <h2>Slow to start. Then every page builds on the last.</h2>
            <p>Ads stop the day you stop paying. Rankings keep working.</p>
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
              <h3>Rankings compound.</h3>
              <span className="bs-stairs-tag">Illustrative</span>
            </div>
            <p className="bs-stairs-sub">Searches where you show in the top 3, month by month. The first months are mostly foundation, then each new page helps the ones around it.</p>
            <div className="bs-stairs" role="img" aria-label="Illustrative chart: top-3 rankings start low during the foundation months, then climb faster each month as more treatment pages go live.">
              {STAIRS.map((b, i) => {
                const prev = i > 0 ? STAIRS[i - 1].h : 0;
                const gain = b.h - prev;
                return (
                  <div key={b.m} className={`bs-stair${i === 0 ? " is-before" : ""}`}>
                    {b.tag && (
                      <span className="bs-stair-tag" style={{ bottom: `calc(${b.h}% + 8px)` }}>
                        {b.tag}
                      </span>
                    )}
                    <div className="bs-stair-col" style={{ height: `${b.h}%` }}>
                      {i > 0 && gain > 0 && <span className="bs-stair-gain" style={{ height: `${(gain / b.h) * 100}%` }} />}
                    </div>
                    <span className="bs-stair-m">{b.m}</span>
                  </div>
                );
              })}
            </div>
            <p className="bs-plan-note ls-stairs-note">Illustrative shape, not a forecast. How fast rankings move depends on your market, your competitors and how many treatments you offer.</p>
          </div>
        </div>
      </section>

      {/* ---------------- Ownership promise (not a ranking guarantee) ---------------- */}
      <section className="hv-guar-wrap bs-guar">
        <div className="wrap">
          <div className="hv-guar">
            <GuaranteeSeal text="Every page is yours" />
            <h2>
              Every page we build lives on your site, and <span className="hv-u">stays yours if you leave</span>.
            </h2>
            <ul>
              <li>
                <LineIcon name="shield" /> No ranking promises we can&apos;t keep
              </li>
              <li>
                <LineIcon name="chart" /> A monthly report on the searches you gain
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Local SEO, answered</h2>
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
          <h2>See where you show up today</h2>
          <p>A free 20-minute demo. Answer 5 quick questions, then pick your time.</p>
          <ul>
            <li><LineIcon name="check" /> How you rank for your top treatments</li>
            <li><LineIcon name="check" /> The pages we&apos;d build first</li>
            <li><LineIcon name="check" /> A flat monthly fee, no pressure</li>
          </ul>
          <HeroCta />
          <p className="hv-book-alt">
            Want more of your visitors to book, or faster new clients? See <Link href="/booking-systems/">Booking Systems</Link> and{" "}
            <Link href="/spotlight-ads/">Spotlight™ Ads</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
