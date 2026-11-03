// Sticky site header. "Services" opens a mega menu on hover (and on keyboard
// focus): three big cards, each with a small product illustration, a title and
// a short pitch. Pure CSS hover/focus-within, so this stays a server component.
import Link from "next/link";
import Logo from "./Logo";
import AuditCtaLink from "./AuditCtaLink";
import MobileNav from "./MobileNav";
import HeaderShrink from "./HeaderShrink";
import { LineIcon } from "./LineIcon";

export const SERVICES = [
  {
    href: "/medspa-cro/",
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

const NAV = [
  { href: "/results/", label: "Results" },
  { href: "/about/", label: "About" },
  { href: "/tools/", label: "Free Tools", badge: "New" },
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
                  <Link href="/#book">
                    Get a free demo <LineIcon name="arrow" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
              {n.badge && <span className="nav-new">{n.badge}</span>}
            </Link>
          ))}
        </nav>
        <AuditCtaLink className="nav-cta" href="/#book" location="nav" native>
          <span className="cta-full">Get a free demo</span>
          <span className="cta-short">Get a free demo</span>
        </AuditCtaLink>
        <MobileNav
          items={[
            ...SERVICES.map((s) => ({ href: s.href, label: s.title, sub: s.sub })),
            ...NAV,
          ]}
        />
      </div>
    </header>
  );
}
