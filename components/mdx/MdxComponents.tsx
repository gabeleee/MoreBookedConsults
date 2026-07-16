import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Component map passed to <MDXRemote>. Body elements (h2/p/ul/table/…) are
// styled by the .article-body container in globals.css; here we only override
// links (to use next/link for internal nav) and add authoring components.

function SmartLink({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

// Inline CTA block — drop <CTA /> into an article (~70% scroll and at the end,
// per the content briefs).
function CTA({
  heading = "Want this found and fixed for you?",
  label = "Get a free audit",
}: {
  heading?: string;
  label?: string;
}) {
  return (
    <aside className="cta-block">
      <p>{heading}</p>
      <Link className="btn" href="/free-audit/">
        {label}
      </Link>
    </aside>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return <aside className="callout">{children}</aside>;
}

// Wrap tables so wide benchmark tables scroll instead of breaking the layout.
function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll">
      <table {...props} />
    </div>
  );
}

export const mdxComponents = {
  a: SmartLink,
  table: Table,
  CTA,
  Callout,
};
