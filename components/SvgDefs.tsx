// Shared SVG definitions, ported from morebookedconsults-v18.html (lines 352-370).
// Rendered once in the root layout; every section references these by id.
// The petal path is reused for the logomark and all background decoration.
//
// `logoGrad` is promoted here from the mockup's per-instance inline gradients
// (lgAh / lgAf) so the Logo can be reused without duplicating DOM ids.
export default function SvgDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <defs>
        <path
          id="petalShape"
          d="M0,-46 C22,-32 24,-4 0,12 C-24,-4 -22,-32 0,-46 Z"
        />
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C57E8" stopOpacity=".28" />
          <stop offset="100%" stopColor="#6C57E8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="areaGradBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4C8DFF" stopOpacity=".26" />
          <stop offset="100%" stopColor="#4C8DFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="logoGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#6C57E8" />
          <stop offset="100%" stopColor="#4C8DFF" />
        </linearGradient>
        <g id="petalTrio">
          <use
            href="#petalShape"
            fill="#DCD6F9"
            transform="translate(24,76) scale(0.52) rotate(-24)"
          />
          <use
            href="#petalShape"
            fill="#CFDFFB"
            transform="translate(45,64) scale(0.74) rotate(-10)"
          />
          <use
            href="#petalShape"
            fill="#D9D0F8"
            transform="translate(68,48) scale(0.98) rotate(6)"
          />
        </g>
        <g id="petalTrioDark">
          <use
            href="#petalShape"
            fill="#3B3670"
            transform="translate(24,76) scale(0.52) rotate(-24)"
          />
          <use
            href="#petalShape"
            fill="#31407C"
            transform="translate(45,64) scale(0.74) rotate(-10)"
          />
          <use
            href="#petalShape"
            fill="#413A78"
            transform="translate(68,48) scale(0.98) rotate(6)"
          />
        </g>
      </defs>
    </svg>
  );
}
