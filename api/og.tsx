// api/og.ts
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",   // 👈 important!
};

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get("handle") || "sygnl";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        sygnl.in/{handle}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
