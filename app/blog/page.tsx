import type { Metadata } from "next";
import Link from "next/link";
import { getVisibleBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on aesthetic practice marketing, CRO and local SEO playbooks for medspas and plastic surgeons.",
  alternates: { canonical: "/blog/" },
};

// Flat blog index. Posts live at /blog/{slug}/ (no nested folders); the cluster
// hierarchy is expressed through internal links, not URL structure. Grouped by
// cluster here purely for reader navigation. Internal cluster codes map to
// reader-facing section names and a deliberate display order below.
const SECTIONS: { code: string; label: string }[] = [
  { code: "A", label: "Getting & Keeping Med Spa Clients" },
  { code: "B", label: "Website & Conversion" },
  { code: "C", label: "Local SEO" },
  { code: "D", label: "Paid Advertising" },
  { code: "E", label: "Social & Brand" },
  { code: "F", label: "Economics & Metrics" },
  { code: "G1", label: "Treatment Marketing" },
  { code: "H", label: "Compliance & Regulation" },
  { code: "I", label: "Launching a New Med Spa" },
  { code: "PS-B", label: "Plastic Surgery: Consultation Conversion" },
  { code: "PS-C", label: "Plastic Surgery: Local SEO" },
  { code: "G2", label: "Plastic Surgery: Procedure Marketing" },
  { code: "D-P", label: "Plastic Surgery: Paid Advertising" },
  { code: "E-P", label: "Plastic Surgery: Social" },
  { code: "F-P", label: "Plastic Surgery: Economics" },
];

export default function BlogIndex() {
  const posts = getVisibleBlogPosts();
  const clusters = new Map<string, typeof posts>();
  for (const p of posts) {
    const key = p.frontmatter.cluster ?? "Other";
    if (!clusters.has(key)) clusters.set(key, []);
    clusters.get(key)!.push(p);
  }

  // Render sections in the deliberate order above, then any unmapped clusters.
  const ordered: { label: string; items: typeof posts }[] = [];
  for (const s of SECTIONS) {
    const items = clusters.get(s.code);
    if (items && items.length) ordered.push({ label: s.label, items });
  }
  const mapped = new Set(SECTIONS.map((s) => s.code));
  for (const [code, items] of clusters.entries()) {
    if (!mapped.has(code)) ordered.push({ label: "More Guides", items });
  }

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Blog</p>
          <h1>Guides on aesthetic practice marketing.</h1>
          <p className="lede">
            CRO and local SEO playbooks for medspas and plastic surgeons.
          </p>
        </div>
      </section>
      <section className="page-section">
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="lede">Posts are on the way.</p>
          ) : (
            ordered.map(({ label, items }) => (
              <div key={label} style={{ marginBottom: 40 }}>
                <p className="eyebrow">{label}</p>
                <ul className="feature-list" style={{ maxWidth: "62ch" }}>
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}/`}>
                        <b>{p.frontmatter.title}</b>
                      </Link>
                      {p.frontmatter.status !== "published" && " (draft)"}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
