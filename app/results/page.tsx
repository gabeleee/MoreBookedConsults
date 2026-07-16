import type { Metadata } from "next";
import Link from "next/link";
import ChartCard from "@/components/ChartCard";
import ConversionChart from "@/components/ConversionChart";

export const metadata: Metadata = {
  title: "Results",
  description:
    "The track record behind More Booked Consults, the CRO results Gabe Meierotto drove as Director of CRO at LaserAway, and the method behind them.",
};

// Results / track record. LaserAway numbers are attributed to Gabe personally
// in his former role, never to this company. No promises about your results.
export default function Results() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Results</p>
          <h1>The numbers this practice is built on.</h1>
          <p className="lede">
            Before More Booked Consults existed, founder Gabe Meierotto spent six
            years as <strong>Director of CRO at LaserAway</strong>, the largest
            medspa chain in the U.S., owning the testing roadmap end to end.
            These are the results he drove in that role.
          </p>
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
            These are results Gabe drove at LaserAway, <strong>not a promise</strong>{" "}
            of what your practice will do. Every market, site, and starting point
            is different. What carries over is the method: disciplined testing,
            one change at a time, run long enough to trust the result.
          </p>
          <p>
            That same playbook now goes to work for independent aesthetic
            practices, where a single winning test can show up on next
            month&apos;s schedule.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link className="btn" href="/free-audit/">
              Get a free audit
            </Link>
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
    </main>
  );
}
