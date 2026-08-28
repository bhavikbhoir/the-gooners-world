import React, { useState } from 'react';

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

const TEMPLATES = [
  { id: 'signing',      label: 'Transfer / Signing', hint: 'e.g. Signed Viktor Gyökeres from Sporting on a 5-year deal' },
  { id: 'injury',       label: 'Injury update',      hint: 'e.g. Saka out ~3 weeks with a minor hamstring strain' },
  { id: 'appreciation', label: 'Appreciation',       hint: 'e.g. Ødegaard — pure class, our captain and talisman' },
  { id: 'milestone',    label: 'Milestone',          hint: 'e.g. Saliba makes his 150th Arsenal appearance' },
  { id: 'onthisday',    label: 'On this day',        hint: 'e.g. 2004 — the Invincibles complete an unbeaten league season' },
  { id: 'award',        label: 'Award',              hint: 'e.g. Declan Rice wins Premier League Player of the Month' },
  { id: 'news',         label: 'News reaction',      hint: 'e.g. Rivals drop points — Arsenal go top of the table' },
  { id: 'custom',       label: 'Custom',             hint: 'Describe the post in a sentence or two' },
];

const COMPS = [
  { v: '', label: 'None / general' },
  { v: 'Premier League', label: 'Premier League' },
  { v: 'Champions League', label: 'Champions League' },
  { v: 'FA Cup', label: 'FA Cup' },
  { v: 'Carabao Cup', label: 'Carabao Cup' },
];

export default function QuickDraft({ onCreated }) {
  const [type, setType] = useState('signing');
  const [details, setDetails] = useState('');
  const [competition, setCompetition] = useState('');
  const [photo, setPhoto] = useState(null); // { base64, mime, preview }
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const tmpl = TEMPLATES.find((t) => t.id === type);

  const onPhoto = async (file) => {
    if (!file) return;
    const base64 = await fileToBase64(file);
    setPhoto({ base64, mime: file.type, preview: URL.createObjectURL(file) });
  };

  const generate = async () => {
    if (!details.trim()) { setError('Add a few details first.'); return; }
    setBusy(true); setError(''); setResult(null);
    try {
      const res = await fetch(`${BASE}/quick-draft`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          type, details, competition: competition || undefined,
          ...(photo ? { imageBase64: photo.base64, mimeType: photo.mime } : {}),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Generation failed');
      setResult(json.draft);
      if (onCreated) onCreated();
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  const reset = () => { setResult(null); setDetails(''); setPhoto(null); };

  if (result) {
    return (
      <div className="quick">
        <div className="quick__done">
          <h3>✓ Draft created</h3>
          <p>It's waiting in <strong>Autopilot drafts</strong> for review &amp; publishing.</p>
        </div>
        <div className="quick__result">
          <img className="quick__preview" src={result.previewUrl} alt="generated card" />
          <div className="quick__captions">
            <label className="quick__label">Instagram</label>
            <p className="quick__cap">{result.instagram}</p>
            <label className="quick__label">X</label>
            <p className="quick__cap">{result.x}</p>
          </div>
        </div>
        <div className="quick__actions">
          <button className="quick__btn" onClick={reset}>Create another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quick">
      <h3 className="quick__title">Quick draft — generic post</h3>
      <p className="quick__sub">Pick a template, add the facts, optionally attach a photo. Claude writes the caption and builds a branded card — it lands in the approval queue.</p>

      <label className="quick__label">Template</label>
      <div className="quick__templates">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            className={`quick__chip${type === t.id ? ' quick__chip--active' : ''}`}
            onClick={() => setType(t.id)}
          >{t.label}</button>
        ))}
      </div>

      <label className="quick__label">Details <span className="quick__hint">only what you type is used — no invented facts</span></label>
      <textarea
        className="quick__text"
        rows={4}
        placeholder={tmpl?.hint}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <div className="quick__row">
        <div>
          <label className="quick__label">Competition theme (optional)</label>
          <select className="quick__select" value={competition} onChange={(e) => setCompetition(e.target.value)}>
            {COMPS.map((c) => <option key={c.v} value={c.v}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="quick__label">Photo (optional)</label>
          <label className="quick__photo">
            {photo ? 'Change photo' : 'Attach photo'}
            <input type="file" accept="image/*" hidden onChange={(e) => onPhoto(e.target.files[0])} />
          </label>
        </div>
      </div>

      {photo && <img className="quick__thumb" src={photo.preview} alt="attached" />}
      {error && <p className="quick__error">{error}</p>}

      <div className="quick__actions">
        <button className="quick__btn" disabled={busy} onClick={generate}>
          {busy ? 'Generating…' : '✨ Generate draft'}
        </button>
      </div>
    </div>
  );
}
