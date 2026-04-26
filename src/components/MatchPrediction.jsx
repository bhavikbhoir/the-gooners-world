import React, { useState, useEffect } from 'react';
import { fetchMatches } from '../api/football';
import { fetchPrediction } from '../api/ai';

export default function MatchPrediction() {
  const [prediction, setPrediction] = useState(null);
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchMatches().then((matches) => {
      if (cancelled) return;
      const upcoming = matches.find((m) => m.status === 'SCHEDULED' || m.status === 'TIMED');
      const finished = matches.filter((m) => m.status === 'FINISHED');
      if (!upcoming) { setLoading(false); return; }

      setMatch(upcoming);
      const recentResults = finished.slice(-5).reverse().map((m) => {
        const isHome = m.home === 'Arsenal' || m.home === 'Arsenal FC';
        const scored = isHome ? m.homeScore : m.awayScore;
        const conceded = isHome ? m.awayScore : m.homeScore;
        const result = scored > conceded ? 'W' : scored === conceded ? 'D' : 'L';
        return `${result} ${m.home} ${m.homeScore}-${m.awayScore} ${m.away} (${m.competition})`;
      }).join('\n');

      fetchPrediction(upcoming, recentResults || 'N/A')
        .then((text) => { if (!cancelled) setPrediction(text); })
        .finally(() => { if (!cancelled) setLoading(false); });
    }).catch(() => setLoading(false));
    return () => { cancelled = true; };
  }, []);

  if (loading || !match || !prediction) return null;

  return (
    <div className="match-prediction">
      <div className="match-prediction__label">🔮 Match Prediction</div>
      <div className="match-prediction__teams">
        {match.homeCrest && <img src={match.homeCrest} alt="" className="crest-lg" />}
        <strong>{match.home} vs {match.away}</strong>
        {match.awayCrest && <img src={match.awayCrest} alt="" className="crest-lg" />}
      </div>
      <p className="match-prediction__text">{prediction}</p>
    </div>
  );
}
