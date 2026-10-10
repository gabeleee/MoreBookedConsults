"use client";
import { useState } from "react";
import posthog from "posthog-js";
import { submitAudit } from "@/lib/submitAudit";
import { LineIcon } from "./LineIcon";

// Multi-step form for the paid-ad landing pages (/booking-audit/ for the
// tumbleweed video, /more-bookings/ for the UGC video). `page` tags the lead. Two tap-to-answer questions and the website come before any contact
// details. Same .form-card / .opts styles and the same submitAudit() path as
// AuditForm, plus mobile and the ad's UTM source. Fires the Meta pixel "Lead"
// event on success (when the pixel is installed).
const TOTAL = 4;

const BOOK_OPTS = [
  { label: "It opens our booking system", icon: "calendar" },
  { label: "It goes to a contact form", icon: "clipboard" },
  { label: "They have to call us", icon: "call" },
  { label: "I'm not sure", icon: "compass" },
];
const LOC_OPTS = ["1 location", "2–3 locations", "4 or more"];

export default function BookingAuditForm({ page = "booking-audit" }: { page?: string }) {
  const [step, setStep] = useState(1);
  const [bookPath, setBookPath] = useState<string | null>(null);
  const [locations, setLocations] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function next(n: number, stepName: string) {
    setError(false);
    setStep(n);
    posthog.capture("booking_audit_step_completed", { step_name: stepName });
  }

  function websiteNext(e: React.FormEvent) {
    e.preventDefault();
    if (website.trim().length <= 3) {
      setError(true);
      return;
    }
    next(4, "website");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nm = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    const ok = nm.length > 1 && /.+@.+\..+/.test(em) && ph.replace(/\D/g, "").length >= 10;
    setError(!ok);
    if (!ok) {
      posthog.capture("booking_audit_validation_failed");
      return;
    }
    setSubmitting(true);
    const q = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_campaign", "utm_content"].map((k) => (q.get(k) ? `${k}=${q.get(k)}` : "")).filter(Boolean);
    const result = await submitAudit({
      practice: "Med spa",
      need: `Booking Audit · Book button: ${bookPath ?? "n/a"} · ${locations ?? "locations n/a"}`,
      worth: null,
      market: null,
      name: nm,
      email: em,
      website: website.trim(),
      phone: ph,
      source: [page, ...utm].join(" "),
    });
    setSubmitting(false);
    setDone(true);
    if (result.ok) {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      w.fbq?.("track", "Lead", { content_name: "Booking Audit" });
    } else {
      posthog.capture("booking_audit_submission_failed");
    }
  }

  const cls = (n: number) => `fstep${step === n && !done ? " active" : ""}`;

  return (
    <div className="form-card ba-form" data-form id="get-audit">
      <div className="ba-banner">
        <b>Free Booking Flow Audit</b>
        <span>For med spa owners · a $100 value</span>
      </div>
      {!done && (
        <div className="progress">
          <span className="label">Step {step} of {TOTAL}</span>
          <span className="bars">
            {Array.from({ length: TOTAL }, (_, i) => (
              <i key={i} className={i < step ? "on" : undefined} />
            ))}
          </span>
        </div>
      )}

      <div className={cls(1)}>
        <h3>When someone tries to book, what happens?</h3>
        <p className="hint">Pick the closest match.</p>
        <div className="opts">
          {BOOK_OPTS.map((o) => (
            <button key={o.label} type="button" className={`opt${bookPath === o.label ? " sel" : ""}`} onClick={() => { setBookPath(o.label); next(2, "book_path"); }}>
              <span className="opt-ic" aria-hidden="true"><LineIcon name={o.icon} weight={2.6} /></span>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className={cls(2)}>
        <h3>How many locations do you have?</h3>
        <p className="hint">So the audit checks the path for each one.</p>
        <div className="opts">
          {LOC_OPTS.map((o) => (
            <button key={o} type="button" className={`opt${locations === o ? " sel" : ""}`} onClick={() => { setLocations(o); next(3, "locations"); }}>
              {o}
            </button>
          ))}
        </div>
        <button type="button" className="backlink" onClick={() => setStep(1)}>← Back</button>
      </div>

      <form className={cls(3)} onSubmit={websiteNext} noValidate>
        <h3>What&apos;s your website?</h3>
        <p className="hint">I&apos;ll walk its booking path on a phone, the way a new client does.</p>
        <div className="field">
          <label htmlFor="ba-website">Your med spa website</label>
          <input id="ba-website" type="url" placeholder="yourmedspa.com" autoComplete="url" inputMode="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <p className={`ferror${error && step === 3 ? " show" : ""}`}>Add your website so I know which booking path to audit.</p>
        <div className="fnav"><button type="submit" className="btn">Next</button></div>
        <button type="button" className="backlink" onClick={() => setStep(2)}>← Back</button>
      </form>

      <form className={cls(4)} onSubmit={handleSubmit} noValidate>
        <h3>Where should I send your audit?</h3>
        <p className="hint">One email back with your audit. No drip sequence.</p>
        <div className="field">
          <label htmlFor="ba-name">Your name</label>
          <input id="ba-name" type="text" placeholder="First name" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ba-email">Email</label>
          <input id="ba-email" type="email" placeholder="you@yourmedspa.com" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="ba-phone">Mobile</label>
          <input id="ba-phone" type="tel" placeholder="(555) 555-5555" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <p className={`ferror${error && step === 4 ? " show" : ""}`}>Add your name, a valid email and your mobile so the audit can reach you.</p>
        <div className="fnav">
          <button type="submit" className="btn" disabled={submitting}>{submitting ? "Sending…" : "Get my free audit"}</button>
        </div>
        <button type="button" className="backlink" onClick={() => setStep(3)}>← Back</button>
      </form>

      {done && (
        <div className="done show">
          <div className="mark">✓</div>
          <h3>Request received.</h3>
          <p>Your Booking Flow Audit will land in your inbox within 3 business days.</p>
        </div>
      )}
    </div>
  );
}
