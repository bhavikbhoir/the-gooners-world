const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/ai' : import.meta.env.VITE_API_BASE + '/proxy/ai';
const GW_KEY = import.meta.env.VITE_API_GW_KEY;

function cacheGet(key) {
  try {
    const c = JSON.parse(localStorage.getItem(key));
    if (c && Date.now() - c.ts < c.ttl) return c.data;
  } catch {}
  return null;
}

function cacheSet(key, data, ttl) {
  localStorage.setItem(key, JSON.stringify({ data, ts: Date.now(), ttl }));
}

async function aiCall(type, data) {
  const cacheKey = `tgw_ai_${type}_${data.home || ''}_${data.away || ''}`;
  const cached = cacheGet(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    type,
    data: encodeURIComponent(JSON.stringify(data)),
  });

  const headers = {};
  if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;

  const res = await fetch(`${BASE}?${params}`, { headers });
  if (!res.ok) return null;

  const json = await res.json();
  const ttl = type === 'prediction' ? 3600000 : 86400000;
  cacheSet(cacheKey, json.text, ttl);
  return json.text;
}

export async function fetchPrediction(match, recentForm) {
  return aiCall('prediction', {
    home: match.home,
    away: match.away,
    competition: match.competition,
    date: match.date,
    recentForm,
  });
}

export async function fetchSummary(match) {
  return aiCall('summary', {
    home: match.home,
    away: match.away,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    competition: match.competition,
    date: match.date,
  });
}
