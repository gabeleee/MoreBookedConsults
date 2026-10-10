import type { Metadata } from "next";
import BookingAuditLanding from "@/components/BookingAuditLanding";

// Paid-ad landing page for the "tumbleweed" Facebook/Instagram video
// (~/mbc-ads/01-tumbleweed). One job: request the free Booking Audit.
// noindex, no site nav/footer/sticky CTA (hidden below), Meta pixel on.
export const metadata: Metadata = {
  title: "Free Booking Audit for Med Spas",
  description:
    "A free Booking Audit for med spa owners: your booking path click by click, where clients give up, and what to fix first.",
  alternates: { canonical: "/booking-audit/" },
  robots: { index: false, follow: false },
};

export default function BookingAuditPage() {
  return (
    <BookingAuditLanding
      page="booking-audit"
      headline="Your Tuesday doesn't have to look like this."
      image={{
        src: "/booking-audit/tumbleweed.jpg",
        alt: "An empty, beautiful med spa lobby with a tumbleweed rolling across the floor",
        width: 720,
        height: 1280,
      }}
    />
  );
}
