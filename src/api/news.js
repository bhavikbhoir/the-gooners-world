const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/news' : import.meta.env.VITE_API_BASE + '/proxy/news';
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GW_KEY = import.meta.env.VITE_API_GW_KEY;
const CACHE_KEY = 'tgw_news_cache';
const CACHE_TTL = 30 * 60 * 1000;

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
  const seen = new Set();
  const articles = (json.results || [])
    .filter((a) => {
      if (!a.title || seen.has(a.title)) return false;
      seen.add(a.title);
      return true;
    })
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
