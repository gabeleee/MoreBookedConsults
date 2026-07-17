// Three Levers section (CRO + Local SEO + Pay-Per-Lead), ported from the v18
// mockup (lines 512-606). Each lever's chart renders through the reusable
// ChartCard. Keep this copy to those three services, never broaden it further.
import PetalBackground from "./PetalBackground";
import ChartCard from "./ChartCard";

export default function Levers() {
  return (
    <section className="levers" id="levers">
      <PetalBackground
        petals={[
          { top: "6%", right: "5%", r: "-16deg", size: 60, fill: "#D6E2FB" },
          { bottom: "8%", left: "4%", r: "30deg", size: 44, fill: "#D9D3F9" },
        ]}
        trios={[
          {
            top: "32%",
            left: "-230px",
            speed: 0.26,
            dur: "17s",
            del: "-6s",
            size: 680,
            opacity: 0.42,
          },
        ]}
      />
      <div className="wrap">
        <div className="levers-head">
          <div className="head-text">
            <p className="eyebrow">Three levers. Nothing else.</p>
            <h2>
              Convert the traffic you have. <em>Rank</em> for the traffic you
              don&apos;t. <em>Buy</em> the leads you&apos;re missing.
            </h2>
          </div>
          <div className="head-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/injector.jpg"
              alt="Nurse injector preparing a syringe"
              width={480}
              height={600}
            />
          </div>
        </div>

        <div className="lever-grid">
          {/* Lever 01, CRO */}
          <div className="lever">
            <span className="pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </span>
            <p className="eyebrow">Lever 01</p>
            <h3>Conversion rate optimization</h3>
            <p>
              One controlled test per month on the spots that leak bookings,               run long enough to trust the result, so wins stack instead of
              canceling out.
            </p>
            <div className="tags">
              <span className="tag">Multi-step hero forms</span>
              <span className="tag">Intro-offer strategy</span>
              <span className="tag">Exit-intent offers</span>
              <span className="tag">Booking flow fixes</span>
              <span className="tag">Social proof</span>
            </div>
            <ChartCard
              title="Cumulative conversion lift"
              meta="One test / month · 6 months"
              delta="▲ +41%"
              caption="Illustrative: how monthly wins compound on a typical practice's site."
            >
              <svg
                viewBox="0 0 520 190"
                role="img"
                aria-label="Bar chart: cumulative conversion lift growing over six monthly tests to plus 41 percent"
              >
                <line className="grid" x1="10" y1="160" x2="510" y2="160" />
                <g fill="#CBC4F5">
                  <rect x="28" y="150" width="56" height="10" rx="5" />
                  <rect x="108" y="126" width="56" height="34" rx="5" />
                  <rect x="188" y="122" width="56" height="38" rx="5" />
                  <rect x="268" y="88" width="56" height="72" rx="5" />
                  <rect x="348" y="66" width="56" height="94" rx="5" />
                </g>
                <rect x="428" y="36" width="56" height="124" rx="5" fill="#6C57E8" />
                <text className="ax" x="56" y="178" textAnchor="middle">
                  M1
                </text>
                <text className="ax" x="136" y="178" textAnchor="middle">
                  M2
                </text>
                <text className="ax" x="216" y="178" textAnchor="middle">
                  M3
                </text>
                <text className="ax" x="296" y="178" textAnchor="middle">
                  M4
                </text>
                <text className="ax" x="376" y="178" textAnchor="middle">
                  M5
                </text>
                <text className="ax" x="456" y="178" textAnchor="middle">
                  M6
                </text>
                <text className="pt-label" x="456" y="26" textAnchor="middle">
                  +41%
                </text>
              </svg>
            </ChartCard>
          </div>

          {/* Lever 02, Local SEO */}
          <div className="lever">
            <span className="pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <p className="eyebrow">Lever 02</p>
            <h3>Local SEO</h3>
            <p>
              Topical authority content and clean citations, so when someone
              searches &quot;[treatment] + [your city],&quot; your practice is
              the answer.
            </p>
            <div className="tags">
              <span className="tag">Treatment × city pages</span>
              <span className="tag">Topical authority</span>
              <span className="tag">Citations &amp; map pack</span>
              <span className="tag">Review velocity</span>
            </div>
            <ChartCard
              title="Search impressions"
              meta="Topical authority build · Daily"
              delta="▲ Compounding"
              caption="The curve every topical authority build follows: flat, then it bends."
            >
              <svg
                viewBox="0 0 520 190"
                role="img"
                aria-label="Line chart: daily search impressions bending upward as topical authority builds"
              >
                <line className="grid" x1="10" y1="160" x2="510" y2="160" />
                <line className="grid" x1="10" y1="112" x2="510" y2="112" />
                <line className="grid" x1="10" y1="64" x2="510" y2="64" />
                <line className="grid" x1="10" y1="16" x2="510" y2="16" />
                <path
                  fill="url(#areaGradBlue)"
                  d="M20 158 C 120 156, 200 152, 280 140 C 350 129, 410 104, 450 74 C 476 54, 492 38, 500 26 L500 160 L20 160 Z"
                />
                <path
                  fill="none"
                  stroke="#4C8DFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M20 158 C 120 156, 200 152, 280 140 C 350 129, 410 104, 450 74 C 476 54, 492 38, 500 26"
                />
                <circle cx="500" cy="26" r="5.5" fill="#4C8DFF" />
                <text className="ax" x="20" y="178">
                  Wk 1
                </text>
                <text className="ax" x="250" y="178" textAnchor="middle">
                  Wk 6
                </text>
                <text className="ax" x="500" y="178" textAnchor="end">
                  Wk 12
                </text>
              </svg>
            </ChartCard>
          </div>

          {/* Lever 03, Pay-Per-Lead, full-width row below the first two */}
          <div className="lever lever-wide">
            <div className="lever-wide-text">
              <span className="pillar-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 11 18-5v12L3 14v-3z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </span>
              <p className="eyebrow">Lever 03</p>
              <h3>Pay-Per-Lead advertising</h3>
              <p>
                Facebook ads sent to conversion-tested funnels I control, never
                to a leaky website. Exclusive leads, one practice per market,
                priced per lead.
              </p>
              <div className="tags">
                <span className="tag">Multi-step funnels</span>
                <span className="tag">Exclusive leads</span>
                <span className="tag">$30–35/lead</span>
                <span className="tag">Instant SMS follow-up</span>
                <span className="tag">I carry the ad spend</span>
              </div>
            </div>
            <ChartCard
              title="Cost per lead"
              meta="Botox · Exclusive · Flat"
              delta="$35 flat"
              caption="What you pay never moves. What it costs me to earn it is my problem."
            >
              <svg
                viewBox="0 0 520 190"
                role="img"
                aria-label="A flat line showing your fixed $35 cost per lead against a fluctuating line showing what each lead actually costs to acquire"
              >
                <line className="grid" x1="10" y1="160" x2="510" y2="160" />
                <line className="grid" x1="10" y1="112" x2="510" y2="112" />
                <line className="grid" x1="10" y1="64" x2="510" y2="64" />
                <path
                  fill="none"
                  stroke="#CBC4F5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M20 96 C 70 58, 110 132, 160 92 C 205 56, 255 122, 305 74 C 355 34, 405 120, 455 86 C 480 68, 495 96, 500 84"
                />
                <line
                  x1="20"
                  y1="74"
                  x2="500"
                  y2="74"
                  stroke="#6C57E8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="500" cy="74" r="5.5" fill="#6C57E8" />
                <text className="pt-label" x="500" y="62" textAnchor="end">
                  $35 flat
                </text>
                <text className="ax" x="20" y="178">
                  Your price
                </text>
                <text className="ax" x="500" y="178" textAnchor="end">
                  My cost to earn it
                </text>
              </svg>
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  );
}
