import { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessage } from '../api/agent';
import { FaComments, FaMinus, FaPaperPlane, FaRobot } from 'react-icons/fa';
import './ChatWidget.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey Gooner! 👋 I'm the Arsenal AI Assistant. Ask me about fixtures, standings, squad, news, or match predictions!" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `tgw-${Date.now()}`);
  const [unread, setUnread] = useState(0);
  const [msgCount, setMsgCount] = useState(0);
  const MSG_LIMIT = 30; // max messages per session
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const openRef = useRef(open);

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

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    if (msgCount >= MSG_LIMIT) {
      setMessages((prev) => [...prev, { role: 'assistant', text: "You've reached the message limit for this session. Refresh the page to start a new chat!" }]);
      return;
    }

    setInput('');
    setMsgCount((n) => n + 1);
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    try {
      const { reply } = await sendMessage(msg, sessionId);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      if (!openRef.current) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, something went wrong. Please try again.' }]);
      if (!openRef.current) setUnread((n) => n + 1);
    } finally {
      setLoading(false);
    }
  };

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
                <div className="chat-header-status">{loading ? 'Typing...' : 'Online'}</div>
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
                <div className="chat-bubble-text">{m.text}</div>
              </div>
            ))}
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Arsenal..."
              disabled={loading}
              autoComplete="off"
            />
            <button
              className="chat-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <FaPaperPlane />
            </button>
          </div>

          <div className="chat-footer">Powered by AWS Bedrock Agent Core</div>
        </div>
      )}
    </>
  );
}
