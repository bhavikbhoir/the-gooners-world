import React, { useState, useEffect } from 'react';
import { fetchWCMatchGoals, fetchWCPlayerSummary } from '../api/wc';

function formatStage(stage) {
  if (!stage) return '';
  return stage.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatKickoff(dateStr) {
  return new Date(dateStr).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }) + ' ET';
}

export default function WCMatchCard({ match, isLive = false, isArchive = false, showAI = false }) {
  const [goals, setGoals] = useState(isArchive ? (match.goals || []) : null);
  const [aiText, setAiText] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const isFinished = match.status === 'FINISHED';
  const isScheduled = match.status === 'SCHEDULED' || match.status === 'TIMED';
  const hasScore = match.homeScore !== null && match.awayScore !== null;

  // Fetch goals for finished Gunner matches (not from archive — archive already has them)
  useEffect(() => {
    if (!isFinished || !match.hasGunners || isArchive || goals !== null) return;
    let cancelled = false;
    fetchWCMatchGoals(match.id).then(g => { if (!cancelled) setGoals(g); });
    return () => { cancelled = true; };
  }, [match.id, isFinished, match.hasGunners, isArchive, goals]);

  // AI summary — only when goals are loaded and tab explicitly asks for it
  useEffect(() => {
    if (!showAI || !isFinished || !match.hasGunners || goals === null) return;
    let cancelled = false;
    const gunnerNames = new Set((match.gunners || []).map(p => p.name));
    const gunnerGoals = goals.filter(g => gunnerNames.has(g.scorer));
    setAiLoading(true);
    fetchWCPlayerSummary(match, gunnerGoals)
      .then(text => { if (!cancelled) { setAiText(text); setAiLoading(false); } })
      .catch(() => { if (!cancelled) setAiLoading(false); });
    return () => { cancelled = true; };
  }, [showAI, isFinished, match.hasGunners, goals, match]);

  const gunnerNames = new Set((match.gunners || []).map(p => p.name));
  const gunnerGoalEvents = goals
    ? goals.filter(g => gunnerNames.has(g.scorer))
    : (isArchive ? (match.gunnerGoals || []) : []);

  return (
    <div className={`wc-card${match.hasGunners ? ' wc-card--gunner' : ''}${isLive ? ' wc-card--live' : ''}`}>
      <div className="wc-card__meta">
        {isLive && <span className="wc-card__live-badge">🔴 LIVE</span>}
        <span className="wc-card__stage">
          {formatStage(match.stage)}{match.group ? ` · ${match.group}` : ''}
        </span>
      </div>

      <div className="wc-card__match">
        <div className="wc-card__team wc-card__team--home">
          {match.homeCrest && <img src={match.homeCrest} alt="" className="crest-md" />}
          <span className="wc-card__team-name">{match.homeShort || match.homeTeam}</span>
        </div>

        <div className="wc-card__centre">
          {hasScore ? (
            <>
              <span className="wc-card__score">{match.homeScore} – {match.awayScore}</span>
              {isFinished && <span className="wc-card__ft">FT</span>}
              {isLive && match.minute && <span className="wc-card__minute">{match.minute}'</span>}
            </>
          ) : (
            <span className="wc-card__kickoff">{formatKickoff(match.date)}</span>
          )}
        </div>

        <div className="wc-card__team wc-card__team--away">
          <span className="wc-card__team-name">{match.awayShort || match.awayTeam}</span>
          {match.awayCrest && <img src={match.awayCrest} alt="" className="crest-md" />}
        </div>
      </div>

      {match.hasGunners && (
        <div className="wc-card__gunner-band">
          <span className="wc-card__gunner-label">⚽ Gunner Watch</span>
          <div className="wc-card__gunner-players">
            {(match.gunners || []).map(p => (
              <span
                key={p.id}
                className={`wc-card__gunner-tag wc-card__gunner-tag--${p.side}`}
              >
                {p.name}
                {gunnerGoalEvents.some(g => g.scorer === p.name) && (
                  <span className="wc-card__goal-dot" title="Scored" aria-label="scored">⚽</span>
                )}
              </span>
            ))}
          </div>

          {gunnerGoalEvents.length > 0 && (
            <div className="wc-card__goal-events">
              {gunnerGoalEvents.map((g, i) => (
                <span key={i} className="wc-card__goal-event">
                  ⚽ {g.scorer} {g.minute}'
                  {g.type === 'PENALTY' ? ' (pen)' : g.type === 'OWN_GOAL' ? ' (og)' : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {showAI && match.hasGunners && isFinished && (
        <div className="wc-card__ai">
          {aiLoading && <span className="wc-card__ai-loading">Generating insight…</span>}
          {!aiLoading && aiText && (
            <p className="wc-card__ai-text">
              <span className="wc-card__ai-badge">AI</span> {aiText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
