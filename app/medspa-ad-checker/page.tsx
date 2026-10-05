import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { HeadIcon, iconizeHeadings } from "@/components/LineIcon";
import { mdxComponents, FAQ, Related } from "@/components/mdx/MdxComponents";
import AdChecker from "@/components/AdChecker";
import { RULES } from "@/lib/ad-check";
import type { Frontmatter } from "@/lib/content";
import { SITE } from "@/lib/site";

// Free med spa ad checker. The tool (components/AdChecker.tsx → /api/ad-check)
// sits in the hero; the explainer copy lives in content/tools/medspa-ad-checker.mdx
// so it edits like any other page. The rule list renders from lib/ad-check.ts so
// it can never drift from what the checker actually tests.

const SLUG = "medspa-ad-checker";

function load() {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", "tools", `${SLUG}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { fm: data as Frontmatter, body: content };
}

export function generateMetadata(): Metadata {
  const { fm } = load();
  return {
    title: fm.title,
    description: fm.description,
    alternates: { canonical: `/${SLUG}/` },
  };
}

const SEV_LABEL = { high: "High", medium: "Medium", low: "Low" } as const;

export default function AdCheckerPage() {
  const { fm, body } = load();
  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Med Spa Ad Checker",
    url: `${SITE.url}/${SLUG}/`,
    description: fm.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <section className="article-hero ac-hero">
        <div className="wrap">
          <div className="ac-hero-copy">
            {fm.eyebrow && <p className="eyebrow">{fm.eyebrow}</p>}
            <h1>{fm.h1 ?? fm.title}</h1>
            {fm.lede && <p className="lede">{fm.lede}</p>}
          </div>
          <AdChecker />
        </div>
      </section>
      <section className="page-section">
        <div className="wrap article-body">
          <h2>
            <HeadIcon name="clipboard" /> The {RULES.length} checks
          </h2>
          <ul className="ac-rules">
            {RULES.map((r) => (
              <li key={r.id}>
                <span className={`ac-chip ac-sev-${r.severity}`}>{SEV_LABEL[r.severity]}</span>
                <span>
                  <strong>{r.label}</strong>
                  <span className="ac-rule-src">{r.source}</span>
                </span>
              </li>
            ))}
          </ul>
          <MDXRemote
            source={iconizeHeadings(body)}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
          {fm.faq && fm.faq.length > 0 && (
            <>
              <h2>
                <HeadIcon name="help" /> Frequently asked questions
              </h2>
              <FAQ items={fm.faq} />
            </>
          )}
          {fm.related && fm.related.length > 0 && <Related items={fm.related} />}
        </div>
      </section>
    </main>
  );
}
