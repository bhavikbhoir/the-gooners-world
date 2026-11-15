/**
 * Post-build SEO pass.
 *
 * The site is a client-rendered SPA, but social crawlers (WhatsApp, X, Facebook,
 * Instagram, Slack) and first-pass search indexing never execute JavaScript —
 * they read the HTML that comes off the wire. A single index.html therefore gives
 * every route the same title, description and share card.
 *
 * This writes one real HTML file per route with its own metadata, so each page
 * previews and indexes as itself. Firebase serves build/<Route>/index.html for
 * /<Route> before falling through to the SPA rewrite; React then hydrates as normal.
 *
 * Also emits sitemap.xml. Run automatically after `vite build` (see package.json).
 */

const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://the-gooners-world.web.app';
const BUILD = path.join(__dirname, '..', 'build');
const OG_IMAGE = `${ORIGIN}/og-default.png`;

// /admin is intentionally absent: it is noindex'd and excluded from the sitemap.
const ROUTES = [
  {
    path: '/',
    title: 'The Gooners World — Arsenal FC live scores, fixtures & AI predictions',
    description:
      'Live Arsenal scores, fixtures, Premier League standings, squad and news — plus AI match predictions and an Arsenal assistant that answers anything about the Gunners.',
    priority: '1.0',
    changefreq: 'hourly',
  },
  {
    path: '/StatsFixtures',
    title: 'Arsenal fixtures, results & Premier League table | The Gooners World',
    description:
      'Every Arsenal fixture and result, the live Premier League table with Arsenal highlighted, top scorers and the full Champions League journey.',
    priority: '0.9',
    changefreq: 'hourly',
  },
  {
    path: '/NewsCenter',
    title: 'Arsenal news — latest Gunners headlines | The Gooners World',
    description:
      'The latest Arsenal FC news in one feed: transfers, team news, match reports and reaction, searchable and updated through the day.',
    priority: '0.9',
    changefreq: 'hourly',
  },
  {
    path: '/Squad',
    title: 'Arsenal squad 2026 — full first-team list | The Gooners World',
    description:
      "Arsenal's full first-team squad by position — goalkeepers, defenders, midfielders and forwards, with shirt numbers and nationalities.",
    priority: '0.8',
    changefreq: 'weekly',
  },
  {
    path: '/About',
    title: 'About The Gooners World — data partners & Arsenal MCP tools',
    description:
      'Who we are, the data partners behind our live Arsenal scores and stats, and how to connect our Arsenal tools to any AI assistant over MCP.',
    priority: '0.6',
    changefreq: 'monthly',
  },
];

const esc = (s) =>
  String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

/** Replace the content of a meta/title/canonical tag, leaving the rest of the HTML untouched. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`, 'i');
  return html.replace(re, `$1${esc(value)}$2`);
}

function applyRoute(html, route) {
  const url = route.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${route.path}`;

  let out = html
    .replace(/<title>[^<]*<\/title>/i, `<title>${esc(route.title)}</title>`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/i, `$1${esc(url)}$2`);

  out = setMeta(out, 'name', 'title', route.title);
  out = setMeta(out, 'name', 'description', route.description);
  out = setMeta(out, 'property', 'og:title', route.title);
  out = setMeta(out, 'property', 'og:description', route.description);
  out = setMeta(out, 'property', 'og:url', url);
  out = setMeta(out, 'property', 'og:image', OG_IMAGE);
  out = setMeta(out, 'name', 'twitter:title', route.title);
  out = setMeta(out, 'name', 'twitter:description', route.description);
  out = setMeta(out, 'name', 'twitter:url', url);
  out = setMeta(out, 'name', 'twitter:image', OG_IMAGE);

  return out;
}

function sitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map((r) => {
    const loc = r.path === '/' ? `${ORIGIN}/` : `${ORIGIN}${r.path}`;
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${r.changefreq}</changefreq>`,
      `    <priority>${r.priority}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function main() {
  const indexPath = path.join(BUILD, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('[seo] build/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  const base = fs.readFileSync(indexPath, 'utf8');

  // Guard against silent drift: if the tags we rewrite ever disappear from
  // index.html, fail loudly rather than shipping pages with wrong metadata.
  for (const marker of ['<title>', 'og:title', 'twitter:title', 'rel="canonical"']) {
    if (!base.includes(marker)) {
      console.error(`[seo] index.html is missing ${marker} — aborting.`);
      process.exit(1);
    }
  }

  let written = 0;
  for (const route of ROUTES) {
    const html = applyRoute(base, route);
    const dest =
      route.path === '/' ? indexPath : path.join(BUILD, route.path.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, html);
    written += 1;
  }

  fs.writeFileSync(path.join(BUILD, 'sitemap.xml'), sitemap());

  console.log(`[seo] ${written} route page(s) + sitemap.xml written to build/`);
}

main();
