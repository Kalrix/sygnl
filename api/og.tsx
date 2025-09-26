// /api/og.js
const path = require('path');
const { createCanvas, registerFont } = require('canvas');

// 🔑 Register bundled fonts (these files MUST exist in /api/_fonts)
registerFont(path.join(__dirname, '_fonts', 'Inter-Regular.ttf'), {
  family: 'Inter',
  weight: '400'
});
registerFont(path.join(__dirname, '_fonts', 'Inter-Bold.ttf'), {
  family: 'Inter',
  weight: '700'
});

module.exports = async (req, res) => {
  const handle = (req.query.handle || 'yourname').toLowerCase();

  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // background
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#0b0b0f');
  g.addColorStop(1, '#141427');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // headline
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '700 66px "Inter"';
  ctx.fillText('I secured my name on', W / 2, 220);

  // handle
  ctx.fillStyle = '#00ffff';
  ctx.font = '700 60px "Inter"';
  ctx.fillText(`sygnl.in/${handle}`, W / 2, 300);

  // tagline
  ctx.fillStyle = '#cfcfcf';
  ctx.font = '400 28px "Inter"';
  ctx.fillText('Bharat’s social platform · Every voice matters.', W / 2, 380);

  // badge
  ctx.fillStyle = '#ffd700';
  ctx.font = '700 28px "Inter"';
  ctx.fillText('🚀 First 50K get 1 year free', W / 2, 470);

  const png = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(png);
};
