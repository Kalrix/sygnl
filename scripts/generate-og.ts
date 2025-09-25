import { createCanvas, loadImage, registerFont } from "canvas";
import fs from "fs";

// Register custom font (downloaded in /public/fonts)

const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, "#0a0a0a");
gradient.addColorStop(1, "#1e0038");
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Neon glow effect
ctx.shadowColor = "#00ffff";
ctx.shadowBlur = 30;

// Title
ctx.font = "bold 72px Poppins";
ctx.fillStyle = "#ffffff";
ctx.textAlign = "center";
ctx.fillText("I just secured my handle", width / 2, 220);

// Sub text (handle)
ctx.font = "bold 48px Poppins";
ctx.fillStyle = "#00ffff";
ctx.fillText("sygnl.in/yourhandle", width / 2, 320);

// Tagline
ctx.font = "28px Poppins";
ctx.fillStyle = "#cccccc";
ctx.fillText("Bharat’s Social Media. Every voice counts.", width / 2, 400);

// Badge
ctx.fillStyle = "#ffd700";
ctx.beginPath();
ctx.roundRect(width / 2 - 180, 440, 360, 70, 20);
ctx.fill();
ctx.fillStyle = "#000";
ctx.font = "bold 28px Poppins";
ctx.fillText("🚀 First 50K get 1 year free", width / 2, 485);

// Export
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("public/og/og-default.png", buffer);

console.log("✅ OG image generated: public/og/og-default.png");
