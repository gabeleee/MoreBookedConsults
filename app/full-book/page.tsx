/* eslint-disable @next/next/no-img-element -- small static logo PNGs */
import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "../local-seo/ls.css";
import "./fb.css";
import PrismBackground from "@/components/PrismBackground";
import ProofLine from "@/components/home/ProofLine";
import ConversionChart from "@/components/ConversionChart";
import { LineIcon } from "@/components/LineIcon";
import { MazeArt, GuaranteeSeal, MagnetArt, GlidePathArt, SiennaArt } from "@/components/home/SystemArt";
import { TreatmentPagesArt } from "@/components/home/LocalSeoArt";
import { HeroCallArt, MissedCallArt, HiddenArt, RaveLoopArt, MonthlyReportArt, FrontDeskCompare, SoloArt, GrowingArt } from "@/components/home/FullBookArt";

// Full Book™ System (2026-11-18 draft, may become the homepage): sold in the
// owner's language (calls answered, new clients booked) instead of "booking
// optimization". Booking-flow work still happens, as the engine under Glide Path.
export const metadata: Metadata = {
  title: "The Full Book™ System for Med Spas | More Booked Consults",
  alternates: { canonical: "/full-book/" },
  robots: { index: false, follow: true },
  description:
    "Aesthetic practice marketing for med spas and plastic surgeons: an AI receptionist that answers every call, a website that books, more people finding you on Google, and a monthly report in plain numbers.",
};

const CALL = "/demo/";
const SIENNA_TEL = "tel:+17732490840";
const SIENNA_NUM = "(773) 249-0840";

const PAINS = [
  {
    Art: MissedCallArt,
    t: "You can't answer mid-treatment",
    p: "The phone rings while you're with a client, and the caller books with whoever picks up first.",
  },
  {
    Art: HiddenArt,
    t: "New clients can't find you",
    p: "People search for the treatments you're great at, and Google shows them someone else.",
  },
  {
    Art: MazeArt,
    t: "Booking online is confusing",
    p: "They tap Book, see a long list of services, can't tell which one they need, and leave.",
  },
];

const SYSTEMS = [
  {
    n: "01",
    cat: "AI receptionist",
    name: "Sienna AI",
    tag: "Every call answered, day or night.",
    pts: [
      "Answers your phone when you can't, in a warm, natural voice set up with your treatments and prices.",
      "Books the appointment, or texts a link that opens your calendar with the right treatment already picked.",
      "Calls every new website lead back within 60 seconds, and hands anything tricky to you.",
    ],
    Art: SiennaArt,
  },
  {
    n: "02",
    cat: "Booking website",
    name: "Glide Path",
    tag: "A website that makes booking easy.",
    pts: [
      "Visitors start with their goal (smoother skin, no more shaving, fewer sun spots) and see the 2 or 3 treatments that fit.",
      "The Book button stays on screen on every phone.",
      "Works in front of the booking app you already use, so your calendar, deposits and reminders stay the same.",
    ],
    Art: GlidePathArt,
  },
  {
    n: "03",
    cat: "Google visibility",
    name: "Authority Atlas",
    tag: "More people near you find you first.",
    pts: [
      "New treatment pages every month, written for the searches people in your city make.",
      "Your Google Business Profile filled out, kept fresh, and pointed at your best treatments.",
      "Each new page is one more way for a new client to find you, with no ad spend behind it.",
    ],
    Art: TreatmentPagesArt,
  },
  {
    n: "04",
    cat: "Reviews",
    name: "Rave Loop",
    tag: "More 5-star reviews, without the awkward ask.",
    pts: [
      "A friendly text after each visit asks happy clients for a Google review.",
      "Anyone who wasn't happy is sent to you privately first, so you can make it right.",
      "More reviews means more trust, and more people choosing you on Google.",
    ],
    Art: RaveLoopArt,
  },
  {
    n: "05",
    cat: "Monthly report",
    name: "Clear View",
    tag: "See exactly what you're getting.",
    pts: [
      "Every month: calls answered, calls answered after hours, new clients booked and new reviews.",
      "Plain numbers, not marketing jargon.",
      "You always know whether it's paying for itself.",
    ],
    Art: MonthlyReportArt,
  },
];

