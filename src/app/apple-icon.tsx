import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c1c1a",
          color: "#fdfdfc",
          fontFamily: "monospace",
          fontWeight: 600,
          fontSize: 84,
          letterSpacing: "-0.02em",
        }}
      >
        bd
      </div>
    ),
    { ...size }
  );
}
