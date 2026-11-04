// Sticky site header. "Services" opens a mega menu on hover (and on keyboard
// focus): three big cards, each with a small product illustration, a title and
// a short pitch. Pure CSS hover/focus-within, so this stays a server component.
import Link from "next/link";
import Logo from "./Logo";
import AuditCtaLink from "./AuditCtaLink";
import MobileNav from "./MobileNav";
import HeaderShrink from "./HeaderShrink";
import NavDropCloser from "./NavDropCloser";
import { LineIcon } from "./LineIcon";

export const SERVICES = [
  {
    href: "/booking-systems/",
    art: "book",
    title: "Booking Systems",
    sub: "Turn more of your website visitors into booked consults.",
    pts: ["Booking flow live in 14 days", "Sienna AI calls every lead in 60 seconds", "Exit offer, tracking and live dashboard"],
  },
  {
    href: "/medspa-advertising/",
    art: "ads",
    title: "Spotlight™ Ads",
    sub: "Meta ads that fill your calendar with new clients.",
    pts: ["Built around your best first-visit offer", "8–12 fresh ads every month", "Sent to a landing page that books"],
  },
  {
    href: "/medspa-seo/",
    art: "seo",
    title: "Authority Atlas™ Local SEO",
    sub: "Show up first when people near you search.",
    pts: ["Google Maps and local pack", "Treatment pages that rank", "Monthly ranking report"],
  },
] as const;

export const FREE_TOOLS = [
  {
    href: "/medspa-offer-builder/",
    art: "offer",
    title: "Consult Magnet Builder",
    sub: "Build a new patient offer people actually book.",
    pts: ["A first-visit offer built for your spa", "Ready-to-run ad and captions", "Takes about two minutes"],
    cta: "Build your offer",
  },
  {
    href: "/medspa-ad-checker/",
    art: "check",
    title: "Med Spa Ad Checker",
    sub: "Find out if your ad will get rejected before you run it.",
    pts: ["Paste any Facebook or Instagram ad", "See which lines Meta and regulators flag", "Shows how to fix each one"],
    cta: "Check an ad",
  },
  {
    href: "/blog/med-spa-ad-claims-study/",
    art: "study",
    title: "Ad Claims Study",
    sub: "What 773 real med spa ads get wrong.",
    pts: ["Ads from 297 practices", "The claims that show up most", "Which practices make them"],
    cta: "Read the study",
  },
] as const;

const NAV = [
  { href: "/results/", label: "Results" },
  { href: "/about/", label: "About" },
];

