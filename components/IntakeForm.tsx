"use client";
import { useEffect, useState } from "react";
import { ph as posthog } from "@/lib/ph";
import {
  STEPS,
  isShown,
  isFilled,
  missingIn,
  optionsFor,
  type ClientInfo,
  type Field,
  type FoundSummary,
  type Values,
} from "@/lib/onboarding";

// Client onboarding intake: 3 short steps. Step 1 shows what we already
// pulled from their booking page for a one-tap confirm. Answers are kept in
// this browser until sent (so a client can stop and come back).

const storageKey = (slug: string) => `mbc-intake:${slug}`;

export default function IntakeForm({ client, found }: { client: ClientInfo; found: FoundSummary }) {
  const slug = client.slug;
  const [values, setValues] = useState<Values>({ text_number: found.phone ?? "" });
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [restored, setRestored] = useState(false);

  // Restore a half-finished intake after hydration (localStorage isn't
  // available during the server render).
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) {
        const saved = JSON.parse(raw) as { values: Values; step: number };
        setValues((v) => ({ ...v, ...saved.values }));
        setStep(Math.min(saved.step, STEPS.length - 1));
      }
    } catch {}
    setRestored(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [slug]);

  useEffect(() => {
    if (!restored || status === "done") return;
    try {
      localStorage.setItem(storageKey(slug), JSON.stringify({ values, step }));
    } catch {}
  }, [restored, slug, values, step, status]);

  const set = (id: string, v: string | string[]) => setValues((prev) => ({ ...prev, [id]: v }));
  const total = STEPS.length;
  const current = STEPS[step];
  const last = step === total - 1;

  function go(to: number) {
    setShowErrors(false);
    setStep(to);
    document.getElementById("intake")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function next() {
    if (missingIn(current, values).length) {
      setShowErrors(true);
      return;
    }
    posthog.capture("onboarding_step_completed", { client: slug, step: current.id });
    if (!last) return go(step + 1);

    setStatus("sending");
    try {
      const res = await fetch("/api/onboarding/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client: slug, values }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
      try {
        localStorage.removeItem(storageKey(slug));
      } catch {}
      posthog.capture("onboarding_submitted", { client: slug });
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done") {
    return (
      <div className="ob-card ob-done" id="intake">
        <h2>That&apos;s everything, {client.firstName}. Thank you!</h2>
        <p className="ob-intro">Here&apos;s what happens next:</p>
        <ol className="ob-next">
          <li>
            <b>Google emails you a request</b> to let us help manage your Google profile. Tap Approve. That&apos;s
            the only thing you need to do this week.
          </li>
          <li>
            <b>I build your site, your first Google pages and Sienna AI™.</b> You&apos;ll get a preview link to look
            over before anything goes live.
          </li>
          <li>
            <b>A 10-minute call to switch on Sienna AI™.</b> It&apos;s one setting on your phone, and I&apos;ll walk
            you through it.
          </li>
        </ol>
      </div>
    );
  }

  return (
    <div className="ob-card" id="intake">
      <div className="ob-progress">
        <span className="ob-progress-label">
          Step {step + 1} of {total}
        </span>
        <span className="ob-bars" aria-hidden="true">
          {STEPS.map((s, i) => (
            <i key={s.id} className={i < step ? "on" : i === step ? "now" : undefined} />
          ))}
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        noValidate
      >
        <h2>{current.title}</h2>
        <p className="ob-intro">{current.intro}</p>
        {current.foundPanel && <FoundPanel f={found} />}
        {current.fields
          .filter((f) => isShown(f, values))
          .map((f) => (
            <FieldInput
              key={f.id}
              f={f}
              options={optionsFor(f, client, found.treatmentGroups)}
              value={values[f.id]}
              onChange={(v) => set(f.id, v)}
              error={Boolean(showErrors && f.required && !isFilled(values[f.id]))}
            />
          ))}
        {showErrors && missingIn(current, values).length > 0 && (
          <p className="ob-error" role="alert">
            Please answer the questions marked in red.
          </p>
        )}
        {status === "failed" && (
          <p className="ob-error" role="alert">
            That didn&apos;t go through. Please try again, or text me and I&apos;ll sort it out.
          </p>
        )}
        <div className="ob-nav">
          {step > 0 && (
            <button type="button" className="btn-ghost" onClick={() => go(step - 1)}>
              Back
            </button>
          )}
          <button type="submit" className="btn" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : last ? "Finish" : "Next"}
          </button>
        </div>
        <p className="ob-saved">Your answers save as you go, so you can finish later.</p>
      </form>
    </div>
  );
}

function FoundPanel({ f }: { f: FoundSummary }) {
  const rows: [string, string | null][] = [
    ["Business", f.businessName],
    ["Owner", f.ownerName],
    ["Phone", f.phone],
    ["Email", f.email],
    ["Address", f.address],
    ["Hours", f.hours.join(" · ")],
    [
      "Menu",
      `${f.serviceCount} treatments with prices, in ${f.treatmentGroups.length} groups (${f.treatmentGroups
        .slice(0, 3)
        .map((g) => g.name)
        .join(", ")}…)`,
    ],
    [
      "Booking",
      [f.source, f.cardRequired && "card required to book", f.hasCancellationPolicy && "cancellation policy"]
        .filter(Boolean)
        .join(" · "),
    ],
    [
      "Online",
      [f.instagram && "Instagram", f.facebook && "Facebook", f.googleReviewUrl && "Google review link"]
        .filter(Boolean)
        .join(" · ") || null,
    ],
  ];
  return (
    <div className="ob-found">
      <dl>
        {rows
          .filter(([, v]) => v)
          .map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
      </dl>
      {f.photos.length > 0 && (
        <div className="ob-photos" aria-label="Photos we'll use">
          {f.photos.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" loading="lazy" />
          ))}
        </div>
      )}
    </div>
  );
}

function FieldInput({
  f,
  options,
  value,
  onChange,
  error,
}: {
  f: Field;
  options: string[];
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
  error: boolean;
}) {
  const id = `ob-${f.id}`;
  const str = typeof value === "string" ? value : "";

  if (f.type === "choice" || f.type === "multi") {
    const picked = f.type === "multi" ? (Array.isArray(value) ? value : []) : [str];
    const full = f.max != null && picked.length >= f.max;
    return (
      <fieldset className={`ob-field${error ? " ob-bad" : ""}`}>
        <legend>{f.label}</legend>
        {f.hint && <p className="ob-hint">{f.hint}</p>}
        {f.why && <p className="ob-why">{f.why}</p>}
        <div className={`ob-opts${f.type === "multi" ? " ob-chips" : ""}`}>
          {options.map((o) => {
            const on = picked.includes(o);
            return (
              <button
                key={o}
                type="button"
                className={`ob-opt${on ? " on" : ""}`}
                aria-pressed={on}
                disabled={f.type === "multi" && !on && full}
                onClick={() =>
                  f.type === "multi"
                    ? onChange(on ? picked.filter((p) => p !== o) : [...picked, o])
                    : onChange(o)
                }
              >
                {o}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <div className={`ob-field${error ? " ob-bad" : ""}`}>
      <label htmlFor={id}>{f.label}</label>
      {f.hint && <p className="ob-hint">{f.hint}</p>}
      {f.type === "textarea" ? (
        <textarea id={id} rows={3} value={str} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          id={id}
          type={f.type}
          value={str}
          placeholder={f.placeholder}
          autoComplete={f.type === "tel" ? "tel" : "off"}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
