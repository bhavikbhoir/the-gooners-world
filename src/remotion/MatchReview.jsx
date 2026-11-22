import React from 'react';
import {
  AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile,
  useCurrentFrame, useVideoConfig,
} from 'remotion';
import { loadFont as loadOswald } from '@remotion/google-fonts/Oswald';

/**
 * Full-time match review — 1080x1920, narration-led.
 *
 * Deliberately NOT one fixed template. YouTube's inauthentic-content policy
 * withholds monetisation from "generic or unoriginal templates giving the
 * impression of mass production", so the composition takes a `variant` and a
 * written `verdict`: scene order changes per match, and the narration carries a
 * read on the game rather than reciting stats. Numbers come from
 * football-data.org via the orchestrator.
 *
 * Layout is built around the platform safe area, not the raw frame. Reels and
 * Shorts both overlay the bottom ~400px with caption/username/action buttons and
 * the top ~250px with their own chrome, so STAGE below is the only region that
 * is reliably visible to a viewer. Everything lives inside it.
 */

// Oswald must be loaded by the composition, not assumed from the host. It is
// installed locally so renders on this machine looked correct, but a Remotion
// Lambda container has no system fonts and would silently fall back to a
// default sans — every video shipped in the wrong typeface.
const { fontFamily: OSWALD } = loadOswald();

const RED = '#EF0107';
const INK = '#07070c';
const FONT = `${OSWALD}, 'Helvetica Neue', sans-serif`;

const W = 1080;
const SAFE_TOP = 250;
const SAFE_BOTTOM = 420;      // caption + action rail on both platforms
const STAGE_TOP = SAFE_TOP + 40;
const STAGE_BOTTOM = 1920 - SAFE_BOTTOM - 40;
const STAGE_H = STAGE_BOTTOM - STAGE_TOP;
const GUTTER = 86;

// ── motion helpers ─────────────────────────────────────────────────
function useEnter(delay = 0, damping = 200) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
}

/** Overshoot spring — snappier than a settle, which reads as more energetic. */
function Rise({ children, delay = 0, distance = 54, punch = false }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({
    frame: frame - delay, fps,
    config: punch ? { damping: 11, mass: 0.5, stiffness: 180 } : { damping: 200 },
  });
  return (
    <div style={{ opacity: Math.min(1, e * 1.6), transform: `translateY(${interpolate(e, [0, 1], [distance, 0])}px)` }}>
      {children}
    </div>
  );
}

/** Numbers count up rather than appear — the cheapest way to hold an eye. */
function CountUp({ value, frames = 22 }) {
  const frame = useCurrentFrame();
  const n = parseInt(String(value).replace(/\D/g, ''), 10);
  if (Number.isNaN(n)) return <>{value}</>;
  const suffix = String(value).replace(/^\d+/, '');
  const shown = Math.round(interpolate(frame, [0, frames], [0, n], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));
  return <>{shown}{suffix}</>;
}

/** Scene content is vertically centred inside the safe stage, never the raw frame. */
function Stage({ children, align = 'center' }) {
  return (
    <AbsoluteFill style={{
      top: STAGE_TOP, height: STAGE_H, padding: `0 ${GUTTER}px`,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
    }}>{children}</AbsoluteFill>
  );
}

const Label = ({ children, accent }) => (
  <div style={{
    fontFamily: FONT, fontSize: 40, fontWeight: 600, letterSpacing: 7,
    color: accent, textTransform: 'uppercase',
  }}>{children}</div>
);

// ── persistent chrome ──────────────────────────────────────────────
function Backdrop({ accent }) {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 960], [0, 70]);
  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <AbsoluteFill style={{
        background:
          `radial-gradient(90% 46% at 50% ${26 + drift * 0.04}%, ${accent}3a 0%, transparent 72%)`,
      }} />
      <AbsoluteFill style={{
        background: `linear-gradient(180deg, transparent 55%, ${accent}14 100%)`,
      }} />
    </AbsoluteFill>
  );
}

