import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Bret DuBois — technical seller who builds";
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
          padding: "88px",
          background: "#fdfdfc",
          color: "#1c1c1a",
          fontFamily: "sans-serif",
          borderBottom: "16px solid #1c1c1a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 26,
            color: "#74746e",
            letterSpacing: "0.1em",
          }}
        >
          BRDUBOIS.COM
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Bret DuBois
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#4d4d49", marginTop: 18 }}>
            Technical seller who builds. Solutions engineering,
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#4d4d49" }}>
            infrastructure, and the systems that run under my desk.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
