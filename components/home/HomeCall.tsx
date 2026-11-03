"use client";
import { useEffect, useState } from "react";
import posthog from "posthog-js";

// Homepage "Book a call" calendar: Gabe's Cal.com event inline (same event the
// proposals link to). Light theme pinned; fires Meta "Schedule" + PostHog on
// a booking. The calendar only loads once the section is near the screen.
const CAL_LINK = "gabe-lee-42/30min";
const NS = "home";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, (...args: unknown[]) => void>;
  q?: unknown[];
};

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

export default function HomeCall() {
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const el = document.getElementById("hv-cal");
    if (!el) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const Cal = loadCal();
      Cal("init", NS, { origin: "https://cal.com" });
      const api = Cal.ns![NS];
      api("inline", { elementOrSelector: "#hv-cal", calLink: CAL_LINK, config: { layout: "month_view", theme: "light" } });
      api("ui", { theme: "light", hideEventTypeDetails: true, layout: "month_view", styles: { branding: { brandColor: "#6C57E8" } } });
      api("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          setBooked(true);
          const w = window as unknown as { fbq?: (...args: unknown[]) => void };
          w.fbq?.("track", "Schedule", { content_name: "Homepage call" });
          if (posthog.__loaded) posthog.capture("home_call_booked");
        },
      });
    };
    // Start once the visitor is a screen away (or right away if they land on #book).
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((x) => x.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="hv-cal-card" data-form>
      {booked && <p className="hv-cal-done">You&apos;re booked. The invite is in your inbox.</p>}
      <div id="hv-cal" className="hv-cal" />
      <p className="hv-cal-alt">
        Calendar not loading? <a href="https://cal.com/gabe-lee-42/30min" target="_blank" rel="noopener">Open it here</a>.
      </p>
    </div>
  );
}
