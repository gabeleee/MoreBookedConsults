// Proof / track-record section, ported from morebookedconsults-v18.html
// (lines 451-511). The LaserAway results are attributed to Gabe personally in
// his former role, never to this company. Preserve this copy.
import PetalBackground from "./PetalBackground";
import ChartCard from "./ChartCard";
import ConversionChart from "./ConversionChart";

export default function Proof() {
  return (
    <section className="proof">
      <PetalBackground
        trios={[
          {
            top: "-160px",
            right: "-190px",
            speed: -0.2,
            dur: "20s",
            del: "-12s",
            size: 560,
            opacity: 0.4,
          },
        ]}
      />
      <div className="wrap proof-grid">
        <div>
          <p className="eyebrow">The track record</p>
          <h2>These numbers came from six years at LaserAway.</h2>
          <p className="lede">
            Before More Booked Consults existed, our founder spent six years as{" "}
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
            , the largest medspa
            chain in the U.S., owning the testing roadmap end to end. These are
            the results he drove in that role, and the playbook this practice is
            built on.
          </p>
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
        </div>
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
    </section>
  );
}
