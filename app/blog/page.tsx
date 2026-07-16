import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Guides on aesthetic practice marketing — CRO and local SEO playbooks for medspas and plastic surgeons.",
};

// Flat blog index. Posts live at /blog/{slug}/ (no nested folders); the cluster
// hierarchy is expressed through internal links, not URL structure.
export default function BlogIndex() {
  return (
    <PageIntro
      eyebrow="Blog"
      title="Guides on aesthetic practice marketing."
      lede="CRO and local SEO playbooks for medspas and plastic surgeons. Posts land here as the content cluster fills in."
    />
  );
}
