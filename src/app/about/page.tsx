"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";
import SpotifyWidget from "@/components/SpotifyWidget";
import AboutCarousel from "@/components/AboutCarousel";

const phrases = [
  "Hey, I'm Will.",
  "Bonjour, je suis Will.",
  "やあ、ウィルです。",
];

const funFacts = [
  { label: "Miles hitchhiked",  value: "3,000", bg: "#EEEDFE", color: "#3C3489" },
  { label: "Escape rooms",       value: "35+",   bg: "#E1F5EE", color: "#085041" },
  { label: "Board games won",   value: "∞",     bg: "#FAECE7", color: "#712B13" },
  { label: "Countries visited", value: "40",    bg: "#E6F1FB", color: "#0C447C" },
  { label: "Music (2024)",       value: "60d+",  bg: "#FAEEDA", color: "#633806" },
];

export default function AboutPage() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visible, setVisible]         = useState(true);
  const [showSticker, setShowSticker] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center md:justify-between gap-6 md:gap-0">
          {/* Left: text */}
          <div className="flex flex-col justify-center w-full md:w-auto">
            <div
              style={{
                fontSize: 38, fontWeight: 400, letterSpacing: -0.5,
                color: "#1c1c1c", lineHeight: 1.15,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
            >
              {phrases[phraseIndex]}
            </div>
            <div
              style={{
                fontSize: 22, color: "#1c1c1c", marginTop: 10, letterSpacing: -0.3, lineHeight: 1.3,
              }}
            >
              Building AI workflows that<br />solve real product problems.
            </div>
          </div>

          {/* Right: circular profile photo */}
          <div className="flex justify-center md:block md:mr-28" style={{ flexShrink: 0, marginTop: "3rem" }}>
            <div
              onClick={() => setShowSticker(s => !s)}
              className="w-[168px] h-[168px] md:w-[200px] md:h-[200px]"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #1a1a1a",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                background: "#f0f0f0",
                cursor: "pointer",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {showSticker ? (
                <img
                  src="/sticker-will.png"
                  alt=""
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              ) : (
                <img
                  src="/images/about_carousel/will_1.jpg"
                  alt="Will Booth"
                  style={{ width: "110%", height: "110%", objectFit: "cover", objectPosition: "25% 75%", display: "block", marginLeft: "0%", marginTop: "-5%" }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── About Me ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-1">
            <User size={20} strokeWidth={1.8} className="text-[#1C1C1C]" />
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">About Me</h2>
          </div>

          <div className="mt-6">
            <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
              Product Manager specialising in iGaming, with a background in financial services — advising Ultra High Net Worth Individuals at banks and law firms before moving into tech.
            </p>
            <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
              For the past 8+ years I&apos;ve led product lifecycles across Sportsbooks, Casinos and platforms, from early-stage startups to products used by millions.
            </p>
            <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
              I specialise in using AI to personalise user journeys, building agentic systems that keep teams efficient, and shipping API-driven products built to scale. My work is focused on driving acquisition, boosting engagement and growing GGR.
            </p>
            <p className="text-[15px] text-[#555] leading-[1.8]">
              Outside of work you&apos;ll find me at a board game table, on the golf course, out hiking, or studying Japanese.
            </p>
          </div>
        </div>
      </section>

      {/* ── About carousel row 1 ───────────────────────────────────────────── */}
      <div className="pb-16">
        <AboutCarousel row={1} />
      </div>

      {/* ── Fun Facts (horizontal widget) ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: "1.25rem" }}>
          Fun facts
        </p>
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap", border: "0.5px solid #EBEBEB", borderRadius: 16, overflow: "hidden" }}>
          {funFacts.map((fact, i) => (
            <div
              key={fact.label}
              style={{
                flex: "1 1 0",
                minWidth: 120,
                padding: "1.25rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                borderLeft: i > 0 ? "0.5px solid #EBEBEB" : undefined,
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 600, color: fact.color }}>
                {fact.value}
              </span>
              <span style={{ fontSize: 13, color: "#888" }}>{fact.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── About carousel row 2 ───────────────────────────────────────────── */}
      <div className="py-16">
        <AboutCarousel row={2} />
      </div>

      {/* ── Spotify widget ─────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-4">What I&apos;m Listening To</h2>
        <div style={{ maxWidth: 340, border: "1px solid #EBEBEB", borderRadius: 20, overflow: "hidden" }}>
          <SpotifyWidget />
        </div>
      </div>

    </div>
  );
}
