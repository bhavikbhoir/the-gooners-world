import React, { useState, useEffect, useRef } from 'react';
import { fetchMatches } from '../api/football';
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
  return `${m.home} ${m.homeScore ?? '?'}–${m.awayScore ?? '?'} ${m.away} · ${m.competition} · ${d}`;
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
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('tgw_admin') === '1' && !!getToken());
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState(false);

  const [matches, setMatches] = useState([]);
  const [selected, setSelected] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageMime, setImageMime] = useState('image/jpeg');

  const [generating, setGenerating] = useState(false);
  const [posts, setPosts] = useState({ instagram: '', x: '' });
  const [activeTab, setActiveTab] = useState('instagram');
  const [genError, setGenError] = useState('');

  const [publishing, setPublishing] = useState('');
  const [publishResult, setPublishResult] = useState({});

  const fileRef = useRef();

  useEffect(() => {
    fetchMatches()
      .then((all) => {
        const finished = all.filter((m) => m.status === 'FINISHED').reverse();
        setMatches(finished);
        if (finished.length) setSelected(finished[0]);
      })
      .catch(() => {});
  }, []);

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
        if (!imageBase64) { setGenError('Upload an image first'); setPublishing(''); return; }
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
            <label className="admin__label">Match image</label>
            <div
              className={`admin__dropzone${imagePreview ? ' admin__dropzone--filled' : ''}`}
              onClick={() => fileRef.current.click()}
            >
              {imagePreview
                ? <img src={imagePreview} alt="preview" className="admin__img-preview" />
                : <span className="admin__dropzone-hint">Click to upload image</span>
              }
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImage} />
            {imageFile && <p className="admin__filename">{imageFile.name}</p>}
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
                >X (Twitter)</button>
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
                    {!imageBase64 && <span className="admin__post-hint">Upload image to enable</span>}
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
    </div>
  );
}
