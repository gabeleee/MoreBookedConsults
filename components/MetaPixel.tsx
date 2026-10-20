"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// Meta (Facebook) pixel, site-wide from the root layout so every visitor can be
// retargeted. The pixel is shared with AestheticHires (one pixel per personal
// ad account), so build audiences by URL contains morebookedconsults.com.
// Needs NEXT_PUBLIC_META_PIXEL_ID; without it nothing loads.
// Honors the owner opt-out (?notrack=1 / localStorage "notrack") like GA4 does
// and skips /admin. Fire conversions with window.fbq?.("track", "Lead").
export default function MetaPixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pathname = usePathname();
  const first = useRef(true);

  // The snippet tracks the first PageView; client-side navigations track the rest.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as unknown as { fbq?: (...args: unknown[]) => void };
    w.fbq?.("track", "PageView");
  }, [pathname]);

  if (!id) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`(function(){try{if(new URLSearchParams(location.search).get('notrack')==='1'||localStorage.getItem('notrack')==='1'||location.pathname.indexOf('/admin')===0)return;}catch(e){}
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');fbq('track','PageView');})();`}
    </Script>
  );
}
