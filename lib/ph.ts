import type { PostHog } from "posthog-js";

// Page speed (2026-11-04): posthog-js is ~100 KB of JavaScript, so it no longer
// ships in the first bundle. instrumentation-client.ts loads it after the page
// has loaded and gone idle; until then calls here are queued and replayed.
// Import `ph` from here instead of importing "posthog-js" directly.
let real: PostHog | null = null;
const queue: Array<(p: PostHog) => void> = [];

export function setPosthog(p: PostHog) {
  real = p;
  queue.splice(0).forEach((fn) => fn(p));
}

function run(fn: (p: PostHog) => void) {
  if (real) fn(real);
  else if (queue.length < 100) queue.push(fn);
}

export const ph = {
  get __loaded(): boolean {
    return !!real?.__loaded;
  },
  capture(event: string, props?: Record<string, unknown>) {
    run((p) => p.capture(event, props));
  },
  captureException(err: unknown, props?: Record<string, unknown>) {
    run((p) => p.captureException(err, props));
  },
  get_distinct_id(): string | undefined {
    return real?.get_distinct_id();
  },
  get_session_id(): string | undefined {
    return real?.get_session_id();
  },
};
