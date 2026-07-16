import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Medspa Marketing",
  description:
    "CRO and local SEO for medspas — turn the traffic you already have into booked consults, and rank for the treatments your city is searching for.",
};

// Med spa hub — owns the "medspa marketing" cluster. Detailed guides link in
// here via internal links (the topical map is expressed by links, not folders).
export default function MedspaMarketing() {
  return (
    <PageIntro
      eyebrow="For Med Spas"
      title="Medspa marketing that books more consults."
      lede="Conversion optimization and local SEO built for medspas. The full medspa guide cluster lands here — for now, start with a free audit of your site and rankings."
    >
      <p style={{ marginTop: 24 }}>
        <Link className="btn" href="/free-audit/">
          Get a free audit
        </Link>
      </p>
    </PageIntro>
  );
}
