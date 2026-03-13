"use client";

import { useState, useEffect } from "react";

type Phase = "idle" | "loading" | "typing" | "done";

export default function TLDRWidget({ bullets }: { bullets: string[] }) {
  if (!bullets?.length) return null;

  const [phase, setPhase]           = useState<Phase>("idle");
  const [typedBullets, setTyped]    = useState<string[]>([]);
  const [currentText, setCurrent]   = useState("");
  const [bulletIdx, setBulletIdx]   = useState(0);
  const [barActive, setBarActive]   = useState(false);

  // ── Kick off the sequence ──────────────────────────────────────────────────
  function generate() {
    setPhase("loading");
    setTyped([]);
    setCurrent("");
    setBulletIdx(0);
    setBarActive(false);
    // tiny delay so React flushes before we start the bar transition
    requestAnimationFrame(() => setBarActive(true));
    setTimeout(() => setPhase("typing"), 1500);
  }

  // ── Typewriter ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "typing") return;

    if (bulletIdx >= bullets.length) {
      setPhase("done");
      return;
    }

    const full = bullets[bulletIdx];
    let i = 0;
    setCurrent("");

    const tick = setInterval(() => {
      i++;
      setCurrent(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(tick);
        setTimeout(() => {
          setTyped((prev) => [...prev, full]);
          setCurrent("");
          setBulletIdx((prev) => prev + 1);
        }, 180);
      }
    }, 16);

    return () => clearInterval(tick);
  }, [phase, bulletIdx, bullets]);

  // ── Dot style ──────────────────────────────────────────────────────────────
  const dotCls =
    phase === "idle"
      ? "bg-[#BBBBBB]"
      : phase === "done"
      ? "bg-[#1C1C1C]"
      : "bg-[#1C1C1C] animate-pulse";

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] shadow-sm overflow-hidden mb-8">

      {/* ── Top accent bar ─────────────────────────────────────────────────── */}
      <div
        className="h-[2px] bg-[#1C1C1C]"
        style={{
          width: barActive ? "100%" : "0%",
          transition: barActive ? "width 1.6s ease" : "none",
        }}
      />

      <div style={{ padding: "14px 18px" }}>

        {/* ── Header row ───────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 block ${dotCls}`} />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#888888] flex-shrink-0">
              AI Summary
            </span>
            <span className="w-px h-3 bg-[#E5E5E5] flex-shrink-0" />
            <span className="text-[10px] text-[#BBBBBB] flex-shrink-0">
              ✦ Powered by Claude
            </span>
          </div>

          {phase === "idle" && (
            <button
              onClick={generate}
              className="flex-shrink-0 bg-[#1C1C1C] text-white text-[11px] rounded-full px-3 py-1.5
                         hover:bg-neutral-700 transition-colors duration-150 whitespace-nowrap"
            >
              ✦ Generate TL;DR
            </button>
          )}
        </div>

        {/* ── Expandable body ──────────────────────────────────────────────── */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: phase === "idle" ? 0 : 500 }}
        >
          <div className="mt-4">

            {/* Skeleton */}
            {phase === "loading" && (
              <ul className="flex flex-col gap-3">
                {bullets.map((_, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-[18px] h-[18px] flex-shrink-0 rounded-md bg-[#F0F0F0] animate-pulse" />
                    <div className="flex-1 flex flex-col gap-1.5 pt-0.5">
                      <div
                        className="h-2.5 rounded-full bg-[#F0F0F0] animate-pulse"
                        style={{ width: `${65 + (i * 9) % 28}%` }}
                      />
                      <div
                        className="h-2.5 rounded-full bg-[#F0F0F0] animate-pulse"
                        style={{ width: `${38 + (i * 13) % 25}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Typed bullets */}
            {(phase === "typing" || phase === "done") && (
              <ul className="flex flex-col gap-3">
                {/* Completed */}
                {typedBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 animate-fade-in">
                    <span className="w-[18px] h-[18px] flex-shrink-0 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] text-[#888888]">
                      ✦
                    </span>
                    <p className="text-[13px] text-[#2C2C2C] leading-relaxed">{bullet}</p>
                  </li>
                ))}

                {/* Currently typing */}
                {phase === "typing" && bulletIdx < bullets.length && (
                  <li className="flex items-start gap-3">
                    <span className="w-[18px] h-[18px] flex-shrink-0 rounded-md bg-[#F5F5F5] flex items-center justify-center text-[10px] text-[#888888]">
                      ✦
                    </span>
                    <p className="text-[13px] text-[#2C2C2C] leading-relaxed">
                      {currentText}
                      <span className="inline-block w-[1.5px] h-[13px] bg-[#1C1C1C] ml-[1px] translate-y-[1px] animate-blink" />
                    </p>
                  </li>
                )}
              </ul>
            )}

            {/* Footer */}
            {phase === "done" && (
              <div className="animate-fade-in mt-4 pt-3 border-t border-[#F0F0F0] flex justify-between items-center">
                <span className="text-[10px] text-[#CCCCCC]">
                  Generated based on project content
                </span>
                <button
                  onClick={generate}
                  className="text-[10px] text-[#888888] border border-[#E5E5E5] rounded-full px-2.5 py-1
                             hover:text-[#1C1C1C] hover:border-[#1C1C1C] transition-colors duration-150"
                >
                  ↺ Regenerate
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
