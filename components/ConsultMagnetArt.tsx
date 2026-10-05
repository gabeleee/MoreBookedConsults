import { LineIcon } from "./LineIcon";

// Feature graphic for the Consult Magnet tool (tools page): three fanned offer
// cards with a glowing magnet badge, on the site's petal shapes. Pure CSS/SVG,
// server component. Prices are illustrative examples, labelled as such.
const CARDS = [
  { name: "Glow Reset", icon: "star", lines: [["Skin analysis", "Free"], ["Signature facial", "$50 off"], ["LED add-on", "Included"]], foot: "No prices needed" },
  { name: "Lip Debut", icon: "gem", lines: [["Lip design consult", "$100"], ["Lip filler, 1 syringe", "$650"], ["Aftercare kit", "$45"]], value: "$795", price: "$449" },
  { name: "Bright Eyes Reset", icon: "eye", lines: [["Under-eye mapping", "Free"], ["Under-eye treatment", "$100 off"], ["Recovery kit", "Included"]], foot: "No prices needed" },
];
const PETAL = "M0,-46 C22,-32 24,-4 0,12 C-24,-4 -22,-32 0,-46 Z";

export default function ConsultMagnetArt() {
  return (
    <div className="cma" aria-hidden="true">
      <svg className="cma-petals" viewBox="0 0 400 400">
        <g transform="translate(70 320) rotate(-20) scale(1.6)"><path d={PETAL} fill="#CBC4F5" opacity=".35" /></g>
        <g transform="translate(340 90) rotate(25) scale(2.1)"><path d={PETAL} fill="#4C8DFF" opacity=".28" /></g>
        <g transform="translate(320 330) rotate(160) scale(1.2)"><path d={PETAL} fill="#6C57E8" opacity=".35" /></g>
      </svg>
      {CARDS.map((c, i) => (
        <div key={c.name} className={`cma-card cma-c${i}`}>
          <div className="cma-head">
            <span className="cma-ic"><LineIcon name={c.icon} weight={1.8} /></span>
            <div>
              <p className="cma-name">{c.name}</p>
              <p className="cma-sub">New Patient Consult Magnet</p>
            </div>
          </div>
          <ul>
            {c.lines.map(([l, v]) => (
              <li key={l}><span>{l}</span><b>{v}</b></li>
            ))}
          </ul>
          {c.price ? (
            <div className="cma-tot">
              <p><span>Total value</span><s>{c.value}</s></p>
              <p className="cma-offer"><span>Offer price</span><b>{c.price}</b></p>
            </div>
          ) : (
            <p className="cma-foot">{c.foot}</p>
          )}
        </div>
      ))}
      <span className="cma-magnet"><LineIcon name="magnet" weight={2.2} /></span>
      <p className="cma-cap">Illustrative examples</p>
    </div>
  );
}
