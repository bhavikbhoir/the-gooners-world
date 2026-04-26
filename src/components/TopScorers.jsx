import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchScorers } from '../api/football';

export default function TopScorers() {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="standings">
      <h3>PL Top Scorers <span role="img" aria-label="goal">⚽</span></h3>
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
          {scorers.map((s, i) => (
            <tr key={i} className={s.isArsenal ? 'standings__row--arsenal' : ''}>
              <td className="standings__cell">{i + 1}</td>
              <td className="standings__team-cell"><strong>{s.name}</strong></td>
              <td className="standings__team-cell">
                {s.crest && <img src={s.crest} alt="" className="standings__crest" />}
                {s.team}
              </td>
              <td className="standings__cell"><strong>{s.goals}</strong></td>
              <td className="standings__cell">{s.assists}</td>
              <td className="standings__cell">{s.penalties}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
