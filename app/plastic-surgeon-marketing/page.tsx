import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Plastic Surgeon Marketing",
  description:
    "CRO and local SEO for plastic surgeons — convert more consult requests and rank for the procedures patients search in your market.",
};

// Plastic surgeon hub — owns the "plastic surgeon marketing" cluster.
export default function PlasticSurgeonMarketing() {
  return (
    <PageIntro
      eyebrow="For Plastic Surgeons"
      title="Plastic surgeon marketing that fills the schedule."
      lede="Conversion optimization and local SEO built for plastic surgery practices. The full guide cluster lands here — for now, start with a free audit."
    >
      <p style={{ marginTop: 24 }}>
        <Link className="btn" href="/free-audit/">
          Get a free audit
        </Link>
      </p>
    </PageIntro>
  );
}
