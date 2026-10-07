/* eslint-disable @next/next/no-img-element -- small static logo PNGs */
import type { ReactNode } from "react";

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

// Founder track record, second row of the band. Every line must stay true:
// LaserAway numbers are Gabe's in his former in-house role (see /results/).
type Credential = { mark: ReactNode; line: string; href?: string };

const CREDENTIALS: Credential[] = [
  {
    mark: <img className="tb-cred-logo" src="/logos/laseraway-white.png" alt="LaserAway" style={{ height: 27 }} />,
    line: "Founder was Director of CRO, 2018–2023",
    href: "/results/",
  },
  {
    mark: <img className="tb-cred-logo" src="/logos/intellimize-white.png" alt="Intellimize" style={{ height: 28 }} />,
    line: "Featured in its LaserAway case study",
    href: "/laseraway-intellimize-case-study.pdf",
  },
  {
    mark: (
      <span className="tb-cred-word">
        <img className="tb-cred-icon" src="/logos/aesthetichires-lips.png" alt="" />
        AestheticHires
      </span>
    ),
    line: "Founder of the med spa job board",
    href: "https://aesthetichires.com/",
  },
  { mark: <span className="tb-cred-num">2,600+</span>, line: "Variations tested at LaserAway" },
  { mark: <span className="tb-cred-num">2,500+</span>, line: "SEO articles published across 4 sites" },
];

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Certified ad partners">
      <div className="wrap" data-prism-calm="0.5">
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
        <p className="tb-label tb-label-2">Track record:</p>
        <ul className="tb-creds">
          {CREDENTIALS.map((c) => {
            const inner = (
              <>
                <span className="tb-cred-mark">{c.mark}</span>
                <span className="tb-cred-line">{c.line}</span>
              </>
            );
            return (
              <li key={c.line} className="tb-cred">
                {c.href ? (
                  <a href={c.href} {...(c.href.startsWith("http") || c.href.endsWith(".pdf") ? { target: "_blank", rel: "noopener" } : {})}>
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