/**
 * Score stays on screen once revealed, so a viewer landing mid-scroll always has
 * the result. Brand mark rides along for clips that get reposted without credit.
 */
function Chrome({ match, accent, scoreRevealed }) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const chip = spring({ frame: frame - scoreRevealed, fps: 30, config: { damping: 200 } });
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, backgroundColor: accent }} />

      <div style={{
        position: 'absolute', top: SAFE_TOP - 86, left: GUTTER, right: GUTTER,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: FONT, fontSize: 28, fontWeight: 600, letterSpacing: 4,
          color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
        }}>{match.competition}</span>

        {frame >= scoreRevealed && (
          <span style={{
            fontFamily: FONT, fontSize: 34, fontWeight: 700, letterSpacing: 2, color: '#fff',
            backgroundColor: `${accent}2e`, border: `2px solid ${accent}`,
            padding: '6px 20px', borderRadius: 10,
            opacity: chip, transform: `scale(${interpolate(chip, [0, 1], [0.8, 1])})`,
          }}>
            {shortName(match.home)} {match.homeScore}–{match.awayScore} {shortName(match.away)}
          </span>
        )}
      </div>

      <div style={{
        position: 'absolute', bottom: SAFE_BOTTOM - 72, left: GUTTER, right: GUTTER,
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <span style={{
          fontFamily: FONT, fontSize: 26, fontWeight: 600, letterSpacing: 4,
          color: 'rgba(255,255,255,0.45)',
        }}>THE GOONERS WORLD</span>
        <div style={{ flex: 1, height: 3, backgroundColor: 'rgba(255,255,255,0.12)' }}>
          <div style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: accent }} />
        </div>
      </div>
    </>
  );
}

/**
 * Fit a club name to the score row without cutting mid-word — a hard slice
 * turned "Tottenham Hotspur" into "Tottenham Hots". Drops trailing words first,
 * and only falls back to truncation for a single over-long word.
 */
function shortName(n, max = 15) {
  const clean = String(n || '').replace(/\s*(FC|AFC|CF|SC)$/i, '').trim();
  if (clean.length <= max) return clean;

  const words = clean.split(/\s+/);
  while (words.length > 1 && words.join(' ').length > max) words.pop();

  const fitted = words.join(' ');
  return fitted.length <= max ? fitted : fitted.slice(0, max - 1) + '.';
}

// ── scenes ─────────────────────────────────────────────────────────
/** Opens on the most surprising number, not the scoreline — viewers know the score. */
function HookScene({ hook, accent }) {
  const e = useEnter(4, 120);
  return (
    <Stage>
      <Rise delay={0} punch><Label accent={accent}>{hook.label}</Label></Rise>
      <div style={{
        fontFamily: FONT, fontSize: 340, fontWeight: 700, color: '#fff', lineHeight: 0.95,
        margin: '30px 0 24px', opacity: e,
        transform: `scale(${interpolate(e, [0, 1], [0.72, 1])})`,
      }}><CountUp value={hook.value} /></div>
      <Rise delay={14}>
        <div style={{
          fontFamily: FONT, fontSize: 58, fontWeight: 400, color: 'rgba(255,255,255,0.84)',
          lineHeight: 1.26,
        }}>{hook.caption}</div>
      </Rise>
    </Stage>
  );
}

function ScoreScene({ match, accent }) {
  const Team = ({ name, score, delay }) => (
    <Rise delay={delay} distance={36} punch>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: W - GUTTER * 2, padding: '18px 0',
      }}>
        <span style={{ fontFamily: FONT, fontSize: 92, fontWeight: 600, color: '#fff' }}>{name}</span>
        <span style={{ fontFamily: FONT, fontSize: 150, fontWeight: 700, color: accent, lineHeight: 1 }}>{score}</span>
      </div>
    </Rise>
  );
  return (
    <Stage align="left">
      <Rise delay={0} punch><Label accent={accent}>Full time</Label></Rise>
      <div style={{ marginTop: 56, width: '100%' }}>
        <Team name={shortName(match.home)} score={match.homeScore} delay={6} />
        <div style={{ height: 3, backgroundColor: 'rgba(255,255,255,0.14)' }} />
        <Team name={shortName(match.away)} score={match.awayScore} delay={12} />
      </div>
    </Stage>
  );
}

