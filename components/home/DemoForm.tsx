"use client";
import { useState } from "react";
import Link from "next/link";
import posthog from "posthog-js";
import { submitAudit } from "@/lib/submitAudit";
import { LineIcon } from "@/components/LineIcon";
import AuditBooking from "@/components/AuditBooking";

// /demo/ multi-step form: three tap-to-answer questions, the website, then
// contact details. Same .form-card / .opts styles and submitAudit() path as
// the audit forms. On success it shows Gabe's calendar, prefilled.
const TOTAL = 5;

const PRACTICE = [
  { label: "Med spa", icon: "sparkles" },
  { label: "Plastic surgery", icon: "stethoscope" },
  { label: "Injector studio", icon: "syringe" },
  { label: "Laser clinic", icon: "zap" },
];
const WANT = [
  { label: "More bookings from my website", icon: "calendar" },
  { label: "Faster follow-up on new leads", icon: "call" },
  { label: "More new clients from ads", icon: "megaphone" },
  { label: "Show up higher on Google", icon: "search" },
  { label: "All of the above", icon: "layers" },
];
const VISITS = ["Under 300", "300 to 1,000", "1,000 to 5,000", "5,000+", "Not sure"];

export default function DemoForm() {
  const [step, setStep] = useState(1);
  const [practice, setPractice] = useState<string | null>(null);
  const [want, setWant] = useState<string | null>(null);
  const [visits, setVisits] = useState<string | null>(null);
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsOk, setSmsOk] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function next(n: number, stepName: string) {
    setError(false);
    setStep(n);
    posthog.capture("demo_step_completed", { step_name: stepName });
  }

  function websiteNext(e: React.FormEvent) {
    e.preventDefault();
    if (website.trim().length <= 3) {
      setError(true);
      return;
    }
    next(5, "website");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nm = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    const ok = nm.length > 1 && /.+@.+\..+/.test(em) && ph.replace(/\D/g, "").length >= 10;
    setError(!ok);
    if (!ok) return;
    setSubmitting(true);
    const q = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_campaign", "utm_content"].map((k) => (q.get(k) ? `${k}=${q.get(k)}` : "")).filter(Boolean);
    const result = await submitAudit({
      practice,
      need: `Free demo · wants: ${want ?? "n/a"} · visitors/mo: ${visits ?? "n/a"} · SMS opt-in: ${smsOk ? "yes" : "no"}`,
      worth: null,
      market: null,
      name: nm,
      email: em,
      website: website.trim(),
      phone: ph,
      source: ["demo", ...utm].join(" "),
    });
    setSubmitting(false);
    setDone(true);
    if (result.ok) {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      w.fbq?.("track", "Lead", { content_name: "Free demo" });
    }
  }

  const cls = (n: number) => `fstep${step === n && !done ? " active" : ""}`;
  const back = (to: number) => (
    <button type="button" className="backlink" onClick={() => setStep(to)}>
      ← Back
    </button>
  );

  return (
    <div className={`form-card demo-form${done ? " is-done" : ""}`} data-form id="demo-form">
      {!done && (
        <div className="progress">
          <span className="label">
            Step {step} of {TOTAL}
          </span>
          <span className="bars">
            {Array.from({ length: TOTAL }, (_, i) => (
              <i key={i} className={i < step ? "on" : undefined} />
            ))}
          </span>
        </div>
      )}

      <div className={cls(1)}>
        <h3>What kind of practice do you run?</h3>
        <p className="hint">So we show you the right examples.</p>
        <div className="opts">
          {PRACTICE.map((o) => (
            <button key={o.label} type="button" className={`opt${practice === o.label ? " sel" : ""}`} onClick={() => { setPractice(o.label); next(2, "practice"); }}>
              <span className="opt-ic" aria-hidden="true"><LineIcon name={o.icon} weight={2.4} /></span>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className={cls(2)}>
        <h3>What do you want most right now?</h3>
        <p className="hint">Pick the closest one.</p>
        <div className="opts">
          {WANT.map((o) => (
            <button key={o.label} type="button" className={`opt${want === o.label ? " sel" : ""}`} onClick={() => { setWant(o.label); next(3, "want"); }}>
              <span className="opt-ic" aria-hidden="true"><LineIcon name={o.icon} weight={2.4} /></span>
              {o.label}
            </button>
          ))}
        </div>
        {back(1)}
      </div>

      <div className={cls(3)}>
        <h3>About how many people visit your website a month?</h3>
        <p className="hint">A rough guess is fine.</p>
        <div className="opts">
          {VISITS.map((o) => (
            <button key={o} type="button" className={`opt${visits === o ? " sel" : ""}`} onClick={() => { setVisits(o); next(4, "visits"); }}>
              {o}
            </button>
          ))}
        </div>
        {back(2)}
      </div>

      <form className={cls(4)} onSubmit={websiteNext} noValidate>
        <h3>What&apos;s your website?</h3>
        <p className="hint">We&apos;ll use it to show the five systems on your own site.</p>
        <div className="field">
          <label htmlFor="dm-website">Your website</label>
          <input id="dm-website" type="url" placeholder="yourmedspa.com" autoComplete="url" inputMode="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>
        <p className={`ferror${error && step === 4 ? " show" : ""}`}>Add your website so we can prepare your demo.</p>
        <div className="fnav">
          <button type="submit" className="btn">Next</button>
        </div>
        {back(3)}
      </form>

      <form className={cls(5)} onSubmit={handleSubmit} noValidate>
        <h3>Last step: where should we send your demo details?</h3>
        <p className="hint">You&apos;ll pick your time on the next screen.</p>
        <div className="field">
          <label htmlFor="dm-name">Your name</label>
          <input id="dm-name" type="text" placeholder="First name" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="dm-email">Email</label>
          <input id="dm-email" type="email" placeholder="you@yourmedspa.com" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="dm-phone">Mobile</label>
          <input id="dm-phone" type="tel" placeholder="(555) 555-5555" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <label className="ba-sms">
          <input type="checkbox" checked={smsOk} onChange={(e) => setSmsOk(e.target.checked)} />
          <span>Text me about my demo (optional)</span>
        </label>
        <p className={`ferror${error && step === 5 ? " show" : ""}`}>Add your name, a valid email and your mobile.</p>
        <div className="fnav">
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? "Sending…" : "Pick my demo time"}
          </button>
        </div>
        <p className="ba-consent">
          By clicking Pick my demo time, you agree that More Booked Consults may call you at the number above about your
          demo, including calls made with automated technology and an AI-generated voice. Consent is not a condition of
          purchase. We only text you if you tick the box above: message frequency varies, msg &amp; data rates may apply,
          reply STOP to opt out or HELP for help. <Link href="/terms/">Terms</Link> · <Link href="/privacy/">Privacy</Link>
        </p>
        {back(4)}
      </form>

      {done && (
        <AuditBooking
          name={name.trim()}
          email={email.trim()}
          phone={phone.trim()}
          calLink="gabe-lee-42/30min"
          event="Free demo"
          title="Got it. Now pick your demo time."
          sub="We'll show the five systems on your own site."
          skip="Not ready to pick a time? We'll email you to find one that works."
        />
      )}
    </div>
  );
}
