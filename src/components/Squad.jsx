import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchSquad } from '../api/football';

function posGroup(pos) {
  if (!pos) return 'Other';
  const p = pos.toLowerCase();
  if (p.includes('goalkeeper')) return 'Goalkeepers';
  if (p.includes('back') || p.includes('defence') || p.includes('center-back')) return 'Defenders';
  if (p.includes('midfield')) return 'Midfielders';
  if (p.includes('winger') || p.includes('forward') || p.includes('offence') || p.includes('striker')) return 'Forwards';
  return 'Forwards';
}

const GROUP_ORDER = { Goalkeepers: 0, Defenders: 1, Midfielders: 2, Forwards: 3, Other: 4 };

export default function Squad() {
  const [squad, setSquad] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.getElementById("squad")?.classList.add("active");
    let cancelled = false;
    fetchSquad()
      .then((data) => { if (!cancelled) setSquad(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading squad...</div>;
  if (!squad.length) return null;

  const grouped = {};
  squad.forEach((p) => {
    const group = posGroup(p.position);
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(p);
  });

  const sortedGroups = Object.entries(grouped).sort((a, b) =>
    (GROUP_ORDER[a[0]] ?? 9) - (GROUP_ORDER[b[0]] ?? 9)
  );

  const age = (dob) => {
    if (!dob) return '-';
    return Math.floor((Date.now() - new Date(dob)) / 31557600000);
  };

  const cell = { verticalAlign: 'middle', padding: '0.5rem 0.75rem', textAlign: 'left' };

  return (
    <div style={{ padding: '0 1rem' }}>
      {sortedGroups.map(([group, players]) => (
        <div key={group} style={{ marginBottom: '1.5rem' }}>
          <h5 style={{ color: '#dc3545', borderBottom: '2px solid #dc3545', paddingBottom: 6, marginBottom: 0 }}>{group}</h5>
          <Table hover responsive style={{ fontSize: '0.9rem', marginBottom: 0 }}>
            <thead>
              <tr style={{ background: '#f8f8f8' }}>
                <th style={{ ...cell, width: '35%' }}>Name</th>
                <th style={{ ...cell, width: '25%' }}>Position</th>
                <th style={{ ...cell, width: '25%' }}>Nationality</th>
                <th style={{ ...cell, width: '15%' }}>Age</th>
              </tr>
            </thead>
            <tbody>
              {players.sort((a, b) => a.name.localeCompare(b.name)).map((p) => (
                <tr key={p.id}>
                  <td style={cell}><strong>{p.name}</strong></td>
                  <td style={{ ...cell, color: '#666' }}>{p.position || '-'}</td>
                  <td style={cell}>{p.nationality || '-'}</td>
                  <td style={cell}>{age(p.dateOfBirth)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
}
