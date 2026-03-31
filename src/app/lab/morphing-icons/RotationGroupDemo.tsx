"use client";

import { useEffect, useRef } from "react";

type Line = { x1: number; y1: number; x2: number; y2: number; opacity?: number };

interface RotatingCardProps {
  lines: Line[];
  steps: number[];   // rotation angles to cycle through
  label: string;
  description: string;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeInOut(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2; }

function tween(duration: number, onUpdate: (t: number) => void): () => void {
  let rafId: number;
  const start = performance.now();
  function frame(now: number) {
    const t = Math.min((now - start) / duration, 1);
    onUpdate(easeInOut(t));
    if (t < 1) rafId = requestAnimationFrame(frame);
  }
  rafId = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(rafId);
}

function RotatingCard({ lines, steps, label, description }: RotatingCardProps) {
  const svgRef   = useRef<SVGSVGElement>(null);
  const stateRef = useRef({ stepIdx: 0, currentRot: steps[0], cancel: () => {} });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Set initial rotation
    svg.style.transform = `rotate(${steps[0]}deg)`;

    const increment = steps[1] - steps[0]; // fixed step size, e.g. 90° or 45°

    function handleClick() {
      const s = stateRef.current;
      s.cancel();
      const from = s.currentRot;
      const to   = from + increment;
      s.currentRot = to;
      s.cancel = tween(380, t => {
        svg!.style.transform = `rotate(${lerp(from, to, t)}deg)`;
      });
    }

    const card = svg.closest(".rot-card") as HTMLElement | null;
    card?.addEventListener("click", handleClick);
    return () => {
      card?.removeEventListener("click", handleClick);
      stateRef.current.cancel();
    };
  }, [steps]);

  return (
    <div
      className="rot-card"
      style={{
        width: 72,
        height: 72,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        border: "1px solid #E8E8E8",
        borderRadius: 8,
        background: "#fff",
        cursor: "pointer",
        userSelect: "none",
        transition: "border-color 0.15s, box-shadow 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,91,219,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(59,91,219,0.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = "#E8E8E8";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 14 14"
        width={28}
        height={28}
        fill="none"
        stroke="#1C1C1C"
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{
          display: "block",
          overflow: "visible",
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: `rotate(${steps[0]}deg)`,
        }}
      >
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity={l.opacity ?? 1} />
        ))}
      </svg>
    </div>
  );
}

export default function RotationGroupDemo() {
  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
      <RotatingCard
        label="Arrows"
        description="90° increments"
        steps={[0, 90, 180, 270]}
        lines={[
          { x1: 2,  y1: 7,  x2: 12, y2: 7  },
          { x1: 7,  y1: 3,  x2: 12, y2: 7  },
          { x1: 7,  y1: 11, x2: 12, y2: 7  },
        ]}
      />
      <RotatingCard
        label="Chevrons"
        description="90° increments"
        steps={[0, 90, 180, 270]}
        lines={[
          { x1: 5, y1: 3,  x2: 10, y2: 7 },
          { x1: 5, y1: 11, x2: 10, y2: 7 },
          { x1: 7, y1: 7,  x2: 7,  y2: 7, opacity: 0 },
        ]}
      />
      <RotatingCard
        label="Plus / Cross"
        description="45° apart"
        steps={[0, 45]}
        lines={[
          { x1: 2, y1: 7,  x2: 12, y2: 7  },
          { x1: 7, y1: 2,  x2: 7,  y2: 12 },
          { x1: 7, y1: 7,  x2: 7,  y2: 7, opacity: 0 },
        ]}
      />
    </div>
  );
}
