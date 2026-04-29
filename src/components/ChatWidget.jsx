import { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../api/agent';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './ChatWidget.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey Gooner! 👋 I'm the Arsenal AI Assistant. Ask me about fixtures, standings, squad, news, or match predictions!" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `tgw-${Date.now()}`);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    try {
      const { reply } = await sendMessage(msg, sessionId);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', text: `Sorry, something went wrong: ${err.message}` }]);
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
        </button>
      )}

      {open && (
        <div className="chat-panel" role="dialog" aria-label="Arsenal AI Assistant">
          <div className="chat-header">
            <span>🔴 Arsenal AI Assistant</span>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-msg chat-msg-assistant chat-typing">Thinking...</div>}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about Arsenal..."
              disabled={loading}
            />
            <button className="chat-send" onClick={handleSend} disabled={loading || !input.trim()} aria-label="Send">
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
