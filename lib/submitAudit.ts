// The single stub every audit-form submission routes through, so a real
// backend (email + CRM) drops in here later without touching the form UI.
// Front-end only for now.

export type AuditSubmission = {
  practice: string | null;
  need: string | null;
  worth: number | null;
  name: string;
  email: string;
  website: string;
};

export type AuditResult = { ok: boolean };

export async function submitAudit(
  data: AuditSubmission,
): Promise<AuditResult> {
  // TODO: POST to the audit backend when it exists.
  console.info("[submitAudit] (stub) received:", data);
  return { ok: true };
}
