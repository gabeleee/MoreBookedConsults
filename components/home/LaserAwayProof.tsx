/* eslint-disable @next/next/no-img-element -- small static logo PNGs */
import Link from "next/link";
import PrismBackground from "@/components/PrismBackground";
import ConversionChart from "@/components/ConversionChart";

// LaserAway proof (dark prism section): Gabe's results as LaserAway's Director
// of CRO. Shared by the homepage and /pricing/. Styles: .hv-proof* in app/home-v2.css.
export default function LaserAwayProof({
  title = "Built on what\u2019s already been proven",
  lede = "These systems come from five years of testing at one of the biggest aesthetic brands in the country.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="hv-proof">
      <PrismBackground tilt={0.5} phase={120} gain={0.85} />
      <div className="wrap">
        <div className="hv-head light" data-prism-calm="0.7">
          <h2>{title}</h2>
          <p>{lede}</p>
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
  );
}
