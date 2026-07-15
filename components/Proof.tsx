// Proof / track-record section, ported from morebookedconsults-v18.html
// (lines 451-511). The LaserAway results are attributed to Gabe personally in
// his former role — never to this company. Preserve this copy.
import PetalBackground from "./PetalBackground";
import ChartCard from "./ChartCard";

export default function Proof() {
  return (
    <section className="proof">
      <PetalBackground
        trios={[
          {
            top: "-160px",
            right: "-190px",
            speed: -0.2,
            dur: "20s",
            del: "-12s",
            size: 560,
            opacity: 0.4,
          },
        ]}
      />
      <div className="wrap proof-grid">
        <div>
          <p className="eyebrow">The track record</p>
          <h2>These numbers came from six years at LaserAway.</h2>
          <p className="lede">
            Before More Booked Consults existed, our founder spent six years as{" "}
            <strong>Director of CRO at LaserAway</strong>, the largest medspa
            chain in the U.S. — owning the testing roadmap end to end. These are
            the results he drove in that role, and the playbook this practice is
            built on.
          </p>
          <div className="attribution">
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <div className="who">
              <b>Gabe Meierotto</b>
              <span>
                Founder, More Booked Consults · Director of CRO at LaserAway,
                2017–2022
              </span>
            </div>
          </div>
          <div className="mini-stats">
            <div>
              <div className="n">2,600+</div>
              <div className="l">Variations tested</div>
            </div>
            <div>
              <div className="n">200%</div>
              <div className="l">Avg lift, core pages</div>
            </div>
            <div>
              <div className="n">11x</div>
              <div className="l">Testing velocity</div>
            </div>
          </div>
        </div>
        <ChartCard
          title="Sitewide conversion rate"
          range="3% → 11%"
          meta="LaserAway · 2017–2022 · Quarterly"
          delta="▲ +267%"
          caption="Sitewide conversion during Gabe's six years running the testing program at LaserAway."
        >
          <svg
            viewBox="0 0 560 290"
            role="img"
            aria-label="Line chart: sitewide conversion rate rising from 3 percent in 2017 to 11 percent in 2022"
          >
            <line className="grid" x1="52" y1="250" x2="545" y2="250" />
            <line className="grid" x1="52" y1="192" x2="545" y2="192" />
            <line className="grid" x1="52" y1="134" x2="545" y2="134" />
            <line className="grid" x1="52" y1="76" x2="545" y2="76" />
            <line className="grid" x1="52" y1="18" x2="545" y2="18" />
            <text className="ax" x="44" y="254" textAnchor="end">
              0%
            </text>
            <text className="ax" x="44" y="196" textAnchor="end">
              3%
            </text>
            <text className="ax" x="44" y="138" textAnchor="end">
              6%
            </text>
            <text className="ax" x="44" y="80" textAnchor="end">
              9%
            </text>
            <text className="ax" x="44" y="22" textAnchor="end">
              12%
            </text>
            <text className="ax" x="60" y="272">
              2017
            </text>
            <text className="ax" x="155" y="272">
              2018
            </text>
            <text className="ax" x="250" y="272">
              2019
            </text>
            <text className="ax" x="345" y="272">
              2020
            </text>
            <text className="ax" x="440" y="272">
              2021
            </text>
            <text className="ax" x="518" y="272">
              2022
            </text>
            <path
              fill="url(#areaGrad)"
              d="M60 192 C 100 187, 130 181, 158 173 C 190 164, 220 158, 254 148 C 290 138, 316 136, 350 128 C 386 119, 412 96, 446 82 C 478 68, 506 48, 536 37 L536 250 L60 250 Z"
            />
            <path
              fill="none"
              stroke="#6C57E8"
              strokeWidth="3"
              strokeLinecap="round"
              d="M60 192 C 100 187, 130 181, 158 173 C 190 164, 220 158, 254 148 C 290 138, 316 136, 350 128 C 386 119, 412 96, 446 82 C 478 68, 506 48, 536 37"
            />
            <circle cx="60" cy="192" r="5" fill="#fff" stroke="#6C57E8" strokeWidth="2.5" />
            <circle cx="536" cy="37" r="5.5" fill="#6C57E8" />
            <text className="pt-label" x="72" y="182">
              3.0%
            </text>
            <text className="pt-label" x="530" y="24" textAnchor="end">
              11.0%
            </text>
          </svg>
        </ChartCard>
      </div>
    </section>
  );
}
