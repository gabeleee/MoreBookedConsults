import type { Metadata } from "next";
import BookingAuditLanding from "@/components/BookingAuditLanding";

// Paid-ad landing page for the UGC Facebook/Instagram video (~/mbc-ads/02-ugc):
// "It's Tuesday. Nobody's booked." → lock screen full of bookings → "Want a
// full calendar?". Same offer and form as /booking-audit/; the hero photo is
// the ad's owner, now beaming at a full calendar.
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
      headline={"More of your visitors\u00A0book."}
      accent="Guaranteed."
      sub="Or we keep working free until they do."
      offer
      image={{
        src: "/booking-audit/owner-smile.jpg",
        alt: "A med spa owner at her front desk, smiling big after checking a fully booked calendar",
        width: 1440,
        height: 1075,
        position: "50% 35%",
      }}
    />
  );
}
