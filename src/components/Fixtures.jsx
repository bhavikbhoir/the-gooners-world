import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { fetchMatches } from '../api/football';
import { fetchSummary } from '../api/ai';

function MatchSummary({ match }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (match.status !== 'FINISHED') return;
    fetchSummary(match).then((text) => { if (text) setSummary(text); });
  }, [match]);

  if (!summary) return null;
  return <div className="match-card__summary">📝 {summary}</div>;
}

function MatchCard({ match, showSummary }) {
  const date = new Date(match.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const finished = match.status === 'FINISHED';

  return (
    <div className={`match-card ${finished ? 'match-card--finished' : 'match-card--upcoming'}`}>
      <div className="match-card__meta">{match.competition} &middot; {date}</div>
      <Row className="align-items-center text-center">
        <Col xs={5} className="match-card__home">
          <strong>{match.home} </strong>
          {match.homeCrest && <img src={match.homeCrest} alt="" className="crest-sm" />}
        </Col>
        <Col xs={2} className="match-card__score">
          {finished ? (
            <strong>{match.homeScore} - {match.awayScore}</strong>
          ) : (
            <span className="match-card__vs">vs</span>
          )}
        </Col>
        <Col xs={5} className="match-card__away">
          {match.awayCrest && <img src={match.awayCrest} alt="" className="crest-sm" />}
          <strong> {match.away}</strong>
        </Col>
      </Row>
      {showSummary && finished && <MatchSummary match={match} />}
    </div>
  );
}

export default function Fixtures({ limit }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchMatches()
      .then((data) => { if (!cancelled) setMatches(data); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="loading">Loading fixtures...</div>;

  const finished = matches.filter((m) => m.status === 'FINISHED').reverse();
  const upcoming = matches.filter((m) => m.status === 'SCHEDULED' || m.status === 'TIMED');

  if (limit) {
    const display = [...finished.slice(0, 2), ...upcoming.slice(0, 2)];
    return (
      <div className="fixtures">
        <h3>Fixtures & Results <span role="img" aria-label="fixtures icon">🏟️</span></h3>
        <Row>
          {display.map((m) => (
            <Col key={m.id} lg={6} md={6} sm={12}><MatchCard match={m} showSummary /></Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="fixtures">
      <h3>Fixtures & Results <span role="img" aria-label="fixtures icon">🏟️</span></h3>
      {upcoming.length > 0 && (
        <>
          <h5 className="text-danger mt-3">Upcoming</h5>
          <Row>
            {upcoming.slice(0, 6).map((m) => (
              <Col key={m.id} lg={6} md={6} sm={12}><MatchCard match={m} /></Col>
            ))}
          </Row>
        </>
      )}
      {finished.length > 0 && (
        <>
          <h5 className="mt-3">Recent Results</h5>
          <Row>
            {finished.slice(0, 6).map((m) => (
              <Col key={m.id} lg={6} md={6} sm={12}><MatchCard match={m} showSummary /></Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
