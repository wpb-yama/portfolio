"use client";



const row1 = [
  { label: "Claude",    icon: "https://cdn.simpleicons.org/claude/D97757",         color: "#D97757" },
  { label: "Anthropic", icon: "https://cdn.simpleicons.org/anthropic/191919",       color: "#191919" },
  { label: "Gemini",    icon: "https://cdn.simpleicons.org/googlegemini/1967D2",    color: "#1967D2" },
  { label: "DeepSeek",  icon: "/images/deepseek-logo.png",                         color: "#4D6BFF" },
  { label: "OpenAI",    icon: "/images/openai-logo.webp",                           color: "#10A37F", iconSize: 26 },
  { label: "React",     icon: "https://cdn.simpleicons.org/react/61DAFB",           color: "#61DAFB" },
];

const row2 = [
  { label: "Cursor",           icon: "https://cdn.simpleicons.org/cursor/000000",           color: "#000000" },
  { label: "Python",           icon: "https://cdn.simpleicons.org/python/3776AB",           color: "#3776AB" },
  { label: "Google Analytics", icon: "https://cdn.simpleicons.org/googleanalytics/E37400", color: "#E37400" },
  { label: "Notion",           icon: "https://cdn.simpleicons.org/notion/000000",           color: "#000000" },
  { label: "Hotjar",           icon: "https://cdn.simpleicons.org/hotjar/FD3A5C",           color: "#FD3A5C" },
  { label: "AWS",              icon: "/images/logos/aws.svg",                               color: "#FF9900" },
  { label: "MongoDB",          icon: "https://cdn.simpleicons.org/mongodb/47A248",           color: "#47A248" },
];

function Pill({ label, icon, color, iconSize = 19 }: { label: string; icon: string; color: string; iconSize?: number }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        height: 42,
        padding: "0 16px 0 11px",
        borderRadius: 999,
        border: "1.5px solid #E0E0E0",
        background: "white",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        width={iconSize}
        height={iconSize}
        style={{ width: iconSize, height: iconSize, objectFit: "contain", display: "block", flexShrink: 0 }}
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
          width: iconSize,
          height: iconSize,
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          color,
          flexShrink: 0,
        }}
      >
        {label.charAt(0)}
      </span>

      <span
        style={{
          fontSize: 14,
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
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 mb-8">
<h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">Tech Stack</h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {row1.map((p) => (
              <Pill key={p.label} {...p} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {row2.map((p) => (
              <Pill key={p.label} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
