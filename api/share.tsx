// /api/share.js
const SITE = process.env.SITE_URL || "https://sygnl.in";

const sanitizeHandle = (v) =>
  String(v || "")
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, 32);

module.exports = async (req, res) => {
  const url = new URL(req.url, SITE);
  const qpHandle = url.searchParams.get("handle");
  const pathHandle = url.pathname.split("/").pop();
  const handle = sanitizeHandle(qpHandle || pathHandle || "friend");

  const title = `🎉 @${handle} secured their identity on sygnl — claim yours now!`;
  const desc =
    "I have secured my identity on the upcoming social platform sygnl — where every voice matters and every signal is rewarded. Join me today and get 1 year free premium (first 50K).";

  // Static image with a cache-buster per handle (helps Twitter/X cache)
  const og = `${SITE}/og/og-default.png?h=${encodeURIComponent(handle)}`;
  const shareUrl = `${SITE}/share/${encodeURIComponent(handle)}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="sygnl" />
<meta property="og:locale" content="en_IN" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${shareUrl}" />
<meta property="og:image" content="${og}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="sygnl.in/@${handle} — join today and get free premium" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="${shareUrl}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${og}" />
<meta name="twitter:image:alt" content="sygnl.in/@${handle}" />

<link rel="canonical" href="${shareUrl}" />
</head>
<body style="margin:0; background:#0b0b0f; color:#fff; font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">
  <div style="min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:24px;">
    <div>
      <h1 style="margin:0 0 12px; font-size:28px;">${title}</h1>
      <p style="opacity:.85; max-width:720px; margin:0 auto 20px; line-height:1.4;">${desc}</p>
      <p style="opacity:.65; margin:0 0 24px;">Preview image may take a moment to update on social apps.</p>
      <a href="/" style="display:inline-block; background:#00ffff; color:#000; font-weight:800; padding:12px 18px; border-radius:999px; text-decoration:none;">Back to sygnl</a>
    </div>
  </div>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // allow crawlers/CDN to cache briefly
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.status(200).send(html);
};
