import type { Metadata } from "next";
import AuditForm from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Get Exclusive Patient Leads",
  description:
    "Exclusive patient leads from Facebook and Instagram ads, delivered to your inbox and CRM, priced per lead. One practice per treatment, per market. Answer a few quick questions to get started.",
  alternates: { canonical: "/claim-your-market/" },
};

// Dedicated Pay-Per-Lead entry point (the pricing "Claim your market" button).
// Reuses the shared AuditForm, preset to the paid-ads path so the visitor
// skips straight to the qualifying questions.
export default function ClaimYourMarketPage() {
  return (
    <main>
      <section className="audit">
        <div className="wrap audit-grid">
          <div className="audit-copy">
            <p className="eyebrow">Pay-Per-Lead</p>
            <h1>Start getting exclusive patient leads.</h1>
            <p>
              Facebook and Instagram ads run to a funnel I build and control,
              with exclusive patient leads delivered to your inbox and CRM in real
              time. You pay per lead, not a retainer.
            </p>
            <p>
              Answer a few quick questions and I&apos;ll check whether your market
              is still open and whether Pay-Per-Lead is the right first move for
              your practice.
            </p>
            <p className="hero-note">
              Free. No call required. You keep the findings either way.
            </p>
          </div>
          <AuditForm
            idPrefix="claim"
            presetNeed="New patient leads from paid ads (Pay-Per-Lead)"
          />
        </div>
      </section>
    </main>
  );
}
