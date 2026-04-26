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

  return (
    <div className="countdown">
      <div className="countdown__label">Next Match</div>
      <div className="countdown__teams">
        {next.homeCrest && <img src={next.homeCrest} alt="" className="crest-md" />}
        <strong> {next.home}</strong>
        <span className="vs"> vs </span>
        <strong>{next.away} </strong>
        {next.awayCrest && <img src={next.awayCrest} alt="" className="crest-md" />}
      </div>
      <div>
        <span className="countdown__box"><strong>{time.d}</strong><br/><small>Days</small></span>
        <span className="countdown__box"><strong>{time.h}</strong><br/><small>Hrs</small></span>
        <span className="countdown__box"><strong>{time.m}</strong><br/><small>Min</small></span>
        <span className="countdown__box"><strong>{time.s}</strong><br/><small>Sec</small></span>
      </div>
    </div>
  );
}
