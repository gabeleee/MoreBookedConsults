"use client";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

// Shown after the booking-audit form submits: Gabe's Cal.com calendar inline,
// prefilled with the lead's details. Event "audit-walkthrough" (20 min, noon to
// 5 PM Central, 24 h notice) lives in Cal.com, not here. Fires the Meta pixel
// "Schedule" event and a PostHog event when a call is booked.
const CAL_LINK = "gabe-lee-42/audit-walkthrough";
const NS = "audit";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
};

// Cal.com's official embed loader, trimmed to the namespace path we use.
function loadCal(): CalFn {
  const w = window as unknown as { Cal?: CalFn };
  if (!w.Cal) {
    const cal = function (...args: unknown[]) {
      const c = w.Cal!;
      if (!c.loaded) {
        c.ns = {};
        c.q = c.q || [];
        const s = document.createElement("script");
        s.src = "https://app.cal.com/embed/embed.js";
        document.head.appendChild(s);
        c.loaded = true;
      }
      if (args[0] === "init") {
        const ns = args[1] as string;
        const api = function (...a: unknown[]) {
          (api as CalFn).q!.push(a);
        } as CalFn;
        api.q = [];
        c.ns![ns] = c.ns![ns] || api;
        (c.ns![ns] as CalFn).q!.push(args);
        c.q!.push(["initNamespace", ns]);
        return;
      }
      c.q!.push(args);
    } as CalFn;
    w.Cal = cal;
  }
  return w.Cal;
}

export default function AuditBooking({ name, email, phone }: { name: string; email: string; phone: string }) {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const Cal = loadCal();
    Cal("init", NS, { origin: "https://cal.com" });
    const api = Cal.ns![NS];
    api("inline", {
      elementOrSelector: "#ba-cal",
      calLink: CAL_LINK,
      config: { layout: "month_view", name, email, attendeePhoneNumber: phone },
    });
    api("ui", { hideEventTypeDetails: true, layout: "month_view", styles: { branding: { brandColor: "#6C57E8" } } });
    const onBooked = () => {
      setBooked(true);
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      w.fbq?.("track", "Schedule", { content_name: "Audit walkthrough" });
      posthog.capture("booking_audit_call_booked");
    };
    api("on", { action: "bookingSuccessfulV2", callback: onBooked });
  }, [name, email, phone]);

  return (
    <div className="ba-booking">
      <div className="mark">✓</div>
      <h3>{booked ? "You're booked." : "Got it. Your audit is on its way."}</h3>
      <p>{booked ? "The invite is in your inbox, and your audit will be too." : "Pick a time to walk through it together."}</p>
      {!booked && <p className="ba-booking-meta">20 minutes on Google Meet.</p>}
      <div id="ba-cal" className="ba-cal" />
      {!booked && <p className="ba-booking-skip">Not ready to pick a time? Your audit still lands in your inbox within 1 business day.</p>}
    </div>
  );
}
