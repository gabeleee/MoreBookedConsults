import type { Metadata } from "next";
import SystemPage, { type SystemPageData } from "@/components/SystemPage";
import { RaveLoopArt } from "@/components/home/FullBookArt";

export const metadata: Metadata = {
  title: "Rave Loop™: Automatic Google Review Requests For Med Spas",
  description:
    "Rave Loop texts every client a Google review request after their visit, so your med spa earns more reviews without the awkward ask. Part of the Optimized Booking System.",
  alternates: { canonical: "/rave-loop/" },
};

const d: SystemPageData = {
  mark: "rave-loop",
  name: "Rave Loop",
  cat: "Review requests",
  h1: "More Google Reviews, Without The Awkward Ask",
  lede: "A friendly text after every visit asks your clients for a Google review, so new reviews keep coming in while you focus on treatments.",
  chips: [["message", "A text after every visit"], ["star", "More Google reviews"], ["repeat", "Runs on its own"]],
  tag: "Every client asked, every time.",
  why: "Most happy clients would leave a review, but nobody remembers to ask at checkout. Rave Loop asks for you, at the right moment, every time.",
  build: [
    "A short review text in your voice, sent a few hours after each visit",
    "A one-tap link straight to your Google review page",
    "Set up once, then it runs after every visit without anyone pressing send",
  ],
  get: [
    "A steady stream of new reviews instead of a few a year",
    "More stars and fresher reviews when people compare you on Google",
    "Replies from clients come to you, so you can follow up personally",
  ],
  Art: RaveLoopArt,
  faq: [
    { q: "Who gets the review text?", a: "Every client after their visit. Google doesn't allow asking only the happy ones, so everyone gets the same friendly request." },
    { q: "Can clients reply to the text?", a: "Yes. Replies come to you, so if someone has a concern you hear about it and can make it right." },
    { q: "Do I have to change my booking app?", a: "No. Rave Loop works alongside the booking app you already use, such as Boulevard, Vagaro, Mangomint, Zenoti or Aesthetic Record." },
    { q: "What does it cost?", a: "Rave Loop is included in the Optimized Booking System, $499 a month, month to month, with eight other systems." },
  ],
};

export default function Page() {
  return <SystemPage d={d} />;
}
