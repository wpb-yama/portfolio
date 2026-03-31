"use client";

import { useEffect, useRef, useState } from "react";

type IconLine = { x1: number; y1: number; x2: number; y2: number; opacity: number };
type Icon = { key: string; label: string; group?: string; rotation?: number; lines: IconLine[] };

const ICONS: Icon[] = [
  { key:"menu",         label:"Menu",         lines:[{x1:2,y1:3,x2:12,y2:3,opacity:1},{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:2,y1:11,x2:12,y2:11,opacity:1}] },
  { key:"cross",        label:"Close",        group:"plusCross", rotation:45,  lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"plus",         label:"Plus",         group:"plusCross", rotation:0,   lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"check",        label:"Check",        lines:[{x1:2,y1:7,x2:5.5,y2:11,opacity:1},{x1:5.5,y1:11,x2:12,y2:3,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"arrowRight",   label:"Arrow",        group:"arrow", rotation:0,   lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"chevronRight", label:"Chevron",      group:"chevron", rotation:0,  lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
];

const ICON_MAP = Object.fromEntries(ICONS.map(i => [i.key, i]));
const CENTER = 7;

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

function rotatePoint(x: number, y: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  return {
    x: CENTER + (x - CENTER) * cos - (y - CENTER) * sin,
    y: CENTER + (x - CENTER) * sin + (y - CENTER) * cos,
  };
}

// ── Single morph pair card ────────────────────────────────────

interface MorphPairCardProps {
  fromKey: string;
  toKey: string;
}

function MorphPairCard({ fromKey, toKey }: MorphPairCardProps) {
  const svgRef    = useRef<SVGSVGElement>(null);
  const [label, setLabel] = useState(ICON_MAP[fromKey].label);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lineEls = Array.from(svg.querySelectorAll("line")) as SVGLineElement[];
    let currentKey = fromKey;
    let cssRot = ICON_MAP[fromKey].rotation ?? 0;
    let cancelCoord: (() => void) | null = null;
    let cancelRot: (() => void) | null = null;

    // Init
    ICON_MAP[fromKey].lines.forEach((l, i) => {
      lineEls[i].setAttribute("x1", String(l.x1));
      lineEls[i].setAttribute("y1", String(l.y1));
      lineEls[i].setAttribute("x2", String(l.x2));
      lineEls[i].setAttribute("y2", String(l.y2));
      lineEls[i].setAttribute("opacity", String(l.opacity));
    });
    if (cssRot !== 0) svg.style.transform = `rotate(${cssRot}deg)`;

    function flatten() {
      const angle = ((cssRot % 360) + 360) % 360;
      if (angle !== 0) {
        lineEls.forEach(line => {
          const p1 = rotatePoint(+line.getAttribute("x1")!, +line.getAttribute("y1")!, angle);
          const p2 = rotatePoint(+line.getAttribute("x2")!, +line.getAttribute("y2")!, angle);
          line.setAttribute("x1", p1.x.toFixed(4)); line.setAttribute("y1", p1.y.toFixed(4));
          line.setAttribute("x2", p2.x.toFixed(4)); line.setAttribute("y2", p2.y.toFixed(4));
        });
      }
      cancelRot?.(); cancelCoord?.();
      svg.style.transform = "rotate(0deg)";
      cssRot = 0;
    }

    function morph(targetKey: string) {
      const from = ICON_MAP[currentKey];
      const to   = ICON_MAP[targetKey];
      const sameGroup = !!(from.group && from.group === to.group);

      if (sameGroup) {
        let delta = (to.rotation ?? 0) - (from.rotation ?? 0);
        if (delta >  180) delta -= 360;
        if (delta < -180) delta += 360;
        const startRot = cssRot;
        cssRot += delta;
        const endRot = cssRot;
        cancelRot?.();
        cancelRot = tween(420, t => {
          svg!.style.transform = `rotate(${lerp(startRot, endRot, t)}deg)`;
        });
      } else {
        flatten();
        const fromSnap = lineEls.map(el => ({
          x1: +el.getAttribute("x1")!, y1: +el.getAttribute("y1")!,
          x2: +el.getAttribute("x2")!, y2: +el.getAttribute("y2")!,
          opacity: +el.getAttribute("opacity")!,
        }));
        cancelCoord?.();
        cancelCoord = tween(420, t => {
          to.lines.forEach((l, i) => {
            const f = fromSnap[i];
            lineEls[i].setAttribute("x1", String(lerp(f.x1, l.x1, t)));
            lineEls[i].setAttribute("y1", String(lerp(f.y1, l.y1, t)));
            lineEls[i].setAttribute("x2", String(lerp(f.x2, l.x2, t)));
            lineEls[i].setAttribute("y2", String(lerp(f.y2, l.y2, t)));
            lineEls[i].setAttribute("opacity", String(lerp(f.opacity, l.opacity, t)));
          });
        });
        if (to.group && to.rotation) {
          const endRot = to.rotation;
          cancelRot?.();
          cancelRot = tween(420, t => {
            svg!.style.transform = `rotate(${lerp(0, endRot, t)}deg)`;
          });
          cssRot = endRot;
        }
      }

      setLabel(to.label);
      currentKey = targetKey;
    }

    function handleClick() {
      morph(currentKey === fromKey ? toKey : fromKey);
    }

    const card = svg.closest(".morph-pair-card") as HTMLElement | null;
    card?.addEventListener("click", handleClick);
    return () => {
      card?.removeEventListener("click", handleClick);
      cancelCoord?.(); cancelRot?.();
    };
  }, [fromKey, toKey]);

  const from = ICON_MAP[fromKey];
  const to   = ICON_MAP[toKey];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div
      className="morph-pair-card"
      style={{
        width: 72,
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        }}
      >
        <line /><line /><line />
      </svg>
    </div>
    <p style={{ fontSize: 10, color: "#AAA", margin: "6px 0 0", textAlign: "center", letterSpacing: "0.01em" }}>
      {from.label} &rarr; {to.label}
    </p>
    </div>
  );
}

// ── Export ────────────────────────────────────────────────────

export default function CrossGroupDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
      {([
        ["menu",         "cross"      ],
        ["plus",         "check"      ],
        ["arrowRight",   "check"      ],
        ["menu",         "arrowRight" ],
        ["chevronRight", "cross"      ],
      ] as [string, string][]).map(([from, to]) => (
        <MorphPairCard key={`${from}-${to}`} fromKey={from} toKey={to} />
      ))}
    </div>
  );
}
