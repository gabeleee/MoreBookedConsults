import Script from "next/script";

// Meta (Facebook) pixel, loaded only on paid-ad landing pages that render it.
// Needs NEXT_PUBLIC_META_PIXEL_ID (set in Vercel); without it nothing loads.
// Honors the owner opt-out (?notrack=1 / localStorage "notrack") like GA4 does.
// Fire conversions from the page with window.fbq?.("track", "Lead").
export default function MetaPixel() {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!id) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`(function(){try{if(localStorage.getItem('notrack')==='1')return;}catch(e){}
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${id}');fbq('track','PageView');})();`}
    </Script>
  );
}
