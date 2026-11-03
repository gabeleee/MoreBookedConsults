/* eslint-disable @next/next/no-img-element -- small static logo PNGs */
import type { Metadata } from "next";
import Link from "next/link";
import "./home-v2.css";
import PrismBackground from "@/components/PrismBackground";
import ConversionChart from "@/components/ConversionChart";
import { LineIcon } from "@/components/LineIcon";
import HomeCall from "@/components/home/HomeCall";
import { HeroArt, GlidePathArt, SiennaArt, SecondGlanceArt, LeakFinderArt, ClearViewArt } from "@/components/home/SystemArt";

// Homepage v2 (2026-11-03 draft): sold like a product. Five branded systems
// from the proposals, a call as the only CTA, no prices, the founder named
// once inside the proof section.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Aesthetic practice marketing for med spas and plastic surgeons: we install five booking systems on your website in 14 days, then keep improving them every month.",
};

const CALL = "#book";

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

const PAINS = [
  {
    icon: "ban",
    t: "The Book button is a maze",
    p: "People tap Book, land on a long booking page full of treatments and prices, and give up.",
  },
  {
    icon: "clock",
    t: "New leads wait hours",
    p: "A form comes in at 9 PM, someone calls back tomorrow, and the lead already booked somewhere else.",
  },
  {
    icon: "eye",
    t: "Nobody sees the drop-off",
    p: "You know how many people visit, but not where they quit, so nothing gets fixed.",
  },
];

const BENEFITS = [
  { icon: "zap", t: "Live in 14 days", p: "Your new booking flow is on your site within two weeks of our kickoff." },
  { icon: "layers", t: "Keep your website and software", p: "We add to the site and booking system you already have. No rebuild, no migration." },
  { icon: "users", t: "Done for you", p: "We write, design, build and track everything. You approve it." },
  { icon: "chart", t: "Every change measured", p: "Each improvement is checked against your numbers from before, on your dashboard." },
];

const STEPS = [
  { when: "Day 0", t: "20-minute call", p: "We look at your site together and show you where bookings are slipping." },
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
    a: "It depends on your site and which systems you need. You get one fixed monthly price on the call, before you commit to anything. There's no contract, and you can cancel anytime.",
  },
  {
    q: "Does it work with my booking software?",
    a: "Yes. Glide Path hands every request to the system you already use, like Boulevard, Vagaro, Aesthetic Record, Mangomint or Zenoti. If you book by phone or email, requests go straight to your front desk.",
  },
  {
    q: "Do I need a new website?",
    a: "No. We add the systems to the site you have, whether it's WordPress, Squarespace, Wix, Webflow or custom.",
  },
  {
    q: "How long until it's live?",
    a: "Your booking flow is live within 14 days of kickoff, or month one is free. The rest of the systems switch on alongside it.",
  },
  {
    q: "What does Sienna say on the call? Can I hear it first?",
    a: "Sienna is set up with your treatments, policies and tone, and you approve the script before it goes live. It never gives medical advice, and it hands the call to your front desk whenever a person is better. We'll let you hear a live call on our first call.",
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
    a: "Med spas, plastic surgeons, injectors and laser clinics whose websites get at least 300 visitors a month. If you get less than that, we'll tell you on the call and point you to what will help more.",
  },
  {
    q: "Do you run ads or SEO too?",
    a: "Yes. Once your site books more of the visitors it already gets, we can add Meta ads or local SEO to send it more. Most practices start with the booking systems, because more traffic to a leaky site is wasted money.",
  },
  {
    q: "Who will I work with?",
    a: "Every project is led by Gabe Meierotto, LaserAway's former Director of CRO. You get one point of contact and a shared channel for questions.",
  },
  {
    q: "Is there a contract? What if I cancel?",
    a: "No contract. If you cancel, you keep your booking flow and exit offer, plus your lead history. Sienna AI and the dashboard run on our system, so they switch off when you leave.",
  },
];

