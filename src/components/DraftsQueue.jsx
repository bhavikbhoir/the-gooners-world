import React, { useState, useEffect, useCallback } from 'react';

const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/admin' : import.meta.env.VITE_API_BASE + '/admin';
const GW_KEY = import.meta.env.VITE_API_GW_KEY;

function authHeaders() {
  const headers = { 'Content-Type': 'application/json' };
  if (!isDev && GW_KEY) headers['x-api-key'] = GW_KEY;
  const token = sessionStorage.getItem('tgw_admin_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Try a real file download; fall back to opening the image if S3 CORS blocks fetch.
async function downloadImage(url, filename) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const objUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objUrl; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(objUrl);
  } catch {
    window.open(url, '_blank', 'noopener');
  }
}

export default function DraftsQueue() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [edits, setEdits] = useState({});   // draftId -> { instagram, x }
  const [photos, setPhotos] = useState({}); // draftId -> { base64, mime, preview }
  const [busy, setBusy] = useState('');
  const [flash, setFlash] = useState({});
  const [copied, setCopied] = useState('');
  const [regen, setRegen] = useState({});    // draftId -> composited card previewUrl
  const [regenBusy, setRegenBusy] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${BASE}/drafts`, { headers: authHeaders() });
      if (!res.ok) throw new Error(`Failed to load (${res.status})`);
      const { drafts } = await res.json();
      setDrafts(drafts || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const copyOf = (d) => edits[d.draftId] || { instagram: d.instagram, x: d.x };
  const setCopy = (id, field, value) =>
    setEdits((e) => ({ ...e, [id]: { ...(e[id] || {}), [field]: value } }));

  const onPhoto = async (id, file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    setPhotos((p) => ({ ...p, [id]: { base64, mime: file.type, preview: URL.createObjectURL(file) } }));
    setRegen((r) => ({ ...r, [id]: null })); // stale composite until regenerated
  };

  // Re-composite the card over the attached photo (server-side) and preview it.
  const regenerate = async (d) => {
    const photo = photos[d.draftId];
    if (!photo) return;
    setRegenBusy(d.draftId);
    setFlash((f) => ({ ...f, [d.draftId]: '' }));
    try {
      const res = await post({ action: 'rerender', draftId: d.draftId, imageBase64: photo.base64 });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Regenerate failed');
      setRegen((r) => ({ ...r, [d.draftId]: json.previewUrl }));
    } catch (e) { setFlash((f) => ({ ...f, [d.draftId]: e.message })); }
    finally { setRegenBusy(''); }
  };

  const post = (body) => fetch(`${BASE}/drafts`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(body) });

  const copyText = (id, field, text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(`${id}:${field}`);
      setTimeout(() => setCopied(''), 1500);
    });
  };

  // Persist any copy edits so the manual copy/paste matches what's saved.
  const saveEditsIfChanged = async (d) => {
    const c = copyOf(d);
    if (c.instagram !== d.instagram || c.x !== d.x) {
      await post({ action: 'edit', draftId: d.draftId, instagram: c.instagram, x: c.x });
    }
  };

  const publishInstagram = async (d) => {
    setBusy(d.draftId); setFlash((f) => ({ ...f, [d.draftId]: '' }));
    try {
      await saveEditsIfChanged(d);
      const photo = photos[d.draftId];
      // If already regenerated, the composite is saved — no need to re-send.
      const needsApply = photo && !regen[d.draftId];
      const res = await post({
        action: 'approve', draftId: d.draftId, platforms: ['instagram'],
        ...(needsApply ? { imageBase64: photo.base64, mimeType: photo.mime } : {}),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Publish failed');
      setDrafts((list) => list.filter((x) => x.draftId !== d.draftId));
    } catch (e) { setFlash((f) => ({ ...f, [d.draftId]: e.message })); }
    finally { setBusy(''); }
  };

  const markPosted = async (d) => {
    setBusy(d.draftId);
    try {
      await saveEditsIfChanged(d);
      await post({ action: 'markPosted', draftId: d.draftId });
      setDrafts((list) => list.filter((x) => x.draftId !== d.draftId));
    } catch (e) { setFlash((f) => ({ ...f, [d.draftId]: e.message })); }
    finally { setBusy(''); }
  };

  const reject = async (d) => {
    setBusy(d.draftId);
    try {
      await post({ action: 'reject', draftId: d.draftId });
      setDrafts((list) => list.filter((x) => x.draftId !== d.draftId));
    } catch (e) { setFlash((f) => ({ ...f, [d.draftId]: e.message })); }
    finally { setBusy(''); }
  };

  if (loading) return <div className="drafts drafts__empty">Loading drafts…</div>;
  if (error) return <div className="drafts drafts__empty">⚠ {error} <button className="drafts__link" onClick={load}>retry</button></div>;
  if (!drafts.length) return (
    <div className="drafts drafts__empty">
      <p>No drafts waiting. 🎉</p>
      <p className="drafts__hint">The autopilot generates a draft ~3h before kickoff and again at full-time. Check back on matchday.</p>
      <button className="drafts__link" onClick={load}>Refresh</button>
    </div>
  );

  return (
    <div className="drafts">
      <div className="drafts__top">
        <span>{drafts.length} draft{drafts.length > 1 ? 's' : ''} awaiting review</span>
        <button className="drafts__link" onClick={load}>Refresh</button>
      </div>

      {drafts.map((d) => {
        const c = copyOf(d);
        const photo = photos[d.draftId];
        const isBusy = busy === d.draftId;
        const regenUrl = regen[d.draftId];
        const imgUrl = regenUrl || photo?.preview || d.previewUrl;
        const isStatement = d.kind === 'statement';
        const title = isStatement
          ? [d.headline, d.subhead].filter(Boolean).join(' — ')
          : `${d.home} vs ${d.away} · ${d.competition}`;
        const badge = isStatement
          ? (d.tag || d.type || 'POST').toUpperCase()
          : (d.type === 'prematch' ? 'MATCHDAY' : 'FULL-TIME');
        const filename = (isStatement ? `${d.type}-${d.headline}` : `${d.type}-${d.home}-vs-${d.away}`)
          .toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg';
        return (
          <div className="drafts__card" key={d.draftId}>
            <div className="drafts__badge-row">
              <span className={`drafts__type drafts__type--${isStatement ? 'statement' : d.type}`}>{badge}</span>
              <span className="drafts__fixture">{title}</span>
            </div>

            <div className="drafts__grid">
              <div className="drafts__image">
                <img src={imgUrl} alt="post card" />
                {d.needsPhoto && !photo && <span className="drafts__photo-nudge">Tip: add a real match photo for a stronger FT post</span>}
                {photo && !regenUrl && <span className="drafts__photo-nudge">Photo attached — click “Regenerate card” to build the final graphic.</span>}
                <div className="drafts__img-actions">
                  <label className="drafts__photo-btn">
                    {photo ? 'Change photo' : 'Attach match photo'}
                    <input type="file" accept="image/*" hidden onChange={(e) => onPhoto(d.draftId, e.target.files[0])} />
                  </label>
                  {photo && (
                    <button className="drafts__photo-btn" disabled={regenBusy === d.draftId} onClick={() => regenerate(d)}>
                      {regenBusy === d.draftId ? 'Regenerating…' : '↻ Regenerate card'}
                    </button>
                  )}
                  <button className="drafts__photo-btn" onClick={() => downloadImage(imgUrl, filename)}>⬇ Download image</button>
                </div>
              </div>

              <div className="drafts__copy">
                <label className="drafts__label">
                  Instagram caption
                  <button className="drafts__copybtn" onClick={() => copyText(d.draftId, 'instagram', c.instagram)}>
                    {copied === `${d.draftId}:instagram` ? '✓ Copied' : 'Copy'}
                  </button>
                </label>
                <textarea className="drafts__text" rows={5} value={c.instagram}
                  onChange={(e) => setCopy(d.draftId, 'instagram', e.target.value)} />

                <label className="drafts__label">
                  X post <span className="drafts__count">{c.x.length}/280</span>
                  <button className="drafts__copybtn" onClick={() => copyText(d.draftId, 'x', c.x)}>
                    {copied === `${d.draftId}:x` ? '✓ Copied' : 'Copy'}
                  </button>
                </label>
                <textarea className="drafts__text" rows={3} value={c.x}
                  onChange={(e) => setCopy(d.draftId, 'x', e.target.value)} />

                <p className="drafts__manual-hint">
                  Manual route: copy the text, download the image, post it, then <strong>Mark as posted</strong>.
                  X is always manual; Instagram auto-publishes once its token is set up.
                </p>

                {flash[d.draftId] && <p className="drafts__flash">{flash[d.draftId]}</p>}

                <div className="drafts__actions">
                  <button className="drafts__approve" disabled={isBusy} onClick={() => publishInstagram(d)}>
                    {isBusy ? '…' : '📸 Publish to Instagram'}
                  </button>
                  <button className="drafts__mark" disabled={isBusy} onClick={() => markPosted(d)}>✓ Mark as posted</button>
                  <button className="drafts__reject" disabled={isBusy} onClick={() => reject(d)}>Reject</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
