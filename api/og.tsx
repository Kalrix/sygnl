// /api/og.ts
import { NextApiRequest, NextApiResponse } from "next";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";

// Load fonts once
const interRegular = fs.readFileSync(
  path.resolve(process.cwd(), "public/fonts/Inter-Regular.ttf")
);
const interBold = fs.readFileSync(
  path.resolve(process.cwd(), "public/fonts/Inter-Bold.ttf")
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const handle = (req.query.handle as string) || "yourname";

    // 1) Create SVG with Satori
    const svg = await satori(
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b0b0b, #141427)",
          color: "white",
          fontFamily: "Inter",
        }}
      >
        {/* Heading */}
        <div style={{ fontSize: "64px", fontWeight: 700, marginBottom: "20px" }}>
          I secured my name on
        </div>

        {/* Handle */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: 900,
            color: "#00ffff",
            marginBottom: "24px",
          }}
        >
          sygnl.in/{handle}
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: "28px",
            color: "#cfcfcf",
            maxWidth: "900px",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Bharat’s social platform · Every voice matters · First 50,000 get 1 year free premium
        </div>

        {/* Badge */}
        <div
          style={{
            background: "linear-gradient(90deg, #FFD700, #FFEA70)",
            color: "#000",
            fontSize: "28px",
            fontWeight: 700,
            padding: "16px 40px",
            borderRadius: "40px",
          }}
        >
          🚀 First 50K get 1 year free
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          { name: "Inter", data: interRegular, weight: 400, style: "normal" },
          { name: "Inter", data: interBold, weight: 700, style: "normal" },
        ],
      }
    );

    // 2) Convert SVG → PNG
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
    const png = resvg.render().asPng();

    // 3) Send response
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    res.status(200).send(png);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to generate OG image");
  }
}
