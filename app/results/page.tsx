import type { Metadata } from "next";
import Link from "next/link";
import ChartCard from "@/components/ChartCard";
import ConversionChart from "@/components/ConversionChart";
import PetalBackground from "@/components/PetalBackground";
import AuditForm from "@/components/AuditForm";
import Audit from "@/components/Audit";

export const metadata: Metadata = {
  title: "Results",
  description:
    "The track record behind More Booked Consults: 3% to 11% sitewide conversion, 210x ROI, and 2,600+ variations tested by Gabe Meierotto as Director of CRO at LaserAway. Every number sourced, with the published case study to download.",
  alternates: { canonical: "/results/" },
};

const PDF = "/laseraway-intellimize-case-study.pdf";

// Results / track record. LaserAway numbers are attributed to Gabe personally
// in his former role, never to this company. No promises about your results.
// Program stats are sourced from the Intellimize-published case study (PDF in
// /public, viewable + downloadable below).
export default function Results() {
  return (
    <main>
      <section className="results-hero">
        <PetalBackground
          petals={[
            { top: "12%", right: "6%", r: "18deg", size: 54, fill: "#CBC4F5" },
            { top: "58%", right: "14%", r: "-24deg", size: 38, fill: "#C4D6FA" },
            { top: "30%", left: "3%", r: "40deg", size: 44, fill: "#CBC4F5" },
          ]}
          trios={[
            {
              top: "-150px",
              right: "-200px",
              speed: -0.18,
              dur: "20s",
              del: "-9s",
              size: 620,
              opacity: 0.35,
            },
          ]}
        />
        <div className="wrap">
          <div className="r-hero-top">
            <div className="r-hero-intro">
          <p className="eyebrow">Results · LaserAway · 2017–2022</p>
          <h1>The numbers this practice is built on.</h1>
          <p className="lede">
            Before More Booked Consults existed, founder Gabe Meierotto spent six
            years as{" "}
            <strong>
              Director of CRO at{" "}
              <a
                className="r-ext"
                href="https://www.laseraway.com/"
                target="_blank"
                rel="noopener"
              >
                LaserAway
              </a>
            </strong>
            , the largest
            medspa chain in the U.S., owning the testing roadmap end to end.
          </p>
          <p className="lede">
            Every number on this page is a result <strong>Gabe personally
            drove for LaserAway</strong> in that role, not a claim about work
            More Booked Consults has done for clients.
          </p>

          <div className="attribution r-attrib">
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <div className="who">
              <b>Gabe Meierotto</b>
              <span>
                Director of CRO at LaserAway, 2017–2022 · Now founder, More
                Booked Consults
              </span>
            </div>
          </div>
            </div>
            <AuditForm idPrefix="results-hero" />
          </div>

          <div className="r-hero-stats">
            <div className="r-hero-stat">
              <div className="n">3% → 11%</div>
              <div className="l">Sitewide conversion</div>
              <div className="s">LaserAway · 2017–2022</div>
            </div>
            <div className="r-hero-stat">
              <div className="n">210x</div>
              <div className="l">ROI on the program</div>
              <div className="s">Intellimize case study</div>
            </div>
            <div className="r-hero-stat">
              <div className="n">2,600+</div>
              <div className="l">Variations tested</div>
              <div className="s">Intellimize case study</div>
            </div>
            <div className="r-hero-stat">
              <div className="n">200%</div>
              <div className="l">Avg lift, core pages</div>
              <div className="s">Intellimize case study</div>
            </div>
          </div>

          <div className="r-hero-meta">
            <span className="chip">
              Independently documented ·{" "}
              <a href={PDF} download>
                Download the case study (PDF)
              </a>
            </span>
          </div>

          <nav className="r-toc" aria-label="Jump to section">
            <a href="#conversion">The headline number</a>
            <a href="#program">The testing program</a>
            <a href="#tested">What got tested</a>
            <a href="#source">The source document</a>
          </nav>
        </div>
      </section>

      <section className="page-section r-anchor" id="conversion">
        <PetalBackground
          trios={[
            {
              bottom: "-160px",
              left: "-220px",
              speed: -0.22,
              dur: "23s",
              del: "-14s",
              size: 640,
              opacity: 0.32,
            },
          ]}
        />
        <div className="wrap">
          <div className="r-section-head">
            <p className="eyebrow">The headline number</p>
            <h2>Sitewide conversion, 3% → 11% in six years.</h2>
            <p>
              One controlled test at a time, compounding quarter after quarter.
            </p>
          </div>

          <div className="r-split">
            <ChartCard
              title="Sitewide conversion rate"
              range="3% → 11%"
              meta="LaserAway · 2017–2022 · Quarterly"
              delta="▲ +267%"
              caption="Sitewide conversion during Gabe's six years running the testing program at LaserAway."
            >
              <ConversionChart />
            </ChartCard>

            <div className="r-side-stats">
              <div className="r-side-stat">
                <div className="n">+267%</div>
                <div className="t">
                  <b>Relative lift in sitewide conversion</b> over the six-year
                  program, from a 3% baseline to 11%.
                </div>
              </div>
              <div className="r-side-stat">
                <div className="n">6 yrs</div>
                <div className="t">
                  <b>One owner of the roadmap.</b> Gabe ran the testing program
                  end to end from 2017 to 2022.
                </div>
              </div>
              <div className="r-side-stat">
                <div className="n">115+</div>
                <div className="t">
                  <b>
                    <a
                      className="r-ext"
                      href="https://www.laseraway.com/"
                      target="_blank"
                      rel="noopener"
                    >
                      LaserAway
                    </a>{" "}
                    locations
                  </b>{" "}
                  across North America fed by the website&apos;s online booking
                  funnel.
                </div>
              </div>
              <div className="r-side-stat">
                <div className="n">Billions</div>
                <div className="t">
                  <b>Of possible page versions</b> shown to real visitors across
                  the 2,600+ launched variations.
                </div>
              </div>
            </div>
          </div>

          <div className="r-note">
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <p>
              <b>Whose result is this?</b> Gabe&apos;s, from his six years
              running CRO in-house at LaserAway. More Booked Consults launched
              after he left, so this is his personal track record, not a client
              result of this consultancy.
            </p>
          </div>
        </div>
      </section>

      <section className="page-section alt r-anchor" id="program">
        <div className="wrap">
          <div className="r-section-head">
            <p className="eyebrow">The testing program</p>
            <h2>What 2,600+ variations actually produced.</h2>
            <p>
              Average lift by test area, as documented in the published case
              study.
            </p>
          </div>

          <div className="r-split">
            <div className="r-bars">
              <div className="r-bars-title">Average lift by test area</div>
              <div className="r-bars-meta">
                LaserAway · Intellimize case study
              </div>
              <div className="r-bar-row">
                <div className="r-bar-label">
                  <span>Core service pages</span>
                  <span className="v">+200%</span>
                </div>
                <div className="r-bar-track">
                  <div className="r-bar-fill" style={{ width: "100%" }} />
                </div>
              </div>
              <div className="r-bar-row">
                <div className="r-bar-label">
                  <span>Page versions sitewide*</span>
                  <span className="v">+100%</span>
                </div>
                <div className="r-bar-track">
                  <div className="r-bar-fill" style={{ width: "50%" }} />
                </div>
              </div>
              <div className="r-bar-row">
                <div className="r-bar-label">
                  <span>Exit-intent modal variations</span>
                  <span className="v">2x</span>
                </div>
                <div className="r-bar-track">
                  <div className="r-bar-fill" style={{ width: "50%" }} />
                </div>
              </div>
              <p className="r-bar-note">
                *Average lift across page versions shown, August 2020 to
                November 2021. Winning combinations were baked back into the
                base site as they proved out.
              </p>
            </div>

            <div className="r-side-stats">
              <div className="r-side-stat">
                <div className="n">2,600+</div>
                <div className="t">
                  <b>Variations launched</b> across the multi-step booking
                  form, core service pages, and exit modals.
                </div>
              </div>
              <div className="r-side-stat">
                <div className="n">11x</div>
                <div className="t">
                  <b>Testing velocity</b> versus the previous tooling, the
                  speed that made 2,600+ variations possible.
                </div>
              </div>
              <div className="r-side-stat">
                <div className="n">210x</div>
                <div className="t">
                  <b>Return on the program</b>{" "}
                  with minimal internal development resources, per{" "}
                  <a
                    className="r-ext"
                    href="https://www.laseraway.com/"
                    target="_blank"
                    rel="noopener"
                  >
                    LaserAway
                  </a>
                  &apos;s CMO.
                </div>
              </div>
            </div>
          </div>

          <figure className="r-quote" style={{ marginTop: 36 }}>
            <blockquote>
              Combining our team&apos;s ideas with Intellimize&apos;s guidance
              and machine-learning technology has driven incredible results. A
              210x ROI with minimal internal resources is impressive.
            </blockquote>
            <figcaption>
              <b>Paul Baumgarthuber</b>
              CMO, LaserAway · from the published case study
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="page-section r-anchor" id="tested">
        <PetalBackground
          trios={[
            {
              top: "-140px",
              right: "-230px",
              speed: -0.2,
              dur: "21s",
              del: "-6s",
              size: 600,
              opacity: 0.3,
            },
          ]}
        />
        <div className="wrap">
          <div className="r-section-head">
            <p className="eyebrow">What got tested</p>
            <h2>The experiments behind the numbers.</h2>
            <p>
              No redesign-and-pray. Every lift traces back to a specific,
              controlled experiment.
            </p>
          </div>

          <div className="r-note" style={{ marginTop: 0, marginBottom: 26 }}>
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <p>
              <b>Every experiment below ran on Gabe&apos;s roadmap at
              LaserAway.</b> He owned the hypotheses, the prioritization, and
              the results reporting from 2017 to 2022.
            </p>
          </div>

          <div className="r-tested">
            <div className="r-tested-card">
              <h3>The multi-step booking form</h3>
              <p>
                <a
                  className="r-ext"
                  href="https://www.laseraway.com/"
                  target="_blank"
                  rel="noopener"
                >
                  LaserAway
                </a>
                &apos;s main lead-gen engine, tested combination by
                combination.
              </p>
              <ul>
                <li>
                  <b>Number of steps</b> in the form
                </li>
                <li>
                  <b>Icon types vs. text-only</b> steps
                </li>
                <li>
                  <b>Alphabetized icons and options</b> within each step
                </li>
                <li>
                  <b>Auto slide progression</b> between steps
                </li>
                <li>
                  <b>A confirmation check</b> added per step
                </li>
              </ul>
            </div>
            <div className="r-tested-card">
              <h3>Core service pages</h3>
              <p>
                The pages that sell laser hair removal, tattoo removal, and
                other treatments.
              </p>
              <ul>
                <li>
                  <b>200% average lift</b> across core service pages
                </li>
                <li>
                  <b>AI-driven personalization</b> matching page versions to
                  each visitor
                </li>
                <li>
                  <b>Winners baked into the base site</b> as they proved out
                </li>
              </ul>
            </div>
            <div className="r-tested-card">
              <h3>Exit-intent recovery</h3>
              <p>
                Catching visitors on their way out instead of losing them
                silently.
              </p>
              <ul>
                <li>
                  <b>Exit modal variations</b> tested continuously
                </li>
                <li>
                  <b>Average 2x lift</b> over running no modal at all
                </li>
              </ul>
            </div>
            <div className="r-tested-card">
              <h3>Agility when it counted</h3>
              <p>
                When COVID shut down in-person consults, the funnel pivoted in
                weeks.
              </p>
              <ul>
                <li>
                  <b>Virtual consultation messaging</b> tested and shipped for
                  the sales team
                </li>
                <li>
                  <b>Booking infrastructure repointed</b> so revenue kept
                  flowing through the shutdown
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt r-anchor" id="source">
        <div className="wrap">
          <div className="r-doc">
            <div className="r-doc-info">
              <p className="eyebrow">The source document</p>
              <h2>Don&apos;t take our word for it.</h2>
              <p>
                The program was documented by <strong>Intellimize</strong>, the
                testing platform LaserAway ran it on, in a published case study.
              </p>
              <p>
                Read it right here, or download the PDF and check the numbers
                yourself.
              </p>
              <div className="r-doc-facts">
                <div>
                  <span className="k">Title</span>
                  <span>LaserAway Drives 200% Growth with Intellimize</span>
                </div>
                <div>
                  <span className="k">Named</span>
                  <span>
                    Gabe Meierotto, Conversion Rate Optimization Director
                  </span>
                </div>
                <div>
                  <span className="k">Company</span>
                  <span>LaserAway · 115+ locations · Health &amp; Beauty</span>
                </div>
                <div>
                  <span className="k">Publisher</span>
                  <span>Intellimize (now a Webflow company)</span>
                </div>
              </div>
              <div className="r-doc-actions">
                <a className="btn" href={PDF} download>
                  Download the PDF
                </a>
                <a
                  className="btn-ghost"
                  href={PDF}
                  target="_blank"
                  rel="noopener"
                >
                  Open full screen
                </a>
              </div>
            </div>
            <div className="r-doc-viewer">
              <div className="r-doc-bar">
                <span>laseraway-intellimize-case-study.pdf</span>
                <a href={PDF} download>
                  Download ↓
                </a>
              </div>
              <a
                className="r-doc-scroll"
                href={PDF}
                target="_blank"
                rel="noopener"
                aria-label="Open the LaserAway Intellimize case study PDF"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/case-study-preview.jpg"
                  alt="First page of the case study: LaserAway Drives 200% Growth with Intellimize"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap prose">
          <p className="eyebrow">The fine print</p>
          <h2>What these numbers mean for your practice.</h2>
          <div className="founder-id">
            <div className="avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/gabe.jpg" alt="Gabe Meierotto" />
            </div>
            <div className="who">
              <b>Gabe Meierotto</b>
              <span>Founder, More Booked Consults</span>
            </div>
          </div>
          <p>
            These are results Gabe drove for{" "}
            <a
              className="r-ext"
              href="https://www.laseraway.com/"
              target="_blank"
              rel="noopener"
            >
              LaserAway
            </a>{" "}
            as their in-house Director of CRO,{" "}
            <strong>not a promise</strong> of what your practice will do.
          </p>
          <p>
            They are his personal track record from that role, not client
            results of More Booked Consults.
          </p>
          <p>
            Every market, site, and starting point is different.
          </p>
          <p>
            What carries over is the method: disciplined testing, one change at
            a time, run long enough to trust the result.
          </p>
          <p>
            That same playbook now goes to work for independent aesthetic
            practices, where a single winning test can show up on next
            month&apos;s schedule.
          </p>
          <p className="cross-links">
            Explore <Link href="/medspa-marketing/">medspa marketing</Link>,{" "}
            <Link href="/plastic-surgeon-marketing/">
              plastic surgeon marketing
            </Link>
            , or how <Link href="/pricing/">pricing works</Link>.
          </p>
        </div>
      </section>

      <Audit />
    </main>
  );
}
