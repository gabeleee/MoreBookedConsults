// Bottom audit section, ported from the v18 mockup (lines 708-778). Reuses
// the shared AuditForm (idPrefix "bottom" so its field ids don't collide with
// the hero instance). Anchor #audit is the target of the header + sticky CTAs.
import PetalBackground from "./PetalBackground";
import AuditForm from "./AuditForm";

export default function Audit() {
  return (
    <section className="audit" id="audit">
      <PetalBackground
        petals={[
          { top: "14%", right: "3%", r: "26deg", size: 54, fill: "#DED9FA" },
          { bottom: "10%", left: "5%", r: "-12deg", size: 42, fill: "#C4D6FA" },
        ]}
        trios={[
          {
            bottom: "-160px",
            left: "-190px",
            speed: 0.2,
            dur: "21s",
            del: "-5s",
            size: 640,
            opacity: 0.4,
          },
        ]}
      />
      <div className="wrap audit-grid">
        <div className="audit-copy">
          <p className="eyebrow">Free audit</p>
          <h2>Find out where your site is leaking consults.</h2>
          <p>
            Answer three quick questions. Within 3 business days you&apos;ll get
            a prioritized findings doc, the specific spots losing you bookings
            and what to test first.
          </p>
          <p className="hero-note">
            Free. No call required. You keep the findings either way.
          </p>
          <div className="audit-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/audit.jpg"
              alt="Nurse drawing product from a vial into a syringe"
              width={680}
              height={512}
            />
          </div>
        </div>
        <AuditForm idPrefix="bottom" />
      </div>
    </section>
  );
}