function CallButton({ children = "Book a 20-minute call", className = "btn" }: { children?: React.ReactNode; className?: string }) {
  return (
    <a className={className} href={CALL}>
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="hv">
      {/* ---------------- Hero ---------------- */}
      <section className="hv-hero" id="top">
        <PrismBackground tone="light" gain={1.25} tilt={0.38} phase={70} />
        <div className="wrap hv-hero-in">
          <h1 data-prism-calm="0.8">Turn more of your website visitors into booked consults.</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            We install <a href="#systems">five booking systems</a>{" "}on your med spa&apos;s website in 14 days, then keep improving them every month.
            Done for you, measured, no contract.
          </p>
          <div className="hv-ctas">
            <CallButton />
          </div>
          <p className="hv-proofline">
            <img className="hv-face" src="/gabe.jpg" alt="Gabe Meierotto" width={30} height={30} />
            <span>Led by the CRO director behind LaserAway&apos;s <b>3% → 11%</b> sitewide conversion</span>
          </p>
          <HeroArt />
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

      {/* ---------------- Problem ---------------- */}
      <section className="hv-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>Your website gets the visits. Your calendar doesn&apos;t get the bookings.</h2>
            <p>Most people who want a consult never finish booking one.</p>
          </div>
          <div className="hv-pains">
            {PAINS.map((x) => (
              <div key={x.t} className="hv-pain">
                <span className="hv-ic">
                  <LineIcon name={x.icon} />
                </span>
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
            <h2>The five systems we install</h2>
            <p>Aesthetic practice marketing for med spas and plastic surgeons, starting where the money leaks: your booking path.</p>
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
            <span className="hv-ic">
              <LineIcon name="gift" />
            </span>
            <div>
              <h3>
                Bonus: Consult Magnet<sup>™</sup> offer
              </h3>
              <p>A first-visit offer new clients actually want to book, built with you, so your exit offer and ads have something worth claiming.</p>
            </div>
            <CallButton className="btn-ghost">Get all five</CallButton>
          </div>
        </div>
      </section>

      {/* ---------------- Engine ---------------- */}
      <section className="hv-sec hv-engine">
        <div className="wrap">
          <div className="hv-head">
            <h2>Month one installs it. Every month after makes it better.</h2>
            <p>Each month we ship 2 improvements to your site and measure every one.</p>
          </div>
          <ol className="hv-loop">
            <li>
              <span className="hv-ic">
                <LineIcon name="search" />
              </span>
              <b>Find the biggest leak</b>
              <p>Leak Finder shows where your site loses the most people that month.</p>
            </li>
            <li>
              <span className="hv-ic">
                <LineIcon name="shuffle" />
              </span>
              <b>Ship 2 fixes</b>
              <p>New forms for your top treatments, sharper offers, better follow-up timing, whatever the numbers point to.</p>
            </li>
            <li>
              <span className="hv-ic">
                <LineIcon name="check" />
              </span>
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
            {BENEFITS.map((b) => (
              <div key={b.t} className="hv-benefit">
                <span className="hv-ic">
                  <LineIcon name={b.icon} />
                </span>
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
            <span className="hv-seal">
              <LineIcon name="shield" />
            </span>
            <div>
              <h2>Your booking rate goes up in 90 days, or we keep working free until it does.</h2>
              <ul>
                <li>
                  <LineIcon name="check" /> Booking flow live in 14 days, or month one is free
                </li>
                <li>
                  <LineIcon name="check" /> No contract, cancel anytime
                </li>
              </ul>
              <p className="hv-fine">Booking rate = booking requests ÷ website visitors, measured against your week-1 baseline. For sites with at least 300 visitors a month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="hv-proof">
        <PrismBackground tilt={0.5} phase={120} gain={0.85} />
        <div className="wrap">
          <div className="hv-head light" data-prism-calm="0.7">
            <h2>Built on what&apos;s already been proven</h2>
            <p>These systems come from five years of testing at one of the biggest aesthetic brands in the country.</p>
          </div>
          <div className="hv-proof-grid">
            <div className="hv-proof-chart">
              <p className="hv-chart-t">LaserAway sitewide conversion, 2018–2023</p>
              <ConversionChart />
              <p className="hv-chart-c">Results from Gabe Meierotto&apos;s time as LaserAway&apos;s Director of CRO. He now leads every More Booked Consults project.</p>
            </div>
            <div className="hv-stats">
              <div>
                <b>3% → 11%</b>
                <span>Sitewide conversion at LaserAway</span>
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
              <img src="/logos/intellimize-white.png" alt="Intellimize" />
              <span>Featured in Intellimize&apos;s LaserAway case study</span>
            </a>
            <a href="https://aesthetichires.com/" target="_blank" rel="noopener">
              <span className="hv-cred-word">
                <img src="/logos/aesthetichires-lips.png" alt="" />
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

      {/* ---------------- Add-ons ---------------- */}
      <section className="hv-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>When you&apos;re booking more, add more traffic</h2>
            <p>Once your site turns visitors into consults, every new visitor is worth more.</p>
          </div>
          <div className="hv-addons">
            <div className="hv-addon">
              <span className="hv-ic">
                <LineIcon name="megaphone" />
              </span>
              <h3>
                Spotlight<sup>™</sup> Ads
              </h3>
              <p>Meta ads built around your best first-visit offer, sent to a landing page that books.</p>
            </div>
            <div className="hv-addon">
              <span className="hv-ic">
                <LineIcon name="map" />
              </span>
              <h3>
                Authority Atlas<sup>™</sup> Local SEO
              </h3>
              <p>Treatment pages and Google Maps work that bring in people searching for what you offer near you.</p>
            </div>
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

      {/* ---------------- Book a call ---------------- */}
      <section className="hv-book" id="book">
        <div className="wrap hv-book-in">
          <div className="hv-book-copy">
            <h2>See the five systems on your own site</h2>
            <p>Pick a time for a 20-minute call.</p>
            <ul>
              <li>
                <LineIcon name="check" /> Where your site loses bookings today
              </li>
              <li>
                <LineIcon name="check" /> What each system would look like for your practice
              </li>
              <li>
                <LineIcon name="check" /> Hear Sienna AI make a live call
              </li>
              <li>
                <LineIcon name="check" /> A fixed monthly price, no pressure
              </li>
            </ul>
            <p className="hv-book-alt">
              Not ready for a call? <Link href="/tools/">Try our free tools</Link>.
            </p>
          </div>
          <HomeCall />
        </div>
      </section>
    </main>
  );
}
