// Site footer with navigation columns. Links point to published pages only;
// add rows here as more money pages publish. The top nav stays lean per the
// topical map, so the footer carries the broader wayfinding.
import Link from "next/link";
import Logo from "./Logo";

const FOOT_NAV: { head: string; links: { href: string; label: string }[] }[] = [
  {
    head: "For Med Spas",
    links: [
      { href: "/medspa-marketing/", label: "Medspa Marketing" },
      { href: "/medspa-marketing-agency/", label: "Marketing Agency" },
      { href: "/medspa-cro/", label: "Conversion (CRO)" },
      { href: "/medspa-seo/", label: "Local SEO" },
      { href: "/medspa-advertising/", label: "Advertising" },
      { href: "/medspa-marketing-cost/", label: "What It Costs" },
    ],
  },
  {
    head: "For Plastic Surgeons",
    links: [
      { href: "/plastic-surgeon-marketing/", label: "Plastic Surgeon Marketing" },
      { href: "/plastic-surgery-marketing-agency/", label: "Marketing Agency" },
      { href: "/plastic-surgery-cro/", label: "Conversion (CRO)" },
      { href: "/plastic-surgery-seo/", label: "Local SEO" },
      { href: "/plastic-surgeon-advertising/", label: "Advertising" },
      { href: "/plastic-surgery-marketing-cost/", label: "What It Costs" },
    ],
  },
  {
    head: "More",
    links: [
      { href: "/injector-marketing/", label: "For Injectors" },
      { href: "/laser-clinic-marketing/", label: "For Laser Clinics" },
      { href: "/medspa-marketing-consultant/", label: "Marketing Consultant" },
      { href: "/best-medspa-marketing-agencies/", label: "Best Medspa Agencies" },
      {
        href: "/best-plastic-surgery-marketing-agencies/",
        label: "Best Plastic Surgery Agencies",
      },
    ],
  },
  {
    head: "Company",
    links: [
      { href: "/results/", label: "Results" },
      { href: "/pricing/", label: "Pricing" },
      { href: "/blog/", label: "Blog" },
      { href: "/free-audit/", label: "Free Audit" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <nav className="foot-nav" aria-label="Footer">
          {FOOT_NAV.map((col) => (
            <div className="foot-col" key={col.head}>
              <p className="foot-head">{col.head}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="foot foot-bottom">
          <div>
            <Logo />
            <p className="foot-note">CRO + Local SEO · Aesthetic practices</p>
          </div>
          <div>
            <p>
              <a href="mailto:hello@morebookedconsults.com">
                hello@morebookedconsults.com
              </a>
            </p>
            <p className="foot-note">
              From the founder of{" "}
              <a href="https://aesthetichires.com">AestheticHires.com</a>, the
              medspa job board.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
