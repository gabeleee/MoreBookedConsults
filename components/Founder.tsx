// Founder section, ported from the v18 mockup (lines 607-633). The 84px
// avatar reuses /gabe.jpg. LaserAway credentials are Gabe's personally, // keep them attributed to him, never to the company.
import PetalBackground from "./PetalBackground";

export default function Founder() {
  return (
    <section className="founder">
      <PetalBackground
        trios={[
          {
            bottom: "-170px",
            left: "-210px",
            speed: -0.24,
            dur: "22s",
            del: "-16s",
            size: 720,
            opacity: 0.38,
          },
        ]}
      />
      <div className="wrap founder-grid">
        <div>
          <p className="eyebrow">Who&apos;s behind this</p>
          <h2>More Booked Consults is one person. That&apos;s the point.</h2>
          <div className="founder-id">
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <div className="who">
              <b>Gabe Meierotto</b>
              <span>Founder · Former Director of CRO, LaserAway</span>
            </div>
          </div>
          <p>
            Six years testing booking forms, treatment pages, and offers across
            100+{" "}
            <a
              href="https://www.laseraway.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              LaserAway
            </a>{" "}
            locations. Now the same playbook goes to work for
            independent aesthetic practices, where one winning test shows up on
            next month&apos;s schedule. When you work with More Booked Consults,
            this is who does the work.
          </p>
        </div>
        <div className="cred" role="list">
          <div role="listitem">
            <span className="k">CRO</span>
            <span>
              Director of CRO, LaserAway, grew sitewide conversion 3% → 11%
            </span>
          </div>
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
    </section>
  );
}
