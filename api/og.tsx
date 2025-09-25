/* api/og.tsx */
import { ImageResponse } from "next/og"; // 👈 ye karo, @vercel/og nahi

export const config = {
  runtime: "edge",
};

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: "white",
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
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
