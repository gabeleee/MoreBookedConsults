import { ph } from "@/lib/ph";

// Headers that let /api/audit attach server-side events to
// this visitor's PostHog session. Empty when PostHog isn't initialised.
export function posthogRequestHeaders(): Record<string, string> {
  const distinct = ph.__loaded ? ph.get_distinct_id() : undefined;
  if (!distinct) return {};
  return {
    "X-PostHog-Distinct-ID": distinct,
    "X-PostHog-Session-ID": ph.get_session_id() ?? "",
  };
}
