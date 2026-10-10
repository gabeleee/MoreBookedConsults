import Image from "next/image";
import BookingAuditForm from "@/components/BookingAuditForm";
import MetaPixel from "@/components/MetaPixel";

// Shared body of the paid-ad landing pages. Each ad gets its own route with a
// hero that matches the video (headline + image); the form and everything
// below the hero stay the same.
function Logo() {
  return (
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
  );
}

// Tap-by-tap track for the 7 vs 5 example: today's dots fade as clients drop off.
function Track({ steps, today }: { steps: number; today?: boolean }) {
  return (
    <div className={`ba-track${today ? " today" : ""}`} aria-hidden="true">
      {Array.from({ length: steps }, (_, i) => (
        <span key={i} className="ba-dot" style={today ? { opacity: 1 - i * 0.105 } : undefined}>
          {i + 1}
        </span>
      ))}
      {today ? (
        <span className="ba-end wall">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Sign in
        </span>
      ) : (
        <span className="ba-end booked">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          Booked
        </span>
      )}
    </div>
  );
}

// "If we fix it for you" offer (Hormozi value stack + guarantee). No price here:
// the price lives in the audit/proposal, the landing page only sells the free audit.
const STACK = [
  { name: "A new booking flow on your site", note: "Live in 14 days, booking straight into your calendar", value: 2500 },
  { name: "Instant text-back", note: "Anyone who starts booking but doesn't finish gets a text within 60 seconds", value: 1500 },
  { name: "Last-Chance Offer", note: "A first-visit offer we write, design in your brand, build and track, so visitors about to leave book instead", value: 750 },
  { name: "Drop-off tracking", note: "See exactly which step people quit on", value: 500 },
  { name: "Monthly before-and-after report", note: "Booking requests before vs after every change", value: 500 },
];
const BONUSES = [
  { name: "Your Booking Audit", value: 100 },
  { name: "A first-visit offer built with our Consult Magnet tool", value: 500 },
  { name: "Your ads checked against our study of 773 med spa ads", value: 500 },
  { name: "How your spa compares with the Med Spa Census for your state", value: 300 },
];
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const TOTAL = [...STACK, ...BONUSES].reduce((t, i) => t + i.value, 0);

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Offer() {
  return (
    <>
      <section className="ba-worth">
        <div className="wrap">
          <p className="eyebrow">What a better booking flow is worth</p>
          <h2>Same visitors. More bookings.</h2>
          <div className="ba-worth-row">
            <div className="ba-worth-box before">
              <span className="ba-worth-n">30</span>
              <span className="ba-worth-l">booking requests</span>
              <span className="ba-worth-s">1,000 visitors at 3%</span>
            </div>
            <div className="ba-worth-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </div>
            <div className="ba-worth-box after">
              <span className="ba-worth-n">110</span>
              <span className="ba-worth-l">booking requests</span>
              <span className="ba-worth-s">1,000 visitors at 11%</span>
            </div>
          </div>
          <p className="ba-worth-note">That&apos;s the 3% to 11% lift we helped get at LaserAway, on 1,000 visitors a month.</p>
          <p className="ba-worth-note">Your audit shows what it could mean for your spa.</p>
        </div>
      </section>

      <section className="ba-stack">
        <div className="wrap ba-stack-in">
          <p className="eyebrow">If you want us to fix it for you</p>
          <h2>Everything in your first month.</h2>
          <div className="ba-table">
            {STACK.map((i) => (
              <div className="ba-row" key={i.name}>
                <span className="ba-row-ic"><Check /></span>
                <div>
                  <b>{i.name}</b>
                  <p>{i.note}</p>
                </div>
                <span className="ba-row-v">{usd(i.value)}</span>
              </div>
            ))}
            <div className="ba-bonus-h">Bonuses</div>
            {BONUSES.map((i) => (
              <div className="ba-row bonus" key={i.name}>
                <span className="ba-row-ic"><Check /></span>
                <div>
                  <b>{i.name}</b>
                </div>
                <span className="ba-row-v">{usd(i.value)}</span>
              </div>
            ))}
            <div className="ba-total">
              <span>Total value</span>
              <b>{usd(TOTAL)}</b>
            </div>
          </div>
          <p className="ba-after">Every month after: 2 more improvements, each one measured.</p>
          <p className="ba-after soft">Your price is in your free audit.</p>
        </div>
      </section>

      <section className="ba-guarantee">
        <div className="wrap ba-g-in">
          <div className="ba-seal" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" />
              <circle cx="60" cy="60" r="46" fill="currentColor" opacity=".12" />
              <path d="M60 30l22 9v17c0 15-10 28-22 33-12-5-22-18-22-33V39z" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" />
              <path d="M49 59l8 8 15-16" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="eyebrow">Our guarantee</p>
          <h2>Your booking rate goes up in 90 days, or we keep working free until it does.</h2>
          <ul className="ba-g-list">
            <li><Check />Your new booking form is live in 14 days, or month one is free.</li>
            <li><Check />No contract. Cancel anytime.</li>
          </ul>
          <p className="ba-fine">Booking rate means booking requests divided by website visitors. We measure your starting rate in week one, before anything changes. For sites with at least 300 visitors a month.</p>
        </div>
      </section>
    </>
  );
}

