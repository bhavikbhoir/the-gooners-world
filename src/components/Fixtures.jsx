import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { fetchMatches } from '../api/football';

function MatchCard({ match }) {
  const date = new Date(match.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const finished = match.status === 'FINISHED';
  const scheduled = match.status === 'SCHEDULED' || match.status === 'TIMED';

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '0.75rem', background: finished ? '#fff' : '#fafafa' }}>
      <div style={{ fontSize: 11, color: '#999', marginBottom: 6 }}>{match.competition} &middot; {date}</div>
      <Row className="align-items-center" style={{ textAlign: 'center' }}>
        <Col xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <strong style={{ marginRight: 6 }}>{match.home}</strong>
          {match.homeCrest && <img src={match.homeCrest} alt="" style={{ width: 22, height: 22 }} />}
        </Col>
        <Col xs={2} style={{ padding: 0 }}>
          {finished ? (
            <strong style={{ fontSize: 16 }}>{match.homeScore} - {match.awayScore}</strong>
          ) : (
            <span style={{ color: '#dc3545', fontSize: 13, fontWeight: 600 }}>vs</span>
          )}
        </Col>
        <Col xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          {match.awayCrest && <img src={match.awayCrest} alt="" style={{ width: 22, height: 22 }} />}
          <strong style={{ marginLeft: 6 }}>{match.away}</strong>
        </Col>
      </Row>
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

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading fixtures...</div>;

  const finished = matches.filter((m) => m.status === 'FINISHED').reverse();
  const upcoming = matches.filter((m) => m.status === 'SCHEDULED' || m.status === 'TIMED');

  if (limit) {
    const display = [...finished.slice(0, 2), ...upcoming.slice(0, 2)];
    return (
      <div className="fixtures">
        <h3>Fixtures & Results <span role="img" aria-label="fixtures icon">🏟️</span></h3>
        <Row>
          {display.map((m) => (
            <Col key={m.id} lg={6} md={6} sm={12}><MatchCard match={m} /></Col>
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
          <h5 style={{ color: '#dc3545', marginTop: '1rem' }}>Upcoming</h5>
          <Row>
            {upcoming.slice(0, 6).map((m) => (
              <Col key={m.id} lg={6} md={6} sm={12}><MatchCard match={m} /></Col>
            ))}
          </Row>
        </>
      )}
      {finished.length > 0 && (
        <>
          <h5 style={{ color: '#333', marginTop: '1rem' }}>Recent Results</h5>
          <Row>
            {finished.slice(0, 6).map((m) => (
              <Col key={m.id} lg={6} md={6} sm={12}><MatchCard match={m} /></Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
