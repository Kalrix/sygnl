/* api/og.tsx */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge", // 👈 Edge runtime required
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "black",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          fontWeight: 900,
        }}
      >
        sygnl.in 🚀
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
