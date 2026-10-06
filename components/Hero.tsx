// Hero section, ported from morebookedconsults-v18.html (lines 380-449).
// The mockup's inline form card is replaced by the reusable <AuditForm />.
// The animated background lives on the .hero-zone wrapper in app/page.tsx so
// it spans the hero and the trust bar; data-prism-calm marks the copy it dims.
import AuditForm from "./AuditForm";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div data-prism-calm="0.75">
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
