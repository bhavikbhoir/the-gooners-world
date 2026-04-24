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

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading standings...</div>;
  if (!table.length) return null;

  const cellStyle = { verticalAlign: 'middle', textAlign: 'center', padding: '0.4rem' };
  const teamCell = { ...cellStyle, textAlign: 'left', whiteSpace: 'nowrap' };

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Premier League Table</h3>
      <Table striped bordered hover responsive size="sm" style={{ fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: '#333', color: '#fff' }}>
            <th style={cellStyle}>#</th>
            <th style={teamCell}>Team</th>
            <th style={cellStyle}>P</th>
            <th style={cellStyle}>W</th>
            <th style={cellStyle}>D</th>
            <th style={cellStyle}>L</th>
            <th style={cellStyle}>GF</th>
            <th style={cellStyle}>GA</th>
            <th style={cellStyle}>GD</th>
            <th style={cellStyle}>Pts</th>
          </tr>
        </thead>
        <tbody>
          {table.map((t) => (
            <tr key={t.position} style={t.isArsenal ? { background: '#dc3545', color: '#fff', fontWeight: 'bold' } : {}}>
              <td style={cellStyle}>{t.position}</td>
              <td style={teamCell}>
                {t.crest && <img src={t.crest} alt="" style={{ width: 20, height: 20, marginRight: 8, verticalAlign: 'middle' }} />}
                {t.team}
              </td>
              <td style={cellStyle}>{t.played}</td>
              <td style={cellStyle}>{t.won}</td>
              <td style={cellStyle}>{t.draw}</td>
              <td style={cellStyle}>{t.lost}</td>
              <td style={cellStyle}>{t.gf}</td>
              <td style={cellStyle}>{t.ga}</td>
              <td style={cellStyle}>{t.gd > 0 ? `+${t.gd}` : t.gd}</td>
              <td style={cellStyle}><strong>{t.points}</strong></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
