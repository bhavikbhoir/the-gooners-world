import { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessage } from '../api/agent';
import useVoice from '../hooks/useVoice';
import { FaComments, FaMicrophone, FaMinus, FaPaperPlane, FaRobot, FaStop } from 'react-icons/fa';
import './ChatWidget.css';

function formatMessage(text) {
  // Split numbered items: "1. Arsenal... 2. Man City..." (handles 1-99)
  const items = text.split(/(?=(?:^|\s)\d{1,2}\.\s)/g).map(s => s.trim()).filter(Boolean);
  
  // Only render as table if we got clean numbered items
  if (items.length >= 3 && items[0].match(/^\d{1,2}\.\s/)) {
    return (
      <div className="chat-table-wrap">
        {items.map((line, i) => (
          <div key={i} className="chat-table-row">
            {line}
          </div>
        ))}
      </div>
    );
  }

  // Render line breaks
  return text.split('\n').map((line, i) => (
    <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
  ));
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey Gooner! 👋 I'm the Arsenal AI Assistant. Ask me about fixtures, standings, squad, news, or match predictions!" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `tgw-${Date.now()}`);
  const [unread, setUnread] = useState(0);
  const msgCountRef = useRef(0);
  const MSG_LIMIT = 30; // max messages per session
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const openRef = useRef(open);
  const voice = useVoice();
  const [voiceMode, setVoiceMode] = useState(false);
  const voiceGenRef = useRef(0); // bumped on stop so a stale loop exits

  // Keep ref in sync so async callbacks see latest value
  useEffect(() => { openRef.current = open; }, [open]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  // Scroll to bottom + focus input when opening
  useEffect(() => {
    if (open) {
      setUnread(0);
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open, scrollToBottom]);

  // Returns the assistant's reply text (null if nothing was sent or it failed)
  // so the voice loop can read it aloud.
  const handleSend = async (overrideMsg, mode = 'text') => {
    const msg = (overrideMsg ?? input).trim();
    if (!msg || loading) return null;

    if (msgCountRef.current >= MSG_LIMIT) {
      setMessages((prev) => [...prev, { role: 'assistant', text: "You've reached the message limit for this session. Refresh the page to start a new chat!" }]);
      return null;
    }

    if (mode === 'text') setInput('');
    msgCountRef.current += 1;
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    try {
      const { reply } = await sendMessage(msg, sessionId, mode);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      if (!openRef.current) setUnread((n) => n + 1);
      return reply;
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, something went wrong. Please try again.' }]);
      if (!openRef.current) setUnread((n) => n + 1);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const stopVoice = useCallback(() => {
    voiceGenRef.current += 1;
    setVoiceMode(false);
    voice.stop();
  }, [voice.stop]);

  // Hands-free loop: listen → ask the agent → speak the reply → listen again,
  // until the user taps stop or goes quiet.
  const startVoice = async () => {
    voice.unlock();
    const gen = ++voiceGenRef.current;
    const active = () => voiceGenRef.current === gen;
    setVoiceMode(true);

    while (active()) {
      const { text, error } = await voice.listen();
      if (!active()) return;
      if (!text) {
        if (error === 'not-allowed' || error === 'service-not-allowed') {
          setMessages((prev) => [...prev, { role: 'assistant', text: 'I need microphone access to hear you — allow it in your browser settings and tap the mic again.' }]);
        }
        break;
      }
      const reply = await handleSend(text, 'voice');
      if (!active() || !reply) break;
      await voice.speak(reply);
    }
    if (active()) setVoiceMode(false);
  };

  // Stop talking/listening when the panel is minimised
  useEffect(() => { if (!open) stopVoice(); }, [open, stopVoice]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {!open && (
        <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Open Arsenal AI Assistant">
          <FaComments />
          {unread > 0 && <span className="chat-fab-dot" />}
        </button>
      )}

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Arsenal AI Assistant">
          <div className="chat-header">
            <div className="chat-header-left">
              <div className="chat-header-avatar"><FaRobot /></div>
              <div className="chat-header-info">
                <div className="chat-header-title">Arsenal AI Assistant</div>
                <div className="chat-header-status">
                  {voice.listening ? 'Listening...' : voice.speaking ? 'Speaking...' : loading ? 'Typing...' : 'Online'}
                </div>
              </div>
            </div>
            <button className="chat-minimize" onClick={() => setOpen(false)} aria-label="Minimize chat">
              <FaMinus />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${m.role}`}>
                {m.role === 'assistant' && <div className="chat-bubble-avatar"><FaRobot /></div>}
                <div className="chat-bubble-text">{formatMessage(m.text)}</div>
              </div>
            ))}
            {messages.length === 1 && !loading && (
              <div className="chat-chips">
                {['Next match?', 'Current standings?', 'Predict the match', 'Latest news'].map((chip) => (
                  <button key={chip} className="chat-chip" onClick={() => handleSend(chip)}>{chip}</button>
                ))}
              </div>
            )}
            {loading && (
              <div className="chat-bubble chat-bubble--assistant">
                <div className="chat-bubble-avatar"><FaRobot /></div>
                <div className="chat-bubble-text chat-typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <input
              ref={inputRef}
              className="chat-input"
              value={voiceMode ? voice.interim : input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={voice.listening ? 'Listening...' : voice.speaking ? 'Speaking...' : 'Ask about Arsenal...'}
              disabled={loading || voiceMode}
              autoComplete="off"
            />
            {voice.supported && (
              <button
                className={`chat-mic${voiceMode ? ' chat-mic--active' : ''}`}
                onClick={voiceMode ? stopVoice : startVoice}
                disabled={loading && !voiceMode}
                aria-label={voiceMode ? 'Stop voice conversation' : 'Talk to the assistant'}
                aria-pressed={voiceMode}
              >
                {voiceMode ? <FaStop /> : <FaMicrophone />}
              </button>
            )}
            <button
              className="chat-send"
              onClick={() => handleSend()}
              disabled={loading || voiceMode || !input.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>

          <div className="chat-footer">Powered by AWS</div>
        </div>
      )}
    </>
  );
}
