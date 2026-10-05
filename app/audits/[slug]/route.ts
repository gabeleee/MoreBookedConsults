// Cold-outreach audit pages: one static HTML file per lead in audits-html/leads/<slug>.html, built in
// ~/mbc-proposals (see audits-html/README.md). Served as-is, outside the site layout, and kept out of
// search with X-Robots-Tag. Hand-built client audits keep their own folders under app/audits/, which
// take precedence over this dynamic segment; unknown slugs 404.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "audits-html", "leads");

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".html"))
    .map((f) => ({ slug: f.slice(0, -5) }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const html = readFileSync(path.join(DIR, `${slug}.html`), "utf8");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