const STEPS = [
  { when: "Day 0", t: "Free demo", p: "20 minutes. Hear Sienna take a live call, and see what we'd build for you." },
  { when: "Week 1", t: "Set up Sienna", p: "We load your treatments, prices and policies. You approve how Sienna talks." },
  { when: "Day 14", t: "Everything goes live", p: "Sienna answers your phone, your new booking site goes up and review texts switch on." },
  { when: "Every month", t: "More pages, more reviews", p: "New treatment pages, booking improvements and your report in your inbox." },
];

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
    a: "It depends on the size of your practice. A solo studio and a three-location practice need different things, so we size the plan to you. You get one fixed monthly price on the demo, before you commit to anything.",
  },
  {
    q: "Does Sienna sound like a robot?",
    a: `No. Call ${SIENNA_NUM} and hear for yourself. Sienna is answering for a sample med spa called Glow Aesthetics.`,
  },
  {
    q: "What if a caller has a medical question or wants a real person?",
    a: "Sienna never gives medical advice. It takes a message, books a consult, or hands the call to you, depending on how you want it handled. You approve every rule before it goes live.",
  },
  {
    q: "I'm a solo injector or aesthetician. Is this for me?",
    a: "Yes. Solo owners miss the most calls, because there's nobody else to pick up while you're with a client. Your plan is sized for one location.",
  },
  {
    q: "Do I have to switch booking software?",
    a: "No. Keep GlossGenius, Vagaro, Boulevard, Mangomint, Aesthetic Record or whatever you use. Your new site and Sienna send people into your calendar with the right treatment already picked.",
  },
  {
    q: "Do I need a new website?",
    a: "Only if you don't have one. If your only site is your booking app's page, we build you one in front of it. If you have a site, we add to it.",
  },
  {
    q: "How do I know it's working?",
    a: "Your Clear View report shows calls answered, new clients booked and new reviews every month, in plain numbers.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep your website, your domain and every page we published. Sienna and the review texts run on our system, so they switch off when you leave.",
  },
  {
    q: "Do you run Facebook and Instagram ads too?",
    a: "Yes, as an add-on called Spotlight™ Ads, once Sienna and your booking site are catching the people you already get.",
  },
  {
    q: "Who will I work with?",
    a: "Every project is led by Gabe Meierotto, LaserAway's former Director of CRO. You get one point of contact for everything.",
  },
];

function PlayIcon() {
  return (
    <span className="hv-cta-ic" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M9 7.5v9l7.5-4.5z" />
      </svg>
    </span>
  );
}

function HearSienna({ className = "" }: { className?: string }) {
  return (
    <a className={`fb-hear ${className}`} href={SIENNA_TEL}>
      <span className="fb-hear-ic" aria-hidden="true">
        <LineIcon name="call" />
      </span>
      <span>
        Hear Sienna answer now: <b>{SIENNA_NUM}</b>
      </span>
    </a>
  );
}

