import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every URL in the SEO topical map uses a trailing slash
  // (/medspa-marketing/, /blog/{slug}/, etc.).
  trailingSlash: true,
};

export default nextConfig;
