import React, { useState, useEffect } from 'react';
import { fetchLiveMatch } from '../api/football';

export default function LiveScore() {
  const [match, setMatch] = useState(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    let pollId;
    let stopped = false;

    const poll = () => {
      fetchLiveMatch().then((m) => {
        if (stopped) return;
        setMatch(m);
        pollId = setTimeout(poll, m ? 30000 : 60000);
      });
    };

    poll();
    return () => { stopped = true; clearTimeout(pollId); };
  }, []);

  useEffect(() => {
    if (!match) return;
    const tickId = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(tickId);
  }, [match]);

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
