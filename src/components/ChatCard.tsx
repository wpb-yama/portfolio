'use client';

import { useState, useRef, useEffect } from 'react';
import { getReply } from '@/lib/getReply';

type Message = { role: 'user' | 'bot'; text: string };

const GREETING =
  "Hey! I'm Will. Ask me anything about my work, projects, or background 👋";

/* ── Chat bubble icon (top-right badge) ─────────────────── */
const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

/* ── Send arrow icon ─────────────────────────────────────── */
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export default function ChatCard() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll to bottom on each new message or typing indicator */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function send() {
    const text = input.trim();
    if (!text) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setTyping(true);

    setTimeout(() => {
      const reply = getReply(text);
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: reply }]);
    }, 800);
  }

  return (
    <>
      <style>{`
        .chat-card {
          display: flex;
          flex-direction: column;
          height: 420px;
          padding: 0;
          overflow: hidden;
        }

        /* ── Header ── */
        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px 12px;
          border-bottom: 1px solid #f0ede8;
          flex-shrink: 0;
          transition: border-color 0.3s ease;
        }

        .chat-header-label {
          font-size: 13px;
          font-weight: 500;
          color: #888;
          letter-spacing: 0.02em;
        }

        .chat-header-badge {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #1A73E8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── Messages ── */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          scrollbar-width: none;
        }

        .chat-messages::-webkit-scrollbar { display: none; }

        /* ── Bubbles ── */
        .bubble {
          max-width: 80%;
          padding: 10px 14px;
          font-size: 14px;
          line-height: 1.5;
          word-break: break-word;
        }

        .bubble.bot {
          background: #E8F0FE;
          color: #1a1a1a;
          border-radius: 18px 18px 18px 4px;
          align-self: flex-start;
        }

        .bubble.user {
          background: #1A73E8;
          color: #ffffff;
          border-radius: 18px 18px 4px 18px;
          align-self: flex-end;
        }

        /* ── Typing indicator ── */
        .bubble.typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 13px 16px;
        }

        .bubble.typing span {
          width: 7px;
          height: 7px;
          background: #999;
          border-radius: 50%;
          animation: chatBounce 1.2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .bubble.typing span:nth-child(2) { animation-delay: 0.2s; }
        .bubble.typing span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes chatBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-6px); }
        }

        /* ── Input bar ── */
        .chat-input-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-top: 1px solid #f0ede8;
          flex-shrink: 0;
        }

        .chat-input-bar input {
          flex: 1;
          background: #f4f4f4;
          border: none;
          border-radius: 24px;
          padding: 10px 16px;
          font-size: 14px;
          color: #1a1a1a;
          outline: none;
          font-family: inherit;
          min-width: 0;
        }

        .chat-input-bar input::placeholder { color: #aaa; }

        .chat-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1A73E8;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .chat-send-btn:hover { background: #1557b0; transform: scale(1.08); }

        @media (prefers-reduced-motion: reduce) {
          .bubble.typing span { animation: none; }
        }
      `}</style>

      <div className="about-card chat-card">
        {/* Header */}
        <div className="chat-header">
          <span className="chat-header-label">Ask me anything</span>
          <div className="chat-header-badge" aria-hidden="true">
            <ChatIcon />
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.role}`}>
              {m.text}
            </div>
          ))}

          {typing && (
            <div className="bubble bot typing" aria-label="Will is typing">
              <span /><span /><span />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="chat-input-bar">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Message"
            aria-label="Type a message"
            autoComplete="off"
          />
          {input.trim() && (
            <button
              className="chat-send-btn"
              onClick={send}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
