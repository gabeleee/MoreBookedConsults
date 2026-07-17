import type { Metadata } from "next";
import AuditForm from "@/components/AuditForm";

export const metadata: Metadata = {
  title: "Rank Higher on Google",
  description:
    "Rank for the treatments and procedures patients search in your city. Google Business Profile, local content, citations, and reviews for aesthetic practices. Answer a few quick questions to get started.",
  alternates: { canonical: "/rank-higher/" },
};

// Dedicated Local SEO entry point (the pricing "Rank higher on Google"
// button). Reuses the shared AuditForm, preset to the SEO path so the
// visitor skips straight to the qualifying questions.
export default function RankHigherPage() {
  return (
    <main>
      <section className="audit">
        <div className="wrap audit-grid">
          <div className="audit-copy">
            <p className="eyebrow">Local SEO</p>
            <h1>Rank higher when patients search.</h1>
            <p>
              When someone in your city searches the treatment you offer, your
              practice should be the one they find first.
            </p>
            <p>
              That means a Google Business Profile that earns the map pack,
              pages built for the procedures patients actually type, and the
              citations and reviews that back them up.
            </p>
            <p>
              Answer a few quick questions and I&apos;ll tell you where you rank
              today and what it would take to move up.
            </p>
            <p className="hero-note">
              Free. No call required. You keep the findings either way.
            </p>
          </div>
          <AuditForm
            idPrefix="rankhigher"
            presetNeed="More traffic from Google (SEO)"
          />
        </div>
      </section>
    </main>
  );
}
