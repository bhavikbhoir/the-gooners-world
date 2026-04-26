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

function mapMatch(m) {
  return {
    id: m.id,
    competition: m.competition?.name,
    date: m.utcDate,
    status: m.status,
    home: m.homeTeam.shortName || m.homeTeam.name,
    homeCrest: m.homeTeam.crest,
    away: m.awayTeam.shortName || m.awayTeam.name,
    awayCrest: m.awayTeam.crest,
    homeScore: m.score?.fullTime?.home ?? m.score?.halfTime?.home,
    awayScore: m.score?.fullTime?.away ?? m.score?.halfTime?.away,
    venue: m.venue,
    referees: m.referees?.map((r) => r.name) || [],
  };
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

export async function fetchCLStandings() {
  const key = 'tgw_cl_matches';
  const cached = cacheGet(key, 15 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${BASE}/teams/${ARSENAL_ID}/matches?competitions=CL&status=SCHEDULED,TIMED,FINISHED&limit=40`
    : `${BASE}?type=cl-matches`;

  const json = await apiFetch(url);
  const clMatches = (json.matches || [])
    .filter((m) => m.competition?.code === 'CL')
    .map((m) => ({
      id: m.id,
      stage: m.stage,
      date: m.utcDate,
      status: m.status,
      home: m.homeTeam.shortName || m.homeTeam.name,
      homeCrest: m.homeTeam.crest,
      homeScore: m.score?.fullTime?.home,
      away: m.awayTeam.shortName || m.awayTeam.name,
      awayCrest: m.awayTeam.crest,
      awayScore: m.score?.fullTime?.away,
      homeIsArsenal: m.homeTeam.id === ARSENAL_ID,
      awayIsArsenal: m.awayTeam.id === ARSENAL_ID,
    }));

  cacheSet(key, clMatches);
  return clMatches;
}

export async function fetchScorers() {
  const key = 'tgw_scorers';
  const cached = cacheGet(key, 30 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${BASE}/competitions/PL/scorers?limit=20`
    : `${BASE}?type=scorers`;

  const json = await apiFetch(url);
  const scorers = (json.scorers || []).map((s) => ({
    name: s.player.name,
    team: s.team.shortName || s.team.name,
    crest: s.team.crest,
    goals: s.goals || 0,
    assists: s.assists || 0,
    penalties: s.penalties || 0,
    isArsenal: s.team.id === ARSENAL_ID,
  }));

  cacheSet(key, scorers);
  return scorers;
}

export async function fetchMatches() {
  const key = 'tgw_matches';
  const cached = cacheGet(key, 15 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${BASE}/teams/${ARSENAL_ID}/matches?status=SCHEDULED,TIMED,FINISHED&limit=20`
    : `${BASE}?type=matches`;

  const json = await apiFetch(url);
  const matches = (json.matches || []).map(mapMatch);
  cacheSet(key, matches);
  return matches;
}

export async function fetchLiveMatch() {
  const url = isDev
    ? `${BASE}/teams/${ARSENAL_ID}/matches?status=LIVE,IN_PLAY,PAUSED&limit=1`
    : `${BASE}?type=live`;

  try {
    const json = await apiFetch(url);
    const matches = (json.matches || []).map(mapMatch);
    return matches[0] || null;
  } catch {
    return null;
  }
}

export async function fetchSquad() {
  const key = 'tgw_squad';
  const cached = cacheGet(key, 24 * 60 * 60 * 1000);
  if (cached) return cached;

  const url = isDev
    ? `${BASE}/teams/${ARSENAL_ID}`
    : `${BASE}?type=squad`;

  const json = await apiFetch(url);
  const squad = (json.squad || [])
    .filter((p) => p.name)
    .map((p) => ({
      id: p.id,
      name: p.name,
      position: p.position && p.position !== 'null' ? p.position : null,
      nationality: p.nationality || '',
      dateOfBirth: p.dateOfBirth || null,
      shirtNumber: p.shirtNumber || null,
    }));

  cacheSet(key, squad);
  return squad;
}
