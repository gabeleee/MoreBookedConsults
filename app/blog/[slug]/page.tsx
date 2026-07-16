import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mdxComponents } from "@/components/mdx/MdxComponents";
import {
  getBlogPost,
  getPublishedBlogPosts,
  showDrafts,
} from "@/lib/content";
import { SITE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

// Only published nodes are prerendered; draft slugs 404 in prod, preview in dev.
export function generateStaticParams() {
  return getPublishedBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const draft = post.frontmatter.status !== "published";
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    ...(draft ? { robots: { index: false, follow: false } } : {}),
  };
}

function formatDate(iso?: string) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || (post.frontmatter.status !== "published" && !showDrafts)) {
    notFound();
  }
  const { frontmatter, body } = post;
  const url = `/blog/${slug}/`;
  const date = formatDate(frontmatter.date);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    ...(frontmatter.date ? { datePublished: frontmatter.date } : {}),
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
      <article className="article">
        <div className="wrap">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
          />
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
          <div className="article-body">
            <MDXRemote
              source={body}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
