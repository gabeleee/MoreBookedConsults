import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every URL in the SEO topical map uses a trailing slash
  // (/medspa-marketing/, /blog/{slug}/, etc.).
  trailingSlash: true,
  // Page speed (2026-11-05): static media in public/ gets a 30-day browser
  // cache (it was 4 h). If you replace a file, give it a new name (the site
  // already does, e.g. v2 file names), or visitors may see the old one.
  async headers() {
    const long = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }];
    return [
      { source: "/fonts/:path*", headers: long },
      { source: "/video/:path*", headers: long },
      { source: "/logos/:path*", headers: long },
      { source: "/home/:path*", headers: long },
      { source: "/:file(.*\\.(?:jpg|jpeg|png|webp|avif|svg|gif))", headers: long },
    ];
  },
  // Merged pages: the old URL passes its signals to the one page that should rank.
  async redirects() {
    return [
      {
        source: "/blog/plastic-surgery-lead-generation/",
        destination: "/plastic-surgery-lead-generation/",
        permanent: true,
      },
      {
        source: "/blog/plastic-surgery-lead-follow-up/",
        destination: "/blog/plastic-surgery-lead-management/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
