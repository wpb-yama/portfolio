"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Send } from "lucide-react";

type Source = { edition: string; source: string };

type Message =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string; sources?: Source[]; loading?: boolean };

const SUGGESTIONS = [
  "How does a player take gems?",
  "What are the Cities of Splendor modules?",
  "How does reserving a card work?",
  "When does the game end?",
];

function SourceTag({ edition }: { source: string; edition: string }) {
  const isBase = edition === "base";
  return (
    <span
      className="text-[11px] px-2 py-0.5 rounded-full border"
      style={
        isBase
          ? { borderColor: "#3a340e", color: "#eab308" }
          : { borderColor: "#1e2a3a", color: "#60a5fa" }
      }
    >
      {isBase ? "Base game" : edition === "cities" ? "Cities of Splendor" : edition === "silkroad" ? "Silk Road" : "The Sun Never Sets"}
    </span>
  );
}

export default function SplendorBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(question: string) {
    if (!question.trim() || loading) return;
    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: "Thinking...", loading: true },
    ]);

    try {
      const res = await fetch("/api/splendor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: data.answer ?? data.error ?? "Something went wrong.", sources: data.sources },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", text: `Error: ${err instanceof Error ? err.message : String(err)}` },
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f0f0f", color: "#e8e8e8" }}>

      {/* Header */}
      <header className="flex items-center gap-3 px-6 py-4 border-b border-[#1e1e1e] flex-shrink-0">
        <Link
          href="/lab/splendor-rag"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#555] border border-[#2a2a2a] rounded-full px-3 py-1.5 hover:border-[#555] hover:text-[#aaa] transition-all duration-150 mr-2"
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          Lab
        </Link>
        <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
        <span className="text-[15px] font-semibold text-white">Splendor Rules Assistant</span>
        <span className="text-[12px] text-[#555]">Base game + all expansions</span>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-20">
            <p className="text-[14px] text-[#444]">Ask a rules question about Splendor</p>
            <p className="text-[13px] text-[#333]">Try one of these:</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[13px] px-4 py-2 rounded-full border border-[#2a2a2a] text-[#888] hover:border-[#3a340e] hover:text-[#eab308] transition-all duration-150"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 max-w-2xl ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}
          >
            <span className="text-[11px] uppercase tracking-wide text-[#444]">
              {msg.role === "user" ? "You" : "Assistant"}
            </span>
            <div
              className="text-[14px] leading-relaxed px-4 py-3 rounded-xl whitespace-pre-wrap"
              style={
                msg.role === "user"
                  ? { background: "#1c1a0e", border: "1px solid #3a340e", color: "#fef08a" }
                  : { background: "#1a1a1a", border: "1px solid #2a2a2a", color: msg.loading ? "#555" : "#e8e8e8" }
              }
            >
              {msg.text}
            </div>
            {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {msg.sources.map((s, j) => (
                  <SourceTag key={j} {...s} />
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <footer className="px-6 py-4 border-t border-[#1e1e1e] flex-shrink-0">
        <div className="flex gap-3 max-w-2xl mx-auto">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a rules question..."
            rows={1}
            className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-[14px] text-[#e8e8e8] placeholder-[#444] px-4 py-3 resize-none outline-none focus:border-[#3a340e] transition-colors duration-150"
            style={{ height: 48, maxHeight: 160, overflowY: "auto", fontFamily: "inherit" }}
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-600 hover:bg-yellow-700 disabled:bg-[#2a2510] disabled:text-[#555] text-white transition-colors duration-150 flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
