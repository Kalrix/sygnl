// /api/share.js
const SITE = process.env.SITE_URL || "https://sygnl.in";

// allow [a-z0-9._] only, trim & lowercase
const sanitizeHandle = (v) =>
  String(v || "")
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, 32);

module.exports = async (req, res) => {
  const url = new URL(req.url, SITE);

  // handle can come from /share/:handle (via rewrite) or ?handle=
  const qpHandle = url.searchParams.get("handle");
  const pathHandle = url.pathname.split("/").pop();

  const handleRaw = qpHandle || pathHandle || "friend";
  const handle = sanitizeHandle(handleRaw);

  // Dynamic text (FOMO)
  const title = `🎉 ${handle} secured their name on sygnl.in — claim yours now!`;
  const desc =
    "Bharat’s social platform. Every voice matters. Every creation pays. First 50,000 get 1 year free premium.";

  // Static image + per-handle cache buster (so each share gets its own cached URL)
  const og = `${SITE}/og/og-default.png?h=${encodeURIComponent(handle)}`;

  // Canonical share URL
  const shareUrl = `${SITE}/share/${encodeURIComponent(handle)}`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- OpenGraph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="sygnl" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:url" content="${shareUrl}" />
<meta property="og:image" content="${og}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="I secured my name on sygnl.in/${handle}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${og}" />
<meta name="twitter:site" content="@sygnl_in" />

<!-- Humans get redirected to app; crawlers stay for meta -->
<link rel="canonical" href="${shareUrl}" />
<meta http-equiv="refresh" content="0; url=/" />
</head>
<body></body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // allow crawlers/CDN to cache briefly
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.status(200).send(html);
};
