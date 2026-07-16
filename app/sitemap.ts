import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getPublishedBlogPosts, getPublishedMoneyPages } from "@/lib/content";

// Fixed routes that aren't content-driven.
const STATIC_ROUTES = ["/", "/results/", "/pricing/", "/free-audit/", "/blog/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: SITE.url + path,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const moneyEntries = getPublishedMoneyPages().map((p) => ({
    url: `${SITE.url}/${p.slug}/`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogEntries = getPublishedBlogPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}/`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    ...(p.frontmatter.date ? { lastModified: p.frontmatter.date } : {}),
  }));

  return [...staticEntries, ...moneyEntries, ...blogEntries];
}
