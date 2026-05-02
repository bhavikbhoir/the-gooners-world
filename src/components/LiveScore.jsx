import React, { useState, useEffect } from 'react';
import { fetchLiveMatch } from '../api/football';

export default function LiveScore() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    let id;
    let stopped = false;

    const poll = () => {
      fetchLiveMatch().then((m) => {
        if (stopped) return;
        setMatch(m);
        // Only keep polling if there's a live match
        if (m) {
          id = setTimeout(poll, 30000);
        }
      });
    };

    poll();
    return () => { stopped = true; clearTimeout(id); };
  }, []);

  if (!match) return null;

  const minuteLabel = (() => {
    if (match.status === 'PAUSED') return 'HT';
    if (match.status === 'FINISHED') return 'FT';
    if (match.minute) return `${match.minute}'`;
    const elapsed = Math.floor((Date.now() - new Date(match.date)) / 60000);
    if (elapsed <= 45) return `${elapsed}'`;
    if (elapsed <= 60) return 'HT';
    const secondHalf = elapsed - 15;
    return secondHalf >= 90 ? "90+'" : `${secondHalf}'`;
  })();

  return (
    <div className="live-score">
      <div className="live-score__badge">
        🔴 LIVE — {match.competition}
        {minuteLabel && <span className="live-score__minute">{minuteLabel}</span>}
      </div>
      <div className="live-score__match">
        {match.homeCrest && <img src={match.homeCrest} alt="" className="crest-lg" />}
        <strong>{match.home}</strong>
        <span className="live-score__score">{match.homeScore ?? 0} – {match.awayScore ?? 0}</span>
        <strong>{match.away}</strong>
        {match.awayCrest && <img src={match.awayCrest} alt="" className="crest-lg" />}
      </div>
      {match.referee && (
        <div className="live-score__details">
          <span>🧑‍⚖️ {match.referee}</span>
        </div>
      )}
    </div>
  );
}