function MomentsScene({ goals, accent }) {
  return (
    <Stage align="left">
      <Rise delay={0} punch><Label accent={accent}>How it happened</Label></Rise>
      <div style={{ marginTop: 50, width: '100%' }}>
        {goals.slice(0, 5).map((g, i) => (
          <Rise key={`${g.minute}-${g.scorer}`} delay={6 + i * 6} distance={36} punch>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 32, padding: '26px 0',
              borderBottom: '2px solid rgba(255,255,255,0.1)',
              borderLeft: g.isArsenal ? `6px solid ${accent}` : '6px solid transparent',
              paddingLeft: 26,
            }}>
              <span style={{ fontFamily: FONT, fontSize: 62, fontWeight: 700, color: accent, minWidth: 140 }}>
                {g.minute}&rsquo;
              </span>
              <span style={{
                fontFamily: FONT, fontSize: 62, fontWeight: 500,
                color: g.isArsenal ? '#fff' : 'rgba(255,255,255,0.42)',
              }}>{g.scorer}</span>
            </div>
          </Rise>
        ))}
      </div>
    </Stage>
  );
}

/** The part a template can't fake — a written read on the game. */
function VerdictScene({ verdict, accent }) {
  return (
    <Stage align="left">
      <Rise delay={0} punch><Label accent={accent}>The verdict</Label></Rise>
      <Rise delay={10} distance={44}>
        <div style={{ width: 96, height: 6, backgroundColor: accent, margin: '44px 0 36px' }} />
      </Rise>
      <Rise delay={14} distance={44}>
        <div style={{ fontFamily: FONT, fontSize: 72, fontWeight: 400, color: '#fff', lineHeight: 1.3 }}>
          {verdict}
        </div>
      </Rise>
    </Stage>
  );
}

function TableScene({ table, accent }) {
  return (
    <Stage>
      <Rise delay={0} punch><Label accent={accent}>Where it leaves us</Label></Rise>
      <Rise delay={8} distance={34} punch>
        <div style={{
          fontFamily: FONT, fontSize: 280, fontWeight: 700, color: '#fff',
          lineHeight: 1, margin: '26px 0 14px',
        }}>{table.position}</div>
      </Rise>
      <Rise delay={16}>
        <div style={{ fontFamily: FONT, fontSize: 56, color: 'rgba(255,255,255,0.8)' }}>
          {table.points} pts · {table.detail}
        </div>
      </Rise>
    </Stage>
  );
}

/** Explicit, specific ask — a named recurring format is what earns the subscribe. */
function OutroScene({ accent }) {
  return (
    <Stage>
      <Rise delay={0}>
        <div style={{ fontFamily: FONT, fontSize: 84, fontWeight: 700, color: '#fff', letterSpacing: 2 }}>
          THE GOONERS WORLD
        </div>
      </Rise>
      <Rise delay={8}>
        <div style={{ width: 120, height: 6, backgroundColor: accent, margin: '34px auto' }} />
      </Rise>
      <Rise delay={12}>
        <div style={{ fontFamily: FONT, fontSize: 56, color: 'rgba(255,255,255,0.86)', lineHeight: 1.3 }}>
          A verdict after every match.<br />Follow so you don&rsquo;t miss the next one.
        </div>
      </Rise>
    </Stage>
  );
}

