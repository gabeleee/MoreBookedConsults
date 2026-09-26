// Private client audit page (static HTML built outside the app, see audits-html/README.md).
// Served as-is, outside the site layout, and kept out of search with X-Robots-Tag.
import { readFileSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

export function GET() {
  const html = readFileSync(path.join(process.cwd(), "audits-html", "aya-skin.html"), "utf8");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}
