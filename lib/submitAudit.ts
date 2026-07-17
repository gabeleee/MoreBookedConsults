// The single stub every audit-form submission routes through, so a real
// backend (email + CRM) drops in here later without touching the form UI.
// Front-end only for now.

export type AuditSubmission = {
  practice: string | null;
  need: string | null;
  worth: number | null;
  market: string | null;
  name: string;
  email: string;
  website: string;
};

export type AuditResult = { ok: boolean };

export async function submitAudit(
  data: AuditSubmission,
): Promise<AuditResult> {
  // Routes to /api/audit, which fans out to the CRM + email notification.
  // Trailing slash matches next.config's trailingSlash: true.
  try {
    const res = await fetch("/api/audit/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("[submitAudit] request failed", err);
    return { ok: false };
  }
}
