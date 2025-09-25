// scripts/generate-og.js
const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

const width = 1200;
const height = 630;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Background gradient
const g = ctx.createLinearGradient(0, 0, width, height);
g.addColorStop(0, "#0b0b0b");
g.addColorStop(1, "#141427");
ctx.fillStyle = g;
ctx.fillRect(0, 0, width, height);

// Subtle glow bars
ctx.globalAlpha = 0.25;
ctx.fillStyle = "#00ffff";
ctx.beginPath();
ctx.ellipse(300, 520, 460, 120, Math.PI / 12, 0, 2 * Math.PI);
ctx.fill();
ctx.fillStyle = "#ff7dd6";
ctx.beginPath();
ctx.ellipse(900, 140, 420, 110, -Math.PI / 16, 0, 2 * Math.PI);
ctx.fill();
ctx.globalAlpha = 1;

// Title
ctx.fillStyle = "#ffffff";
ctx.font = "bold 72px Arial";
ctx.textAlign = "center";
ctx.fillText("I secured my name on", width / 2, 240);

// Handle placeholder
ctx.fillStyle = "#00ffff";
ctx.font = "900 64px Arial";
ctx.fillText("sygnl.in/yourname", width / 2, 320);

// Tagline
ctx.fillStyle = "#cfcfcf";
ctx.font = "28px Arial";
ctx.fillText("Bharat’s social platform · First 50,000 get 1 year free premium", width / 2, 390);

// Footer brand
ctx.fillStyle = "#8a8a8a";
ctx.font = "22px Arial";
ctx.fillText("Every voice matters. Every creation pays.", width / 2, 460);

// Badge
ctx.fillStyle = "#ffd700";
const badgeW = 420, badgeH = 70;
const badgeX = width / 2 - badgeW / 2, badgeY = 500;
const r = 22;
ctx.beginPath();
ctx.moveTo(badgeX + r, badgeY);
ctx.arcTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + badgeH, r);
ctx.arcTo(badgeX + badgeW, badgeY + badgeH, badgeX, badgeY + badgeH, r);
ctx.arcTo(badgeX, badgeY + badgeH, badgeX, badgeY, r);
ctx.arcTo(badgeX, badgeY, badgeX + badgeW, badgeY, r);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#000";
ctx.font = "bold 28px Arial";
ctx.fillText("🚀 First 50K get 1 year free", width / 2, badgeY + 46);

// Save
const outDir = path.join(process.cwd(), "public", "og");
fs.mkdirSync(outDir, { recursive: true });
const file = path.join(outDir, "og-default.png");
fs.writeFileSync(file, canvas.toBuffer("image/png"));

console.log("✅ Generated:", file);
