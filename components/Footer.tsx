// Site footer, ported from the v18 mockup (lines 779-790). Brand renders as a
// plain span (no href). Email is hello@morebookedconsults.com (inbox not live
// yet — confirm before launch).
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <Logo />
          <p className="foot-note">CRO + Local SEO · Aesthetic practices</p>
        </div>
        <div>
          <p>
            <a href="mailto:hello@morebookedconsults.com">
              hello@morebookedconsults.com
            </a>
          </p>
          <p className="foot-note">
            From the founder of{" "}
            <a href="https://aesthetichires.com">AestheticHires.com</a> — the
            medspa job board.
          </p>
        </div>
      </div>
    </footer>
  );
}
