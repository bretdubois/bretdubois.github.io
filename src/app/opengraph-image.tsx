import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Bret DuBois — Technical Sales × Engineering × Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #120D0A 0%, #231A15 50%, #2D1E17 100%)",
          color: "#FAF7F2",
          fontFamily: "serif",
        }}
      >
        {/* top row: monogram + location */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "#C2410C",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 44,
              color: "#FAF7F2",
            }}
          >
            BD
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 20,
              color: "rgba(250,247,242,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Redwood City, CA
          </div>
        </div>

        {/* name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 144,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            Bret DuBois
          </div>
          <div
            style={{
              fontSize: 44,
              fontStyle: "italic",
              color: "rgba(250,247,242,0.55)",
              letterSpacing: "-0.01em",
            }}
          >
            — where technical depth meets human connection
          </div>
        </div>

        {/* bottom row: three-pillar tags */}
        <div style={{ display: "flex", gap: 24 }}>
          {["Sales", "Engineering", "Design"].map((label) => (
            <div
              key={label}
              style={{
                padding: "12px 28px",
                borderRadius: 9999,
                border: "2px solid #C2410C",
                color: "#F97316",
                fontSize: 26,
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
