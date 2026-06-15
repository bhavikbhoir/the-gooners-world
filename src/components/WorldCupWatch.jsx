import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { fetchWCMatches, fetchWCLiveMatches, fetchWCArchive } from '../api/wc';
import { fetchSquad } from '../api/football';
import WCMatchCard from './WCMatchCard';
import WCGunnersRoster from './WCGunnersRoster';

function tagGunners(matches, squad) {
  return matches.map(m => {
    const gunners = squad
      .filter(p => p.nationality === m.homeTeam || p.nationality === m.awayTeam)
      .map(p => ({ ...p, side: p.nationality === m.homeTeam ? 'home' : 'away', country: p.nationality }));
    return { ...m, gunners, hasGunners: gunners.length > 0 };
  });
}

const TABS = [
  { key: 'live', label: '🔴 Live' },
  { key: 'gunners', label: '⚽ Gunner Matches' },
  { key: 'all', label: 'All Matches' },
  { key: 'archive', label: '🗄 Archive' },
];

export default function WorldCupWatch() {
  const [tab, setTab] = useState('gunners');
  const [allMatches, setAllMatches] = useState([]);
  const [liveMatches, setLiveMatches] = useState([]);
  const [archive, setArchive] = useState([]);
  const [squad, setSquad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.getElementById('world-cup')?.classList.add('active');
  });

  // Initial data load
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([fetchWCMatches(), fetchSquad()])
      .then(([matches, sq]) => {
        if (cancelled) return;
        setAllMatches(tagGunners(matches, sq));
        setSquad(sq);
        setLoading(false);
      })
      .catch(err => {
        if (!cancelled) { setError(err.message); setLoading(false); }
      });
    return () => { cancelled = true; };
  }, []);

  // Poll live matches every 30 s on Live tab
  useEffect(() => {
    if (tab !== 'live' || squad.length === 0) return;
    let stopped = false;
    let pollId;
    const poll = () => {
      fetchWCLiveMatches()
        .then(m => {
          if (stopped) return;
          setLiveMatches(tagGunners(m, squad));
          pollId = setTimeout(poll, 30000);
        })
        .catch(() => { if (!stopped) pollId = setTimeout(poll, 60000); });
    };
    poll();
    return () => { stopped = true; clearTimeout(pollId); };
  }, [tab, squad]);

  // Load archive on demand
  useEffect(() => {
    if (tab !== 'archive') return;
    let cancelled = false;
    fetchWCArchive().then(m => { if (!cancelled) setArchive(m); });
    return () => { cancelled = true; };
  }, [tab]);

  // Arsenal players whose nation is in the WC
  const wcNations = new Set(allMatches.flatMap(m => [m.homeTeam, m.awayTeam]));
  const wcGunners = squad.filter(p => wcNations.has(p.nationality));

  const liveGunner = liveMatches.filter(m => m.hasGunners);
  const liveOther = liveMatches.filter(m => !m.hasGunners);
  const upcoming = allMatches.filter(m => m.hasGunners && (m.status === 'SCHEDULED' || m.status === 'TIMED')).sort((a, b) => new Date(a.date) - new Date(b.date));
  const finished = allMatches.filter(m => m.hasGunners && m.status === 'FINISHED').sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) return <div className="loading">Loading World Cup data…</div>;
  if (error) return <div className="wc-watch__error">Unable to load World Cup data. Please try again later.</div>;

  return (
    <div className="wc-watch">
      <div className="wc-watch__header">
        <h2 className="wc-watch__title">🏆 Gunners at World Cup 2026</h2>
        <p className="wc-watch__subtitle">
          Tracking Arsenal players across FIFA World Cup 2026 · Data via football-data.org
        </p>
      </div>

      {wcGunners.length > 0 && (
        <WCGunnersRoster gunners={wcGunners} allMatches={allMatches} />
      )}

      {wcGunners.length === 0 && (
        <div className="wc-watch__no-gunners">
          No current Arsenal players found in the World Cup squads.
        </div>
      )}

      <Nav variant="tabs" className="wc-watch__tabs">
        {TABS.map(t => (
          <Nav.Item key={t.key}>
            <Nav.Link
              className={tab === t.key ? 'active' : ''}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <div className="wc-watch__content">

        {tab === 'live' && (
          <>
            {liveMatches.length === 0 && (
              <p className="wc-watch__empty">No matches are live right now.</p>
            )}
            {liveGunner.length > 0 && (
              <div className="wc-watch__section">
                <h5 className="wc-watch__section-label">🔴 Gunners in Action</h5>
                {liveGunner.map(m => <WCMatchCard key={m.id} match={m} isLive />)}
              </div>
            )}
            {liveOther.length > 0 && (
              <div className="wc-watch__section">
                <h5 className="wc-watch__section-label">Other Live</h5>
                {liveOther.map(m => <WCMatchCard key={m.id} match={m} isLive />)}
              </div>
            )}
          </>
        )}

        {tab === 'gunners' && (
          <>
            {liveGunner.length > 0 && (
              <div className="wc-watch__section">
                <h5 className="wc-watch__section-label">🔴 Live Now</h5>
                {liveGunner.map(m => <WCMatchCard key={m.id} match={m} isLive />)}
              </div>
            )}
            {upcoming.length > 0 && (
              <div className="wc-watch__section">
                <h5 className="wc-watch__section-label">Upcoming</h5>
                {upcoming.map(m => <WCMatchCard key={m.id} match={m} />)}
              </div>
            )}
            {finished.length > 0 && (
              <div className="wc-watch__section">
                <h5 className="wc-watch__section-label">Results</h5>
                {finished.map(m => <WCMatchCard key={m.id} match={m} showAI />)}
              </div>
            )}
            {liveGunner.length === 0 && upcoming.length === 0 && finished.length === 0 && (
              <p className="wc-watch__empty">
                No Arsenal player connections found in the current tournament data.
              </p>
            )}
          </>
        )}

        {tab === 'all' && (
          <>
            {allMatches.length === 0 ? (
              <p className="wc-watch__empty">No match data available.</p>
            ) : (
              [...allMatches]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(m => <WCMatchCard key={m.id} match={m} />)
            )}
          </>
        )}

        {tab === 'archive' && (
          <>
            {archive.length === 0 ? (
              <p className="wc-watch__empty">
                No archived matches yet — the archive builds automatically as Gunner matches finish.
              </p>
            ) : (
              archive.map(m => (
                <WCMatchCard
                  key={m.matchId}
                  isArchive
                  match={{
                    ...m,
                    id: m.matchId,
                    hasGunners: (m.gunnerPlayers || []).length > 0,
                    gunners: m.gunnerPlayers || [],
                  }}
                />
              ))
            )}
          </>
        )}

      </div>
    </div>
  );
}
