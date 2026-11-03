/* eslint-disable @next/next/no-img-element -- small static images */
import type { Metadata } from "next";
import Link from "next/link";
import "../home-v2.css";
import "./about.css";
import PrismBackground from "@/components/PrismBackground";
import ConversionChart from "@/components/ConversionChart";
import { LineIcon } from "@/components/LineIcon";

export const metadata: Metadata = {
  title: "About",
  description:
    "More Booked Consults installs booking systems for med spas and plastic surgeons, led by Gabe Meierotto, LaserAway's former Director of CRO.",
  alternates: { canonical: "/about/" },
};

// About page (2026-11-03 draft). LaserAway numbers are Gabe's personally, in
// his former role, never the company's.
const BELIEFS = [
  {
    icon: "target",
    t: "Bookings, not clicks",
    p: "We judge every change by one number: how many visitors become booked consults.",
  },
  {
    icon: "chart",
    t: "Measure everything",
    p: "Every improvement is checked against your numbers from before, and you see the results live.",
  },
  {
    icon: "users",
    t: "Aesthetics only",
    p: "We only work with med spas, plastic surgeons, injectors and laser clinics, so we know your patients and your treatments.",
  },
];

export default function About() {
  return (
    <main className="hv ab">
      <section className="ab-hero">
        <PrismBackground tone="light" gain={1.2} tilt={0.32} phase={30} />
        <div className="wrap ab-hero-in">
          <h1 data-prism-calm="0.8">We help aesthetic practices book more of the people who already want to come in.</h1>
          <p className="hv-lede" data-prism-calm="0.6">
            Most practices don&apos;t need more traffic first.
            They need a website that turns the visitors they already get into booked consults.
          </p>
        </div>
      </section>

      <section className="hv-sec ab-story">
        <div className="wrap ab-grid">
          <div className="ab-photo">
            <img src="/gabe.jpg" alt="Gabe Meierotto" />
            <div className="ab-photo-tag">
              <b>Gabe Meierotto</b>
              <span>Founder, former Director of CRO at LaserAway</span>
            </div>
          </div>
          <div className="ab-copy">
            <h2>Built inside one of the biggest aesthetic brands in the country</h2>
            <p>From 2018 to 2023, Gabe Meierotto ran conversion testing at LaserAway, across more than 100 locations.</p>
            <p>Over those years, LaserAway&apos;s sitewide conversion rate went from 3% to 11%, with more than 2,600 page variations tested.</p>
            <p>More Booked Consults takes that same playbook and installs it for independent practices, as five booking systems that go live in 14 days.</p>
            <p>Gabe still leads every project, so you work with the person who built the playbook.</p>
            <a className="ab-pdf" href="/laseraway-intellimize-case-study.pdf" target="_blank" rel="noopener">
              <LineIcon name="file" />
              Read the published LaserAway case study (PDF)
            </a>
          </div>
        </div>
      </section>

      <section className="hv-proof">
        <PrismBackground tilt={-0.4} phase={60} gain={0.85} />
        <div className="wrap">
          <div className="hv-proof-grid">
            <div className="hv-proof-chart">
              <p className="hv-chart-t">LaserAway sitewide conversion, 2018–2023</p>
              <ConversionChart />
              <p className="hv-chart-c">Gabe&apos;s results as LaserAway&apos;s Director of CRO.</p>
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
                <b>100+</b>
                <span>LaserAway locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hv-sec">
        <div className="wrap">
          <div className="hv-head">
            <h2>What we believe</h2>
          </div>
          <div className="hv-pains">
            {BELIEFS.map((b) => (
              <div key={b.t} className="hv-pain">
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

      <section className="hv-sec ab-cta">
        <div className="wrap">
          <div className="hv-head">
            <h2>See what we&apos;d change on your site</h2>
            <p>Pick a time for your free 20-minute demo.</p>
            <Link className="btn" href="/#book">
              Get a free demo
            </Link>
            <p className="ab-alt">
              Or see <Link href="/results/">the full track record</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
