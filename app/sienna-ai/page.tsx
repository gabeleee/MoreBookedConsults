import type { Metadata } from "next";
import SystemPage, { type SystemPageData } from "@/components/SystemPage";
import { SiennaArt } from "@/components/home/SystemArt";
import { LineIcon } from "@/components/LineIcon";

export const metadata: Metadata = {
  title: "Sienna AI™: The AI Receptionist For Med Spas",
  description:
    "Sienna AI answers your med spa's calls 24/7, calls every new website lead back within 60 seconds and texts your booking link. Part of the Optimized Booking System.",
  alternates: { canonical: "/sienna-ai/" },
};

const d: SystemPageData = {
  mark: "sienna",
  name: "Sienna AI",
  cat: "AI receptionist",
  h1: "An AI Receptionist That Answers Every Call, Day Or Night",
  lede: "Sienna answers when your front desk can't, calls new website leads back within a minute, and texts your booking link so people book while they still want to.",
  chips: [["call", "Answers 24/7"], ["clock", "Leads called in 60 seconds"], ["calendar", "Texts your booking link"]],
  tag: "Every call answered, every lead called back.",
  why: "A request that comes in at 9 PM and gets a call back tomorrow has often booked somewhere else by then. Sienna picks up right away, in a warm, natural voice.",
  build: [
    "Sienna set up with your treatments, prices, policies and tone",
    "A call script you read and approve before anything goes live",
    "Hand-off rules: when Sienna books, and when it passes the call to your team",
    "A text with your booking link for anyone who calls when nobody can pick up",
  ],
  get: [
    "No more missed calls while you're with a client",
    "Every new website request gets a call within a minute",
    "Tricky or medical questions always go to a real person",
  ],
  Art: SiennaArt,
  faq: [
    { q: "Does Sienna sound like a robot?", a: "No. Call (773) 249-0840 and hear for yourself: Sienna answers for a sample med spa called Glow Aesthetics." },
    { q: "Will Sienna give medical advice?", a: "Never. Sienna answers questions about your treatments, prices and policies, books the consult, or hands the call to your team. You approve every rule before it goes live." },
    { q: "Do I have to change my phone number or booking software?", a: "No. Calls you can't answer forward to Sienna, and bookings go to the booking app you already use, such as Boulevard, Vagaro, Mangomint, Zenoti or Aesthetic Record." },
    { q: "What does it cost?", a: "Sienna AI is included in the Optimized Booking System, $499 a month, month to month, with eight other systems." },
  ],
  extra: (
    <a className="fb-hear sp-hear" href="tel:+17732490840">
      <span className="fb-hear-ic" aria-hidden="true">
        <LineIcon name="call" />
      </span>
      <span>
        Hear Sienna<span className="fb-hear-long"> AI answer now</span>: <b>(773) 249-0840</b>
      </span>
    </a>
  ),
};

export default function Page() {
  return <SystemPage d={d} />;
}
