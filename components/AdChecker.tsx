"use client";
import { useRef, useState } from "react";
import posthog from "posthog-js";
import { posthogRequestHeaders } from "@/lib/posthog-client";
import { MAX_CHARS, type CheckResult, type Flag } from "@/lib/ad-check";
import AuditCtaLink from "./AuditCtaLink";
import { LineIcon } from "./LineIcon";

// The /medspa-ad-checker/ tool: paste ad copy, get a risk score, the flagged
// lines highlighted, and a fix for each flag. Calls /api/ad-check/ (trailingSlash is on).

const EXAMPLES = [
  {
    label: "Risky Botox ad",
    text: "Over 40? Those wrinkles are making you look tired.\nOur board-certified master injector delivers guaranteed results with painless botox and zero downtime.\nThe #1 med spa in town. Book today!",
  },
  {
    label: "Weight loss ad",
    text: "Generic Ozempic is finally here!\nLose 30 lbs in 30 days with our FDA-approved semaglutide program, same results as Wegovy for half the price.",
  },
  {
    label: "Cleaner ad",
    text: "Softer lines, still you.\nBotox Cosmetic from $12/unit with our licensed nurse injectors.\nBook a free consult this week.",
  },
];

const VERDICT = {
  low: { title: "Low risk", note: "Nothing serious stood out. Read the notes below before it runs." },
  some: { title: "Some risk", note: "A few lines could get the ad rejected or draw a complaint. The fixes are quick." },
  high: { title: "High risk", note: "This ad is likely to be rejected by Meta or flagged by a regulator as written." },
};

function ScoreRing({ score, verdict }: { score: number; verdict: CheckResult["verdict"] }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className={`ac-ring ac-${verdict}`} role="img" aria-label={`Score ${score} out of 100`}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r={r} className="ac-ring-bg" />
        <circle cx="60" cy="60" r={r} className="ac-ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} />
      </svg>
      <span className="ac-ring-num">
        {score}
        <small>/100</small>
      </span>
    </div>
  );
}

function FlagCard({ f, nums }: { f: Flag; nums: number[] }) {
  return (
    <li className={`ac-flag ac-sev-${f.severity} ${f.status === "watch" ? "ac-watch" : ""}`}>
      <div className="ac-flag-head">
        {nums.length > 0 && (
          <span className="ac-nums">
            {nums.map((n) => (
              <span className="ac-num" key={n}>
                {n}
              </span>
            ))}
          </span>
        )}
        <div>
          <p className="ac-flag-title">{f.label}</p>
          <p className="ac-flag-meta">
            {f.status === "watch" ? "Worth a look" : f.severity === "high" ? "High risk" : f.severity === "medium" ? "Medium risk" : "Low risk"}
            {" · "}
            {f.source}
          </p>
        </div>
      </div>
      <p className="ac-why">{f.why}</p>
      <p className="ac-fix">
        <LineIcon name="pen" /> {f.fix}
      </p>
      <div className="ac-eg">
        <p className="ac-eg-no">
          <span>Risky</span>
          {f.before}
        </p>
        <p className="ac-eg-yes">
          <span>Safer</span>
          {f.after}
        </p>
      </div>
    </li>
  );
}

