import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Bret DuBois · Solutions Engineering · Infrastructure · Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#E5E8EE";
const INK = "#171A22";
const INK_2 = "#262B35";
const MUTED = "#5C6478";
const ACCENT = "#1B4FA3";

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
          padding: "72px 96px",
          background: PAPER,
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        {/* Issue line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingBottom: 14,
            borderBottom: `2px solid ${INK}`,
            fontFamily: "monospace",
            fontSize: 18,
            color: MUTED,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>Vol. I · No. 26 · A Portfolio in Long Form</span>
          <span>Redwood City, CA</span>
        </div>

        {/* Body */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 28,
              color: ACCENT,
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            300+
          </div>
          <div
            style={{
              fontSize: 124,
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: INK,
            }}
          >
            Bret DuBois
          </div>
          <div
            style={{
              fontSize: 36,
              color: INK_2,
              fontStyle: "italic",
              fontFamily: "serif",
              lineHeight: 1.25,
              maxWidth: 880,
            }}
          >
            Pre-sales technical work for infrastructure, AI tooling, and B2B SaaS.
          </div>
        </div>

        {/* Bottom rail */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 14,
            borderTop: `1px solid ${MUTED}`,
            fontFamily: "monospace",
            fontSize: 18,
            color: MUTED,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span>Solutions Engineering · Infrastructure · Automation</span>
          <span style={{ color: ACCENT }}>bretdubois.github.io</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
