import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Static routes for now. Blog posts and additional money pages get added here
// as they land (or generated from the content store once it exists).
const ROUTES = [
  "/",
  "/medspa-marketing/",
  "/plastic-surgeon-marketing/",
  "/results/",
  "/pricing/",
  "/free-audit/",
  "/blog/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: SITE.url + path,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
