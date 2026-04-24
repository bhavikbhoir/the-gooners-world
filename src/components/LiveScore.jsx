import React, { useState, useEffect } from 'react';
import { fetchLiveMatch } from '../api/football';

export default function LiveScore() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    let id;
    const poll = () => {
      fetchLiveMatch().then((m) => setMatch(m));
    };
    poll();
    id = setInterval(poll, 30000); // poll every 30s
    return () => clearInterval(id);
  }, []);

  if (!match) return null;

  return (
    <div style={{
      background: '#dc3545', color: '#fff', padding: '0.75rem',
      textAlign: 'center', borderRadius: 8, margin: '0.5rem 0'
    }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
        🔴 LIVE — {match.competition}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
        {match.homeCrest && <img src={match.homeCrest} alt="" style={{ width: 28, height: 28 }} />}
        <strong>{match.home}</strong>
        <span style={{ fontSize: 22, fontWeight: 'bold', margin: '0 8px' }}>
          {match.homeScore ?? 0} - {match.awayScore ?? 0}
        </span>
        <strong>{match.away}</strong>
        {match.awayCrest && <img src={match.awayCrest} alt="" style={{ width: 28, height: 28 }} />}
      </div>
    </div>
  );
}
