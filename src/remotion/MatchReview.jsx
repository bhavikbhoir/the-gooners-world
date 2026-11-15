import React from 'react';
import {
  AbsoluteFill, Audio, Sequence, interpolate, spring,
  useCurrentFrame, useVideoConfig,
} from 'remotion';

/**
 * Full-time match review — 1080x1920, narration-led.
 *
 * Deliberately NOT one fixed template. YouTube's inauthentic-content policy
 * withholds monetisation from "generic or unoriginal templates giving the
 * impression of mass production", so the composition takes a `variant` and a
 * written `verdict`: the scene order and accent treatment change per match, and
 * the narration carries an actual read on the game rather than reciting stats.
 * Every number rendered here comes from football-data.org via the orchestrator.
 */

const RED = '#EF0107';
const INK = '#07070c';
const FONT = "Oswald, 'Helvetica Neue', sans-serif";

// ── shared motion helpers ──────────────────────────────────────────
function useEnter(delay = 0, damping = 200) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
}

function Rise({ children, delay = 0, distance = 60 }) {
  const e = useEnter(delay);
  return (
    <div style={{
      opacity: e,
      transform: `translateY(${interpolate(e, [0, 1], [distance, 0])}px)`,
    }}>{children}</div>
  );
}

function Backdrop({ accent }) {
  const frame = useCurrentFrame();
  // Slow drift keeps the frame alive without a photo behind it.
  const drift = interpolate(frame, [0, 900], [0, -60]);
  return (
    <AbsoluteFill style={{ backgroundColor: INK }}>
      <AbsoluteFill style={{
        background: `radial-gradient(60% 40% at 50% ${28 + drift * 0.1}%, ${accent}38 0%, transparent 70%)`,
      }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 14, backgroundColor: accent }} />
    </AbsoluteFill>
  );
}

const Label = ({ children, accent }) => (
  <div style={{
    fontFamily: FONT, fontSize: 36, fontWeight: 600, letterSpacing: 6,
    color: accent, textTransform: 'uppercase',
  }}>{children}</div>
);

// ── scenes ─────────────────────────────────────────────────────────
/** Opens on the most surprising number, not the scoreline — viewers know the score. */
function HookScene({ hook, accent }) {
  const e = useEnter(4, 120);
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 90 }}>
      <Rise delay={0}><Label accent={accent}>{hook.label}</Label></Rise>
      <div style={{
        fontFamily: FONT, fontSize: 260, fontWeight: 700, color: '#fff', lineHeight: 1,
        margin: '28px 0 10px', transform: `scale(${interpolate(e, [0, 1], [0.7, 1])})`, opacity: e,
      }}>{hook.value}</div>
      <Rise delay={14}>
        <div style={{
          fontFamily: FONT, fontSize: 52, fontWeight: 400, color: 'rgba(255,255,255,0.82)',
          textAlign: 'center', lineHeight: 1.25, maxWidth: 880,
        }}>{hook.caption}</div>
      </Rise>
    </AbsoluteFill>
  );
}

function ScoreScene({ match, accent }) {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <Rise delay={0}><Label accent={accent}>Full time</Label></Rise>
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <Rise delay={6}>
          <div style={{ fontFamily: FONT, fontSize: 86, fontWeight: 600, color: '#fff' }}>{match.home}</div>
        </Rise>
        <Rise delay={12} distance={30}>
          <div style={{ fontFamily: FONT, fontSize: 230, fontWeight: 700, color: accent, lineHeight: 1.05 }}>
            {match.homeScore} – {match.awayScore}
          </div>
        </Rise>
        <Rise delay={18}>
          <div style={{ fontFamily: FONT, fontSize: 86, fontWeight: 600, color: '#fff' }}>{match.away}</div>
        </Rise>
        <Rise delay={26}>
          <div style={{
            fontFamily: FONT, fontSize: 38, color: 'rgba(255,255,255,0.6)',
            marginTop: 34, letterSpacing: 2,
          }}>{match.competition}</div>
        </Rise>
      </div>
    </AbsoluteFill>
  );
}

