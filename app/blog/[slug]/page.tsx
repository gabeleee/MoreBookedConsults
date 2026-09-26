import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mdxComponents, FAQ, Related } from "@/components/mdx/MdxComponents";
import AuditForm from "@/components/AuditForm";
import { getBlogPost, getAllBlogPosts } from "@/lib/content";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

// Every node file gets a route. Drafts render (200) but carry noindex and stay
// out of the sitemap, so internal links resolve throughout the phased build.
export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const draft = post.frontmatter.status !== "published";
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `/blog/${slug}/` },
    ...(draft ? { robots: { index: false, follow: false } } : {}),
  };
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // Frontmatter dates are calendar days; format in UTC so a build in a
    // US time zone doesn't shift them back a day.
    timeZone: "UTC",
  });
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const { frontmatter, body } = post;
  const url = `/blog/${slug}/`;
  const date = formatDate(frontmatter.date);
  // Lift the post's leading <AtAGlance> block into the hero, under the H1,
  // so the summary sits beside the audit form instead of below the fold.
  const glanceMatch = body.match(/<AtAGlance>[\s\S]*?<\/AtAGlance>/);
  const glance = glanceMatch?.[0];
  const articleBody = glance ? body.replace(glance, "") : body;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    ...(frontmatter.date ? { datePublished: frontmatter.date } : {}),
    ...(frontmatter.updated ? { dateModified: frontmatter.updated } : {}),
    author: {
      "@type": "Person",
      name: SITE.founder.name,
      url: SITE.founder.linkedin,
    },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: SITE.url + url,
  };

  return (
    <main>
      <section className="article-hero">
        <div className="wrap hero-grid">
          <div>
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Blog", href: "/blog/" },
                { name: frontmatter.title, href: url },
              ]}
            />
            <h1>{frontmatter.title}</h1>
            <p className="article-byline">
              By {SITE.founder.name}
              {date ? ` · ${date}` : ""}
            </p>
            {glance && (
              <div className="hero-glance">
                <MDXRemote
                  source={glance}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>
            )}
          </div>
          <AuditForm idPrefix={slug} />
        </div>
      </section>
      <article className="article">
        <div className="wrap">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
          />
          <div className="article-body">
            <MDXRemote
              source={articleBody}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
            {frontmatter.faq && frontmatter.faq.length > 0 && (
              <>
                <h2>
                  <span className="he">❓</span> Frequently asked questions
                </h2>
                <FAQ items={frontmatter.faq} />
              </>
            )}
            {frontmatter.related && frontmatter.related.length > 0 && (
              <Related items={frontmatter.related} />
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
