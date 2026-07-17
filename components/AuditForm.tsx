"use client";
import { useEffect, useRef, useState } from "react";
import { submitAudit } from "@/lib/submitAudit";

// Reusable multi-step audit form (rendered in the hero and the bottom audit
// section). Ported from the mockup's initAuditForm(), with step 1 "What kind
// of practice?" added per CLAUDE.md (routing + segmentation). Front-end only, // submission routes through the single submitAudit() stub.

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const TOTAL_STEPS = 4;

// Step 2, aesthetic practice type (values feed segmentation).
const PRACTICES = [
  { value: "Med spa", emoji: "💆", label: "Med spa" },
  { value: "Plastic surgery", emoji: "🩺", label: "Plastic surgery" },
  { value: "Injector", emoji: "💉", label: "Injector" },
  { value: "Laser clinic", emoji: "✨", label: "Laser clinic" },
];

// Step 1, what they want (values match the mockup's data-need strings).
const NEEDS = [
  {
    value: "Convert existing traffic (CRO)",
    emoji: "📈",
    label: "Convert the traffic I already have",
  },
  {
    value: "More traffic from Google (SEO)",
    emoji: "🔍",
    label: "More traffic from Google",
  },
  {
    value: "New patient leads from paid ads (Pay-Per-Lead)",
    emoji: "🎯",
    label: "New patient leads from paid ads",
  },
  { value: "Both CRO + SEO", emoji: "🧰", label: "A little bit of everything" },
  { value: "Not sure yet", emoji: "🤔", label: "Not sure, tell me what you see" },
];

type Props = {
  /** Unique per instance (hero / bottom) so label htmlFor ids don't collide. */
  idPrefix: string;
  /**
   * Pre-select a step-1 "need" and skip straight to step 2. Used by the
   * /claim-your-market/ page so a Pay-Per-Lead click doesn't re-declare intent.
   */
  presetNeed?: string;
};

export default function AuditForm({ idPrefix, presetNeed }: Props) {
  const [step, setStep] = useState(presetNeed ? 2 : 1);
  const [done, setDone] = useState(false);

  const [practice, setPractice] = useState<string | null>(null);
  const [need, setNeed] = useState<string | null>(presetNeed ?? null);
  const [worth, setWorth] = useState<number | null>(null);
  const [worthDisplay, setWorthDisplay] = useState(600);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [market, setMarket] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pay-Per-Lead prospects get market-availability framing and a city field.
  const isPPL = (need ?? "").includes("Pay-Per-Lead");

  const worthRef = useRef<HTMLInputElement>(null);

  // Mirror the mockup: 'change' (slider release / keyboard commit) advances.
  useEffect(() => {
    const el = worthRef.current;
    if (!el) return;
    const onChange = () => {
      setWorth(Number(el.value));
      setStep(4);
    };
    el.addEventListener("change", onChange);
    return () => el.removeEventListener("change", onChange);
  }, []);

  async function handleSubmit() {
    const nm = name.trim();
    const em = email.trim();
    const ur = website.trim();
    const ok = nm.length > 1 && /.+@.+\..+/.test(em) && ur.length > 3;
    setError(!ok);
    if (!ok) return;
    setSubmitting(true);
    await submitAudit({
      practice,
      need,
      worth,
      market: market.trim() || null,
      name: nm,
      email: em,
      website: ur,
    });
    setSubmitting(false);
    setDone(true);
  }

  const stepClass = (n: number) => `fstep${step === n && !done ? " active" : ""}`;
  const id = (field: string) => `${idPrefix}-${field}`;

  return (
    <div className="form-card" data-form>
      {!done && (
        <div className="progress">
          <span className="label">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="bars">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <i key={i} className={i < step ? "on" : undefined} />
            ))}
          </span>
        </div>
      )}

      {/* Step 1, what they're looking for */}
      <div className={stepClass(1)} data-step="1">
        <h3>How do you want to grow?</h3>
        <p className="hint">Pick the one that sounds most like you.</p>
        <div className="opts">
          {NEEDS.map((n) => (
            <button
              key={n.value}
              type="button"
              className="opt"
              onClick={() => {
                setNeed(n.value);
                setStep(2);
              }}
            >
              <span className="e">{n.emoji}</span> {n.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2, practice type */}
      <div className={stepClass(2)} data-step="2">
        <h3>What kind of practice?</h3>
        <p className="hint">This tailors the audit to your patients and market.</p>
        <div className="opts">
          {PRACTICES.map((p) => (
            <button
              key={p.value}
              type="button"
              className="opt"
              onClick={() => {
                setPractice(p.value);
                setStep(3);
              }}
            >
              <span className="e">{p.emoji}</span> {p.label}
            </button>
          ))}
        </div>
        <button type="button" className="backlink" onClick={() => setStep(1)}>
          ← Back
        </button>
      </div>

      {/* Step 3, consult value */}
      <div className={stepClass(3)} data-step="3">
        <h3>What&apos;s a booked consult worth to you?</h3>
        <p className="hint">Ballpark is fine, it helps rank the findings by revenue.</p>
        <div className="calc2">
          <div className="slider-val">{fmt(worthDisplay)}</div>
          <input
            ref={worthRef}
            type="range"
            min={100}
            max={3000}
            step={50}
            value={worthDisplay}
            onChange={(e) => setWorthDisplay(Number(e.target.value))}
            aria-label="Value of a booked consult in dollars"
          />
          <button
            type="button"
            className="dunno"
            onClick={() => {
              setWorth(null);
              setStep(4);
            }}
          >
            I don&apos;t know, skip this
          </button>
        </div>
        <button type="button" className="backlink" onClick={() => setStep(2)}>
          ← Back
        </button>
      </div>

      {/* Step 4, contact details */}
      <div className={stepClass(4)} data-step="4">
        <h3>
          {isPPL ? "Where do I send your market check?" : "Where do I send the findings?"}
        </h3>
        <p className="hint">
          {isPPL
            ? "One email back with your market availability. No drip sequence."
            : "One email back. No drip sequence."}
        </p>
        <div className="field">
          <label htmlFor={id("name")}>Your name</label>
          <input
            id={id("name")}
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={id("email")}>Email</label>
          <input
            id={id("email")}
            type="email"
            placeholder="you@yourpractice.com"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor={id("website")}>Practice website</label>
          <input
            id={id("website")}
            type="url"
            placeholder="yourpractice.com"
            autoComplete="url"
            inputMode="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        {isPPL && (
          <div className="field">
            <label htmlFor={id("market")}>Your city / market</label>
            <input
              id={id("market")}
              type="text"
              placeholder="e.g. Austin, TX"
              autoComplete="address-level2"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            />
          </div>
        )}
        <p className={`ferror${error ? " show" : ""}`}>
          Add your name, a valid email, and your website so the audit can reach you.
        </p>
        <div className="fnav">
          <button
            type="button"
            className="btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Sending…" : "Send my free audit"}
          </button>
        </div>
        <button type="button" className="backlink" onClick={() => setStep(3)}>
          ← Back
        </button>
      </div>

      {/* Success state */}
      <div className={`done${done ? " show" : ""}`}>
        <div className="mark">✓</div>
        {isPPL ? (
          <>
            <h3>Request received.</h3>
            <p>
              I&apos;ll check whether your market is still open and send back
              whether Pay-Per-Lead fits your practice, within 3 business days.
            </p>
          </>
        ) : (
          <>
            <h3>Audit request received.</h3>
            <p>
              Your prioritized findings doc will land in your inbox within 3
              business days. If your site&apos;s already airtight, I&apos;ll tell
              you that too.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
