// api/og.ts
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",   // 👈 yeh line add karni zaruri hai
};

export default async function handler(req: Request) {
  try {
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
          }}
        >
          sygnl.in/{handle}
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
