import type { Metadata } from "next";
import Link from "next/link";
import { getVisibleBlogPosts } from "@/lib/content";
import { blogEmoji } from "@/lib/blog-emoji";

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
              <div key={label} className="blog-section">
                <div className="blog-section-head">
                  <h2>{label}</h2>
                  <span>
                    {items.length} {items.length === 1 ? "guide" : "guides"}
                  </span>
                </div>
                <div className="blog-grid">
                  {items.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}/`}
                      className="blog-card"
                    >
                      <span className="blog-card-emoji" aria-hidden="true">
                        {blogEmoji(p.slug)}
                      </span>
                      <span className="blog-card-title">
                        {p.frontmatter.title}
                        {p.frontmatter.status !== "published" && " (draft)"}
                      </span>
                      {p.frontmatter.description && (
                        <span className="blog-card-desc">
                          {p.frontmatter.description}
                        </span>
                      )}
                      <span className="blog-card-more">Read guide →</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
