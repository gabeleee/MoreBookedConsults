import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Instrument_Sans,
  Spline_Sans_Mono,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";
import SvgDefs from "@/components/SvgDefs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import PetalParallax from "@/components/PetalParallax";
import OrgSchema from "@/components/OrgSchema";

// Fonts self-hosted via next/font (no CDN <link>, no layout shift).
// Each exposes a CSS variable consumed by :root in globals.css.

// Headings
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

// Body
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument",
  display: "swap",
});

// Eyebrows / labels / chart axes
const splineMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-spline-mono",
  display: "swap",
});

// Script "Consults" in the wordmark ONLY
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://morebookedconsults.com"),
  title: {
    default:
      "More Booked Consults — CRO & Local SEO for Medspas & Plastic Surgeons",
    template: "%s | More Booked Consults",
  },
  description:
    "Conversion optimization and local SEO, exclusively for medspas, plastic surgeons, and other aesthetic practices.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${instrument.variable} ${splineMono.variable} ${greatVibes.variable}`}
    >
      <body>
        <OrgSchema />
        <SvgDefs />
        <Header />
        {children}
        <Footer />
        <StickyCta />
        <PetalParallax />
      </body>
    </html>
  );
}