export default function FullBook() {
  return (
    <main className="hv fb">
      {/* ---------------- Hero ---------------- */}
      <section className="hv-hero fb-hero" id="top">
        <PrismBackground tone="light" gain={1.25} tilt={0.38} phase={70} />
        <div className="wrap fb-hero-grid">
          <div className="fb-hero-copy">
            <h1 data-prism-calm="0.8">Every Call Answered. More New Clients Booked.</h1>
            <ProofLine />
            <p className="hv-lede" data-prism-calm="0.6">
              Sienna AI answers your phone while you&apos;re with a client, your website makes booking easy, and more people near you find you on Google.
            </p>
            <p className="hv-lede fb-lede2">All done for you, with a report every month showing exactly how many new clients it booked.</p>
            <div className="hv-ctas fb-ctas">
              <a className="btn hv-cta-hero" href={CALL}>
                <PlayIcon />
                Get a free demo
                <span className="hv-cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
            <HearSienna />
          </div>
          <HeroCallArt />
        </div>
      </section>

      {/* ---------------- Booking software band ---------------- */}
      <section className="hv-band" aria-label="Booking software we work with">
        <div className="wrap">
          <p className="hv-band-l">Keep the booking software you already use</p>
          <ul className="hv-platforms">
            {PLATFORMS.map((p) => (
              <li key={p.name}>
                <img src={`/logos/booking/${p.file}`} alt={p.name} style={{ height: p.h }} />
              </li>
            ))}
            <li className="fb-gg">GlossGenius</li>
          </ul>
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className="hv-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>You&apos;re Great At What You Do. New Clients Just Aren&apos;t Reaching You.</h2>
            <p>Most practices don&apos;t need more marketing ideas, they need to stop losing the clients already trying to book.</p>
          </div>
          <div className="hv-pains">
            {PAINS.map(({ Art, ...x }) => (
              <div key={x.t} className="hv-pain has-art">
                <Art />
                <h3>{x.t}</h3>
                <p>{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Systems ---------------- */}
      <section className="hv-sec hv-systems" id="systems">
        <div className="wrap">
          <div className="hv-head">
            <h2>
              The Full Book<sup>™</sup> System
            </h2>
            <p>Five parts that work together to answer, find and book new clients for your med spa, all done for you.</p>
          </div>
          <div className="hv-sys-list">
            {SYSTEMS.map(({ n, cat, name, tag, pts, Art }, i) => (
              <article key={n} className={`hv-sys${i % 2 ? " flip" : ""}`}>
                <div className="hv-sys-art">
                  <Art />
                </div>
                <div className="hv-sys-copy">
                  <p className="hv-sys-k">
                    Part {n} · {cat}
                  </p>
                  <h3>
                    {name}
                    <sup>™</sup>
                  </h3>
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

          <div className="hv-bonus">
            <div className="hv-bonus-copy">
              <p className="hv-sys-k">Bonus · First-visit offer</p>
              <h3>
                Consult Magnet<sup>™</sup>
              </h3>
              <p className="hv-sys-tag">A first-visit offer people actually want to claim.</p>
              <p>We build a named package for your top treatment, then Sienna, your website and your review texts all use it.</p>
              <a className="btn-ghost" href={CALL}>
                Get the full system, plus the bonus
              </a>
            </div>
            <MagnetArt />
          </div>
        </div>
      </section>

      {/* ---------------- Front desk vs Sienna ---------------- */}
      <section className="hv-sec fb-desk">
        <div className="wrap">
          <div className="hv-head">
            <h2>Like A Front Desk That Never Clocks Out</h2>
            <p>Sienna does the part of the job that loses you the most clients: picking up.</p>
          </div>
          <FrontDeskCompare />
          <p className="fb-note-s">Front desk wage: full time at the U.S. median receptionist pay, Bureau of Labor Statistics.</p>
          <HearSienna className="center" />
        </div>
      </section>

      {/* ---------------- Sized to you ---------------- */}
      <section className="hv-sec fb-size">
        <div className="wrap">
          <div className="hv-head">
            <h2>Sized To Your Practice</h2>
            <p>One plan, built around how many people you have and where you are today.</p>
          </div>
          <div className="fb-sizes">
            <div className="fb-sz">
              <SoloArt />
              <h3>Solo And Small Studios</h3>
              <p>For the owner who does the treatments and runs the business.</p>
              <ul>
                <li><LineIcon name="check" />Sienna answers while you&apos;re with clients</li>
                <li><LineIcon name="check" />Your own booking website, in front of your booking app</li>
                <li><LineIcon name="check" />New treatment pages and review texts every month</li>
              </ul>
            </div>
            <div className="fb-sz">
              <GrowingArt />
              <h3>Growing Practices</h3>
              <p>For practices with a team, several providers or more than one location.</p>
              <ul>
                <li><LineIcon name="check" />All five parts, across every location</li>
                <li><LineIcon name="check" />2 booking improvements shipped every month, each one measured</li>
                <li><LineIcon name="check" />Spotlight™ Ads when you&apos;re ready for more</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="hv-sec hv-how">
        <div className="wrap">
          <div className="hv-head">
            <h2>From First Call To Live In 14 Days</h2>
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
            <GuaranteeSeal text="14-day launch guarantee" />
            <h2>
              Live in 14 days, or <span className="hv-u">your first month is free</span>.
            </h2>
            <ul>
              <li>
                <LineIcon name="lock" /> You own your website and every page we publish
              </li>
              <li>
                <LineIcon name="check" /> You approve everything Sienna says
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="hv-proof">
        <PrismBackground tilt={0.5} phase={120} gain={0.85} />
        <div className="wrap">
          <div className="hv-head light" data-prism-calm="0.7">
            <h2>Built On What&apos;s Already Been Proven</h2>
            <p>Every part comes from five years of testing at one of the biggest aesthetic brands in the country.</p>
          </div>
          <div className="hv-proof-grid">
            <div className="hv-proof-chart">
              <p className="hv-chart-t">
                <img loading="lazy" src="/logos/laseraway.png" alt="LaserAway" className="hv-la-logo" />
                <span>Sitewide conversion, 2018–2023</span>
              </p>
              <ConversionChart />
              <p className="hv-chart-c">Results from Gabe Meierotto&apos;s time as LaserAway&apos;s Director of CRO. He now leads every More Booked Consults project.</p>
            </div>
            <div className="hv-stats">
              <div className="hv-stat-la">
                <img loading="lazy" src="/logos/laseraway-white.png" alt="LaserAway" />
                <b>3% → 11%</b>
                <span>Sitewide conversion</span>
              </div>
              <div>
                <b>210x</b>
                <span>ROI on the LaserAway testing program</span>
              </div>
              <div>
                <b>2,600+</b>
                <span>Page variations tested</span>
              </div>
              <div>
                <b>31,689</b>
                <span>Med spas counted in our 2026 Med Spa Census</span>
              </div>
            </div>
          </div>
          <div className="hv-creds">
            <a href="/laseraway-intellimize-case-study.pdf" target="_blank" rel="noopener">
              <img loading="lazy" src="/logos/intellimize-white.png" alt="Intellimize" />
              <span>Featured in Intellimize&apos;s LaserAway case study</span>
            </a>
            <a href="https://aesthetichires.com/" target="_blank" rel="noopener">
              <span className="hv-cred-word">
                <img loading="lazy" src="/logos/aesthetichires-lips.png" alt="" />
                AestheticHires
              </span>
              <span>We also run the med spa job board</span>
            </a>
            <Link href="/results/">
              <span className="hv-cred-word">Results</span>
              <span>See the full track record</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="hv-sec hv-faq-sec" id="faq">
        <div className="wrap hv-faq-wrap">
          <div className="hv-head left">
            <h2>Questions, Answered</h2>
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
      <section className="hv-book" id="book">
        <div className="wrap hv-final">
          <h2>Hear What Sienna Would Say To Your Callers</h2>
          <p>A free 20-minute demo. Answer 5 quick questions, then pick your time.</p>
          <ul>
            <li><LineIcon name="check" /> Hear Sienna take a live call</li>
            <li><LineIcon name="check" /> See where new clients slip away today</li>
            <li><LineIcon name="check" /> One fixed monthly price, no pressure</li>
          </ul>
          <a className="btn hv-cta-hero" href={CALL}>
            <PlayIcon />
            Get a free demo
            <span className="hv-cta-arrow" aria-hidden="true">→</span>
          </a>
          <p className="hv-book-alt">
            Or call Sienna right now: <a href={SIENNA_TEL}>{SIENNA_NUM}</a>
          </p>
        </div>
      </section>
    </main>
  );
}
