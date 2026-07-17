import type { Metadata } from "next";
import AuditForm from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Convert More of Your Traffic",
  description:
    "Turn the visitors you already have into booked consults. One controlled CRO test a month on your booking flow, forms, offers, and treatment pages. Answer a few quick questions to get started.",
  alternates: { canonical: "/convert-more/" },
};

// Dedicated CRO entry point (the pricing "Convert more traffic" button).
// Reuses the shared AuditForm, preset to the CRO path so the visitor skips
// straight to the qualifying questions.
export default function ConvertMorePage() {
  return (
    <main>
      <section className="audit">
        <div className="wrap audit-grid">
          <div className="audit-copy">
            <p className="eyebrow">Conversion optimization</p>
            <h1>Turn the traffic you have into consults.</h1>
            <p>
              Most practices do not have a traffic problem, they have a booking
              problem.
            </p>
            <p>
              I run one controlled test a month on the spot that leaks the most
              consults: your booking flow, your forms, your offers, your
              treatment pages.
            </p>
            <p>
              Answer a few quick questions and I&apos;ll show you where visitors
              are dropping off and what I&apos;d test first.
            </p>
            <p className="hero-note">
              Free. No call required. You keep the findings either way.
            </p>
          </div>
          <AuditForm
            idPrefix="convertmore"
            presetNeed="Convert existing traffic (CRO)"
          />
        </div>
      </section>
    </main>
  );
}
