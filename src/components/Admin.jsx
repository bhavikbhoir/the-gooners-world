import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMatches, fetchMatchDetail } from '../api/football';
import './Admin.css';

const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/admin' : import.meta.env.VITE_API_BASE + '/admin';
const GW_KEY = import.meta.env.VITE_API_GW_KEY;

function getToken() { return sessionStorage.getItem('tgw_admin_token'); }

function adminFetch(path, body) {
  const headers = { 'Content-Type': 'application/json' };
  if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetch(`${BASE}${path}`, { method: 'POST', headers, body: JSON.stringify(body) });
}

function formatMatchLabel(m) {
  const d = new Date(m.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return `${m.home} ${m.homeScore ?? '?'}-${m.awayScore ?? '?'} ${m.away} · ${m.competition} · ${d}`;
}

function getRecentForm(matches, selected) {
  return matches
    .filter((m) => m.status === 'FINISHED' && m.id !== selected?.id)
    .slice(-5)
    .reverse()
    .map((m) => {
      const isHome = m.home === 'Arsenal' || m.home === 'Arsenal FC';
      const scored = isHome ? m.homeScore : m.awayScore;
      const conceded = isHome ? m.awayScore : m.homeScore;
      return scored > conceded ? 'W' : scored === conceded ? 'D' : 'L';
    })
    .join(', ');
}

function generateMatchCanvas(match, detail, bgImg = null) {
  const W = 1080, H = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const WHITE = '#FFFFFF';
  const FOOTER_H = 100;
  const FOOTER_Y = H - FOOTER_H;
  const isUCL = /champions.league|UEFA.CL|UCL/i.test(match.competition || '');

  const T = isUCL ? {
    accent: '#c9a227',
    footerBg: '#0b1e52',
    separator: 'rgba(255,255,255,0.12)',
    metaColor: bgImg ? 'rgba(255,255,255,0.75)' : '#7a8db0',
    refColor: bgImg ? 'rgba(255,255,255,0.5)' : '#3a4e72',
    opponentGoalColor: bgImg ? 'rgba(255,255,255,0.6)' : '#7a8db0',
  } : {
    accent: '#EF0107',
    footerBg: '#EF0107',
    separator: bgImg ? 'rgba(255,255,255,0.12)' : '#1e1e1e',
    metaColor: bgImg ? 'rgba(255,255,255,0.75)' : '#888888',
    refColor: bgImg ? 'rgba(255,255,255,0.5)' : '#555555',
    opponentGoalColor: bgImg ? 'rgba(255,255,255,0.6)' : '#aaaaaa',
  };

  // Shadow helpers — only active when photo background is used
  const shadow = () => {
    if (!bgImg) return;
    ctx.shadowColor = 'rgba(0,0,0,0.95)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 2;
  };
  const noShadow = () => {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  };

  // ── BACKGROUND ──
  if (bgImg) {
    // Draw photo with cover-crop to fill 1080×1080
    const iw = bgImg.naturalWidth, ih = bgImg.naturalHeight;
    const scale = Math.max(W / iw, H / ih);
    const dw = iw * scale, dh = ih * scale;
    ctx.drawImage(bgImg, (W - dw) / 2, (H - dh) / 2, dw, dh);

    // Base dark scrim
    ctx.fillStyle = 'rgba(0,0,0,0.52)';
    ctx.fillRect(0, 0, W, H);

    // Stronger gradient at top (header zone)
    const topScrim = ctx.createLinearGradient(0, 0, 0, 240);
    topScrim.addColorStop(0, 'rgba(0,0,0,0.72)');
    topScrim.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = topScrim;
    ctx.fillRect(0, 0, W, 240);

    // Stronger gradient at bottom (meta/goals zone)
    const bottomScrim = ctx.createLinearGradient(0, 720, 0, FOOTER_Y);
    bottomScrim.addColorStop(0, 'rgba(0,0,0,0)');
    bottomScrim.addColorStop(1, 'rgba(0,0,0,0.78)');
    ctx.fillStyle = bottomScrim;
    ctx.fillRect(0, 720, W, FOOTER_Y - 720);

    // Subtle accent color tint in the score zone (adds brand identity)
    const scoreTint = isUCL
      ? ctx.createRadialGradient(W / 2, 530, 0, W / 2, 530, 420)
      : ctx.createRadialGradient(W / 2, 530, 0, W / 2, 530, 360);
    scoreTint.addColorStop(0, isUCL ? 'rgba(201,162,39,0.08)' : 'rgba(239,1,7,0.1)');
    scoreTint.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = scoreTint;
    ctx.fillRect(0, 0, W, H);
  } else {
    // Dark programmatic background
    ctx.fillStyle = isUCL ? '#06091a' : '#0d0d0d';
    ctx.fillRect(0, 0, W, H);

    // Diagonal glow — top right
    const diagGrad = ctx.createLinearGradient(W, 0, W - 460, 460);
    diagGrad.addColorStop(0, isUCL ? 'rgba(30,80,200,0.22)' : 'rgba(239,1,7,0.2)');
    diagGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = diagGrad;
    ctx.fillRect(0, 0, W, H);

    // Corner glow — bottom left
    const cornerGlow = ctx.createRadialGradient(0, H, 0, 0, H, 500);
    cornerGlow.addColorStop(0, isUCL ? 'rgba(201,162,39,0.1)' : 'rgba(239,1,7,0.1)');
    cornerGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = cornerGlow;
    ctx.fillRect(0, 0, W, H);
  }

  // ── TOP ACCENT BAR ──
  noShadow();
  ctx.fillStyle = T.accent;
  ctx.fillRect(0, 0, W, 8);

  // ── HEADER ──
  shadow();
  ctx.fillStyle = bgImg ? 'rgba(255,255,255,0.85)' : '#aaaaaa';
  ctx.font = '700 14px Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('F U L L   T I M E', 64, 58);

  ctx.textAlign = 'right';
  ctx.font = '500 13px Arial, sans-serif';
  ctx.fillStyle = isUCL ? T.accent : (bgImg ? 'rgba(255,255,255,0.6)' : '#666666');
  ctx.fillText((match.competition || '').toUpperCase(), W - 64, 58);

  noShadow();
  ctx.strokeStyle = T.separator;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(64, 80);
  ctx.lineTo(W - 64, 80);
  ctx.stroke();

  // ── HOME TEAM ──
  shadow();
  ctx.fillStyle = WHITE;
  ctx.textAlign = 'center';
  let homeFont = 96;
  ctx.font = `700 ${homeFont}px Arial, sans-serif`;
  while (ctx.measureText(match.home.toUpperCase()).width > W - 80 && homeFont > 52) {
    homeFont -= 4;
    ctx.font = `700 ${homeFont}px Arial, sans-serif`;
  }
  ctx.fillText(match.home.toUpperCase(), W / 2, 272);

  // ── SCORE ──
  const scoreText = `${match.homeScore}  -  ${match.awayScore}`;
  let scoreFont = 240;
  ctx.font = `900 ${scoreFont}px Arial, sans-serif`;
  while (ctx.measureText(scoreText).width > W - 60 && scoreFont > 110) {
    scoreFont -= 6;
    ctx.font = `900 ${scoreFont}px Arial, sans-serif`;
  }
  if (!bgImg) {
    // Drop shadow on dark bg (manual offset)
    noShadow();
    ctx.fillStyle = isUCL ? 'rgba(201,162,39,0.25)' : 'rgba(239,1,7,0.22)';
    ctx.fillText(scoreText, W / 2 + 5, 589);
  }
  shadow();
  ctx.fillStyle = T.accent;
  ctx.fillText(scoreText, W / 2, 585);

  // ── AWAY TEAM ──
  ctx.fillStyle = WHITE;
  let awayFont = 96;
  ctx.font = `700 ${awayFont}px Arial, sans-serif`;
  while (ctx.measureText(match.away.toUpperCase()).width > W - 80 && awayFont > 52) {
    awayFont -= 4;
    ctx.font = `700 ${awayFont}px Arial, sans-serif`;
  }
  ctx.fillText(match.away.toUpperCase(), W / 2, 770);

  // ── META SEPARATOR ──
  noShadow();
  ctx.strokeStyle = T.separator;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(64, 808);
  ctx.lineTo(W - 64, 808);
  ctx.stroke();

  // ── DATE + VENUE ──
  shadow();
  const dateStr = new Date(match.date).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric',
  });
  let metaLine = detail?.venue ? `${dateStr}  ·  ${detail.venue}` : dateStr;
  ctx.fillStyle = T.metaColor;
  ctx.font = '18px Arial, sans-serif';
  ctx.textAlign = 'center';
  if (ctx.measureText(metaLine).width > W - 120) metaLine = dateStr;
  ctx.fillText(metaLine, W / 2, 842);

  if (detail?.referee) {
    ctx.fillStyle = T.refColor;
    ctx.font = '15px Arial, sans-serif';
    ctx.fillText(`Referee: ${detail.referee}`, W / 2, 866);
  }

  // ── GOAL SCORERS ──
  const goals = detail?.goals || [];
  if (goals.length > 0) {
    const isArsenalHome = /^arsenal/i.test(match.home);
    let gy = 905;
    ctx.font = '600 18px Arial, sans-serif';
    for (const g of goals.slice(0, 5)) {
      if (gy > FOOTER_Y - 24) break;
      const isArsenal = /^arsenal/i.test(g.team) || g.team === (isArsenalHome ? match.home : match.away);
      const suffix = g.type === 'OWN_GOAL' ? ' og' : g.type === 'PENALTY' ? ' pen' : '';
      const label = `${g.minute}' ${g.scorer}${suffix}`;
      if (isArsenal) {
        ctx.fillStyle = WHITE;
        ctx.textAlign = 'right';
        ctx.fillText(label, W / 2 - 28, gy);
      } else {
        ctx.fillStyle = T.opponentGoalColor;
        ctx.textAlign = 'left';
        ctx.fillText(label, W / 2 + 28, gy);
      }
      gy += 27;
    }
  }

  // ── FOOTER ──
  noShadow();
  // Fade into footer (from photo or dark bg)
  const fadeBg = bgImg ? '0,0,0' : (isUCL ? '6,9,26' : '13,13,13');
  const fade = ctx.createLinearGradient(0, FOOTER_Y - 30, 0, FOOTER_Y);
  fade.addColorStop(0, `rgba(${fadeBg},0)`);
  fade.addColorStop(1, `rgba(${fadeBg},1)`);
  ctx.fillStyle = fade;
  ctx.fillRect(0, FOOTER_Y - 30, W, 30);

  ctx.fillStyle = T.footerBg;
  ctx.fillRect(0, FOOTER_Y, W, FOOTER_H);

  if (isUCL) {
    ctx.fillStyle = T.accent;
    ctx.fillRect(0, FOOTER_Y, 6, FOOTER_H);
  }

  const footShade = ctx.createLinearGradient(0, FOOTER_Y, 0, FOOTER_Y + 16);
  footShade.addColorStop(0, 'rgba(0,0,0,0.35)');
  footShade.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = footShade;
  ctx.fillRect(0, FOOTER_Y, W, 16);

  ctx.fillStyle = WHITE;
  ctx.textAlign = 'center';
  ctx.font = 'bold 26px Arial, sans-serif';
  ctx.fillText('THE GOONERS WORLD', W / 2, FOOTER_Y + 52);
  ctx.fillStyle = isUCL ? 'rgba(201,162,39,0.8)' : 'rgba(255,255,255,0.65)';
  ctx.font = '14px Arial, sans-serif';
  ctx.fillText('@thegoonersworld  ·  the-gooners-world.web.app', W / 2, FOOTER_Y + 78);

  return canvas.toDataURL('image/png');
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('tgw_admin') === '1' && !!getToken());
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);

  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [matchDetail, setMatchDetail] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMime, setImageMime] = useState('image/png');
  const [imageIsGenerated, setImageIsGenerated] = useState(false);

  const [generating, setGenerating] = useState(false);
  const [posts, setPosts] = useState({ instagram: '', x: '' });
  const [activeTab, setActiveTab] = useState('instagram');
  const [genError, setGenError] = useState('');

  const [publishing, setPublishing] = useState('');
  const [publishResult, setPublishResult] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const fileRef = useRef();

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, closeLightbox]);

  useEffect(() => {
    fetchMatches()
      .then((all) => {
        const finished = all.filter((m) => m.status === 'FINISHED').reverse();
        setMatches(finished);
        if (finished.length) setSelected(finished[0]);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selected) return;
    setMatchDetail(null);
    fetchMatchDetail(selected.id)
      .then(setMatchDetail)
      .catch(() => setMatchDetail({ goals: [], referee: null, venue: null }));
  }, [selected?.id]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
      const res = await fetch(`${BASE}/auth`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ password: pwInput }),
      });
      if (!res.ok) throw new Error('bad');
      const { token } = await res.json();
      sessionStorage.setItem('tgw_admin_token', token);
      sessionStorage.setItem('tgw_admin', '1');
      setAuthed(true);
    } catch {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImageMime(file.type);
    setImageIsGenerated(false);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target.result);
      setImageBase64(ev.target.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  }

  async function handleGenerate() {
    if (!selected) return;
    setGenerating(true);
    setGenError('');
    setPosts({ instagram: '', x: '' });
    setPublishResult({});
    try {
      const res = await adminFetch('/generate', {
        home: selected.home,
        homeScore: selected.homeScore,
        awayScore: selected.awayScore,
        away: selected.away,
        competition: selected.competition,
        date: selected.date,
        stage: selected.stage,
        recentForm: getRecentForm(matches, selected),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setPosts(data);

      // Load user-uploaded photo as canvas background (only if not already a generated canvas)
      let bgImg = null;
      if (imagePreview && !imageIsGenerated) {
        bgImg = await new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = imagePreview;
        });
      }

      // Generate canvas image with optional photo background
      const dataUrl = generateMatchCanvas(selected, matchDetail, bgImg);
      setImagePreview(dataUrl);
      setImageBase64(dataUrl.split(',')[1]);
      setImageMime('image/png');
      setImageFile(null);
      setImageIsGenerated(bgImg ? 'photo' : true);
    } catch (err) {
      setGenError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  async function handlePublish(platform) {
    if (!posts.instagram && !posts.x) return;
    setPublishing(platform);
    setPublishResult((prev) => ({ ...prev, [platform]: null }));
    try {
      const body = {
        platform,
        instagramCaption: posts.instagram,
        xText: posts.x,
        home: selected?.home,
        away: selected?.away,
        homeScore: selected?.homeScore,
        awayScore: selected?.awayScore,
      };
      if (platform === 'instagram' || platform === 'both') {
        if (!imageBase64) { setGenError('Generate a post first to create the image'); setPublishing(''); return; }
        body.imageBase64 = imageBase64;
        body.mimeType = imageMime;
      }
      const res = await adminFetch('/publish', body);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Publish failed');
      setPublishResult((prev) => ({ ...prev, [platform]: 'posted' }));
    } catch (err) {
      setPublishResult((prev) => ({ ...prev, [platform]: `Error: ${err.message}` }));
    } finally {
      setPublishing('');
    }
  }

  const xLen = posts.x.length;

  if (!authed) {
    return (
      <div className="admin-gate">
        <div className="admin-gate__box">
          <div className="admin-gate__logo">🔫</div>
          <h2 className="admin-gate__title">The Gooners World</h2>
          <p className="admin-gate__sub">Admin Access</p>
          <form onSubmit={handleLogin}>
            <input
              className={`admin-gate__input${pwError ? ' admin-gate__input--error' : ''}`}
              type="password"
              placeholder="Password"
              value={pwInput}
              onChange={(e) => setPwInput(e.target.value)}
              autoFocus
            />
            <button className="admin-gate__btn" type="submit">Enter</button>
          </form>
          {pwError && <p className="admin-gate__error">Incorrect password</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin__header">
        <span className="admin__logo">🔫 The Gooners World</span>
        <span className="admin__badge">Admin</span>
      </div>

      <div className="admin__body">
        {/* Left: controls */}
        <div className="admin__left">
          <section className="admin__section">
            <label className="admin__label">Match</label>
            <select
              className="admin__select"
              value={selected?.id || ''}
              onChange={(e) => setSelected(matches.find((m) => m.id === parseInt(e.target.value)))}
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>{formatMatchLabel(m)}</option>
              ))}
            </select>
          </section>

          <section className="admin__section">
            <label className="admin__label">
              Background photo
              {imageIsGenerated && <span className="admin__img-badge">{imageIsGenerated === 'photo' ? 'Custom bg' : 'Auto-generated'}</span>}
            </label>
            <div
              className={`admin__dropzone${imagePreview ? ' admin__dropzone--filled' : ''}`}
              onClick={() => fileRef.current.click()}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="preview" className="admin__img-preview" />
                  <span className="admin__dropzone-replace">Click to replace · Generate again to apply</span>
                </>
              ) : (
                <span className="admin__dropzone-hint">Upload a photo as background · leave empty for dark theme</span>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
            {imageFile && <p className="admin__filename">{imageFile.name}</p>}
            {imagePreview && (
              <div className="admin__img-actions">
                <button
                  className="admin__img-link"
                  onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                >Preview</button>
                <span className="admin__img-actions-sep">·</span>
                <a
                  href={imagePreview}
                  download={selected ? `${selected.home}-vs-${selected.away}.png`.toLowerCase().replace(/\s+/g, '-') : 'match.png'}
                  className="admin__img-link"
                  onClick={(e) => e.stopPropagation()}
                >Download</a>
              </div>
            )}
          </section>

          <button
            className="admin__generate-btn"
            onClick={handleGenerate}
            disabled={generating || !selected}
          >
            {generating ? 'Generating...' : '✨ Generate Post'}
          </button>
          {genError && <p className="admin__error">{genError}</p>}
        </div>

        {/* Right: preview + post */}
        <div className="admin__right">
          {posts.instagram || posts.x ? (
            <>
              <div className="admin__tabs">
                <button
                  className={`admin__tab${activeTab === 'instagram' ? ' admin__tab--active' : ''}`}
                  onClick={() => setActiveTab('instagram')}
                >Instagram</button>
                <button
                  className={`admin__tab${activeTab === 'x' ? ' admin__tab--active' : ''}`}
                  onClick={() => setActiveTab('x')}
                >X</button>
              </div>

              {activeTab === 'instagram' && (
                <div className="admin__preview">
                  <textarea
                    className="admin__textarea"
                    rows={14}
                    value={posts.instagram}
                    onChange={(e) => setPosts((p) => ({ ...p, instagram: e.target.value }))}
                  />
                  <div className="admin__post-actions">
                    <button
                      className="admin__post-btn admin__post-btn--ig"
                      onClick={() => handlePublish('instagram')}
                      disabled={!!publishing || !imageBase64}
                    >
                      {publishing === 'instagram' ? 'Posting...' : '📸 Post to Instagram'}
                    </button>
                    {publishResult.instagram && (
                      <span className={`admin__post-status${publishResult.instagram === 'posted' ? ' admin__post-status--ok' : ' admin__post-status--err'}`}>
                        {publishResult.instagram === 'posted' ? '✅ Posted!' : publishResult.instagram}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'x' && (
                <div className="admin__preview">
                  <textarea
                    className="admin__textarea"
                    rows={8}
                    value={posts.x}
                    onChange={(e) => setPosts((p) => ({ ...p, x: e.target.value }))}
                  />
                  <div className="admin__char-count">
                    <span className={xLen > 280 ? 'admin__char-count--over' : ''}>{xLen}/280</span>
                  </div>
                  <div className="admin__post-actions">
                    <button
                      className="admin__post-btn admin__post-btn--x"
                      onClick={() => handlePublish('x')}
                      disabled={!!publishing || xLen > 280}
                    >
                      {publishing === 'x' ? 'Posting...' : '𝕏 Post to X'}
                    </button>
                    {publishResult.x && (
                      <span className={`admin__post-status${publishResult.x === 'posted' ? ' admin__post-status--ok' : ' admin__post-status--err'}`}>
                        {publishResult.x === 'posted' ? '✅ Posted!' : publishResult.x}
                      </span>
                    )}
                    <span className="admin__post-hint">Requires X Basic plan ($100/mo) for API posting</span>
                  </div>
                </div>
              )}

              <div className="admin__both">
                <button
                  className="admin__post-btn admin__post-btn--both"
                  onClick={() => handlePublish('both')}
                  disabled={!!publishing || !imageBase64 || xLen > 280}
                >
                  {publishing === 'both' ? 'Posting...' : '🚀 Post to Both'}
                </button>
                {publishResult.both && (
                  <span className={`admin__post-status${publishResult.both === 'posted' ? ' admin__post-status--ok' : ' admin__post-status--err'}`}>
                    {publishResult.both === 'posted' ? '✅ Posted to both!' : publishResult.both}
                  </span>
                )}
              </div>
            </>
          ) : (
            <div className="admin__empty">
              {generating
                ? <p>Claude is writing your post...</p>
                : <p>Select a match and click Generate Post</p>
              }
            </div>
          )}
        </div>
      </div>

      {lightboxOpen && imagePreview && (
        <div className="admin__lightbox" onClick={closeLightbox}>
          <button className="admin__lightbox__close" onClick={closeLightbox}>&#x2715;</button>
          <div className="admin__lightbox__inner" onClick={(e) => e.stopPropagation()}>
            <img src={imagePreview} alt="Full size preview" className="admin__lightbox__img" />
            <div className="admin__lightbox__footer">
              <span className="admin__lightbox__label">1080 × 1080 · Instagram ready</span>
              <a
                href={imagePreview}
                download={selected ? `${selected.home}-vs-${selected.away}.png`.toLowerCase().replace(/\s+/g, '-') : 'match.png'}
                className="admin__lightbox__download"
                onClick={(e) => e.stopPropagation()}
              >Download</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
