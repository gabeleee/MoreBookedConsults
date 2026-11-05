/* eslint-disable @next/next/no-img-element -- small static image */
// Gabe's LaserAway proof pill, shown under the hero headline on the homepage
// and the service pages. The 3% → 11% result is Gabe's own, from his former
// role (never this company's). Styles: .hv-proofline in app/home-v2.css.
export default function ProofLine() {
  return (
    <p className="hv-proofline">
      <img className="hv-face" src="/gabe-96.webp" alt="Gabe Meierotto" width={30} height={30} />
      <span>
        Ex-LaserAway CRO director · <b>3% → 11%</b> conversion
      </span>
    </p>
  );
}
