import { setPosthog } from "@/lib/ph";

// PostHog (product analytics, session replay, error tracking). The agency sites
// (More Booked Consults, More Booked Chairs, ...) share ONE PostHog project,
// "Agency sites"; the `site` super property on every event splits them.
const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

// Owner opt-out: opening any page with ?notrack=1 (or any /admin page) marks this
// browser as not tracked; ?notrack=0 clears it. The GA4 snippet in app/layout.tsx
// reads the same localStorage flag.
function notTracked(): boolean {
  try {
    const q = new URLSearchParams(location.search).get("notrack");
    if (q === "1" || location.pathname.startsWith("/admin")) localStorage.setItem("notrack", "1");
    if (q === "0") localStorage.removeItem("notrack");
    return localStorage.getItem("notrack") === "1";
  } catch {
    return false;
  }
}

const noTrack = notTracked();

// Page speed (2026-11-04): posthog-js (~100 KB) is loaded late (see below),
// so it never competes with the first paint. Calls made before
// then are queued in lib/ph.ts.
function loadPosthog() {
  import("posthog-js").then(({ default: posthog }) => {
    posthog.init(projectToken!, {
      api_host: apiHost,
      opt_out_capturing_by_default: noTrack,
      defaults: "2026-05-30",
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    });
    posthog.register({ site: "More Booked Consults" });
    if (noTrack) posthog.opt_out_capturing();
    else if (posthog.has_opted_out_capturing()) posthog.opt_in_capturing();
    setPosthog(posthog);
  });
}

if (projectToken && apiHost) {
  // Load on the visitor's first scroll/tap/key/mouse move, or 8 s after the
  // page loads, whichever comes first (same pattern as the Hires boards,
  // 2026-11-04). Its recorder and surveys were the last big main-thread cost.
  let done = false;
  const WAKE = ["pointermove", "pointerdown", "touchstart", "scroll", "keydown", "wheel"] as const;
  const go = () => {
    if (done) return;
    done = true;
    WAKE.forEach((ev) => window.removeEventListener(ev, go));
    loadPosthog();
  };
  WAKE.forEach((ev) => window.addEventListener(ev, go, { passive: true, once: true }));
  const timer = () => setTimeout(go, 8000);
  if (document.readyState === "complete") timer();
  else window.addEventListener("load", timer, { once: true });
} else if (process.env.NODE_ENV === "development") {
  console.warn("[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN / NEXT_PUBLIC_POSTHOG_HOST not set — analytics off");
}
