import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every URL in the SEO topical map uses a trailing slash
  // (/medspa-marketing/, /blog/{slug}/, etc.).
  trailingSlash: true,
  // Merged pages: the old URL passes its signals to the one page that should rank.
  async redirects() {
    return [
      {
        source: "/blog/plastic-surgery-lead-generation/",
        destination: "/plastic-surgery-lead-generation/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