function MegaArt({ kind }: { kind: string }) {
  if (kind === "book")
    return (
      <div className="mm-art mm-art-book" aria-hidden="true">
        <div className="mm-form">
          <div className="mm-prog">
            <i className="on" />
            <i className="on" />
            <i />
          </div>
          <b>What brings you in?</b>
          <span className="sel">
            Laser hair removal <LineIcon name="check" />
          </span>
          <span>Botox &amp; filler</span>
        </div>
        <span className="mm-chip">
          <LineIcon name="calendar" /> Consult booked
        </span>
      </div>
    );
  if (kind === "ads")
    return (
      <div className="mm-art mm-art-ads" aria-hidden="true">
        <div className="mm-ad">
          <div className="mm-ad-top">
            <i />
            <span>Glow Aesthetics · Sponsored</span>
          </div>
          <div className="mm-ad-img">
            <b>$50 off your first visit</b>
          </div>
          <div className="mm-ad-cta">
            <span>Limited spots this month</span>
            <em>Book now</em>
          </div>
        </div>
      </div>
    );
  if (kind === "offer")
    return (
      <div className="mm-art mm-art-offer" aria-hidden="true">
        <div className="mm-offer">
          <span className="mm-offer-k">Your Consult Magnet</span>
          <b>$50 off your first lip filler</b>
          <span className="mm-offer-row">
            <i /> Ad copy <LineIcon name="check" />
          </span>
          <span className="mm-offer-row">
            <i /> Captions <LineIcon name="check" />
          </span>
        </div>
      </div>
    );
  if (kind === "check")
    return (
      <div className="mm-art mm-art-check" aria-hidden="true">
        <div className="mm-check">
          <span className="ok">Glowing skin starts here.</span>
          <span className="flag">
            Guaranteed results in one visit!
            <em>Flagged</em>
          </span>
          <span className="ok">Book your consult today.</span>
        </div>
        <span className="mm-chip mm-chip-warn">1 line to fix</span>
      </div>
    );
  if (kind === "study")
    return (
      <div className="mm-art mm-art-study" aria-hidden="true">
        <div className="mm-bars">
          <b>773 ads checked</b>
          <span><i style={{ width: "86%" }} /></span>
          <span><i style={{ width: "62%" }} /></span>
          <span><i style={{ width: "41%" }} /></span>
          <span><i style={{ width: "24%" }} /></span>
        </div>
      </div>
    );
  return (
    <div className="mm-art mm-art-seo" aria-hidden="true">
      <div className="mm-map">
        <span className="pin p1" />
        <span className="pin p2" />
        <span className="pin you">
          <LineIcon name="pin" />
        </span>
      </div>
      <div className="mm-list">
        <div className="you">
          <b>Your med spa</b>
          <span>★★★★★ · 0.4 mi</span>
        </div>
        <div>
          <b />
          <span />
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header>
      <HeaderShrink />
      <NavDropCloser />
      <div className="wrap nav">
        <Logo href="/" />
        <nav className="nav-links" aria-label="Primary">
          <div className="nav-drop">
            <button type="button" className="nav-drop-btn" aria-haspopup="true">
              Services
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5 6 7.5 9 4.5" />
              </svg>
            </button>
            <div className="mega" role="menu">
              <div className="mega-in">
                <div className="mega-cards">
                  {SERVICES.map((s) => (
                    <Link key={s.href} href={s.href} className="mega-card" role="menuitem">
                      <MegaArt kind={s.art} />
                      <div className="mega-copy">
                        <b>{s.title}</b>
                        <p>{s.sub}</p>
                        <ul>
                          {s.pts.map((p) => (
                            <li key={p}>
                              <LineIcon name="check" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <span className="mega-more">
                          Learn more <LineIcon name="arrow" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mega-foot">
                  <span>Not sure where to start? Most practices start with Booking Systems, then add traffic.</span>
                  <Link href="/demo/">
                    Get a free demo <LineIcon name="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
          <div className="nav-drop">
            <button type="button" className="nav-drop-btn" aria-haspopup="true">
              Free Tools <span className="nav-new">New</span>
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 4.5 6 7.5 9 4.5" />
              </svg>
            </button>
            <div className="mega" role="menu">
              <div className="mega-in">
                <div className="mega-cards">
                  {FREE_TOOLS.map((t) => (
                    <Link key={t.href} href={t.href} className="mega-card" role="menuitem">
                      <MegaArt kind={t.art} />
                      <div className="mega-copy">
                        <b>{t.title}</b>
                        <p>{t.sub}</p>
                        <ul>
                          {t.pts.map((p) => (
                            <li key={p}>
                              <LineIcon name="check" />
                              {p}
                            </li>
                          ))}
                        </ul>
                        <span className="mega-more">
                          {t.cta} <LineIcon name="arrow" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mega-foot">
                  <span>Every tool is free. No signup, no sales call.</span>
                  <Link href="/tools/">
                    See all free tools <LineIcon name="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <AuditCtaLink className="nav-cta" href="/demo/" location="nav" native>
          <span className="cta-full">Get a free demo</span>
          <span className="cta-short">Get a free demo</span>
        </AuditCtaLink>
        <MobileNav
          items={[
            ...SERVICES.map((s) => ({ href: s.href, label: s.title, sub: s.sub })),
            ...NAV,
            { href: "/tools/", label: "Free Tools", badge: "New" },
          ]}
        />
      </div>
    </header>
  );
}
