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
          background: "linear-gradient(135deg, #C2410C 0%, #B45309 100%)",
          color: "#FAF7F2",
          fontFamily: "serif",
          fontWeight: 700,
          fontSize: 100,
          letterSpacing: "-0.02em",
        }}
      >
        BD
      </div>
    ),
    { ...size }
  );
}
