import { PostHog } from "posthog-node";

// Server-side PostHog events. Best-effort: an analytics failure must never
// fail a lead submission, so every error is swallowed and logged.
let posthogClient: PostHog | null = null;

function getPostHogClient(): PostHog | null {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!token || !host) return null;
  posthogClient ??= new PostHog(token, { host, flushAt: 1, flushInterval: 0 });
  return posthogClient;
}

export async function captureServerEvent({
  distinctId,
  event,
  sessionId,
  properties = {},
}: {
  distinctId: string;
  event: string;
  sessionId?: string | null;
  properties?: Record<string, unknown>;
}): Promise<void> {
  try {
    const posthog = getPostHogClient();
    if (!posthog) return;
    posthog.capture({
      distinctId,
      event,
      properties: { ...properties, ...(sessionId ? { $session_id: sessionId } : {}) },
    });
    await posthog.flush();
  } catch (err) {
    console.error("[posthog]", err);
  }
}

// Browser identity forwarded by our own fetches (X-PostHog-* headers), so
// server events join the visitor's session. Empty when PostHog is off.
export function posthogIdsFromRequest(request: Request) {
  return {
    distinctId: request.headers.get("x-posthog-distinct-id") || null,
    sessionId: request.headers.get("x-posthog-session-id") || null,
  };
}
