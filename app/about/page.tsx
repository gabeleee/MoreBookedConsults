/* eslint-disable @next/next/no-img-element -- small static images */
import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "../booking-systems/bs.css";
import "./about.css";
import PrismBackground from "@/components/PrismBackground";
import ProofLine from "@/components/home/ProofLine";
import ConversionChart from "@/components/ConversionChart";
import { LineIcon } from "@/components/LineIcon";
import { MegaArt, SERVICES } from "@/components/Header";

export const metadata: Metadata = {
  title: "About",
  description:
    "More Booked Consults builds booking systems for med spas and plastic surgeons, led by Gabe Meierotto, LaserAway's former Director of CRO.",
  alternates: { canonical: "/about/" },
};

// About page (2026-11-03 redesign in the service-page style). LaserAway
// numbers are Gabe's personally, in his former role, never the company's.
const CALL = "/demo/";

// The origin story as a path (hero map).
const PATH = [
  { when: "2018", k: "Joins LaserAway", sub: "Director of CRO", icon: "building" },
  { when: "2018–2023", k: "2,600+ variations", sub: "Tested on the booking path", icon: "repeat" },
  { when: "2023", k: "3% → 11%", sub: "Sitewide conversion", icon: "trending" },
  { when: "Today", k: "Your practice", sub: "Same playbook, built for you", icon: "calendar" },
];

