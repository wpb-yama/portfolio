


"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

const funFacts = [
  { label: "Miles hitchhiked",  value: "3,000", bg: "#EEEDFE", color: "#3C3489", emoji: "🛣️" },
  { label: "Escape rooms",       value: "35+",   bg: "#E1F5EE", color: "#085041", emoji: "🔐" },
  { label: "Board games won",   value: "∞",     bg: "#FAECE7", color: "#712B13", emoji: "🎲" },
  { label: "Countries visited", value: "40",    bg: "#E6F1FB", color: "#0C447C", emoji: "🌍" },
  { label: "Music (2024)",       value: "60d+",  bg: "#FAEEDA", color: "#633806", emoji: "🎧" },
];


export default function AboutPage() {
  const highlightRef  = useRef<HTMLSpanElement>(null);
  const highlight2Ref = useRef<HTMLSpanElement>(null);
  const highlight3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el1 = highlightRef.current;
    const el2 = highlight2Ref.current;
    const el3 = highlight3Ref.current;
    if (!el1 || !el2 || !el3) return;
    let a1: Annotation | null = null;
    let a2: Annotation | null = null;
    let a3: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN) return;
      const opts = {
        type: "highlight",
        color: "rgba(255,214,0,0.45)",
        multiline: true,
        animate: true,
        animationDuration: 600,
        padding: 2,
      };
      a1 = RN.annotate(el1!, opts);
      a2 = RN.annotate(el2!, opts);
      a3 = RN.annotate(el3!, opts);
      setTimeout(() => { a1?.show(); a2?.show(); a3?.show(); }, 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { a1?.hide(); a2?.hide(); a3?.hide(); };
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ paddingTop: 64 }}>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
                Background &amp; Experience
              </p>
              <h1 className="text-3xl md:text-5xl text-[#1C1C1C]">About</h1>
            </div>
          </div>
          <div className="h-[2px] bg-[#1C1C1C] w-full mb-8" />
        </div>
      </div>

      {/* ── Experience ────────────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "0rem 0" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">Experience</h2>
          </div>

          <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
            Based in England, I have 8+ years of experience building and scaling digital products in iGaming, <span ref={highlightRef}>from early‑stage start‑ups to software used by millions</span>.
          </p>

          <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
            Currently, I&apos;m a Senior Product Manager at WA Technology where I&apos;m working with <span ref={highlight3Ref}>Sportsbooks and Casinos</span>. Before this, I worked at Metric Gaming, as a Senior Quantitative Trader, building AI driven pricing models for their trading team. Earlier roles include providing financial advice to high net worth individuals at law firms and banks.
          </p>

          <p className="text-[15px] text-[#555] leading-[1.8] mb-4">
            I specialise in using <span ref={highlight2Ref}>AI to personalise user journeys, building agentic systems that keep teams efficient, and shipping API-driven products</span> built to scale. My work is focused on driving acquisition, boosting engagement and growing GGR. Recent focus areas include:
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
            {[
              { label: "iGaming", text: "Casino, Sportsbook, Free-to-play, trading systems and player engagement." },
              { label: "AI & personalisation", text: "Agentic workflows, recommendation engines and LLM integration into core product." },
              { label: "Delivery & strategy", text: "Roadmap ownership, API delivery across Sportsbook and Casino platforms and data-informed iteration." },
            ].map(({ label, text }) => (
              <li key={label} className="text-[15px] text-[#555] leading-[1.8]" style={{ paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#888" }}>•</span>
                <span style={{ fontWeight: 600, color: "#1c1c1c" }}>{label}:</span> {text}
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* ── Fun Facts ──────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-6">Fun Facts</h2>
        <p className="text-[15px] text-[#555] leading-[1.8] mb-6">
          Outside of work you&apos;ll find me at a board game table, on the golf course, out hiking, or studying Japanese.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {funFacts.map((fact) => (
            <div
              key={fact.label}
              style={{
                background: fact.bg,
                borderRadius: 16,
                padding: "1.25rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span style={{ fontSize: 28 }}>{fact.emoji}</span>
              <span style={{ fontSize: 28, fontWeight: 700, color: fact.color, lineHeight: 1 }}>
                {fact.value}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: fact.color, opacity: 0.75 }}>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>



    </div>
  );
}
