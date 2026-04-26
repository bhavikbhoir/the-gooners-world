import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { fetchMatches } from '../api/football';

function StatBox({ label, value, color }) {
  return (
    <Col xs={6} md={3} className="season-stats__box">
      <div className="season-stats__card" style={{ background: color }}>
        <div className="season-stats__value">{value}</div>
        <div className="season-stats__label">{label}</div>
      </div>
    </Col>
  );
}

export default function SeasonStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchMatches().then((matches) => {
      const finished = matches.filter((m) => m.status === 'FINISHED');
      let wins = 0, draws = 0, losses = 0, gf = 0, ga = 0;

      finished.forEach((m) => {
        const isHome = m.home === 'Arsenal' || m.home === 'Arsenal FC';
        const scored = isHome ? m.homeScore : m.awayScore;
        const conceded = isHome ? m.awayScore : m.homeScore;
        gf += scored || 0;
        ga += conceded || 0;
        if (scored > conceded) wins++;
        else if (scored === conceded) draws++;
        else losses++;
      });

      setStats({ played: finished.length, wins, draws, losses, gf, ga });
    }).catch(() => {});
  }, []);

  if (!stats) return null;

  return (
    <div className="season-stats">
      <h3>Season Stats <span role="img" aria-label="stats">📊</span></h3>
      <Row>
        <StatBox label="Played" value={stats.played} color="#333" />
        <StatBox label="Wins" value={stats.wins} color="#28a745" />
        <StatBox label="Draws" value={stats.draws} color="#ffc107" />
        <StatBox label="Losses" value={stats.losses} color="#dc3545" />
      </Row>
      <Row>
        <StatBox label="Goals For" value={stats.gf} color="#17a2b8" />
        <StatBox label="Goals Against" value={stats.ga} color="#6c757d" />
        <StatBox label="Goal Diff" value={stats.gf - stats.ga > 0 ? `+${stats.gf - stats.ga}` : stats.gf - stats.ga} color="#343a40" />
        <StatBox label="Win Rate" value={`${stats.played ? Math.round((stats.wins / stats.played) * 100) : 0}%`} color="#dc3545" />
      </Row>
    </div>
  );
}
