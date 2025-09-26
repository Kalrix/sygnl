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
  const handle = sanitizeHandle(qpHandle || pathHandle || "friend");

  // ---- Personalized copy ----
  // Title used by platforms (short, punchy, includes handle)
  const title = `🎉 @${handle} secured their identity on sygnl — claim yours now!`;

  // Long description for preview (your requested tone)
  const desc =
    "I have secured my identity on the upcoming social platform sygnl — where every voice matters and every signal is rewarded. Join me today and get 1 year of free premium (first 50K).";

  // Static OG image (hosted in /public/og) with per-handle cache-buster
  const og = `${SITE}/og/og-default.png?h=${encodeURIComponent(handle)}`;

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
<meta property="og:image:alt" content="sygnl.in/@${handle} — join today and get free premium" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${og}" />
<!-- Optional if you have a Twitter handle -->
<!-- <meta name="twitter:site" content="@sygnl_in" /> -->

<link rel="canonical" href="${shareUrl}" />
<!-- Humans bounce to app; crawlers keep meta -->
<meta http-equiv="refresh" content="0; url=/" />
</head>
<body></body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=300, s-maxage=300");
  res.status(200).send(html);
};
