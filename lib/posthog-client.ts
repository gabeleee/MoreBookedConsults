import posthog from "posthog-js";

// Headers that let /api/audit attach server-side events to
// this visitor's PostHog session. Empty when PostHog isn't initialised.
export function posthogRequestHeaders(): Record<string, string> {
  if (!posthog.__loaded) return {};
  return {
    "X-PostHog-Distinct-ID": posthog.get_distinct_id(),
    "X-PostHog-Session-ID": posthog.get_session_id(),
  };
}
