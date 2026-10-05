// Personal Facebook/Instagram ads plan for a cold-outreach audit: audits-html/leads/ads/<slug>.html, linked from
// the bottom of /audits/<slug>/. Same pattern as ../route.ts: force-static, noindex, unknown slugs 404.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "audits-html", "leads", "ads");

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  if (!existsSync(DIR)) return [];
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