function MomentsScene({ goals, accent }) {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 110px' }}>
      <Rise delay={0}><Label accent={accent}>How it happened</Label></Rise>
      <div style={{ marginTop: 52 }}>
        {goals.slice(0, 5).map((g, i) => (
          <Rise key={`${g.minute}-${g.scorer}`} delay={8 + i * 9} distance={40}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 26, padding: '20px 0',
              borderBottom: '2px solid rgba(255,255,255,0.1)',
            }}>
              <span style={{ fontFamily: FONT, fontSize: 56, fontWeight: 700, color: accent, minWidth: 130 }}>
                {g.minute}&rsquo;
              </span>
              <span style={{
                fontFamily: FONT, fontSize: 56, fontWeight: 500,
                color: g.isArsenal ? '#fff' : 'rgba(255,255,255,0.45)',
              }}>{g.scorer}</span>
            </div>
          </Rise>
        ))}
      </div>
    </AbsoluteFill>
  );
}

/** The part a template can't fake — a written read on the game. */
function VerdictScene({ verdict, accent }) {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', padding: '0 100px' }}>
      <Rise delay={0}><Label accent={accent}>The verdict</Label></Rise>
      <Rise delay={10} distance={44}>
        <div style={{
          fontFamily: FONT, fontSize: 62, fontWeight: 400, color: '#fff',
          lineHeight: 1.35, marginTop: 44,
        }}>{verdict}</div>
      </Rise>
    </AbsoluteFill>
  );
}

function TableScene({ table, accent }) {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 90 }}>
      <Rise delay={0}><Label accent={accent}>Where it leaves us</Label></Rise>
      <Rise delay={8} distance={34}>
        <div style={{
          fontFamily: FONT, fontSize: 190, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginTop: 20,
        }}>{table.position}</div>
      </Rise>
      <Rise delay={16}>
        <div style={{ fontFamily: FONT, fontSize: 48, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>
          {table.points} pts · {table.detail}
        </div>
      </Rise>
    </AbsoluteFill>
  );
}

function OutroScene({ accent }) {
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Rise delay={0}>
        <div style={{ fontFamily: FONT, fontSize: 72, fontWeight: 700, color: '#fff', letterSpacing: 2 }}>
          THE GOONERS WORLD
        </div>
      </Rise>
      <Rise delay={10}>
        <div style={{ fontFamily: FONT, fontSize: 42, color: accent, marginTop: 18, letterSpacing: 3 }}>
          A VERDICT AFTER EVERY MATCH
        </div>
      </Rise>
    </AbsoluteFill>
  );
}

// ── composition ────────────────────────────────────────────────────
/** Scene order varies by variant so 60 matches a season don't ship identical. */
const VARIANTS = {
  hookFirst: ['hook', 'score', 'moments', 'verdict', 'table', 'outro'],
  scoreFirst: ['score', 'hook', 'verdict', 'moments', 'table', 'outro'],
  verdictLed: ['hook', 'verdict', 'score', 'moments', 'table', 'outro'],
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
  variant = 'hookFirst', accent = RED, narrationUrl,
  match, hook, goals = [], verdict, table,
}) {
  const { fps, durationInFrames } = useVideoConfig();
  const order = VARIANTS[variant] || VARIANTS.hookFirst;

  // Weight scenes by how much there is to say, then fit them to the audio length.
  const weights = { hook: 3, score: 3, moments: Math.max(2, goals.length) * 1.1, verdict: 4, table: 2.5, outro: 1.6 };
  const total = order.reduce((sum, k) => sum + weights[k], 0);

  const scenes = { hook: HookScene, score: ScoreScene, moments: MomentsScene, verdict: VerdictScene, table: TableScene, outro: OutroScene };
  const props = { match, hook, goals, verdict, table, accent };

  let cursor = 0;
  return (
    <AbsoluteFill>
      <Backdrop accent={accent} />
      {narrationUrl && <Audio src={narrationUrl} />}
      {order.map((key) => {
        const Scene = scenes[key];
        const length = Math.round((weights[key] / total) * durationInFrames);
        const from = cursor;
        cursor += length;
        return (
          <Sequence key={key} from={from} durationInFrames={length + Math.round(fps * 0.2)}>
            <Scene {...props} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
