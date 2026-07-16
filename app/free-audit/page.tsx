import type { Metadata } from "next";
import AuditForm from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Free Audit",
  description:
    "Get a free, prioritized audit of where your aesthetic practice's website and local rankings are leaking consults, no call required.",
  alternates: { canonical: "/free-audit/" },
};

// Dedicated Free Audit page, the target of the persistent nav + sticky CTAs.
// Reuses the shared AuditForm (idPrefix "page").
export default function FreeAuditPage() {
  return (
    <main>
      <section className="audit">
        <div className="wrap audit-grid">
          <div className="audit-copy">
            <p className="eyebrow">Free audit</p>
            <h1>Find out where your site is leaking consults.</h1>
            <p>
              Answer three quick questions. Within 3 business days you&apos;ll
              get a prioritized findings doc, the specific spots losing you
              bookings and what to test first.
            </p>
            <p className="hero-note">
              Free. No call required. You keep the findings either way.
            </p>
          </div>
          <AuditForm idPrefix="page" />
        </div>
      </section>
    </main>
  );
}
