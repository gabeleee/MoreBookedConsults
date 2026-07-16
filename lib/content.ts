import fs from "fs";
import path from "path";
import matter from "gray-matter";

// File-backed content system for the topical-map cluster. MDX articles live in
// content/blog/ (flat /blog/{slug}/ nodes) and content/money/ (root-level money
// pages). Frontmatter carries the SEO metadata + draft/published gate.

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content", "blog");
const MONEY_DIR = path.join(ROOT, "content", "money");

export type ContentStatus = "draft" | "published";
export type Hub = "medspa" | "ps" | "both" | "none";

export type Frontmatter = {
  title: string; // meta <title> lead ("| More Booked Consults" appended by the template)
  description: string;
  cluster?: string; // e.g. "B", "PS-B", "G-tier1", "core"
  hub?: Hub;
  primaryQuery?: string;
  queries?: string[];
  status: ContentStatus;
  date?: string; // ISO, for blog nodes
  needsResearch?: boolean;
  // money-page hero (the template renders these above the MDX body)
  eyebrow?: string;
  h1?: string; // visible headline when it differs from the meta title
  lede?: string;
  // rendered by the routes after the MDX body
  faq?: { q: string; a: string }[];
  related?: { href: string; title: string; desc?: string }[];
};

export type ContentDoc = {
  slug: string;
  frontmatter: Frontmatter;
  body: string;
};

function readDir(dir: string): ContentDoc[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as Frontmatter, body: content };
    });
}

const isPublished = (d: ContentDoc) => d.frontmatter.status === "published";
// Drafts render in dev for preview, but 404 / drop out of the sitemap in prod.
export const showDrafts = process.env.NODE_ENV !== "production";

// ---- blog nodes ----
export const getAllBlogPosts = () => readDir(BLOG_DIR);
export const getBlogPost = (slug: string) =>
  getAllBlogPosts().find((d) => d.slug === slug) ?? null;
export const getPublishedBlogPosts = () => getAllBlogPosts().filter(isPublished);
export const getVisibleBlogPosts = () =>
  getAllBlogPosts().filter((d) => isPublished(d) || showDrafts);

// ---- money pages ----
export const getAllMoneyPages = () => readDir(MONEY_DIR);
export const getMoneyPage = (slug: string) =>
  getAllMoneyPages().find((d) => d.slug === slug) ?? null;
export const getPublishedMoneyPages = () =>
  getAllMoneyPages().filter(isPublished);
