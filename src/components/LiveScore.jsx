import React, { useState, useEffect } from 'react';
import { fetchLiveMatch } from '../api/football';

export default function LiveScore() {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    let id;
    const poll = () => { fetchLiveMatch().then((m) => setMatch(m)); };
    poll();
    id = setInterval(poll, 30000);
    return () => clearInterval(id);
  }, []);

  if (!match) return null;

  return (
    <div className="live-score">
      <div className="live-score__badge">🔴 LIVE — {match.competition}</div>
      <div className="live-score__match">
        {match.homeCrest && <img src={match.homeCrest} alt="" className="crest-lg" />}
        <strong>{match.home}</strong>
        <span className="live-score__score">{match.homeScore ?? 0} - {match.awayScore ?? 0}</span>
        <strong>{match.away}</strong>
        {match.awayCrest && <img src={match.awayCrest} alt="" className="crest-lg" />}
      </div>
    </div>
  );
}
