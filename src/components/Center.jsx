import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Fixtures from './Fixtures';
import Standings from './Standings';
import CLStandings from './CLStandings';
import SeasonStats from './SeasonStats';
import TopScorers from './TopScorers';
import LiveScore from './LiveScore';

const TABS = [
  { key: 'fixtures', label: 'Fixtures' },
  { key: 'pl', label: 'Premier League' },
  { key: 'cl', label: 'Champions League' },
];

export default function Center() {
  const [tab, setTab] = useState('fixtures');

  React.useEffect(() => {
    document.getElementById("match-center").classList.add("active");
  });

  return (
    <div className="match-center">
      <LiveScore />
      <Nav variant="tabs" className="match-center__tabs">
        {TABS.map((t) => (
          <Nav.Item key={t.key}>
            <Nav.Link
              className={tab === t.key ? 'active' : ''}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div className="match-center__content">
        {tab === 'fixtures' && <Fixtures />}
        {tab === 'pl' && (
          <>
            <Standings />
            <TopScorers />
          </>
        )}
        {tab === 'cl' && (
          <>
            <SeasonStats competition="cl" />
            <CLStandings />
          </>
        )}
      </div>
    </div>
  );
}