// ── composition ────────────────────────────────────────────────────
/** Scene order varies by variant so 60 matches a season don't ship identical. */
const VARIANTS = {
  hookFirst: ['hook', 'score', 'moments', 'verdict', 'table', 'outro'],
  scoreFirst: ['score', 'hook', 'verdict', 'moments', 'table', 'outro'],
  verdictLed: ['hook', 'verdict', 'score', 'moments', 'table', 'outro'],
};

const SCENES = {
  hook: HookScene, score: ScoreScene, moments: MomentsScene,
  verdict: VerdictScene, table: TableScene, outro: OutroScene,
};

export const matchReviewSchema = {
  variant: 'hookFirst',
  accent: RED,
  narrationUrl: null,
  match: { home: 'Arsenal', away: 'Chelsea', homeScore: 3, awayScore: 1, competition: 'Premier League' },
  hook: { label: 'Shots on target', value: '11', caption: 'Arsenal’s highest tally in a London derby this season.' },
  goals: [
    { minute: 12, scorer: 'Saka', isArsenal: true },
    { minute: 34, scorer: 'Ødegaard', isArsenal: true },
    { minute: 61, scorer: 'Palmer', isArsenal: false },
    { minute: 78, scorer: 'Havertz', isArsenal: true },
  ],
  verdict: 'The press finally held for ninety minutes — and Chelsea never found a way through the middle third.',
  table: { position: '1st', points: '31', detail: '4 clear at the top' },
};

export default function MatchReview({
  variant = 'hookFirst', accent = RED, narrationUrl, segments,
  match, hook, goals = [], verdict, table,
}) {
  const { fps, durationInFrames } = useVideoConfig();
  const order = VARIANTS[variant] || VARIANTS.hookFirst;

  // Each scene lasts exactly as long as its own narration line. Weights are
  // only a fallback for silent preview renders — with audio, nothing is guessed.
  const spans = [];
  if (segments && segments.length) {
    for (const seg of segments) {
      if (!SCENES[seg.key]) continue;
      spans.push({
        key: seg.key,
        from: Math.round((seg.startMs / 1000) * fps),
        length: Math.round((seg.durationMs / 1000) * fps),
      });
    }
    // The trailing pad belongs to the last scene, not spread across all of them.
    const last = spans[spans.length - 1];
    if (last) last.length = Math.max(last.length, durationInFrames - last.from);
  } else {
    const weights = {
      hook: 3, score: 3, moments: Math.max(2, goals.length) * 1.1,
      verdict: 4, table: 2.5, outro: 1.6,
    };
    const total = order.reduce((sum, k) => sum + weights[k], 0);
    let cursor = 0;
    for (const key of order) {
      const length = Math.round((weights[key] / total) * durationInFrames);
      spans.push({ key, from: cursor, length });
      cursor += length;
    }
  }


  // The chip carries the score for anyone joining mid-scroll, so it starts only
  // once the score scene has handed off — showing both at once is redundant.
  const scoreSpan = spans.find((s) => s.key === 'score');
  const scoreRevealed = scoreSpan ? scoreSpan.from + scoreSpan.length : 0;

  const props = { match, hook, goals, verdict, table, accent };

  // In production the orchestrator passes a presigned S3 URL; locally it's a
  // filename inside the Remotion public dir, so review renders need no upload.
  const audioSrc = narrationUrl
    ? (/^https?:\/\//.test(narrationUrl) ? narrationUrl : staticFile(narrationUrl))
    : null;

  return (
    <AbsoluteFill>
      <Backdrop accent={accent} />
      {audioSrc && <Audio src={audioSrc} />}

      {spans.map(({ key, from, length }) => {
        const Scene = SCENES[key];
        // No overlap when timings are measured — an overhang would show the
        // previous scene while the next line is already being spoken.
        const pad = segments && segments.length ? 0 : Math.round(fps * 0.2);
        return (
          <Sequence key={key} from={from} durationInFrames={length + pad}>
            <Scene {...props} />
          </Sequence>
        );
      })}

      <Chrome match={match} accent={accent} scoreRevealed={scoreRevealed} />
    </AbsoluteFill>
  );
}
