import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaPlug, FaCopy, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';

// Public (no-auth) MCP route on the backend. Built from the same API base the
// rest of the app uses, falling back to the known prod endpoint.
const API_BASE =
  import.meta.env.VITE_API_BASE ||
  'https://1xgf5u2adh.execute-api.us-east-1.amazonaws.com/dev';
const MCP_URL = `${API_BASE}/mcp-public`;

const CLAUDE_SETTINGS_URL = 'https://claude.ai/new#settings/customize-connectors';

// Friendly labels for the ten tools the server advertises.
const TOOL_LABELS = [
  'Fixtures', 'Standings', 'Top scorers', 'Live score', 'Squad',
  'News', 'Predictions', 'Match summary', 'Head-to-head', 'Player stats',
];

const TOOLS_CACHE_KEY = 'tgw_mcp_tools';
const TOOLS_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

// Ask the live server how many tools it advertises. Best-effort: on any error
// (CORS in local dev, cold start, network) we silently keep the static count.
async function fetchToolCount(signal) {
  const cached = JSON.parse(localStorage.getItem(TOOLS_CACHE_KEY) || 'null');
  if (cached && Date.now() - cached.ts < TOOLS_CACHE_TTL) return cached.count;

  const res = await fetch(MCP_URL, {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
  });
  const json = await res.json();
  const count = json?.result?.tools?.length;
  if (count) {
    localStorage.setItem(TOOLS_CACHE_KEY, JSON.stringify({ count, ts: Date.now() }));
    return count;
  }
  throw new Error('no tool count');
}

export default function McpConnect() {
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [toolCount, setToolCount] = useState(TOOL_LABELS.length);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    let cancelled = false;

    fetchToolCount(controller.signal)
      .then((n) => { if (!cancelled) { setToolCount(n); setLive(true); } })
      .catch(() => { /* keep the static fallback */ })
      .finally(() => clearTimeout(timer));

    return () => { cancelled = true; controller.abort(); clearTimeout(timer); };
  }, []);

  const copyUrl = () => {
    navigator.clipboard.writeText(MCP_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="mcp">
      <div className="mcp__head">
        <span className="mcp__badge"><FaPlug size={11} /> MCP</span>
        <h3 className="mcp__title">Use our Arsenal data in your own AI</h3>
      </div>

      <p className="mcp__lede">
        The same {toolCount} tools that power this site&rsquo;s AI assistant are exposed over the{' '}
        <strong>Model Context Protocol</strong> &mdash; the open standard for connecting AI to live data.
        Plug them into Claude (or any MCP client) and ask about fixtures, the table, scorers and more,
        in plain English.
      </p>

      <div className="mcp__tools" aria-label="Available tools">
        {TOOL_LABELS.map((t) => <span className="mcp__tool" key={t}>{t}</span>)}
      </div>

      <div className="mcp__url">
        <code>{MCP_URL}</code>
        <button type="button" className="mcp__copy" onClick={copyUrl} aria-label="Copy MCP endpoint URL">
          {copied ? <><FaCheck /> Copied</> : <><FaCopy /> Copy</>}
        </button>
      </div>
      <p className="mcp__note">Public, read-only endpoint &mdash; no sign-up, no API key.</p>

      <div className="mcp__actions">
        <button type="button" className="mcp__cta" onClick={() => setShowHelp(true)}>
          How to connect
        </button>
        <a
          className="mcp__ghost"
          href={CLAUDE_SETTINGS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Claude <FaExternalLinkAlt size={10} />
        </a>
        <span className="mcp__status">
          <span className="mcp__dot">●</span>
          {live ? `Live · ${toolCount} tools` : `${toolCount} tools`}
        </span>
      </div>

      <Modal show={showHelp} onHide={() => setShowHelp(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Connect the Arsenal tools</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mcp-help">
          <div className="mcp-help__url">
            <code>{MCP_URL}</code>
            <button type="button" onClick={copyUrl} aria-label="Copy endpoint">
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </div>

          <h6>Claude &mdash; web or Desktop</h6>
          <ol>
            <li>Open <strong>Settings</strong> and choose <strong>Connectors</strong> from the sidebar.</li>
            <li>Click <strong>Add</strong> (top-right), then <strong>Add custom connector</strong>.</li>
            <li>Paste the endpoint above, give it a name, and click <strong>Add</strong>.</li>
          </ol>
          <p>The ten tools appear under your connectors. Ask &ldquo;What&rsquo;s Arsenal&rsquo;s next match?&rdquo; and Claude calls the right one.</p>

          <h6>MCP Inspector &mdash; no Claude account needed</h6>
          <pre className="mcp-help__code">npx @modelcontextprotocol/inspector</pre>
          <p>Set Transport to <strong>Streamable HTTP</strong>, paste the endpoint, then <strong>Connect &rarr; List Tools</strong>.</p>

          <h6>Developers</h6>
          <p>
            Prefer the authenticated route or a self-hosted stdio server? The full integration
            guide is documented alongside the{' '}
            <a
              href="https://github.com/bhavikbhoir/the-gooners-world-api/tree/master/mcp-server"
              target="_blank"
              rel="noopener noreferrer"
            >
              open-source MCP server
            </a>.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowHelp(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
