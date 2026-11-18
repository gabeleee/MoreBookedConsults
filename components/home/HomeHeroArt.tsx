/* eslint-disable @next/next/no-img-element -- decorative product shot */
import { LineIcon } from "@/components/LineIcon";
import SiennaAvatar from "@/components/home/SiennaAvatar";

// Homepage hero product shot (2026-11-18, replaces the explainer video): a med
// spa site on a phone running the Glide Path booking flow, with floating cards
// for the other systems (Sienna AI, Authority Atlas, Lift Lab, Rave Loop).
// Glow Aesthetics is illustrative. Styles: .hx-* in app/home-v2.css.
export default function HomeHeroArt() {
  return (
    <div className="hx-art" aria-hidden="true">
      <div className="hx-phone">
        <span className="hh-notch" />
        <div className="hh-screen hx-scr">
          <div className="hx-photo">
            <img src="/home/exit-photo.webp" alt="" width={720} height={960} />
            <div className="hx-photo-in">
              <span className="hx-brand">Glow Aesthetics</span>
            </div>
          </div>
          <div className="hx-form">
            <div className="gp-progress">
              <span className="on" />
              <span className="on" />
              <span />
              <span />
            </div>
            <p className="gp-step">Step 2 of 4</p>
            <p className="gp-q">What would you like to treat?</p>
            <div className="gp-opts hh-opts">
              <span>
                <i className="gp-oi"><LineIcon name="syringe" /></i>Botox
              </span>
              <span className="sel">
                <i className="gp-oi"><LineIcon name="droplet" /></i>Lip filler
                <LineIcon name="check" />
              </span>
              <span>
                <i className="gp-oi"><LineIcon name="zap" /></i>Laser hair removal
              </span>
              <span>
                <i className="gp-oi"><LineIcon name="sparkles" /></i>Skin &amp; facials
              </span>
              <span>
                <i className="gp-oi"><LineIcon name="help" /></i>Not sure yet
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hh-card hx-c hx-sienna hv-float f1">
        <span className="hh-orb hh-face">
          <SiennaAvatar badge={false} />
        </span>
        <div>
          <b>Sienna AI answered a 9:42 PM call</b>
          <span>Booking link texted</span>
        </div>
      </div>

      <div className="hh-card hx-c hx-google hv-float f2">
        <span className="hv-chip-ic">
          <LineIcon name="search" />
        </span>
        <div>
          <b>#1 on Google: lip filler near me</b>
          <span>New page this month</span>
        </div>
      </div>

      <div className="hh-card hx-c hx-booked hv-float f3">
        <span className="hv-chip-ic">
          <LineIcon name="calendar" />
        </span>
        <div>
          <b>New consult booked</b>
          <span>Lip filler, Thu 4:00 PM</span>
        </div>
      </div>

      <div className="hh-card hx-c hx-lift hv-float f2">
        <span className="hv-chip-ic">
          <LineIcon name="trending" />
        </span>
        <div>
          <b>Lift Lab test won</b>
          <span>Booking rate 3.1% → 4.4%</span>
        </div>
      </div>

      <div className="hh-card hx-c hx-review hv-float f1">
        <span className="hv-chip-ic">
          <LineIcon name="star" />
        </span>
        <div>
          <b>New 5-star review</b>
          <span>Rave Loop asked after her visit</span>
        </div>
      </div>
    </div>
  );
}
