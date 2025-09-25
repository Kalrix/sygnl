// /api/og.js
const { createCanvas } = require('canvas');

module.exports = async (req, res) => {
  const handle = (req.query.handle || 'yourname').toLowerCase();

  const width = 1200, height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // background gradient
  const g = ctx.createLinearGradient(0, 0, width, height);
  g.addColorStop(0, '#0b0b0b');
  g.addColorStop(1, '#141427');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, height);

  // glow bars
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = '#00ffff';
  ctx.beginPath();
  ctx.ellipse(300, 520, 460, 120, Math.PI / 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.fillStyle = '#ff7dd6';
  ctx.beginPath();
  ctx.ellipse(900, 140, 420, 110, -Math.PI / 16, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1;

  // text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('I secured my name on', width / 2, 240);

  ctx.fillStyle = '#00ffff';
  ctx.font = '900 64px Arial';
  ctx.fillText(`sygnl.in/${handle}`, width / 2, 320);

  ctx.fillStyle = '#cfcfcf';
  ctx.font = '28px Arial';
  ctx.fillText('Bharat’s social platform · First 50,000 get 1 year free premium', width / 2, 390);

  // badge
  ctx.fillStyle = '#ffd700';
  const badgeW = 460, badgeH = 70;
  const badgeX = width / 2 - badgeW / 2, badgeY = 470, r = 22;
  ctx.beginPath();
  ctx.moveTo(badgeX + r, badgeY);
  ctx.arcTo(badgeX + badgeW, badgeY, badgeX + badgeW, badgeY + badgeH, r);
  ctx.arcTo(badgeX + badgeW, badgeY + badgeH, badgeX, badgeY + badgeH, r);
  ctx.arcTo(badgeX, badgeY + badgeH, badgeX, badgeY, r);
  ctx.arcTo(badgeX, badgeY, badgeX + badgeW, badgeY, r);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.font = 'bold 28px Arial';
  ctx.fillText('🚀 First 50K get 1 year free', width / 2, badgeY + 46);

  const png = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(png);
};
