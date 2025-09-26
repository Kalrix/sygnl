// /api/og.js
const path = require('path');
const { createCanvas, registerFont } = require('canvas');

// ---------- register local fonts (bundled with the function) ----------
try {
  // If you downloaded the variable font:
  registerFont(path.join(__dirname, '_fonts', 'NotoSans-Regular.ttf'), {
    family: 'SgnlUI',
    weight: '400'
  });
  // If you also downloaded a Bold TTF, uncomment and keep both:
  // registerFont(path.join(__dirname, '_fonts', 'NotoSans-Bold.ttf'), {
  //   family: 'SgnlUI',
  //   weight: '700'
  // });
} catch (e) {
  // Fallback if fonts missing – still render with system stack
  console.warn('Font register failed, using default fonts', e);
}

function roundedRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text).split(/\s+/);
  let line = '';
  let lines = 0;

  for (let i = 0; i < words.length; i++) {
    const test = line ? line + ' ' + words[i] : words[i];
    const w = ctx.measureText(test).width;
    if (w > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      lines++;
      if (lines >= maxLines - 1) {
        let truncated = '';
        for (; i < words.length; i++) {
          const attempt = truncated ? truncated + ' ' + words[i] : words[i];
          if (ctx.measureText(attempt + '…').width > maxWidth) break;
          truncated = attempt;
        }
        ctx.fillText((truncated || line) + '…', x, y);
        return;
      }
      line = words[i];
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
}

module.exports = async (req, res) => {
  const handle = (req.query.handle || 'yourname').toLowerCase();

  const W = 1200, H = 630;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  // ---------- background ----------
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#0b0b0f');
  g.addColorStop(1, '#141427');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // diagonal lines
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = '#ffffff';
  for (let x = -H; x < W + H; x += 18) {
    ctx.save();
    ctx.translate(x, 0);
    ctx.rotate((-12 * Math.PI) / 180);
    ctx.fillRect(0, 0, 2, H);
    ctx.restore();
  }
  ctx.globalAlpha = 1;

  // neon blobs
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = '#7d5fff';
  ctx.beginPath();
  ctx.ellipse(W - 120, 140, 420, 180, -0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#00ffff';
  ctx.beginPath();
  ctx.ellipse(180, H - 80, 480, 160, 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // ---------- text styles ----------
  ctx.textAlign = 'center';

  // headline
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 66px "SgnlUI", Arial, Helvetica, sans-serif';
  ctx.fillText('I secured my name on', W / 2, 220);

  // handle
  const prettyHandle = `sygnl.in/${handle}`;
  ctx.fillStyle = '#00ffff';
  ctx.font = '900 60px "SgnlUI", Arial, Helvetica, sans-serif';
  const handleWidth = ctx.measureText(prettyHandle).width;
  if (handleWidth <= 1040) {
    ctx.fillText(prettyHandle, W / 2, 300);
  } else {
    ctx.font = '900 54px "SgnlUI", Arial, Helvetica, sans-serif';
    ctx.fillText(prettyHandle, W / 2, 300);
  }

  // tagline
  ctx.fillStyle = '#cfcfcf';
  ctx.font = '400 28px "SgnlUI", Arial, Helvetica, sans-serif';
  drawWrappedText(
    ctx,
    'Bharat’s social platform · Every voice matters. Every creation pays.',
    W / 2,
    360,
    1000,
    36,
    2
  );

  // badge
  const badgeW = 520, badgeH = 74;
  const badgeX = W / 2 - badgeW / 2, badgeY = 430;
  roundedRectPath(ctx, badgeX, badgeY, badgeW, badgeH, 26);
  const yGrad = ctx.createLinearGradient(0, badgeY, 0, badgeY + badgeH);
  yGrad.addColorStop(0, '#ffe680');
  yGrad.addColorStop(1, '#ffd400');
  ctx.fillStyle = yGrad;
  ctx.shadowColor = 'rgba(255,215,0,0.35)';
  ctx.shadowBlur = 30;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = '#121212';
  ctx.font = '800 28px "SgnlUI", Arial, Helvetica, sans-serif';
  ctx.fillText('First 50,000 get 1 year free', W / 2, badgeY + 50);

  // footer
  ctx.fillStyle = '#8a8a8a';
  ctx.font = '600 22px "SgnlUI", Arial, Helvetica, sans-serif';
  ctx.fillText('sygnl.in', W / 2, H - 40);

  // output
  const png = canvas.toBuffer('image/png');
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
  res.status(200).send(png);
};
