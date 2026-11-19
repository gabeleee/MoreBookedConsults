import type { Metadata } from "next";
import SystemPage, { type SystemPageData } from "@/components/SystemPage";
import { LiftLabArt } from "@/components/home/SystemArt";
import StairsCard from "@/components/home/StairsCard";

export const metadata: Metadata = {
  title: "Lift Lab™: Monthly Design Tests For Med Spa Websites",
  description:
    "Lift Lab runs 2 design tests a month on your med spa website and keeps only the changes that book more consults. Part of the Optimized Booking System.",
  alternates: { canonical: "/lift-lab/" },
};

const d: SystemPageData = {
  mark: "lift-lab",
  name: "Lift Lab",
  cat: "Design tests",
  h1: "2 Design Tests A Month That Raise Your Booking Rate",
  lede: "Every month we test 2 new designs on your website and keep only the ones that book more people, so your site gets better instead of going stale.",
  chips: [["repeat", "2 tests every month"], ["chart", "Every change measured"], ["check", "Winners stay, the rest go"]],
  tag: "Your booking rate climbs every month.",
  why: "Most websites are built once and never improved. Lift Lab keeps testing, so each month starts from a higher booking rate than the last.",
  build: [
    "2 new design tests a month: offers, booking steps, layouts and treatment pages",
    "Each idea picked from where your site loses the most people",
    "Ideas that already won real tests on other aesthetic sites, not guesses",
    "Results measured against your starting numbers in Clear View™",
  ],
  get: [
    "Winners stay live, the rest get switched off, so nothing drops",
    "A website that keeps getting better at booking consults",
  ],
  Art: LiftLabArt,
  after: { h: "Every Win Stacks On The Last", p: "Each month starts from a higher booking rate, because the winners stay live.", body: <StairsCard /> },
  faq: [
    { q: "What if my site doesn't get much traffic?", a: "With enough traffic, we split-test: half your visitors see the new version and half see the old one. With less, we make bigger changes that already won elsewhere and compare your bookings before and after." },
    { q: "Do I approve the changes?", a: "Yes. You see each test before it goes live." },
    { q: "Can I get more than 2 tests a month?", a: "Yes. 2 more design tests a month is a $150 a month add-on." },
    { q: "What does it cost?", a: "Lift Lab is included in the Optimized Booking System, $499 a month, month to month, with eight other systems." },
  ],
};

export default function Page() {
  return <SystemPage d={d} />;
}
