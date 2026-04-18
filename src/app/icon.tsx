import { ImageResponse } from "next/og";

// Route segment config — static PNG generated at build time.
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
          background: "#C2410C",
          color: "#FAF7F2",
          fontFamily: "serif",
          fontWeight: 700,
          fontSize: 38,
          letterSpacing: "-0.02em",
          borderRadius: 12,
        }}
      >
        BD
      </div>
    ),
    { ...size }
  );
}
