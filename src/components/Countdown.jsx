import React, { useState, useEffect } from 'react';
import { fetchMatches } from '../api/football';

export default function Countdown() {
  const [next, setNext] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    fetchMatches().then((matches) => {
      const upcoming = matches.find((m) => m.status === 'SCHEDULED' || m.status === 'TIMED');
      if (upcoming) setNext(upcoming);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!next) return;
    const tick = () => {
      const diff = new Date(next.date) - Date.now();
      if (diff <= 0) { setTime(null); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [next]);

  if (!next || !time) return null;

  const boxStyle = {
    display: 'inline-block', background: '#dc3545', color: '#fff',
    borderRadius: 6, padding: '0.5rem 0.75rem', margin: '0 0.25rem',
    minWidth: 50, textAlign: 'center'
  };

  return (
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <div style={{ fontSize: '0.85rem', color: '#999', marginBottom: 6 }}>Next Match</div>
      <div style={{ marginBottom: 8 }}>
        {next.homeCrest && <img src={next.homeCrest} alt="" style={{ width: 24, height: 24, marginRight: 6 }} />}
        <strong>{next.home}</strong>
        <span style={{ margin: '0 8px', color: '#999' }}>vs</span>
        <strong>{next.away}</strong>
        {next.awayCrest && <img src={next.awayCrest} alt="" style={{ width: 24, height: 24, marginLeft: 6 }} />}
      </div>
      <div>
        <span style={boxStyle}><strong>{time.d}</strong><br/><small>Days</small></span>
        <span style={boxStyle}><strong>{time.h}</strong><br/><small>Hrs</small></span>
        <span style={boxStyle}><strong>{time.m}</strong><br/><small>Min</small></span>
        <span style={boxStyle}><strong>{time.s}</strong><br/><small>Sec</small></span>
      </div>
    </div>
  );
}
