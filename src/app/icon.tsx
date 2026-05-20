import { ImageResponse } from "next/og";

// Route segment config: static PNG generated at build time.
export const dynamic = "force-static";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B4FA3",
          color: "#E5E8EE",
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: "-0.02em",
          borderRadius: 0,
        }}
      >
        BD
      </div>
    ),
    { ...size }
  );
}