const DO = [
  "Booking systems that turn more of your visitors into consults",
  "Meta ads built around a first-visit offer, sent to a page that books",
  "Local SEO, so people near you find you first",
  "One flat monthly price, with your numbers measured every month",
];
const DONT = [
  "Build whole new websites from scratch",
  "Work outside aesthetics",
  "Mark up your ad spend or charge a percentage of it",
  "Promise results we can't stand behind",
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

/* ---------- small visuals for the beliefs cards ---------- */
function ClicksVsBooked() {
  return (
    <div className="ab-viz ab-viz-bars" aria-hidden="true">
      <div>
        <i style={{ height: "92%" }} />
        <span>Clicks</span>
      </div>
      <div>
        <i style={{ height: "58%" }} />
        <span>Visits</span>
      </div>
      <div className="hi">
        <i style={{ height: "34%" }}>
          <LineIcon name="check" />
        </i>
        <span>Booked</span>
      </div>
      <em>The one we judge by</em>
    </div>
  );
}

function BeforeAfter() {
  return (
    <div className="ab-viz ab-viz-line" aria-hidden="true">
      <svg viewBox="0 0 200 90" preserveAspectRatio="none">
        <line x1="96" y1="4" x2="96" y2="90" className="ab-mark" />
        <path d="M0,70 L24,68 L48,72 L72,67 L96,69 L120,54 L144,46 L168,38 L200,26" className="ab-line" />
      </svg>
      <div className="ab-viz-lg">
        <span>Your baseline</span>
        <span className="hi">After each change</span>
      </div>
    </div>
  );
}

function PracticeChips() {
  return (
    <div className="ab-viz ab-viz-chips" aria-hidden="true">
      <span className="on">Med spas</span>
      <span className="on">Plastic surgeons</span>
      <span className="on">Injectors</span>
      <span className="on">Laser clinics</span>
      <span className="off">Dentists</span>
      <span className="off">Chiropractors</span>
    </div>
  );
}

const BELIEFS = [
  {
    t: "Bookings, not clicks",
    p: "We judge every change by one number: how many visitors become booked consults.",
    Viz: ClicksVsBooked,
  },
  {
    t: "Measure everything",
    p: "Every improvement is checked against your numbers from before, and you see the results live.",
    Viz: BeforeAfter,
  },
  {
    t: "Aesthetics only",
    p: "We only work with med spas, plastic surgeons, injectors and laser clinics, so we know your clients and your treatments.",
    Viz: PracticeChips,
  },
];

export default function About() {
  return (
    <main className="hv bs ab">
      {/* ---------------- Hero + story path ---------------- */}
      <section className="bs-hero">
        <PrismBackground tone="light" gain={1.2} tilt={0.32} phase={30} />
        <div className="wrap bs-hero-in">
          <h1 data-prism-calm="0.8">We help aesthetic practices book more of the people who already want to come in</h1>
          <ProofLine />
          <p className="hv-lede" data-prism-calm="0.6">
            Most practices don&apos;t need more traffic first.
            They need a website that turns the visitors they already get into booked consults.
          </p>
          <div className="hv-ctas">
            <HeroCta />
          </div>
          <ul className="bs-chips">
            <li><LineIcon name="gem" /> Aesthetics only</li>
            <li><LineIcon name="users" /> Led by Gabe on every project</li>
            <li><LineIcon name="chart" /> Measured against your baseline</li>
          </ul>

          <div className="bs-map" aria-label="How More Booked Consults started">
            <ol className="bs-path ab-path">
              {PATH.map((p) => (
                <li key={p.when}>
                  <span className="bs-node">
                    <LineIcon name={p.icon} />
                  </span>
                  <span className="bs-step">{p.when}</span>
                  <b>{p.k}</b>
                  <span className="ab-path-sub">{p.sub}</span>
                </li>
              ))}
            </ol>
            <Link className="bs-watch" href="/results/">
              <span className="bs-scan" aria-hidden="true" />
              <LineIcon name="file" />
              <span>
                <b>Every LaserAway number is documented</b> in a published case study. See the full track record
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Story ---------------- */}
      <section className="hv-sec bs-systems ab-story">
        <div className="wrap ab-grid">
          <div className="ab-photo">
            <img src="/gabe.jpg" alt="Gabe Meierotto" />
            <div className="ab-photo-tag">
              <b>Gabe Meierotto</b>
              <span>Founder, former Director of CRO at LaserAway</span>
            </div>
          </div>
          <div className="ab-copy">
            <p className="hv-sys-k">Where it started</p>
            <h2>Built inside one of the biggest aesthetic brands in the country</h2>
            <p>From 2018 to 2023, Gabe Meierotto ran conversion testing at LaserAway, across more than 100 locations.</p>
            <p>Over those years, LaserAway&apos;s sitewide conversion rate went from 3% to 11%, with more than 2,600 page variations tested.</p>
            <p>More Booked Consults takes that same playbook and builds it for independent practices, as five booking systems that go live in 14 days.</p>
            <p>Gabe still leads every project, so you work with the person who built the playbook.</p>
            <div className="ab-creds">
              <a href="/laseraway-intellimize-case-study.pdf" target="_blank" rel="noopener">
                <LineIcon name="file" />
                <span>
                  <b>LaserAway case study</b>
                  Published by Intellimize (PDF)
                </span>
              </a>
              <a href="https://aesthetichires.com/" target="_blank" rel="noopener">
                <img src="/logos/aesthetichires-lips.png" alt="" />
                <span>
                  <b>AestheticHires</b>
                  We also run the med spa job board
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Proof (dark) ---------------- */}
      <section className="hv-proof">
        <PrismBackground tilt={-0.4} phase={60} gain={0.85} />
        <div className="wrap">
          <div className="hv-head light" data-prism-calm="0.7">
            <h2>The track record behind the playbook</h2>
            <p>Gabe&apos;s results as LaserAway&apos;s Director of CRO, not client results of More Booked Consults.</p>
          </div>
          <div className="hv-proof-grid">
            <div className="hv-proof-chart">
              <p className="hv-chart-t">
                <img src="/logos/laseraway.png" alt="LaserAway" className="hv-la-logo" />
                <span>Sitewide conversion, 2018–2023</span>
              </p>
              <ConversionChart />
              <p className="hv-chart-c">Sitewide conversion during Gabe&apos;s years running the testing program at LaserAway.</p>
            </div>
            <div className="hv-stats">
              <div className="hv-stat-la">
                <img src="/logos/laseraway-white.png" alt="LaserAway" />
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
                <b>100+</b>
                <span>LaserAway locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Beliefs ---------------- */}
      <section className="hv-sec ab-beliefs">
        <div className="wrap">
          <div className="hv-head">
            <h2>What we believe</h2>
            <p>Three rules behind every change we make.</p>
          </div>
          <div className="ab-bel">
            {BELIEFS.map(({ t, p, Viz }) => (
              <div key={t} className="ab-bel-card">
                <Viz />
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- What we build ---------------- */}
      <section className="hv-sec bs-inc-sec ab-svc-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>What we build</h2>
            <p>Start with the one that fixes your biggest problem. Add the others when it makes sense.</p>
          </div>
          <div className="ab-svc">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href} className="ab-svc-card">
                <MegaArt kind={s.art} />
                <h3>{s.title}</h3>
                <p>{s.sub}</p>
                <span className="ab-svc-more">See how it works →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Do / don't ---------------- */}
      <section className="hv-sec bs-fit-sec ab-fit">
        <div className="wrap">
          <div className="hv-head">
            <h2>What we do, and what we don&apos;t</h2>
          </div>
          <div className="bs-fit">
            <div className="bs-fit-card yes">
              <p className="bs-fit-h">
                <LineIcon name="check" /> What we do
              </p>
              <ul>
                {DO.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="bs-fit-card no">
              <p className="bs-fit-h">
                <LineIcon name="ban" /> What we don&apos;t
              </p>
              <ul>
                {DONT.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="hv-book">
        <div className="wrap hv-final">
          <h2>See what we&apos;d change on your site</h2>
          <p>A free 20-minute demo with Gabe. Answer 5 quick questions, then pick your time.</p>
          <ul>
            <li><LineIcon name="check" /> Where your site loses bookings today</li>
            <li><LineIcon name="check" /> Hear Sienna AI make a live call</li>
            <li><LineIcon name="check" /> A fixed monthly price, no pressure</li>
          </ul>
          <HeroCta />
          <p className="hv-book-alt">
            Or see <Link href="/results/">the full track record</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
