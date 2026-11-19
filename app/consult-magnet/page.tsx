import type { Metadata } from "next";
import Link from "next/link";
import SystemPage, { type SystemPageData } from "@/components/SystemPage";
import { MagnetArt } from "@/components/home/SystemArt";

export const metadata: Metadata = {
  title: "Consult Magnet™: First-Visit Offers For Med Spas",
  description:
    "Consult Magnet builds a named first-visit offer for your med spa's top treatment, so more visitors have a reason to book now. Part of the Optimized Booking System.",
  alternates: { canonical: "/consult-magnet/" },
};

const d: SystemPageData = {
  mark: "consult-magnet",
  name: "Consult Magnet",
  cat: "First-visit offer",
  h1: "A First-Visit Offer That Gives People A Reason To Book Now",
  lede: "We build a named first-visit package for your top treatment, then use it everywhere a new client decides whether to book.",
  chips: [["gift", "Built for your top treatment"], ["tag", "Named and designed for you"], ["magnet", "Used across your site"]],
  tag: "The offer that makes the other systems work harder.",
  why: "\"Book a consultation\" gives a new visitor no reason to act today. A clear first-visit offer does, and it works best when it's built around what you already do best.",
  build: [
    "A named first-visit package for your top treatment, priced to protect your margin",
    "The offer written and designed in your brand's look",
    "Placed on your site where new visitors decide",
    "The same offer in Second Glance™, Sienna AI™'s calls and your ads if you run them",
  ],
  get: [
    "New visitors get one clear reason to book now, not later",
    "One offer working everywhere, instead of random discounts",
  ],
  Art: MagnetArt,
  faq: [
    { q: "Is this just a discount?", a: "No. It's a named package for one treatment, like a first-visit bundle or a consult credited toward treatment, built so it brings in the right clients without cheapening your brand." },
    { q: "Do I approve the offer?", a: "Always. We suggest the offer and the price, and nothing goes live until you say yes." },
    { q: "Can I try building one myself first?", a: "Yes. Our free offer builder walks you through it in a few minutes." },
    { q: "What does it cost?", a: "Consult Magnet is included in the Optimized Booking System, $499 a month, month to month, with eight other systems." },
  ],
  extra: (
    <p className="sp-note">
      Want to try it yourself first? Use the free <Link href="/medspa-offer-builder/">offer builder</Link>.
    </p>
  ),
};

export default function Page() {
  return <SystemPage d={d} />;
}
