import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { fetchCLStandings } from '../api/football';

const STAGE_LABELS = {
  'LEAGUE_STAGE': 'League Stage',
  'REGULAR_SEASON': 'League Stage',
  'LAST_16': 'Round of 16',
  'ROUND_OF_16': 'Round of 16',
  'QUARTER_FINALS': 'Quarter-Finals',
  'SEMI_FINALS': 'Semi-Finals',
  'FINAL': 'Final',
};

const STAGE_ORDER = {
  'LEAGUE_STAGE': 0, 'REGULAR_SEASON': 0,
  'LAST_16': 1, 'ROUND_OF_16': 1,
  'QUARTER_FINALS': 2,
  'SEMI_FINALS': 3,
  'FINAL': 4,
};

function stageKey(stage) {
  if (stage?.startsWith('LEAGUE_STAGE')) return 'LEAGUE_STAGE';
  return stage;
}

function MatchTie({ m }) {
  const date = new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const finished = m.status === 'FINISHED';

  return (
    <div className="cl-bracket__tie">
      <div className={`cl-bracket__team ${m.homeIsArsenal ? 'cl-bracket__team--arsenal' : ''}`}>
        {m.homeCrest && <img src={m.homeCrest} alt="" className="crest-sm" />}
        <span className="cl-bracket__name">{m.home}</span>
        <span className="cl-bracket__score">{finished ? m.homeScore : '-'}</span>
      </div>
      <div className={`cl-bracket__team ${m.awayIsArsenal ? 'cl-bracket__team--arsenal' : ''}`}>
        {m.awayCrest && <img src={m.awayCrest} alt="" className="crest-sm" />}
        <span className="cl-bracket__name">{m.away}</span>
        <span className="cl-bracket__score">{finished ? m.awayScore : '-'}</span>
      </div>
      <div className="cl-bracket__date">
        {date}
        {!finished && <span className="cl-bracket__upcoming"> • Upcoming</span>}
      </div>
    </div>
  );
}

export default function CLStandings() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCLStandings()
      .then((data) => { if (!cancelled) setMatches(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="loading">Loading CL data...</div>;
  if (!matches.length) return null;

  const upcoming = matches.filter((m) => m.status === 'SCHEDULED' || m.status === 'TIMED');
  const finished = matches.filter((m) => m.status === 'FINISHED');

  // Group finished by stage, most recent stage first
  const grouped = {};
  finished.forEach((m) => {
    const key = stageKey(m.stage);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  });
  // Sort each stage's matches by date (most recent first)
  Object.values(grouped).forEach((arr) => arr.sort((a, b) => new Date(b.date) - new Date(a.date)));
  const stages = Object.entries(grouped).sort((a, b) =>
    (STAGE_ORDER[b[0]] ?? 9) - (STAGE_ORDER[a[0]] ?? 9)
  );

  return (
    <div className="cl-bracket">
      {upcoming.length > 0 && (
        <div className="cl-bracket__stage">
          <h5 className="cl-bracket__stage-title cl-bracket__stage-title--upcoming">
            Upcoming
          </h5>
          <Row>
            {upcoming.map((m) => (
              <Col key={m.id} md={6} sm={12} className="mb-2">
                <MatchTie m={m} />
              </Col>
            ))}
          </Row>
        </div>
      )}

      {stages.map(([stage, stageMatches]) => (
        <div key={stage} className="cl-bracket__stage">
          <h5 className="cl-bracket__stage-title">
            {STAGE_LABELS[stage] || stage}
          </h5>
          <Row>
            {stageMatches.map((m) => (
              <Col key={m.id} md={stage === 'LEAGUE_STAGE' ? 12 : 6} sm={12} className="mb-2">
                <MatchTie m={m} />
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
}