export default function BookingAuditLanding({
  page,
  headline,
  image,
  offer = false,
}: {
  page: string;
  headline: string;
  offer?: boolean;
  image: { src: string; alt: string; width: number; height: number; position?: string };
}) {
  return (
    <main className="ba">
      {/* Landing page: no site header, footer or sticky CTA, so the form is the only next step. */}
      <style>{`body>header,body>footer,.sticky-cta{display:none!important}`}</style>
      <MetaPixel />

      <section className="ba-hero">
        <div className="wrap ba-top">
          <Logo />
        </div>
        <div className="wrap ba-grid">
          <div className="ba-copy">
            <h1>{headline}</h1>
            <div className="ba-photo">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                style={image.position ? { objectPosition: image.position } : undefined}
                priority
              />
            </div>
          </div>
          <div className="ba-more">
            <ul className="ba-bullets">
              <li>See your booking path the way a new client does, tap by tap on her phone</li>
              <li>Find the exact spots where people give up before they book</li>
              <li>Know which fixes would book the most consults, ranked</li>
              <li>In your inbox within 3 business days, no call needed</li>
            </ul>
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
          <div className="ba-side">
            <BookingAuditForm page={page} />
            <div className="ba-private">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <div>
                <b>Your answers stay private.</b>
                <p>I use them only to build your audit, and I never sell or share them with anyone.</p>
                <p>No spam, and no call needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ba-get">
        <div className="wrap">
          <p className="eyebrow">What you get</p>
          <h2>Your audit, in plain English.</h2>
          <div className="ba-cards">
            <div className="ba-card">
              <Image src="/booking-audit/card-path.jpg" alt="Two phones showing a med spa website, the way a new client sees it" width={800} height={500} className="ba-card-img" />
              <span className="ba-k">1</span>
              <h3>Your booking path, click by click</h3>
              <p>Every tap from your homepage to a booked time, next to the shorter path I&apos;d build.</p>
            </div>
            <div className="ba-card">
              <Image src="/booking-audit/card-scorecard.jpg" alt="A med spa owner reviewing her booking calendar on a laptop" width={800} height={500} className="ba-card-img" />
              <span className="ba-k">2</span>
              <h3>A booking scorecard</h3>
              <p>Your Book button, booking form, mobile experience and steps to book, each graded.</p>
            </div>
            <div className="ba-card">
              <Image src="/booking-audit/card-fix.jpg" alt="A busy med spa lobby with clients checking in at the front desk" width={800} height={500} className="ba-card-img" />
              <span className="ba-k">3</span>
              <h3>What to fix first</h3>
              <p>The changes that would book the most consults, ranked.</p>
            </div>
          </div>

          <div className="ba-example">
            <p className="ba-ex-label">Booking on a phone, tap by tap</p>
            <div className="ba-paths">
              <div className="ba-path today">
                <div className="ba-tagrow">
                  <span className="ba-tag yours">Yours</span>
                </div>
                <div className="ba-pn">8+ taps</div>
                <p className="ba-pl">8+ taps on a phone before she&apos;s even asked her name</p>
                <Track steps={8} today />
                <p className="ba-tcap">Every extra tap, more people give up.</p>
                <ol>
                  <li>Find Book Online in the menu</li>
                  <li>Leave for a separate booking site</li>
                  <li>Pick a location, a service, a provider and a time</li>
                  <li>Book Reservation, then sign in or sign up</li>
                </ol>
              </div>
              <div className="ba-vs" aria-hidden="true">
                <span>VS</span>
              </div>
              <div className="ba-path new">
                <div className="ba-tagrow">
                  <span className="ba-tag ours">
                    Ours
                    <Logo />
                  </span>
                </div>
                <div className="ba-pn">5 steps</div>
                <p className="ba-pl">5 easy steps on her own site, and she&apos;s booked</p>
                <Track steps={5} />
                <p className="ba-tcap">Short, simple, and she never leaves your site.</p>
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

      {offer && <Offer />}

      <section className="ba-me">
        <div className="wrap ba-me-in">
          <Image src="/gabe.jpg" alt="Gabe Meierotto" width={96} height={96} className="ba-me-img" />
          <div>
            <p className="ba-me-name">Gabe Meierotto, <a href="/">More Booked Consults</a></p>
            <p>As Director of CRO at LaserAway, I helped take online conversion from 3% to 11%.</p>
            <p>Now I fix booking flows for med spas.</p>
            {offer && <p className="ba-cap">I take on 4 new med spas a month, so each one gets my full attention.</p>}
          </div>
        </div>
        <div className="wrap ba-again">
          <a className="btn" href="#get-audit">Get my free audit</a>
        </div>
        <div className="wrap ba-logo">
          <Logo />
        </div>
      </section>
    </main>
  );
}
