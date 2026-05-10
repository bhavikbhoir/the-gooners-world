const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/news' : import.meta.env.VITE_API_BASE + '/proxy/news';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GW_KEY = import.meta.env.VITE_API_GW_KEY;
const CACHE_KEY = 'tgw_news_cache_v3';
const CACHE_TTL = 30 * 60 * 1000;

const NON_FOOTBALL = /\b(wag|wags|twerk|influencer|influencers|celebrity|celebrities|fashion|beauty|makeup|hairstyle|hairstyles|playlist|music|singer|actress|actor|model|lifestyle|gossip|romance|dating|married|wedding|divorce|baby|pregnant|pregnancy|viral|meme|tiktok|instagram\s+star|youtube)\b/i;
const NON_ARSENAL_SCORE = /^(?:premier league|bundesliga|la liga|serie a|ligue 1|eredivisie|championship):/i;

function isRelevant(a) {
  if (!a.title) return false;
  if (NON_FOOTBALL.test(a.title)) return false;
  if (NON_ARSENAL_SCORE.test(a.title) && !/arsenal|gunners/i.test(a.title)) return false;
  if (a.description && a.description.trim() === a.title.trim()) return false;
  return true;
}

const STOP_WORDS = new Set(['the','a','an','in','of','for','on','at','to','and','or','is','are','was','were','has','have','with','as','by','from','its','this','that','how','why','what','who','when','their','our','his','her','been','be','but','not','after','over','about','up']);

function titleFingerprint(title) {
  return title.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function isSameStory(titleA, titleB) {
  const a = new Set(titleFingerprint(titleA));
  const b = new Set(titleFingerprint(titleB));
  if (!a.size || !b.size) return false;
  const overlap = [...a].filter((w) => b.has(w)).length;
  return overlap / Math.min(a.size, b.size) >= 0.6;
}

export async function fetchArsenalNews() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) return cached.data;
  } catch {}

  let url;
  const headers = {};

  if (isDev) {
    const params = new URLSearchParams({
      apikey: API_KEY,
      q: '"Arsenal FC" OR "Arsenal Football Club"',
      category: 'sports',
      language: 'en',
      size: '10',
    });
    url = `${BASE}?${params}`;
  } else {
    url = BASE;
    if (GW_KEY) headers['x-api-key'] = GW_KEY;
  }

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`News API error: ${res.status}`);

  const json = await res.json();
  const seenTitles = new Set();
  const kept = [];
  for (const a of (json.results || [])) {
    if (!a.title || seenTitles.has(a.title)) continue;
    seenTitles.add(a.title);
    if (!isRelevant(a)) continue;
    if (kept.some((k) => isSameStory(k.title, a.title))) continue;
    kept.push(a);
  }
  const articles = kept
    .slice(0, 20)
    .map((a) => ({
      title: a.title,
      description: a.description || '',
      url: a.link,
      image: a.image_url || null,
      source: a.source_name || a.source_id || 'Unknown',
      publishedAt: a.pubDate,
    }));

  localStorage.setItem(CACHE_KEY, JSON.stringify({ data: articles, timestamp: Date.now() }));
  return articles;
}
