import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Senior-level CRO and local SEO for aesthetic practices — one controlled test a month, one operator. Pricing details coming soon.",
};

export default function Pricing() {
  return (
    <PageIntro
      eyebrow="Pricing"
      title="Simple, senior-level pricing."
      lede="One operator, one controlled test a month, and local SEO that compounds. Full pricing lands here — start with a free audit to see what's worth testing first."
    >
      <p style={{ marginTop: 24 }}>
        <Link className="btn" href="/free-audit/">
          Get a free audit
        </Link>
      </p>
    </PageIntro>
  );
}
