import { ImageResponse } from "next/og";

/**
 * Auto-generated Open Graph / Twitter card (1200×630) for every route.
 * English-only by design: the bundled Geist font has no Bengali glyphs.
 * `next/og` ships Geist Regular as its default font, so no font loading
 * is needed here.
 */
export const alt = "Hasan Bin Ali — Video Editor & Cinematographer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(80% 100% at 15% 0%, rgba(0,133,255,0.28), transparent 60%), radial-gradient(60% 90% at 100% 100%, rgba(0,133,255,0.16), transparent 65%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#0085ff",
              fontSize: 26,
              letterSpacing: 6,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 999,
                backgroundColor: "#0085ff",
              }}
            />
            .REC — VISUAL STORYTELLING
          </div>
          <div style={{ display: "flex", color: "#9298a5", fontSize: 26, letterSpacing: 3 }}>
            hasanbinali.com
          </div>
        </div>

        {/* center */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 104,
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            Hasan Bin Ali
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              color: "#e0e2ec",
              fontSize: 40,
              letterSpacing: 1,
            }}
          >
            Video Editor
            <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#0085ff" }} />
            Cinematographer
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#9298a5",
            fontSize: 26,
            letterSpacing: 2,
          }}
        >
          <div>DHAKA, BANGLADESH</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#0085ff",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "3px solid #0085ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: "#0085ff",
                letterSpacing: 1,
              }}
            >
              HB
            </div>
            OPEN FOR PROJECTS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
