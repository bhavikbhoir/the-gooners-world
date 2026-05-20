import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import './ChampionsBanner.css';

const CONFETTI_KEY = 'tgw_champions_2526';

const COLORS = ['#EF0107', '#FFFFFF', '#FFD700', '#b8000a'];

export default function ChampionsBanner() {
  useEffect(() => {
    if (sessionStorage.getItem(CONFETTI_KEY)) return;
    sessionStorage.setItem(CONFETTI_KEY, '1');

    // Left burst
    confetti({ particleCount: 90, angle: 60, spread: 60, origin: { x: 0, y: 0.65 }, colors: COLORS });
    // Right burst
    confetti({ particleCount: 90, angle: 120, spread: 60, origin: { x: 1, y: 0.65 }, colors: COLORS });
    // Centre shower
    setTimeout(() => {
      confetti({ particleCount: 140, spread: 80, origin: { x: 0.5, y: 0.35 }, colors: COLORS, gravity: 0.9 });
    }, 350);
    // Trailing flurry
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 100, origin: { x: 0.3, y: 0.5 }, colors: COLORS, scalar: 0.8 });
      confetti({ particleCount: 60, spread: 100, origin: { x: 0.7, y: 0.5 }, colors: COLORS, scalar: 0.8 });
    }, 800);
  }, []);

  return (
    <div className="champions-banner" role="banner" aria-label="Champions announcement">
      <span className="champions-banner__trophy">🏆</span>
      <span className="champions-banner__text">Premier League Champions 2025/26</span>
      <span className="champions-banner__trophy">🏆</span>
    </div>
  );
}
