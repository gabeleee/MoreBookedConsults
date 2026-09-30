import posthog from "posthog-js";

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

if (projectToken && apiHost) {
  posthog.init(projectToken, {
    api_host: apiHost,
    opt_out_capturing_by_default: noTrack,
    defaults: "2026-05-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
  posthog.register({ site: "More Booked Consults" });
  if (noTrack) posthog.opt_out_capturing();
  else if (posthog.has_opted_out_capturing()) posthog.opt_in_capturing();
} else if (process.env.NODE_ENV === "development") {
  console.warn("[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN / NEXT_PUBLIC_POSTHOG_HOST not set — analytics off");
}
