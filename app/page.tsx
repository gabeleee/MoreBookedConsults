// Placeholder homepage — scaffold only.
// Confirms the global tokens and all four fonts load; real sections
// (Header, Hero, AuditForm, …) are built in later steps per CLAUDE.md.
export default function Home() {
  return (
    <main className="wrap" style={{ padding: "72px 24px" }}>
      <p className="eyebrow">CRO + Local SEO · Aesthetic practices</p>
      <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(37px,5.2vw,56px)", lineHeight: 1.07, margin: "18px 0 14px" }}>
        More booked consults from the traffic you{" "}
        <em style={{ fontStyle: "italic", color: "var(--violet)" }}>already have.</em>
      </h1>
      <p className="lede">
        Scaffold is up. Fonts, tokens, and global styles are wired to the v18
        mockup. Components come next.
      </p>
      <p style={{ marginTop: 24, fontFamily: "var(--script)", fontSize: 40, color: "var(--violet)" }}>
        Consults
      </p>
    </main>
  );
}
