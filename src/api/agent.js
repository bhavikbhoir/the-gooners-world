const isDev = import.meta.env.DEV;
const BASE = isDev ? '/api/agent' : import.meta.env.VITE_API_BASE + '/agent';
const GW_KEY = import.meta.env.VITE_API_GW_KEY;

export async function sendMessage(message, sessionId) {
  const headers = { 'Content-Type': 'application/json' };
  if (!isDev) headers['x-api-key'] = GW_KEY;

  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Chat failed: ${res.status}`);
  }

  return res.json();
}
