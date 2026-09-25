import type { Metadata } from "next";
import AuditForm from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Managed Facebook & Instagram Ads for Aesthetic Practices",
  description:
    "Managed Meta ads for med spas and plastic surgeons: static ad creative, landing pages built to convert, one A/B test a month. Answer a few quick questions to get started.",
  alternates: { canonical: "/get-leads/" },
};

// Dedicated managed-ads entry point (the pricing "Get more leads from ads"
// button). Reuses the shared AuditForm, preset to the paid-ads path so the
// visitor skips straight to the qualifying questions.
export default function GetLeadsPage() {
  return (
    <main>
      <section className="audit">
        <div className="wrap audit-grid">
          <div className="audit-copy">
            <p className="eyebrow">Managed Meta ads</p>
            <h1>Get more consults from your ads.</h1>
            <p>
              Facebook and Instagram ads sent to landing pages I build and test,
              with fresh static creative every month. You pay Meta directly for
              the ad spend, never marked up.
            </p>
            <p>
              Answer a few quick questions and I&apos;ll tell you whether managed
              ads are the right first move for your practice, or whether your
              site needs fixing first.
            </p>
            <p className="hero-note">
              Free. No call required. You keep the findings either way.
            </p>
          </div>
          <AuditForm
            idPrefix="getleads"
            presetNeed="New leads from paid ads (Managed Ads)"
          />
        </div>
      </section>
    </main>
  );
}
