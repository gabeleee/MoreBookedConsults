"use client";
import { useState } from "react";
import posthog from "posthog-js";
import { submitAudit } from "@/lib/submitAudit";

// One-step form for the /booking-audit/ paid-ad landing page (the tumbleweed
// video). Same .form-card styles and the same submitAudit() path as AuditForm,
// plus a mobile number and the ad's UTM source. Fires the Meta pixel "Lead"
// event on success so Meta can optimize for audit requests.
export default function BookingAuditForm() {
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ur = website.trim();
    const nm = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    const ok = ur.length > 3 && nm.length > 1 && /.+@.+\..+/.test(em) && ph.replace(/\D/g, "").length >= 10;
    setError(!ok);
    if (!ok) {
      posthog.capture("booking_audit_validation_failed");
      return;
    }
    setSubmitting(true);
    const q = new URLSearchParams(window.location.search);
    const source = ["booking-audit", ...["utm_source", "utm_campaign", "utm_content"].map((k) => (q.get(k) ? `${k}=${q.get(k)}` : "")).filter(Boolean)].join(" ");
    const result = await submitAudit({
      practice: "Med spa",
      need: "Booking Audit (booking flow)",
      worth: null,
      market: null,
      name: nm,
      email: em,
      website: ur,
      phone: ph,
      source,
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

  return (
    <div className="form-card ba-form" data-form id="get-audit">
      {!done ? (
        <form onSubmit={handleSubmit} noValidate>
          <h3>Where should I send your audit?</h3>
          <p className="hint">One email back with your audit. No drip sequence.</p>
          <div className="field">
            <label htmlFor="ba-website">Your med spa website</label>
            <input id="ba-website" type="url" placeholder="yourmedspa.com" autoComplete="url" inputMode="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
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
          <p className={`ferror${error ? " show" : ""}`}>Add your website, name, a valid email and your mobile so the audit can reach you.</p>
          <div className="fnav">
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? "Sending…" : "Get my free audit"}
            </button>
          </div>
          <p className="ba-fine">Free, a $100 value. No call required.</p>
        </form>
      ) : (
        <div className="done show">
          <div className="mark">✓</div>
          <h3>Request received.</h3>
          <p>Your Booking Audit will land in your inbox within 3 business days.</p>
        </div>
      )}
    </div>
  );
}
