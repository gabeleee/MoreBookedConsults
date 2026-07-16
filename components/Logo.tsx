// Brand lockup: petal logomark + wordmark, ported from
// morebookedconsults-v18.html. Reused in the header (as a link) and the
// footer (as a plain span). The three logomark petals reuse the shared
// #petalShape path and #logoGrad gradient from <SvgDefs />, so two instances
// on one page share ids without collision.
//
// The <em>Consults</em> is styled as Great Vibes via `.brand em` in
// globals.css, offsets are tuned to that font; do not change.

type LogoProps = {
  /** When set, renders a link (header). Omit for a plain span (footer). */
  href?: string;
};

export default function Logo({ href }: LogoProps) {
  const inner = (
    <>
      <svg className="logo-mark" viewBox="10 2 86 94" aria-hidden="true">
        <use
          href="#petalShape"
          fill="#CBC4F5"
          transform="translate(24,76) scale(0.52) rotate(-24)"
        />
        <use
          href="#petalShape"
          fill="#4C8DFF"
          opacity="0.9"
          transform="translate(45,64) scale(0.74) rotate(-10)"
        />
        <use
          href="#petalShape"
          fill="url(#logoGrad)"
          transform="translate(68,48) scale(0.98) rotate(6)"
        />
      </svg>
      <span>
        More{"\u00A0"}Booked<em>Consults</em>
      </span>
    </>
  );

  return href ? (
    <a className="brand" href={href}>
      {inner}
    </a>
  ) : (
    <span className="brand">{inner}</span>
  );
}
