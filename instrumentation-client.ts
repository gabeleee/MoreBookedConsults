import posthog from "posthog-js";

// PostHog (product analytics, session replay, error tracking). The agency sites
// (More Booked Consults, More Booked Chairs, ...) share ONE PostHog project,
// "Agency sites"; the `site` super property on every event splits them.
const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (projectToken && apiHost) {
  posthog.init(projectToken, {
    api_host: apiHost,
    defaults: "2026-05-30",
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
  posthog.register({ site: "More Booked Consults" });
} else if (process.env.NODE_ENV === "development") {
  console.warn("[posthog] NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN / NEXT_PUBLIC_POSTHOG_HOST not set — analytics off");
}
