"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Miles hitchhiked",     numeric: 3000, suffix: "",   format: "comma" as const },
  { label: "Escape rooms",          numeric: 35,   suffix: "+",  format: "plain" as const },
  { label: "Board games won",       numeric: null, suffix: "",   display: "∞" },
  { label: "Days of music · 2024",  numeric: 60,   suffix: "d+", format: "plain" as const },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatNumber(n: number, format: "comma" | "plain") {
  return format === "comma" ? n.toLocaleString("en-GB") : String(n);
}

export default function FunFacts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(stats.map(() => 0));
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1400;
    const startTime = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);
      setValues(stats.map((s) => (s.numeric !== null ? Math.round(eased * s.numeric) : 0)));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [started]);

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-8">Fun Facts</h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => {
          const fmt = stat.format ?? "plain";
          const displayVal =
            stat.numeric === null
              ? (stat.display ?? "")
              : formatNumber(values[i], fmt) + stat.suffix;

          return (
            <div key={stat.label} className="border-l border-[#E8E8E8] pl-5 py-2 pr-6">
              <p
                className="text-[2.75rem] leading-none font-light text-[#1C1C1C] mb-2 tabular-nums"
                style={{ letterSpacing: "-0.02em" }}
              >
                {displayVal}
              </p>
              <p className="text-[13px] text-[#888] leading-snug">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
