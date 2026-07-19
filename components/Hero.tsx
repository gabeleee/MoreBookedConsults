// Hero section, ported from morebookedconsults-v18.html (lines 380-449).
// The mockup's inline form card is replaced by the reusable <AuditForm />.
import PetalBackground from "./PetalBackground";
import AuditForm from "./AuditForm";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <PetalBackground
        petals={[
          { top: "8%", left: "4%", r: "-24deg", size: 64, fill: "#453F82" },
          { top: "66%", left: "2%", r: "38deg", size: 44, fill: "#374680" },
        ]}
        trios={[
          { top: "-90px", right: "-150px", speed: 0.22, dur: "15s", del: "-3s", size: 640, dark: true },
        ]}
      />
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">CRO + Local SEO · Aesthetic practice marketing</p>
          <h1>
            More booked consults from the traffic you <em>already have.</em>
          </h1>
          <p className="lede">
            Conversion optimization and local SEO, exclusively for medspas,
            plastic surgeons, and other aesthetic practices.
          </p>
          <div className="hero-chips">
            <span className="chip">
              <b>3% → 11%</b>, the founder&apos;s results at LaserAway
            </span>
            <span className="chip">
              <b>210x ROI</b> on the LaserAway testing program
            </span>
          </div>
        </div>
        <AuditForm idPrefix="hero" />
      </div>
    </section>
  );
}
