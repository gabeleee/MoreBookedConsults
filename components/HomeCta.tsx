import Link from "next/link";

// Mid-page CTA band, reuses the content-page `.cta-block` gradient (blue →
// violet) with a white button. Dropped halfway down the homepage.
export default function HomeCta() {
  return (
    <section className="home-cta">
      <div className="wrap">
        <aside className="cta-block">
          <p>The fastest path to more booked consults.</p>
          <Link className="btn" href="/free-audit/">
            Get a free marketing audit
          </Link>
        </aside>
      </div>
    </section>
  );
}
