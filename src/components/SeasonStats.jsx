import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { fetchStandings } from '../api/football';
import { fetchCLStandings } from '../api/football';

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

function StatsGrid({ stats, label }) {
  if (!stats || !stats.played) return null;
  return (
    <div className="season-stats">
      <h3>{label} Season Stats <span role="img" aria-label="stats">📊</span></h3>
      <Row>
        <StatBox label="Played" value={stats.played} color="#333" />
        <StatBox label="Wins" value={stats.won} color="#28a745" />
        <StatBox label="Draws" value={stats.draw} color="#ffc107" />
        <StatBox label="Losses" value={stats.lost} color="#dc3545" />
      </Row>
      <Row>
        <StatBox label="Goals For" value={stats.gf} color="#17a2b8" />
        <StatBox label="Goals Against" value={stats.ga} color="#6c757d" />
        <StatBox label="Goal Diff" value={stats.gd > 0 ? `+${stats.gd}` : stats.gd} color="#343a40" />
        <StatBox label="Win Rate" value={`${Math.round((stats.won / stats.played) * 100)}%`} color="#dc3545" />
      </Row>
    </div>
  );
}

export default function SeasonStats({ competition }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (competition === 'pl') {
      // Use standings API — has full season data
      fetchStandings().then((table) => {
        const arsenal = table.find((t) => t.isArsenal);
        if (arsenal) {
          setStats({
            played: arsenal.played,
            won: arsenal.won,
            draw: arsenal.draw,
            lost: arsenal.lost,
            gf: arsenal.gf,
            ga: arsenal.ga,
            gd: arsenal.gd,
          });
        }
      }).catch(() => {});
    } else if (competition === 'cl') {
      // Compute from CL matches
      fetchCLStandings().then((matches) => {
        const finished = matches.filter((m) => m.status === 'FINISHED');
        let won = 0, draw = 0, lost = 0, gf = 0, ga = 0;
        finished.forEach((m) => {
          const scored = m.homeIsArsenal ? m.homeScore : m.awayScore;
          const conceded = m.homeIsArsenal ? m.awayScore : m.homeScore;
          gf += scored || 0;
          ga += conceded || 0;
          if (scored > conceded) won++;
          else if (scored === conceded) draw++;
          else lost++;
        });
        setStats({ played: finished.length, won, draw, lost, gf, ga, gd: gf - ga });
      }).catch(() => {});
    }
  }, [competition]);

  const label = competition === 'pl' ? 'PL' : 'UCL';
  return <StatsGrid stats={stats} label={label} />;
}
