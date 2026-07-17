import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Component map passed to <MDXRemote>. Body elements (h2/p/ul/table/…) are
// styled by the .article-body container in globals.css. Everything below is an
// authoring toolkit for scannable, visually rich articles.

function SmartLink({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll">
      <table {...props} />
    </div>
  );
}

// Summary card near the top of an article.
function AtAGlance({ children }: { children: ReactNode }) {
  return (
    <aside className="at-a-glance">
      <p className="aag-title">⚡ At a glance</p>
      {children}
    </aside>
  );
}

// Tinted callout with an icon. type: tip | warning | note | key | stat
const CALLOUT_ICON: Record<string, string> = {
  tip: "💡",
  warning: "⚠️",
  note: "📌",
  key: "🔑",
  stat: "📊",
};
function Callout({
  type = "note",
  children,
}: {
  type?: keyof typeof CALLOUT_ICON;
  children: ReactNode;
}) {
  return (
    <aside className={`callout callout-${type}`}>
      <span className="callout-icon" aria-hidden="true">
        {CALLOUT_ICON[type] ?? "📌"}
      </span>
      <div className="callout-body">{children}</div>
    </aside>
  );
}

// KPI row.
function Stats({ children }: { children: ReactNode }) {
  return <div className="stat-row">{children}</div>;
}
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="stat-tile">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// Accordion FAQ + FAQPage JSON-LD. Driven from frontmatter (faq: [{q,a}]) and
// rendered by the article routes, MDX doesn't evaluate array-of-object props.
export function FAQ({ items = [] }: { items?: { q: string; a: string }[] }) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <div className="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      {items.map((i, idx) => (
        <details key={idx} className="faq-item">
          <summary>{i.q}</summary>
          <p>{i.a}</p>
        </details>
      ))}
    </div>
  );
}

// Related-articles list. Driven from frontmatter (related: [{href,title,desc}])
// and rendered by the article routes.
export function Related({
  items = [],
}: {
  items?: { href: string; title: string; desc?: string }[];
}) {
  return (
    <aside className="related">
      <p className="related-title">Keep reading</p>
      <ul>
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href}>{i.title}</Link>
            {i.desc ? <span className="related-desc">{i.desc}</span> : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Inline CTA block (drop at ~70% scroll and at the end, per the briefs).
function CTA({
  heading = "The fastest path to more booked consults.",
  label = "Get a free marketing audit",
}: {
  heading?: string;
  label?: string;
}) {
  return (
    <aside className="cta-block">
      <p>{heading}</p>
      <Link className="btn" href="/free-audit/">
        {label}
      </Link>
    </aside>
  );
}

// FAQ and Related are intentionally NOT in this map, they're rendered from
// frontmatter by the routes (MDX can't pass their array-of-object props).
export const mdxComponents = {
  a: SmartLink,
  table: Table,
  AtAGlance,
  Callout,
  Stats,
  Stat,
  CTA,
};