export default function AdChecker() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  async function run() {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/ad-check/", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...posthogRequestHeaders() },
        body: JSON.stringify({ text }),
      });
      const j = await r.json().catch(() => ({ ok: false, error: "Something went wrong. Try again." }));
      if (!j.ok) {
        setError(j.error ?? "Something went wrong. Try again.");
        return;
      }
      setResult(j as CheckResult);
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch {
      setError("Couldn't reach the checker. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  // Number flags by the line they point at, in reading order.
  const flagged = result?.flags ?? [];
  const lineNums = new Map<number, number>();
  [...new Set(flagged.flatMap((f) => f.lines))].sort((a, b) => a - b).forEach((l, i) => lineNums.set(l, i + 1));
  const lineSev = (i: number) => {
    const fs = flagged.filter((f) => f.lines.includes(i));
    if (!fs.length) return null;
    if (fs.some((f) => f.status === "flag" && f.severity === "high")) return "high";
    if (fs.some((f) => f.status === "flag")) return "medium";
    return "watch";
  };
  const remaining = MAX_CHARS - text.length;

  return (
    <div className="ac">
      <div className="form-card ac-input">
        <label htmlFor="ac-text" className="ac-label">
          Paste your ad, caption or landing page copy
        </label>
        <textarea
          id="ac-text"
          value={text}
          maxLength={MAX_CHARS}
          rows={7}
          placeholder="e.g. Botox from $12/unit with our licensed nurse injectors. Book a free consult this week."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="ac-row">
          <div className="ac-examples">
            <span>Try:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => {
                  setText(ex.text);
                  setResult(null);
                  posthog.capture?.("ad_check_example", { example: ex.label });
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
          <span className={`ac-count ${remaining < 100 ? "ac-low" : ""}`}>{remaining.toLocaleString("en-US")} left</span>
        </div>
        <button type="button" className="btn ac-go" disabled={busy || text.trim().length < 10} onClick={run}>
          {busy ? "Checking…" : "Check my ad"}
        </button>
        {error && <p className="ac-error">{error}</p>}
        <p className="ac-note">Free, no sign-up. Your text isn&apos;t saved. A risk check, not legal advice.</p>
      </div>

      {result && (
        <div className="ac-result" ref={resultRef} aria-live="polite">
          <div className="ac-summary">
            <ScoreRing score={result.score} verdict={result.verdict} />
            <div>
              <p className="eyebrow">Ad risk score</p>
              <h2>{VERDICT[result.verdict].title}</h2>
              <p>{VERDICT[result.verdict].note}</p>
            </div>
          </div>

          <div className="ac-ad">
            <p className="ac-sub">Your ad</p>
            <p className="ac-ad-text">
              {result.lines.map((l, i) => {
                const sev = lineSev(i);
                return (
                  <span key={i}>
                    {sev ? (
                      <mark className={`ac-mark ac-mark-${sev}`}>
                        <span className="ac-num">{lineNums.get(i)}</span>
                        {l}
                      </mark>
                    ) : (
                      l
                    )}{" "}
                  </span>
                );
              })}
            </p>
          </div>

          {result.flags.length > 0 && (
            <>
              <p className="ac-sub">
                {result.flags.filter((f) => f.status === "flag").length} flagged
                {result.flags.some((f) => f.status === "watch") ? `, ${result.flags.filter((f) => f.status === "watch").length} worth a look` : ""}
              </p>
              <ul className="ac-flags">
                {result.flags.map((f) => (
                  <FlagCard key={f.id} f={f} nums={f.lines.map((l) => lineNums.get(l)!).filter(Boolean)} />
                ))}
              </ul>
            </>
          )}

          {result.passed.length > 0 && (
            <details className="ac-passed">
              <summary>
                <LineIcon name="check" /> Passed {result.passed.length} of {result.passed.length + result.flags.length} checks
              </summary>
              <ul>
                {result.passed.map((p) => (
                  <li key={p.id}>
                    <LineIcon name="check" /> No issue: {p.label.charAt(0).toLowerCase() + p.label.slice(1)}
                  </li>
                ))}
              </ul>
            </details>
          )}

          <div className="ac-cta">
            <div>
              <p className="ac-cta-title">Passing review is the easy part. Getting booked consults is the hard part.</p>
              <p>
                Get a free audit of your ads and the page they send people to, with the first fixes to test.
              </p>
            </div>
            <AuditCtaLink href="/free-audit/" location="ad_checker" className="btn">
              Get a free audit
            </AuditCtaLink>
          </div>
        </div>
      )}
    </div>
  );
}
