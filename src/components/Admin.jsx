import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMatches, fetchMatchDetail } from '../api/football';
import DraftsQueue from './DraftsQueue';
import QuickDraft from './QuickDraft';
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

export default function Admin() {
  const [view, setView] = useState('compose');
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
  const [copiedTab, setCopiedTab] = useState(null);

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

      // Only forward a photo if the admin uploaded one (not a previously generated card).
      const uploadedPhoto = imagePreview && !imageIsGenerated ? imageBase64 : null;

      // Same renderer the autopilot orchestrator uses (functions/social/graphics.js
      // renderCard), so compose and autopilot cards always look identical.
      const cardRes = await adminFetch('/generate-card', {
        type: 'fulltime',
        home: selected.home,
        away: selected.away,
        homeScore: selected.homeScore,
        awayScore: selected.awayScore,
        competition: selected.competition,
        date: selected.date,
        venue: matchDetail?.venue || undefined,
        goals: matchDetail?.goals?.length ? matchDetail.goals : undefined,
        referee: matchDetail?.referee || undefined,
        ...(uploadedPhoto ? { imageBase64: uploadedPhoto } : {}),
      });
      const cardData = await cardRes.json();
      if (!cardRes.ok) throw new Error(cardData.error || 'Card generation failed');

      setImagePreview(`data:${cardData.mimeType};base64,${cardData.imageBase64}`);
      setImageBase64(cardData.imageBase64);
      setImageMime(cardData.mimeType);
      setImageFile(null);
      setImageIsGenerated(uploadedPhoto ? 'photo' : true);
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

  function handleCopy(text, tab) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTab(tab);
      setTimeout(() => setCopiedTab(null), 2000);
    });
  }

  const xLen = posts.x.length;
  const imageExt = imageMime === 'image/jpeg' ? 'jpg' : 'png';

  if (!authed) {
    return (
      <div className="admin-gate">
        <div className="admin-gate__box">
          <div className="admin-gate__logo">⚽</div>
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
        <span className="admin__logo">⚽ The Gooners World</span>
        <span className="admin__badge">Admin</span>
        <div className="admin__viewtabs">
          <button
            className={`admin__viewtab${view === 'compose' ? ' admin__viewtab--active' : ''}`}
            onClick={() => setView('compose')}
          >Compose</button>
          <button
            className={`admin__viewtab${view === 'quick' ? ' admin__viewtab--active' : ''}`}
            onClick={() => setView('quick')}
          >Quick draft</button>
          <button
            className={`admin__viewtab${view === 'drafts' ? ' admin__viewtab--active' : ''}`}
            onClick={() => setView('drafts')}
          >Autopilot drafts</button>
        </div>
      </div>

      {view === 'drafts' ? <DraftsQueue /> : view === 'quick' ? <QuickDraft onCreated={() => {}} /> : (
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
                  download={selected ? `${selected.home}-vs-${selected.away}.${imageExt}`.toLowerCase().replace(/\s+/g, '-') : `match.${imageExt}`}
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
                  <div className="admin__share-row">
                    <button className="admin__share-btn" onClick={() => handleCopy(posts.instagram, 'instagram')}>
                      {copiedTab === 'instagram' ? '✓ Copied' : 'Copy'}
                    </button>
                    <a
                      className="admin__share-btn admin__share-btn--wa"
                      href={`https://wa.me/?text=${encodeURIComponent(posts.instagram)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >WhatsApp</a>
                  </div>
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
                  <div className="admin__share-row">
                    <button className="admin__share-btn" onClick={() => handleCopy(posts.x, 'x')}>
                      {copiedTab === 'x' ? '✓ Copied' : 'Copy'}
                    </button>
                    <a
                      className="admin__share-btn admin__share-btn--x-share"
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(posts.x)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >Share on X</a>
                    <a
                      className="admin__share-btn admin__share-btn--wa"
                      href={`https://wa.me/?text=${encodeURIComponent(posts.x)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >WhatsApp</a>
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
      )}

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
