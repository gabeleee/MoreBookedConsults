import Link from "next/link";
import { SITE } from "@/lib/site";

// Visual breadcrumb trail + BreadcrumbList JSON-LD, for blog nodes.
type Crumb = { name: string; href: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: SITE.url + c.href,
    })),
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      />
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={c.href}>
            {i > 0 && (
              <span className="sep" aria-hidden="true">
                /
              </span>
            )}
            {last ? (
              <span aria-current="page">{c.name}</span>
            ) : (
              <Link href={c.href}>{c.name}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
