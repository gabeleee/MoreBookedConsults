"use client";
import { useEffect, useState } from "react";
import { ph as posthog } from "@/lib/ph";
import {
  STEPS,
  isShown,
  isFilled,
  missingIn,
  type ClientPrefill,
  type Field,
} from "@/lib/onboarding";

// Multi-step client onboarding intake. Questions come from lib/onboarding.ts.
// Answers are kept in this browser between visits (so a client can stop and
// come back), then sent once to /api/onboarding.

type Values = Record<string, string | string[]>;

const storageKey = (slug: string | null) => `mbc-intake:${slug ?? "general"}`;

function load(slug: string | null): { values: Values; step: number } | null {
  try {
    const raw = localStorage.getItem(storageKey(slug));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function save(slug: string | null, values: Values, step: number) {
  try {
    localStorage.setItem(storageKey(slug), JSON.stringify({ values, step }));
  } catch {
    /* storage blocked: the form still works, it just won't remember */
  }
}

export default function IntakeForm({ client }: { client: ClientPrefill | null }) {
  const slug = client?.slug ?? null;
  const [values, setValues] = useState<Values>(client?.values ?? {});
  const [step, setStep] = useState(0); // STEPS.length = review screen
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [restored, setRestored] = useState(false);

  // Restore a half-finished intake after hydration (localStorage isn't
  // available during the server render).
  useEffect(() => {
    const saved = load(slug);
    /* eslint-disable react-hooks/set-state-in-effect */
    if (saved) {
      setValues((v) => ({ ...v, ...saved.values }));
      setStep(Math.min(saved.step, STEPS.length));
    }
    setRestored(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [slug]);

  useEffect(() => {
    if (restored && status !== "done") save(slug, values, step);
  }, [restored, slug, values, step, status]);

  const set = (id: string, v: string | string[]) => setValues((prev) => ({ ...prev, [id]: v }));
  const total = STEPS.length;
  const onReview = step === total;
  const current = STEPS[step];

  function go(to: number) {
    setShowErrors(false);
    setStep(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function next() {
    if (missingIn(current, values).length) {
      setShowErrors(true);
      return;
    }
    posthog.capture("onboarding_step_completed", { client: slug ?? "general", step: current.id });
    go(step + 1);
  }

  async function submit() {
    const firstGap = STEPS.findIndex((s) => missingIn(s, values).length);
    if (firstGap !== -1) {
      go(firstGap);
      setShowErrors(true);
      return;
    }
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
      posthog.capture("onboarding_submitted", { client: slug ?? "general" });
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done") {
    return (
      <div className="ob-card ob-done">
        <h2>Thank you{client ? `, ${client.firstName}` : ""}!</h2>
        <p>Your answers are in.</p>
        <p>I&apos;ll go through them today and text or email you if anything needs a quick answer.</p>
        <p>Next, I&apos;ll send your topical map: the list of Google pages we&apos;ll build first.</p>
      </div>
    );
  }

  return (
    <div className="ob-card">
      <div className="ob-progress" aria-label={`Step ${Math.min(step + 1, total)} of ${total}`}>
        <span className="ob-progress-label">
          {onReview ? "Review" : `Step ${step + 1} of ${total}`}
        </span>
        <span className="ob-bars">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i < step ? "on" : i === step ? "now" : undefined}
              onClick={() => i < step && go(i)}
              aria-label={s.title}
              tabIndex={i < step ? 0 : -1}
            />
          ))}
        </span>
      </div>

      {!onReview && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
          noValidate
        >
          {current.feeds && <p className="ob-feeds">Sets up {current.feeds}</p>}
          <h2>{current.title}</h2>
          <p className="ob-intro">{current.intro}</p>
          {current.fields
            .filter((f) => isShown(f, values))
            .map((f) => (
              <FieldInput
                key={f.id}
                f={f}
                value={values[f.id]}
                onChange={(v) => set(f.id, v)}
                error={Boolean(showErrors && f.required && !isFilled(values[f.id]))}
              />
            ))}
          {showErrors && missingIn(current, values).length > 0 && (
            <p className="ob-error" role="alert">
              Please fill in the fields marked above.
            </p>
          )}
          <div className="ob-nav">
            {step > 0 && (
              <button type="button" className="btn-ghost" onClick={() => go(step - 1)}>
                Back
              </button>
            )}
            <button type="submit" className="btn">
              {step === total - 1 ? "Review my answers" : "Next"}
            </button>
          </div>
          <p className="ob-saved">Your answers save as you go. You can close this page and finish later.</p>
        </form>
      )}

      {onReview && (
        <div>
          <h2>Check your answers</h2>
          <p className="ob-intro">Tap Edit on any section to change it.</p>
          {STEPS.map((s, i) => (
            <section key={s.id} className="ob-review">
              <div className="ob-review-head">
                <h3>{s.title}</h3>
                <button type="button" className="ob-edit" onClick={() => go(i)}>
                  Edit
                </button>
              </div>
              <dl>
                {s.fields
                  .filter((f) => isShown(f, values) && isFilled(values[f.id]))
                  .map((f) => (
                    <div key={f.id}>
                      <dt>{f.label}</dt>
                      <dd>{Array.isArray(values[f.id]) ? (values[f.id] as string[]).join(", ") : values[f.id]}</dd>
                    </div>
                  ))}
              </dl>
            </section>
          ))}
          {status === "failed" && (
            <p className="ob-error" role="alert">
              That didn&apos;t go through. Please try again, or email hello@morebookedconsults.com.
            </p>
          )}
          <div className="ob-nav">
            <button type="button" className="btn-ghost" onClick={() => go(total - 1)}>
              Back
            </button>
            <button type="button" className="btn" onClick={submit} disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send my answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({
  f,
  value,
  onChange,
  error,
}: {
  f: Field;
  value: string | string[] | undefined;
  onChange: (v: string | string[]) => void;
  error: boolean;
}) {
  const id = `ob-${f.id}`;
  const str = typeof value === "string" ? value : "";
  const label = (
    <>
      {f.label}
      {f.required && <span className="ob-req"> *</span>}
    </>
  );

  if (f.type === "choice" || f.type === "multi") {
    const picked = f.type === "multi" ? (Array.isArray(value) ? value : []) : [str];
    return (
      <fieldset className={`ob-field${error ? " ob-bad" : ""}`}>
        <legend>{label}</legend>
        {f.hint && <p className="ob-hint">{f.hint}</p>}
        <div className="ob-opts">
          {f.options!.map((o) => {
            const on = picked.includes(o);
            return (
              <button
                key={o}
                type="button"
                className={`ob-opt${on ? " on" : ""}`}
                aria-pressed={on}
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
      <label htmlFor={id}>{label}</label>
      {f.hint && <p className="ob-hint">{f.hint}</p>}
      {f.type === "textarea" ? (
        <textarea id={id} rows={3} value={str} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input
          id={id}
          type={f.type}
          value={str}
          placeholder={f.placeholder}
          autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "off"}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
