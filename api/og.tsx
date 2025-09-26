// /api/og.js
const path = require("path");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");

// Register bundled fonts
GlobalFonts.registerFromPath(path.join(__dirname, "_fonts", "Inter-Regular.ttf"), "Inter");
GlobalFonts.registerFromPath(path.join(__dirname, "_fonts", "Inter-Bold.ttf"), "InterBold");

module.exports = async (req, res) => {
  const handle = (req.query.handle || "yourname").toLowerCase();
  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#0b0b0f";
  ctx.fillRect(0, 0, W, H);

  // headline
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = '800 66px "Inter"';
  ctx.fillText("I secured my name on", W / 2, 220);

  ctx.fillStyle = "#00ffff";
  ctx.font = '900 60px "InterBold"';
  ctx.fillText(`sygnl.in/${handle}`, W / 2, 300);

  const png = canvas.toBuffer("image/png");
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.status(200).send(png);
};
