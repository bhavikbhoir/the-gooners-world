import React, { useState, useEffect } from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import { fetchStandings, fetchSeasonCompare } from '../api/football';

const ARSENAL_ID = 57;

export default function SeasonCompare() {
  const [current, setCurrent] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const currentYear = new Date().getFullYear();
    const prevSeason = currentYear - 2; // e.g. 2024 for 2024/25 season

    Promise.all([
      fetchStandings(),
      fetchSeasonCompare(prevSeason),
    ]).then(([standings, prev]) => {
      if (cancelled) return;
      const arsenal = standings.find((t) => t.isArsenal);
      if (arsenal) setCurrent(arsenal);
      if (prev) setPrevious(prev);
    }).catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  if (loading || !current || !previous) return null;

  const diff = (a, b) => {
    const d = a - b;
    if (d > 0) return <span className="text-success">+{d}</span>;
    if (d < 0) return <span className="text-danger">{d}</span>;
    return <span className="text-muted">0</span>;
  };

  const rows = [
    ['Position', current.position, previous.position, diff(previous.position, current.position)],
    ['Played', current.played, previous.played, diff(current.played, previous.played)],
    ['Won', current.won, previous.won, diff(current.won, previous.won)],
    ['Drawn', current.draw, previous.draw, diff(current.draw, previous.draw)],
    ['Lost', current.lost, previous.lost, diff(previous.lost, current.lost)],
    ['GF', current.gf, previous.gf, diff(current.gf, previous.gf)],
    ['GA', current.ga, previous.ga, diff(previous.ga, current.ga)],
    ['GD', current.gd, previous.gd, diff(current.gd, previous.gd)],
    ['Points', current.points, previous.points, diff(current.points, previous.points)],
  ];

  return (
    <div className="standings">
      <h3>PL Season Comparison <span role="img" aria-label="compare">📈</span></h3>
      <Table bordered hover responsive size="sm" className="standings__table">
        <thead className="standings__head">
          <tr>
            <th className="standings__team-cell">Stat</th>
            <th className="standings__cell">This Season</th>
            <th className="standings__cell">{previous.season}</th>
            <th className="standings__cell">Diff</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, cur, prev, d]) => (
            <tr key={label}>
              <td className="standings__team-cell"><strong>{label}</strong></td>
              <td className="standings__cell">{cur}</td>
              <td className="standings__cell">{prev}</td>
              <td className="standings__cell">{d}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
