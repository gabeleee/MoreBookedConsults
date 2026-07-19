// Certified-ad-partner logo band, sits directly under the dark hero and shares
// its bg. Each entry's `src` is a monochrome/transparent asset, auto-whitened
// via CSS. `scale` shrinks an individual logo relative to the 30px row height.
type Logo = { name: string; src: string; scale?: number };

const LOGOS: Logo[] = [
  { name: "Google Partner", src: "/logos/client-1.png" },
  { name: "Meta / Facebook Marketing Partner", src: "/logos/facebook-marketing-partner.png" },
  { name: "Instagram Partner", src: "/logos/instagram-partner.avif" },
  { name: "AdRoll", src: "/logos/adroll.webp", scale: 0.5 },
];

const ROW_HEIGHT = 30; // px, matches .tb-logo height in globals.css

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Certified ad partners">
      <div className="wrap">
        <p className="tb-label">Certified ad partners:</p>
        <div className="tb-logos">
          {LOGOS.map((logo) => (
            <span
              key={logo.name}
              className="tb-logo"
              style={logo.scale ? { height: ROW_HEIGHT * logo.scale } : undefined}
            >
              <img src={logo.src} alt={logo.name} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
