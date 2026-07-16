"use client";
import { useState } from "react";
import PetalBackground from "./PetalBackground";

// Interactive revenue calculator ("The math"), ported from the v18 mockup
// (markup lines 672-706, calc() lines 799-811). Two sliders drive the live
// Today vs 2x revenue figures; the bars stay at 50% / 100% to depict the
// doubling. Same traffic, same ad spend, just a better-converting site.

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function MathCalculator() {
  const [leads, setLeads] = useState(20);
  const [value, setValue] = useState(600);

  const now = leads * value;
  const next = now * 2;

  return (
    <section className="math">
      <PetalBackground
        trios={[
          {
            top: "-120px",
            right: "-200px",
            speed: -0.28,
            dur: "18s",
            del: "-19s",
            size: 600,
            opacity: 0.55,
          },
        ]}
      />
      <div className="wrap">
        <div className="math-card">
          <div>
            <p className="eyebrow">The math</p>
            <h2>
              Small percentages. <em>Real money.</em>
            </h2>
            <p className="lede" style={{ fontSize: "16.5px" }}>
              Doubling conversion is the low end of what six years of testing
              produced at LaserAway. Drag the sliders and see it on your numbers.
            </p>
          </div>
          <div className="calc">
            <label htmlFor="leads">Consult requests per month</label>
            <input
              type="range"
              id="leads"
              min={5}
              max={200}
              step={5}
              value={leads}
              onChange={(e) => setLeads(Number(e.target.value))}
            />
            <div className="val">{leads}</div>

            <label htmlFor="value">What a booked consult is worth</label>
            <input
              type="range"
              id="value"
              min={100}
              max={3000}
              step={50}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
            <div className="val">{fmt(value)}</div>

            <div className="liveband" aria-live="polite">
              <div className="band">
                <div className="bl">
                  <span>Today</span>
                  <b>{fmt(now)}/mo</b>
                </div>
                <div className="bar">
                  <div className="fill" style={{ width: "50%" }} />
                </div>
              </div>
              <div className="band hot">
                <div className="bl">
                  <span>At 2× conversion</span>
                  <b>{fmt(next)}/mo</b>
                </div>
                <div className="bar">
                  <div className="fill" style={{ width: "100%" }} />
                </div>
              </div>
              <p className="calc-note">
                Same traffic. Same ad spend. Different site.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
