"use client";
import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";
import { submitAudit } from "@/lib/submitAudit";

// Reusable multi-step audit form (rendered in the hero and the bottom audit
// section). Ported from the mockup's initAuditForm(), with step 1 "What kind
// of practice?" added per CLAUDE.md (routing + segmentation). Front-end only, // submission routes through the single submitAudit() stub.

const fmt = (n: number) => "$" + n.toLocaleString("en-US");
const TOTAL_STEPS = 4;

// Line icons (Lucide paths, 24px grid) for the option cards. Stroke only, so
// they take the card's color: violet at rest, white on hover (see .opt-ic).
const ICON_PATHS: Record<string, string[]> = {
  sparkles: [
    "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
    "M20 3v4",
    "M22 5h-4",
  ],
  stethoscope: [
    "M11 2v2",
    "M5 2v2",
    "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",
    "M8 15a6 6 0 0 0 12 0v-3",
    "M22 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
  ],
  syringe: ["m18 2 4 4", "m17 7 3-3", "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", "m9 11 4 4", "m5 19-3 3", "m14 4 6 6"],
  zap: ["M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"],
  trending: ["M22 7 13.5 15.5 8.5 10.5 2 17", "M16 7h6v6"],
  search: ["M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0z", "m21 21-4.3-4.3"],
  megaphone: ["m3 11 18-5v12L3 14v-3z", "M11.6 16.8a3 3 0 1 1-5.8-1.6"],
  layers: [
    "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
    "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",
    "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",
  ],
  compass: ["M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z", "m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"],
};

function OptIcon({ name }: { name: string }) {
  return (
    <span className="opt-ic" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {ICON_PATHS[name].map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    </span>
  );
}

// Step 2, aesthetic practice type (values feed segmentation).
const PRACTICES = [
  { value: "Med spa", icon: "sparkles", label: "Med spa" },
  { value: "Plastic surgery", icon: "stethoscope", label: "Plastic surgery" },
  { value: "Injector", icon: "syringe", label: "Injector" },
  { value: "Laser clinic", icon: "zap", label: "Laser clinic" },
];

// Step 1, what they want (values match the mockup's data-need strings).
const NEEDS = [
  {
    value: "Convert existing traffic (CRO)",
    icon: "trending",
    label: "Convert the traffic I already have",
  },
  {
    value: "More traffic from Google (SEO)",
    icon: "search",
    label: "More traffic from Google",
  },
  {
    value: "New leads from paid ads (Managed Ads)",
    icon: "megaphone",
    label: "New leads from paid ads",
  },
  { value: "Both CRO + SEO", icon: "layers", label: "A little bit of everything" },
  { value: "Not sure yet", icon: "compass", label: "Not sure, tell me what you see" },
];

type Props = {
  /** Unique per instance (hero / bottom) so label htmlFor ids don't collide. */
  idPrefix: string;
  /**
   * Pre-select a step-1 "need" and skip straight to step 2. Used by the
   * /get-leads/ page so a managed-ads click doesn't re-declare intent.
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

  // Managed-ads prospects get ads-review framing and a city field.
  const isAds = (need ?? "").includes("Managed Ads");

  const worthRef = useRef<HTMLInputElement>(null);

  // Mirror the mockup: 'change' (slider release / keyboard commit) advances.
  useEffect(() => {
    const el = worthRef.current;
    if (!el) return;
    const onChange = () => {
      setWorth(Number(el.value));
      setStep(4);
      posthog.capture("audit_form_step_completed", {
        form_location: idPrefix,
        step_name: "consult_value",
        consult_value_provided: true,
      });
    };
    el.addEventListener("change", onChange);
    return () => el.removeEventListener("change", onChange);
  }, [idPrefix]);

  async function handleSubmit() {
    const nm = name.trim();
    const em = email.trim();
    const ur = website.trim();
    const ok = nm.length > 1 && /.+@.+\..+/.test(em) && ur.length > 3;
    setError(!ok);
    if (!ok) {
      posthog.capture("audit_form_validation_failed", {
        form_location: idPrefix,
        has_valid_name: nm.length > 1,
        has_valid_email: /.+@.+\..+/.test(em),
        has_valid_website: ur.length > 3,
      });
      return;
    }
    setSubmitting(true);
    const result = await submitAudit({
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
    if (!result.ok) {
      posthog.capture("audit_form_submission_failed", {
        form_location: idPrefix,
        practice_type: practice ?? "unknown",
        growth_goal: need ?? "unknown",
      });
    }
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
                posthog.capture("audit_form_started", {
                  form_location: idPrefix,
                  growth_goal: n.value,
                });
              }}
            >
              <OptIcon name={n.icon} /> {n.label}
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
                posthog.capture("audit_form_step_completed", {
                  form_location: idPrefix,
                  step_name: "practice_type",
                  practice_type: p.value,
                });
              }}
            >
              <OptIcon name={p.icon} /> {p.label}
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
              posthog.capture("audit_form_step_completed", {
                form_location: idPrefix,
                step_name: "consult_value",
                consult_value_provided: false,
              });
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
          {isAds ? "Where do I send your ads review?" : "Where do I send the findings?"}
        </h3>
        <p className="hint">
          {isAds
            ? "One email back with what I'd run for you. No drip sequence."
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
        {isAds && (
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
            {submitting ? "Sending…" : isAds ? "Get started" : "Send my free audit"}
          </button>
        </div>
        <button type="button" className="backlink" onClick={() => setStep(3)}>
          ← Back
        </button>
      </div>

      {/* Success state */}
      <div className={`done${done ? " show" : ""}`}>
        <div className="mark">✓</div>
        {isAds ? (
          <>
            <h3>Request received.</h3>
            <p>
              I&apos;ll look at your site and any ads you&apos;re running, and send
              back whether managed ads fit your practice, within 3 business days.
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
