const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/football' : import.meta.env.VITE_API_BASE + '/proxy/football';
const GW_KEY = import.meta.env.VITE_API_GW_KEY;
const ARSENAL_ID = 57;

function cacheGet(key, ttl) {
  try {
    const c = JSON.parse(localStorage.getItem(key));
    if (c && Date.now() - c.ts < ttl) return c.data;
  } catch {}
  return null;
}

function cacheSet(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
}

async function apiFetch(url) {
  const headers = {};
  if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`Football API ${res.status}`);
  return res.json();
}

export async function fetchStandings() {
  const key = 'tgw_standings';
  const cached = cacheGet(key, 30 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${BASE}/competitions/PL/standings`
    : `${BASE}?type=standings`;

  const json = await apiFetch(url);
  const table = json.standings?.[0]?.table?.map((t) => ({
    position: t.position,
    team: t.team.shortName || t.team.name,
    crest: t.team.crest,
    played: t.playedGames,
    won: t.won,
    draw: t.draw,
    lost: t.lost,
    gf: t.goalsFor,
    ga: t.goalsAgainst,
    gd: t.goalDifference,
    points: t.points,
    isArsenal: t.team.id === ARSENAL_ID,
  })) || [];

  cacheSet(key, table);
  return table;
}

export async function fetchMatches() {
  const key = 'tgw_matches';
  const cached = cacheGet(key, 15 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${BASE}/teams/${ARSENAL_ID}/matches?status=SCHEDULED,TIMED,FINISHED&limit=20`
    : `${BASE}?type=matches`;

  const json = await apiFetch(url);
  const matches = (json.matches || []).map((m) => ({
    id: m.id,
    competition: m.competition?.name,
    date: m.utcDate,
    status: m.status,
    home: m.homeTeam.shortName || m.homeTeam.name,
    homeCrest: m.homeTeam.crest,
    away: m.awayTeam.shortName || m.awayTeam.name,
    awayCrest: m.awayTeam.crest,
    homeScore: m.score?.fullTime?.home,
    awayScore: m.score?.fullTime?.away,
  }));

  cacheSet(key, matches);
  return matches;
}
