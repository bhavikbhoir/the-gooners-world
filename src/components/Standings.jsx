import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchStandings } from '../api/football';

export default function Standings() {
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchStandings()
      .then((data) => { if (!cancelled) setTable(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="loading">Loading standings...</div>;
  if (!table.length) return null;

  return (
    <div className="standings">
      <h3>Premier League Table</h3>
      <Table striped bordered hover responsive size="sm" className="standings__table">
        <thead className="standings__head">
          <tr>
            <th className="standings__cell">#</th>
            <th className="standings__team-cell">Team</th>
            <th className="standings__cell">P</th>
            <th className="standings__cell">W</th>
            <th className="standings__cell">D</th>
            <th className="standings__cell">L</th>
            <th className="standings__cell">GF</th>
            <th className="standings__cell">GA</th>
            <th className="standings__cell">GD</th>
            <th className="standings__cell">Pts</th>
          </tr>
        </thead>
        <tbody>
          {table.map((t) => (
            <tr key={t.position} className={t.isArsenal ? 'standings__row--arsenal' : ''}>
              <td className="standings__cell">{t.position}</td>
              <td className="standings__team-cell">
                {t.crest && <img src={t.crest} alt="" className="standings__crest" />}
                {t.team}
              </td>
              <td className="standings__cell">{t.played}</td>
              <td className="standings__cell">{t.won}</td>
              <td className="standings__cell">{t.draw}</td>
              <td className="standings__cell">{t.lost}</td>
              <td className="standings__cell">{t.gf}</td>
              <td className="standings__cell">{t.ga}</td>
              <td className="standings__cell">{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
              <td className="standings__cell"><strong>{t.points}</strong></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
