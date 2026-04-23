import React from 'react';
import Fixtures from './Fixtures';
import Standings from './Standings';

export default function Center() {
  React.useEffect(() => {
    document.getElementById("match-center").classList.add("active");
  });

  return (
    <div style={{ padding: '0 1rem' }}>
      <Fixtures />
      <Standings />
    </div>
  );
}
