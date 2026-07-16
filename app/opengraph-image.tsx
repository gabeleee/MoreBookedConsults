import { ImageResponse } from "next/og";

// Branded social-share card (1200x630). Next wires this into og:image and
// twitter:image site-wide. Uses default fonts + brand colors (Satori has
// limited custom-font/SVG support, so we keep it type-forward).
export const alt =
  "More Booked Consults, CRO & Local SEO for aesthetic practices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          background:
            "linear-gradient(135deg, #EFEDFB 0%, #F8F8FD 55%, #E7EEFC 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            letterSpacing: "6px",
            textTransform: "uppercase",
            color: "#6C57E8",
          }}
        >
          CRO + Local SEO · Aesthetic practice marketing
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "68px",
            lineHeight: 1.1,
            color: "#232140",
            maxWidth: "960px",
            marginTop: "26px",
          }}
        >
          More booked consults from the traffic you already have.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "30px",
            color: "#6C6990",
            marginTop: "30px",
          }}
        >
          For medspas, plastic surgeons &amp; other aesthetic practices.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "26px",
            color: "#232140",
            marginTop: "56px",
            fontWeight: 600,
          }}
        >
          More Booked Consults
        </div>
      </div>
    ),
    { ...size },
  );
}
