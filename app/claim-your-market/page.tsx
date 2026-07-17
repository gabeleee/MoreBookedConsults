import type { Metadata } from "next";
import AuditForm from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Claim Your Market",
  description:
    "See if your market is still open for exclusive Pay-Per-Lead advertising. One practice per treatment, per market. Answer a few quick questions and I'll check availability.",
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
            <h1>See if your market is still open.</h1>
            <p>
              Pay-Per-Lead is exclusive: one practice per treatment, per market.
              Once your market is taken for a treatment, a competitor can&apos;t
              buy in behind you.
            </p>
            <p>
              Answer a few quick questions and I&apos;ll check whether your market
              is still available and whether Pay-Per-Lead is the right first move
              for your practice.
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
