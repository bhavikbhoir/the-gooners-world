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

  if (loading) return <div className="loading">Loading squad...</div>;
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
    <div className="squad">
      {sortedGroups.map(([group, players]) => (
        <div key={group} className="squad__group">
          <h5 className="squad__group-title">{group}</h5>
          <Table hover responsive className="squad__table">
            <thead className="squad__head">
              <tr>
                <th className="squad__cell squad__col-name">Name</th>
                <th className="squad__cell squad__col-pos">Position</th>
                <th className="squad__cell squad__col-nat">Nationality</th>
                <th className="squad__cell squad__col-age">Age</th>
              </tr>
            </thead>
            <tbody>
              {players.sort((a, b) => a.name.localeCompare(b.name)).map((p) => (
                <tr key={p.id}>
                  <td className="squad__cell"><strong>{p.name}</strong></td>
                  <td className="squad__cell squad__cell--position">{p.position || '-'}</td>
                  <td className="squad__cell">{p.nationality || '-'}</td>
                  <td className="squad__cell">{age(p.dateOfBirth)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
}
