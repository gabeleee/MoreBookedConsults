import type { Metadata } from "next";
import BookingAuditLanding from "@/components/BookingAuditLanding";

// Paid-ad landing page for the UGC Facebook/Instagram video (~/mbc-ads/02-ugc):
// "It's Tuesday. Nobody's booked." → lock screen full of bookings → "Want a
// full calendar?". Same offer and form as /booking-audit/, hero matches the ad.
// noindex, no site nav/footer/sticky CTA, Meta pixel on.
export const metadata: Metadata = {
  title: "Free Booking Audit for Med Spas",
  description:
    "A free Booking Audit for med spa owners: your booking path click by click, where clients give up, and what to fix first.",
  alternates: { canonical: "/more-bookings/" },
  robots: { index: false, follow: false },
};

export default function MoreBookingsPage() {
  return (
    <BookingAuditLanding
      page="more-bookings"
      headline="Want a full calendar?"
      image={{
        src: "/booking-audit/lock-screen.jpg",
        alt: "A lock screen on Tuesday morning, stacked with new consult booking notifications",
        width: 1440,
        height: 1080,
        position: "50% 50%",
      }}
    />
  );
}
