import type { Metadata } from "next";
import Link from "next/link";
import { getVisibleBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on aesthetic practice marketing — CRO and local SEO playbooks for medspas and plastic surgeons.",
};

// Flat blog index. Posts live at /blog/{slug}/ (no nested folders); the cluster
// hierarchy is expressed through internal links, not URL structure. Grouped by
// cluster here purely for reader navigation.
export default function BlogIndex() {
  const posts = getVisibleBlogPosts();
  const clusters = new Map<string, typeof posts>();
  for (const p of posts) {
    const key = p.frontmatter.cluster ?? "Other";
    if (!clusters.has(key)) clusters.set(key, []);
    clusters.get(key)!.push(p);
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
            [...clusters.entries()].map(([cluster, items]) => (
              <div key={cluster} style={{ marginBottom: 40 }}>
                <p className="eyebrow">Cluster {cluster}</p>
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
