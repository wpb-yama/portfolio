"use client";

import { Wrench } from "lucide-react";

const row1 = [
  { label: "Node.js",   icon: "https://cdn.simpleicons.org/nodedotjs/339933",        color: "#339933" },
  { label: "React",     icon: "https://cdn.simpleicons.org/react/61DAFB",             color: "#61DAFB" },
  { label: "Kafka",     icon: "https://cdn.simpleicons.org/apachekafka/000000",       color: "#000000" },
  { label: "FIGMA",     icon: "https://cdn.simpleicons.org/figma/F24E1E",             color: "#F24E1E" },
  { label: "Atlassian", icon: "https://cdn.simpleicons.org/atlassian/0052CC",         color: "#0052CC" },
  { label: "SQL",       icon: "https://cdn.simpleicons.org/postgresql/336791",        color: "#336791" },
  { label: "AWS",       icon: "https://cdn.simpleicons.org/amazonaws/FF9900",         color: "#FF9900" },
  { label: "MongoDB",   icon: "https://cdn.simpleicons.org/mongodb/47A248",           color: "#47A248" },
  { label: "Claude",    icon: "https://cdn.simpleicons.org/claude/D97757",            color: "#D97757" },
];

const row2 = [
  { label: "OpenAI",           icon: "https://cdn.simpleicons.org/openai/10A37F",            color: "#10A37F" },
  { label: "Python",           icon: "https://cdn.simpleicons.org/python/3776AB",             color: "#3776AB" },
  { label: "Google Analytics", icon: "https://cdn.simpleicons.org/googleanalytics/E37400",   color: "#E37400" },
  { label: "Hotjar",           icon: "https://cdn.simpleicons.org/hotjar/FD3A5C",             color: "#FD3A5C" },
  { label: "Gemini",           icon: "https://cdn.simpleicons.org/googlegemini/1967D2",       color: "#1967D2" },
  { label: "Cursor",           icon: "https://cdn.simpleicons.org/cursor/000000",             color: "#000000" },
  { label: "Lovable",          icon: "https://cdn.simpleicons.org/lovable/E94D4D",            color: "#E94D4D" },
  { label: "Notion",           icon: "https://cdn.simpleicons.org/notion/000000",             color: "#000000" },
];

function Pill({ label, icon, color }: { label: string; icon: string; color: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        height: 36,
        padding: "0 14px 0 10px",
        borderRadius: 999,
        border: "1.5px solid #E0E0E0",
        background: "white",
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        width={17}
        height={17}
        style={{ width: 17, height: 17, objectFit: "contain", display: "block", flexShrink: 0 }}
        onError={(e) => {
          const img = e.currentTarget;
          img.style.display = "none";
          const fb = img.nextElementSibling as HTMLElement | null;
          if (fb) fb.style.display = "inline-flex";
        }}
      />
      {/* Fallback letter */}
      <span
        style={{
          display: "none",
          width: 17,
          height: 17,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          color,
          flexShrink: 0,
        }}
      >
        {label.charAt(0)}
      </span>

      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "#1C1C1C",
          letterSpacing: 0,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-16 bg-white">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .track-left  { animation: marquee-left  35s linear infinite; }
        .track-right { animation: marquee-right 40s linear infinite; }
      `}</style>

      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-8">
          <Wrench size={20} strokeWidth={1.8} className="text-[#1C1C1C]" />
          <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">Tech Stack</h2>
        </div>
      </div>

      {/* Row 1 — right to left */}
      <div style={{ overflow: "hidden", marginBottom: 10 }}>
        <div className="track-left" style={{ display: "flex", gap: 10, width: "max-content" }}>
          {[...row1, ...row1].map((p, i) => (
            <Pill key={i} {...p} />
          ))}
        </div>
      </div>

      {/* Row 2 — left to right */}
      <div style={{ overflow: "hidden" }}>
        <div className="track-right" style={{ display: "flex", gap: 10, width: "max-content" }}>
          {[...row2, ...row2].map((p, i) => (
            <Pill key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
