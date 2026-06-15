const isDev = import.meta.env.DEV;
const FOOTBALL_BASE = isDev ? '/api/football' : import.meta.env.VITE_API_BASE + '/proxy/football';
const AI_BASE = isDev ? '/api/ai' : import.meta.env.VITE_API_BASE + '/proxy/ai';
const WC_BASE = isDev ? '/api/wc' : import.meta.env.VITE_API_BASE + '/wc';
const GW_KEY = import.meta.env.VITE_API_GW_KEY;

function cacheGet(key, ttl) {
  try {
    const c = JSON.parse(localStorage.getItem(key));
    if (c && Date.now() - c.ts < ttl) return c.data;
  } catch {}
  return null;
}

function cacheSet(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

async function apiFetch(url) {
  const headers = {};
  if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

function mapWCMatch(m) {
  return {
    id: m.id,
    stage: m.stage || '',
    group: m.group || null,
    date: m.utcDate,
    status: m.status,
    minute: m.minute ?? null,
    homeTeam: m.homeTeam.name,
    homeShort: m.homeTeam.shortName || m.homeTeam.name,
    homeCrest: m.homeTeam.crest || '',
    awayTeam: m.awayTeam.name,
    awayShort: m.awayTeam.shortName || m.awayTeam.name,
    awayCrest: m.awayTeam.crest || '',
    homeScore: m.score?.fullTime?.home ?? null,
    awayScore: m.score?.fullTime?.away ?? null,
  };
}

export async function fetchWCMatches() {
  const key = 'tgw_wc_matches';
  const cached = cacheGet(key, 15 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${FOOTBALL_BASE}/competitions/WC/matches`
    : `${FOOTBALL_BASE}?type=wc-matches`;

  const json = await apiFetch(url);
  const matches = (json.matches || []).map(mapWCMatch);
  cacheSet(key, matches);
  return matches;
}

export async function fetchWCLiveMatches() {
  const url = isDev
    ? `${FOOTBALL_BASE}/competitions/WC/matches?status=IN_PLAY,LIVE,PAUSED`
    : `${FOOTBALL_BASE}?type=wc-live`;

  try {
    const headers = {};
    if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
    const res = await fetch(url, { headers, cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.matches || []).map(mapWCMatch);
  } catch {
    return [];
  }
}

export async function fetchWCMatchGoals(matchId) {
  const key = `tgw_wc_goals_${matchId}`;
  const cached = cacheGet(key, 24 * 60 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${FOOTBALL_BASE}/matches/${matchId}`
    : `${FOOTBALL_BASE}?type=match&matchId=${matchId}`;

  try {
    const headers = {};
    if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
    const res = await fetch(url, { headers });
    if (!res.ok) return [];
    const json = await res.json();
    const goals = (json.goals || []).map(g => ({
      scorer: g.scorer?.name || 'Unknown',
      team: g.team?.name || '',
      minute: g.minute,
      type: g.type,
    }));
    cacheSet(key, goals);
    return goals;
  } catch {
    return [];
  }
}

export async function fetchWCArchive() {
  if (isDev) return [];
  const key = 'tgw_wc_archive';
  const cached = cacheGet(key, 5 * 60 * 1000);
  if (cached) return cached;

  try {
    const headers = { 'x-api-key': GW_KEY };
    const res = await fetch(`${WC_BASE}/archive`, { headers });
    if (!res.ok) return [];
    const json = await res.json();
    const matches = json.matches || [];
    cacheSet(key, matches);
    return matches;
  } catch {
    return [];
  }
}

export async function fetchWCPlayerSummary(match, gunnerGoals) {
  const key = `tgw_wc_ai_${match.id}`;
  const cached = cacheGet(key, 24 * 60 * 60 * 1000);
  if (cached) return cached;

  const payload = {
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    homeScore: match.homeScore,
    awayScore: match.awayScore,
    stage: match.stage,
    gunnerPlayers: match.gunners || [],
    gunnerGoals: gunnerGoals || [],
  };

  const url = `${AI_BASE}?type=wc-summary&data=${encodeURIComponent(JSON.stringify(payload))}`;

  try {
    const headers = {};
    if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    const json = await res.json();
    const text = json.text || null;
    if (text) cacheSet(key, text);
    return text;
  } catch {
    return null;
  }
}
