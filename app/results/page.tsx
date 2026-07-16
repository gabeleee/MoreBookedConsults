import type { Metadata } from "next";
import Link from "next/link";
import ChartCard from "@/components/ChartCard";
import ConversionChart from "@/components/ConversionChart";
import PetalBackground from "@/components/PetalBackground";
import AuditForm from "@/components/AuditForm";
import Audit from "@/components/Audit";

export const metadata: Metadata = {
  title: "Results",
  description:
    "The track record behind More Booked Consults, the CRO results Gabe Meierotto drove as Director of CRO at LaserAway, and the method behind them.",
  alternates: { canonical: "/results/" },
};

// Results / track record. LaserAway numbers are attributed to Gabe personally
// in his former role, never to this company. No promises about your results.
export default function Results() {
  return (
    <main>
      <section className="hero" id="top">
        <PetalBackground
          petals={[
            { top: "8%", left: "4%", r: "-24deg", size: 64, fill: "#CBC4F5" },
            { top: "66%", left: "2%", r: "38deg", size: 44, fill: "#C4D6FA" },
          ]}
          trios={[
            { top: "-90px", right: "-150px", speed: 0.22, dur: "15s", del: "-3s", size: 640 },
          ]}
        />
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Results</p>
            <h1>The numbers this practice is built on.</h1>
            <p className="lede">
              Before More Booked Consults existed, founder Gabe Meierotto spent
              six years as{" "}
              <strong>
                Director of CRO at{" "}
                <a
                  href="https://www.laseraway.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LaserAway
                </a>
              </strong>
              , the largest medspa chain in the U.S., owning the testing roadmap
              end to end. These are the results he drove in that role.
            </p>
            <div className="hero-chips">
              <span className="chip">
                <b>3% → 11%</b>, sitewide conversion at LaserAway
              </span>
              <span className="chip">
                <b>210x ROI</b> on the testing program
              </span>
            </div>
          </div>
          <AuditForm idPrefix="results-hero" />
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="attribution">
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <div className="who">
              <b>Gabe Meierotto</b>
              <span>
                Founder, More Booked Consults · Director of CRO at LaserAway,
                2017–2022
              </span>
            </div>
          </div>

          <div className="mini-stats">
            <div>
              <div className="n">3% → 11%</div>
              <div className="l">Sitewide conversion</div>
            </div>
            <div>
              <div className="n">210x</div>
              <div className="l">ROI on the testing program</div>
            </div>
            <div>
              <div className="n">2,600+</div>
              <div className="l">Variations tested</div>
            </div>
            <div>
              <div className="n">200%</div>
              <div className="l">Avg lift, core pages</div>
            </div>
            <div>
              <div className="n">11x</div>
              <div className="l">Testing velocity</div>
            </div>
          </div>

          <div style={{ marginTop: 34, maxWidth: 560 }}>
            <ChartCard
              title="Sitewide conversion rate"
              range="3% → 11%"
              meta="LaserAway · 2017–2022 · Quarterly"
              delta="▲ +267%"
              caption="Sitewide conversion during Gabe's six years running the testing program at LaserAway."
            >
              <ConversionChart />
            </ChartCard>
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="wrap prose">
          <h2>What these numbers mean for your practice.</h2>
          <p>
            These are results Gabe drove at{" "}
            <a
              href="https://www.laseraway.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LaserAway
            </a>
            , <strong>not a promise</strong>{" "}
            of what your practice will do. Every market, site, and starting point
            is different. What carries over is the method: disciplined testing,
            one change at a time, run long enough to trust the result.
          </p>
          <p>
            That same playbook now goes to work for independent aesthetic
            practices, where a single winning test can show up on next
            month&apos;s schedule.
          </p>
          <p className="cross-links">
            Explore <Link href="/medspa-marketing/">medspa marketing</Link>,{" "}
            <Link href="/plastic-surgeon-marketing/">
              plastic surgeon marketing
            </Link>
            , or how <Link href="/pricing/">pricing works</Link>.
          </p>
        </div>
      </section>

      <Audit />
    </main>
  );
}
