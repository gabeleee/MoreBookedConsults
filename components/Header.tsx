// Sticky site header, ported from morebookedconsults-v18.html (lines 372-377).
// No JS — sticky is pure CSS (see `header` in globals.css). Server component.
//
// Nav is intentionally minimal (brand + Free audit CTA), matching the v18
// mockup. The fuller nav (hubs, Results, Pricing) lands when those pages exist.
import Logo from "./Logo";

export default function Header() {
  return (
    <header>
      <div className="wrap nav">
        <Logo href="#top" />
        <a className="nav-cta" href="#audit">
          Free audit
        </a>
      </div>
    </header>
  );
}
