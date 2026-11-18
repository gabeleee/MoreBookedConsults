import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IntakeForm from "@/components/IntakeForm";
import { CLIENTS, clientBySlug } from "@/lib/onboarding";
import "../onboarding.css";

// A client's personal onboarding link: /onboarding/<slug>/. Never indexed.
type Params = { params: Promise<{ client: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CLIENTS.map((c) => ({ client: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { client } = await params;
  const c = clientBySlug(client);
  return {
    title: c ? `Getting started: ${c.practice}` : "Getting started",
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
        <header className="ob-head">
          <p className="eyebrow">Getting started · {c.practice}</p>
          <h1>Welcome aboard, {c.firstName}.</h1>
          <p>These questions give me everything I need to build your site and set up your systems.</p>
          <p>It takes about 15 minutes, and I&apos;ve filled in what I already know.</p>
          <p className="ob-plan">Your plan: {c.plan}</p>
        </header>
        <IntakeForm client={c} />
      </div>
    </main>
  );
}
