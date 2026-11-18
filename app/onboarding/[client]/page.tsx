import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IntakeForm from "@/components/IntakeForm";
import { CLIENTS, WE_HANDLE, clientBySlug, summarize } from "@/lib/onboarding";
import "../onboarding.css";

// A client's personal onboarding link: /onboarding/<slug>/. Never indexed.
type Params = { params: Promise<{ client: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CLIENTS.map((c) => ({ client: c.client.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client } = await params;
  const c = clientBySlug(client);
  return {
    title: c ? `Getting started: ${c.found.businessName}` : "Getting started",
    robots: { index: false, follow: false },
  };
}

export default async function ClientOnboardingPage({ params }: Params) {
  const { client } = await params;
  const c = clientBySlug(client);
  if (!c) notFound();
  return (
    <main className="ob">
      <div className="wrap ob-wrap">
        {/* Not a <header>: the site styles every <header> as the fixed nav bar. */}
        <div className="ob-head">
          <p className="eyebrow">Getting started · {c.found.businessName}</p>
          <h1>Welcome aboard, {c.client.firstName}.</h1>
          <p>I&apos;ve already done most of the setup work, so this takes about 3 minutes.</p>
          <p className="ob-plan">{c.client.plan}</p>
          <div className="ob-handle">
            <p className="ob-handle-title">You don&apos;t need to send anything for:</p>
            <ul>
              {WE_HANDLE.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
        <IntakeForm client={c.client} found={summarize(c.found, c.client)} />
      </div>
    </main>
  );
}
