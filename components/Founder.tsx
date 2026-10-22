// Founder + track record section. The old Proof (LaserAway results) and
// Founder sections were merged here so Gabe is introduced once, right after
// the three levers. LaserAway credentials and results are Gabe's personally,
// never the company's. Preserve that attribution.
// The mid-page CTA is folded into this same dark section so the petal trio
// isn't clipped at a mid-block boundary. The prism light falls the other way
// from the hero's so the two don't look copied.
import PrismBackground from "./PrismBackground";
import AuditCtaLink from "./AuditCtaLink";
import ChartCard from "./ChartCard";
import ConversionChart from "./ConversionChart";
import { LineIcon } from "./LineIcon";

export default function Founder() {
  return (
    <section className="founder">
      <PrismBackground tilt={-0.34} phase={95} gain={0.9} feather={180} />
      <div className="wrap founder-grid">
        <div data-prism-calm="0.75">
          <p className="eyebrow">Who&apos;s behind this</p>
          <h2>Six years running CRO at LaserAway. Now it works for you.</h2>
          <div className="founder-id">
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <div className="who">
              <b>Gabe Meierotto</b>
              <span>Founder · Director of CRO at LaserAway, 2018–2023</span>
            </div>
          </div>
          <p>
            <strong>
              More Booked <span className="wm-consults">Consults</span>{" "}
              is one person. That&apos;s the point.
            </strong>
          </p>
          <p>
            Gabe spent six years owning the testing roadmap at{" "}
            <a
              href="https://www.laseraway.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LaserAway
            </a>
            , the largest medspa chain in the U.S., across 100+ locations.
          </p>
          <p>
            The same playbook now goes to work for independent aesthetic
            practices, and Gabe does the work personally.
          </p>
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
          <a
            className="proof-pdf"
            href="/laseraway-intellimize-case-study.pdf"
            target="_blank"
            rel="noopener"
          >
            <LineIcon name="file" className="proof-pdf-icon" />
            <span>
              Read the published case study <small>PDF · Intellimize</small>
            </span>
          </a>
        </div>
        <ChartCard
          title="Sitewide conversion rate"
          range="3% → 11%"
          meta="LaserAway · 2018–2023 · Quarterly"
          delta="▲ +267%"
          caption="Sitewide conversion during Gabe's six years running the testing program at LaserAway."
        >
          <ConversionChart />
        </ChartCard>
      </div>
      <div className="wrap">
        <div className="cred" role="list">
          <div role="listitem">
            <span className="k">SEO</span>
            <span>
              Ranked DomainAppraisal.org top-3 for &quot;domain appraisal&quot;
            </span>
          </div>
          <div role="listitem">
            <span className="k">Industry</span>
            <span>Founder of AestheticHires.com, the medspa job board</span>
          </div>
          <div role="listitem">
            <span className="k">Before</span>
            <span>GoDaddy + multiple growth agencies</span>
          </div>
        </div>
      </div>
      <div className="wrap founder-cta">
        <aside className="cta-block" data-prism-calm="0.5">
          <p>The fastest path to more booked consults.</p>
          <AuditCtaLink className="btn" href="/free-audit/" location="founder">
            Get a free marketing audit
          </AuditCtaLink>
        </aside>
      </div>
    </section>
  );
}
