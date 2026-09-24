const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/agent' : import.meta.env.VITE_API_BASE + '/agent';
const GW_KEY = import.meta.env.VITE_API_GW_KEY;

export async function sendMessage(message, sessionId, mode = 'text') {
  const headers = { 'Content-Type': 'application/json' };
  if (!isDev) headers['x-api-key'] = GW_KEY;

  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message, sessionId, mode }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Chat failed: ${res.status}`);
  }

  return res.json();
}

// Voice fallback: 16 kHz mono PCM (base64) → transcript via Amazon Transcribe.
export async function transcribeAudio(audio) {
  const headers = { 'Content-Type': 'application/json' };
  if (!isDev) headers['x-api-key'] = GW_KEY;

  const res = await fetch(`${BASE}/transcribe`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ audio }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Transcribe failed: ${res.status}`);
  }

  return res.json();
}
