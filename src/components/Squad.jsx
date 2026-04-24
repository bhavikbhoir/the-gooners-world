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

  return (
    <div style={{ padding: '0 1rem' }}>
      <h3>Arsenal Squad <span role="img" aria-label="squad">👥</span></h3>
      {sortedGroups.map(([group, players]) => (
        <div key={group} style={{ marginBottom: '1.5rem' }}>
          <h5 style={{ color: '#dc3545', borderBottom: '2px solid #dc3545', paddingBottom: 4 }}>{group}</h5>
          <Table striped hover responsive size="sm" style={{ fontSize: '0.875rem' }}>
            <thead>
              <tr><th>#</th><th>Name</th><th>Position</th><th>Nationality</th><th>Age</th></tr>
            </thead>
            <tbody>
              {players.sort((a, b) => (a.shirtNumber || 99) - (b.shirtNumber || 99)).map((p) => (
                <tr key={p.id}>
                  <td>{p.shirtNumber || '-'}</td>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.position && p.position !== 'null' ? p.position : '-'}</td>
                  <td>{p.nationality || '-'}</td>
                  <td>{age(p.dateOfBirth)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
}
