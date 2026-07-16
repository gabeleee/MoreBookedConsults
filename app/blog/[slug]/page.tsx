import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

// Flat blog post route: /blog/{slug}/. Content store drops in later; for now
// this humanizes the slug and renders breadcrumbs (with BreadcrumbList schema).

function humanize(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  return { title: humanize(slug) };
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const title = humanize(slug);

  return (
    <main>
      <article className="page-intro">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog/" },
              { name: title, href: `/blog/${slug}/` },
            ]}
          />
          <p className="eyebrow">Blog</p>
          <h1>{title}</h1>
          <p className="lede">This post is coming soon.</p>
        </div>
      </article>
    </main>
  );
}
