import React, { useState, useEffect } from 'react';
import { fetchMatches } from '../api/football';
import { fetchPrediction } from '../api/ai';
import { FaWhatsapp, FaLink } from 'react-icons/fa';
import XIcon from './XIcon';

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

  const [copied, setCopied] = useState(false);

  const SITE_URL = 'https://the-gooners-world.web.app';
  const shareText = prediction
    ? `🔮 Arsenal vs ${match?.away} Prediction\n\n${prediction.slice(0, 200)}${prediction.length > 200 ? '...' : ''}\n\nThe Gooners World`
    : '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`🔮 Arsenal vs ${match.away} Prediction\n\n${prediction}\n\n— The Gooners World`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="match-prediction__share-row">
        <button
          className="match-prediction__share-btn"
          title="Share on X"
          onClick={() => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SITE_URL)}`, '_blank', 'noopener,noreferrer')}
        >
          <XIcon size={13} />
        </button>
        <button
          className="match-prediction__share-btn"
          title="Share on WhatsApp"
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + SITE_URL)}`, '_blank', 'noopener,noreferrer')}
        >
          <FaWhatsapp size={15} color="#25D366" />
        </button>
        <button
          className="match-prediction__share-btn match-prediction__share-btn--copy"
          title={copied ? 'Copied!' : 'Copy prediction'}
          onClick={handleCopy}
        >
          <FaLink size={13} color={copied ? '#16a34a' : '#555'} />
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
