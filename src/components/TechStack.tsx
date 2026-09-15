"use client";

const tools = [
  {
    label: "Claude AI",
    icon: "https://cdn.simpleicons.org/claude/000000",
    description: "Spec drafting, discovery synthesis, and product decision support",
  },
  {
    label: "Jira",
    icon: "https://cdn.simpleicons.org/jira/000000",
    description: "Sprint planning, backlog management, and delivery tracking",
  },
  {
    label: "v0",
    icon: "https://cdn.simpleicons.org/v0/000000",
    description: "Fast UI exploration from structured prompts",
  },
  {
    label: "Figma",
    icon: "https://cdn.simpleicons.org/figma/000000",
    description: "Interface design, components, and prototyping",
  },
  {
    label: "NotebookLM",
    icon: "https://cdn.simpleicons.org/googlegemini/000000",
    description: "Research synthesis and interview distillation",
  },
  {
    label: "GitHub",
    icon: "https://cdn.simpleicons.org/github/000000",
    description: "Version control, PR reviews, and issue tracking",
  },
];

function ToolCard({ label, icon, description }: { label: string; icon: string; description: string }) {
  return (
    <div
      style={{
        borderRadius: 16,
        padding: "18px 20px",
        background: "#ffffff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={icon}
          alt=""
          width={28}
          height={28}
          style={{ width: 28, height: 28, objectFit: "contain", flexShrink: 0 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <span style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", letterSpacing: "-0.01em" }}>
          {label}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "#888", lineHeight: 1.55, margin: 0 }}>
        {description}
      </p>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-1">Tools</h2>
          <p className="text-sm text-[#888888]">Tools I use daily to design, prototype, and ship.</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
          className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        >
          {tools.map((tool) => (
            <ToolCard key={tool.label} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
