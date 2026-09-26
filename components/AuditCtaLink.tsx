"use client";
import Link from "next/link";
import posthog from "posthog-js";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

// Every "free audit" CTA goes through this, so PostHog can tell which one
// drove the click. The only client piece: server components (Header, Footer,
// Founder, pricing, MDX) render it and stay server components.
type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href?: string;
  location: string; // where the CTA sits: nav, sticky, pricing, footer, …
  ctaText?: string; // defaults to the rendered (visible) link text
  native?: boolean; // plain <a> instead of next/link
};

export default function AuditCtaLink({
  href = "/free-audit/",
  location,
  ctaText,
  native,
  onClick,
  children,
  ...rest
}: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (posthog.__loaded) {
      // innerText skips display:none, so the header reports whichever of its
      // full/short labels is showing at this breakpoint.
      posthog.capture("audit_cta_clicked", {
        location,
        cta_text: ctaText ?? e.currentTarget.innerText.trim(),
      });
    }
    onClick?.(e);
  }

  if (native) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
