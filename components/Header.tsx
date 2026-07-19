// Sticky site header, ported from the v18 mockup and expanded to the full nav
// per CLAUDE.md. No JS, sticky is pure CSS. Server component.
import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import HeaderShrink from "./HeaderShrink";

const NAV = [
  { href: "/medspa-marketing/", label: "For Med Spas" },
  { href: "/plastic-surgeon-marketing/", label: "For Plastic Surgeons" },
  { href: "/results/", label: "Results" },
  { href: "/pricing/", label: "Pricing" },
];

export default function Header() {
  return (
    <header>
      <HeaderShrink />
      <div className="wrap nav">
        <Logo href="/" />
        <nav className="nav-links" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/free-audit/">
          <span className="cta-full">Free marketing audit</span>
          <span className="cta-short">Free audit</span>
        </Link>
        <MobileNav items={NAV} />
      </div>
    </header>
  );
}
