import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Results",
  description:
    "The track record behind More Booked Consults — the CRO and local SEO results Gabe Meierotto drove as Director of CRO at LaserAway.",
};

export default function Results() {
  return (
    <PageIntro
      eyebrow="Results"
      title="What the work actually produces."
      lede="The full results breakdown lands here. The headline: as Director of CRO at LaserAway, Gabe grew sitewide conversion from 3% to 11% over six years — the playbook this practice is built on."
    >
      <p style={{ marginTop: 24 }}>
        <Link className="btn" href="/free-audit/">
          Get a free audit
        </Link>
      </p>
    </PageIntro>
  );
}
