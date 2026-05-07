import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchScorers } from '../api/football';

export default function TopScorers() {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('goals');

  useEffect(() => {
    let cancelled = false;
    fetchScorers()
      .then((data) => { if (!cancelled) setScorers(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="loading">Loading top scorers...</div>;
  if (!scorers.length) return null;

  const sorted = [...scorers].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="standings">
      <div className="scorers-header">
        <h3>PL Top Scorers <span role="img" aria-label="goal">⚽</span></h3>
        <div className="scorers-toggle">
          <button className={`scorers-toggle__btn${sortBy === 'goals' ? ' active' : ''}`} onClick={() => setSortBy('goals')}>Goals</button>
          <button className={`scorers-toggle__btn${sortBy === 'assists' ? ' active' : ''}`} onClick={() => setSortBy('assists')}>Assists</button>
        </div>
      </div>
      <Table striped bordered hover responsive size="sm" className="standings__table">
        <thead className="standings__head">
          <tr>
            <th className="standings__cell">#</th>
            <th className="standings__team-cell">Player</th>
            <th className="standings__team-cell">Team</th>
            <th className="standings__cell">Goals</th>
            <th className="standings__cell">Assists</th>
            <th className="standings__cell">Pens</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s, i) => (
            <tr key={s.name} className={s.isArsenal ? 'standings__row--arsenal' : ''}>
              <td className="standings__cell">{i + 1}</td>
              <td className="standings__team-cell"><strong>{s.name}</strong></td>
              <td className="standings__team-cell">
                {s.crest && <img src={s.crest} alt="" className="standings__crest" />}
                {s.team}
              </td>
              <td className={`standings__cell${sortBy === 'goals' ? ' sorted-col' : ''}`}><strong>{s.goals}</strong></td>
              <td className={`standings__cell${sortBy === 'assists' ? ' sorted-col' : ''}`}><strong>{s.assists}</strong></td>
              <td className="standings__cell">{s.penalties}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
