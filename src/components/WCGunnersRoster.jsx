import React from 'react';

const FLAG = {
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Brazil': '🇧🇷',
  'Germany': '🇩🇪',
  'France': '🇫🇷',
  'Japan': '🇯🇵',
  'Egypt': '🇪🇬',
  'Spain': '🇪🇸',
  'Ukraine': '🇺🇦',
  'Switzerland': '🇨🇭',
  'Portugal': '🇵🇹',
  'Argentina': '🇦🇷',
  'Ghana': '🇬🇭',
  'Belgium': '🇧🇪',
  'Poland': '🇵🇱',
  'Norway': '🇳🇴',
  'Italy': '🇮🇹',
  'Netherlands': '🇳🇱',
  'United States': '🇺🇸',
  'Canada': '🇨🇦',
  'Mexico': '🇲🇽',
  'Cameroon': '🇨🇲',
  'Ivory Coast': '🇨🇮',
  'Nigeria': '🇳🇬',
  'Senegal': '🇸🇳',
  'Morocco': '🇲🇦',
  'South Korea': '🇰🇷',
  'Australia': '🇦🇺',
  'Czech Republic': '🇨🇿',
  'Croatia': '🇭🇷',
  'Serbia': '🇷🇸',
  'Georgia': '🇬🇪',
};

export default function WCGunnersRoster({ gunners, allMatches }) {
  const byNation = {};
  for (const p of gunners) {
    const n = p.nationality;
    if (!byNation[n]) byNation[n] = [];
    byNation[n].push(p);
  }

  const matchCounts = {};
  for (const m of allMatches) {
    matchCounts[m.homeTeam] = (matchCounts[m.homeTeam] || 0) + 1;
    matchCounts[m.awayTeam] = (matchCounts[m.awayTeam] || 0) + 1;
  }

  return (
    <div className="wc-roster">
      <h4 className="wc-roster__title">Arsenal Players at FIFA World Cup 2026</h4>
      <div className="wc-roster__nations">
        {Object.entries(byNation).map(([nation, players]) => (
          <div key={nation} className="wc-roster__nation">
            <div className="wc-roster__nation-header">
              <span className="wc-roster__flag">{FLAG[nation] || '🏳'}</span>
              <span className="wc-roster__nation-name">{nation}</span>
              <span className="wc-roster__match-count">{matchCounts[nation] || 0} matches</span>
            </div>
            <div className="wc-roster__players">
              {players.map(p => (
                <span key={p.id} className="wc-roster__player">{p.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
