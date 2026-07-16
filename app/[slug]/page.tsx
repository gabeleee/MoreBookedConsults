import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents, FAQ, Related } from "@/components/mdx/MdxComponents";
import { getMoneyPage, getAllMoneyPages } from "@/lib/content";

// Root-level money pages (M1-M8, P1-P7, N1, N2), MDX-backed. Static routes
// (/results/, /pricing/, /free-audit/, /blog/, metadata files) take precedence
// over this dynamic segment; unknown slugs 404.
type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // All money pages (incl. drafts) get a route so scaffolds resolve.
  return getAllMoneyPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getMoneyPage(slug);
  if (!page) return {};
  const draft = page.frontmatter.status !== "published";
  return {
    title: page.frontmatter.title,
    description: page.frontmatter.description,
    ...(draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function MoneyPage({ params }: Params) {
  const { slug } = await params;
  const page = getMoneyPage(slug);
  if (!page) notFound();
  const { frontmatter, body } = page;

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          {frontmatter.eyebrow && <p className="eyebrow">{frontmatter.eyebrow}</p>}
          <h1>{frontmatter.h1 ?? frontmatter.title}</h1>
          {frontmatter.lede && <p className="lede">{frontmatter.lede}</p>}
          <Link className="btn" href="/free-audit/">
            Get a free audit
          </Link>
        </div>
      </section>
      <section className="page-section">
        <div className="wrap article-body">
          <MDXRemote
            source={body}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
          {frontmatter.faq && frontmatter.faq.length > 0 && (
            <>
              <h2>❓ Frequently asked questions</h2>
              <FAQ items={frontmatter.faq} />
            </>
          )}
          {frontmatter.related && frontmatter.related.length > 0 && (
            <Related items={frontmatter.related} />
          )}
        </div>
      </section>
    </main>
  );
}
