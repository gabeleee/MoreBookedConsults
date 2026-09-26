// True for links to the free-audit page (the site's one conversion CTA), so
// data-driven link lists can swap in the tracked <AuditCtaLink>.
export function isAuditHref(href: string): boolean {
  return href === "/free-audit" || href.startsWith("/free-audit/");
}
