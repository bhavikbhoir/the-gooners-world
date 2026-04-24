import React from 'react';
import Fixtures from './Fixtures';
import Standings from './Standings';
import SeasonStats from './SeasonStats';
import LiveScore from './LiveScore';

export default function Center() {
  React.useEffect(() => {
    document.getElementById("match-center").classList.add("active");
  });

  return (
    <div style={{ padding: '0 1rem' }}>
      <LiveScore />
      <Fixtures />
      <SeasonStats />
      <Standings />
    </div>
  );
}
