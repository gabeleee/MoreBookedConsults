import type { Metadata } from "next";
import Image from "next/image";
import BookingAuditForm from "@/components/BookingAuditForm";
import MetaPixel from "@/components/MetaPixel";

// Paid-ad landing page for the "tumbleweed" Facebook/Instagram video
// (~/mbc-ads/01-tumbleweed). One job: request the free Booking Audit.
// noindex, no site nav/footer/sticky CTA (hidden below), Meta pixel on.
export const metadata: Metadata = {
  title: "Free Booking Audit for Med Spas",
  description:
    "A free Booking Audit for med spa owners: your booking path click by click, where clients give up, and what to fix first.",
  alternates: { canonical: "/booking-audit/" },
  robots: { index: false, follow: false },
};

export default function BookingAuditPage() {
  return (
    <main className="ba">
      {/* Landing page: no site header, footer or sticky CTA, so the form is the only next step. */}
      <style>{`body>header,body>footer,.sticky-cta{display:none!important}`}</style>
      <MetaPixel />

      <section className="ba-hero">
        <div className="wrap ba-grid">
          <div className="ba-copy">
            <h1>Your Tuesday doesn&apos;t have to look like this.</h1>
            <div className="ba-photo">
              <Image
                src="/booking-audit/tumbleweed.jpg"
                alt="An empty, beautiful med spa lobby with a tumbleweed rolling across the floor"
                width={720}
                height={1280}
                priority
              />
            </div>
            <ul className="ba-bullets">
              <li>See your booking path the way a new client does, tap by tap on her phone</li>
              <li>Find the exact spots where people give up before they book</li>
              <li>Know which fixes would book the most consults, ranked</li>
              <li>In your inbox within 3 business days, no call needed</li>
            </ul>
          </div>
          <div className="ba-side">
            <BookingAuditForm />
            <a className="ba-sample" href="/booking-audit/sample-audit.pdf" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5" />
                <path d="M8.5 16.5v-3h1a1 1 0 0 1 0 2h-1M12.5 16.5v-3h.8a1.5 1.5 0 0 1 0 3zM16.5 13.5h-1.5v3M15 15h1.2" />
              </svg>
              <span>
                <b>See a sample audit</b>
                <small>PDF · a real audit, names changed</small>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="ba-get">
        <div className="wrap">
          <p className="eyebrow">What you get</p>
          <h2>Your audit, in plain English.</h2>
          <div className="ba-cards">
            <div className="ba-card">
              <span className="ba-k">1</span>
              <h3>Your booking path, click by click</h3>
              <p>Every tap from your homepage to a booked time, next to the shorter path I&apos;d build.</p>
            </div>
            <div className="ba-card">
              <span className="ba-k">2</span>
              <h3>A booking scorecard</h3>
              <p>Your Book button, booking form, mobile experience and steps to book, each graded.</p>
            </div>
            <div className="ba-card">
              <span className="ba-k">3</span>
              <h3>What to fix first</h3>
              <p>The changes that would book the most consults, ranked.</p>
            </div>
          </div>

          <div className="ba-example">
            <p className="ba-ex-label">From a real audit (names changed)</p>
            <div className="ba-paths">
              <div className="ba-path today">
                <div className="ba-pn">7</div>
                <p className="ba-pl">taps on a phone before she&apos;s even asked her name</p>
                <ol>
                  <li>Find Book Online in the menu</li>
                  <li>Leave for a separate booking site</li>
                  <li>Pick a location, a service, a provider and a time</li>
                  <li>Book Reservation, then sign in or sign up</li>
                </ol>
              </div>
              <div className="ba-path new">
                <div className="ba-pn">5</div>
                <p className="ba-pl">easy steps on her own site, and she&apos;s booked</p>
                <ol>
                  <li>What would you like to improve?</li>
                  <li>First visit?</li>
                  <li>Which location?</li>
                  <li>Name and mobile</li>
                  <li>Pick a time, booked into the same calendar</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ba-me">
        <div className="wrap ba-me-in">
          <Image src="/gabe.jpg" alt="Gabe Meierotto" width={96} height={96} className="ba-me-img" />
          <div>
            <p className="ba-me-name">Gabe Meierotto, More Booked Consults</p>
            <p>As Director of CRO at LaserAway, I helped take online conversion from 3% to 11%.</p>
            <p>Now I fix booking flows for med spas.</p>
          </div>
        </div>
        <div className="wrap ba-again">
          <a className="btn" href="#get-audit">Get my free audit</a>
        </div>
        <div className="wrap ba-logo">
          <span className="brand">
            <svg className="logo-mark" viewBox="10 2 86 94" aria-hidden="true">
              <use href="#petalShape" fill="#CBC4F5" transform="translate(24,76) scale(0.52) rotate(-24)" />
              <use href="#petalShape" fill="#4C8DFF" opacity="0.9" transform="translate(45,64) scale(0.74) rotate(-10)" />
              <use href="#petalShape" fill="url(#logoGrad)" transform="translate(68,48) scale(0.98) rotate(6)" />
            </svg>
            <span>
              MoreBooked<em>Consults</em>
            </span>
          </span>
        </div>
      </section>
    </main>
  );
}
