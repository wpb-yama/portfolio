"use client";

import { useEffect, useRef, useState } from "react";

// ── Icon definitions ──────────────────────────────────────────
// viewBox 0 0 14 14, centre (7,7). Every icon uses exactly 3 <line> elements.

type IconLine = { x1: number; y1: number; x2: number; y2: number; opacity: number };
type Icon = { key: string; label: string; group?: string; rotation?: number; lines: IconLine[] };

const ICONS: Icon[] = [
  { key:"menu",         label:"Menu",     lines:[{x1:2,y1:3,x2:12,y2:3,opacity:1},{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:2,y1:11,x2:12,y2:11,opacity:1}] },
  { key:"cross",        label:"Close",    group:"plusCross", rotation:45,  lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"plus",         label:"Plus",     group:"plusCross", rotation:0,   lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"minus",        label:"Minus",    lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"equals",       label:"Equals",   lines:[{x1:2,y1:5,x2:12,y2:5,opacity:1},{x1:2,y1:9,x2:12,y2:9,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"asterisk",     label:"Asterisk", lines:[{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:2.67,y1:9.5,x2:11.33,y2:4.5,opacity:1},{x1:2.67,y1:4.5,x2:11.33,y2:9.5,opacity:1}] },
  { key:"play",         label:"Play",     lines:[{x1:4,y1:3,x2:4,y2:11,opacity:1},{x1:4,y1:3,x2:11,y2:7,opacity:1},{x1:4,y1:11,x2:11,y2:7,opacity:1}] },
  { key:"pause",        label:"Pause",    lines:[{x1:4,y1:3,x2:4,y2:11,opacity:1},{x1:10,y1:3,x2:10,y2:11,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"check",        label:"Check",    lines:[{x1:2,y1:7,x2:5.5,y2:11,opacity:1},{x1:5.5,y1:11,x2:12,y2:3,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"download",     label:"Download", lines:[{x1:4,y1:5,x2:7,y2:9,opacity:1},{x1:10,y1:5,x2:7,y2:9,opacity:1},{x1:3,y1:12,x2:11,y2:12,opacity:1}] },
  { key:"upload",       label:"Upload",   lines:[{x1:4,y1:9,x2:7,y2:5,opacity:1},{x1:10,y1:9,x2:7,y2:5,opacity:1},{x1:3,y1:12,x2:11,y2:12,opacity:1}] },
  { key:"external",     label:"External", lines:[{x1:3,y1:11,x2:11,y2:3,opacity:1},{x1:11,y1:3,x2:6,y2:3,opacity:1},{x1:11,y1:3,x2:11,y2:8,opacity:1}] },
  { key:"arrowRight",   label:"Arrow",    group:"arrow", rotation:0,   lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowDown",    label:"Arrow",    group:"arrow", rotation:90,  lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowLeft",    label:"Arrow",    group:"arrow", rotation:180, lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowUp",      label:"Arrow",    group:"arrow", rotation:270, lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"chevronRight", label:"Chevron",  group:"chevron", rotation:0,   lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronDown",  label:"Chevron",  group:"chevron", rotation:90,  lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronLeft",  label:"Chevron",  group:"chevron", rotation:180, lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronUp",    label:"Chevron",  group:"chevron", rotation:270, lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
];

const ICON_MAP = Object.fromEntries(ICONS.map(i => [i.key, i]));
const CENTER = 7;

// ── Helpers ───────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function rotatePoint(x: number, y: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad), sin = Math.sin(rad);
  return {
    x: CENTER + (x - CENTER) * cos - (y - CENTER) * sin,
    y: CENTER + (x - CENTER) * sin + (y - CENTER) * cos,
  };
}

// Runs a single RAF tween. Returns a cancel function.
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

// ── Component ─────────────────────────────────────────────────

export default function MorphingIconSolo() {
  const svgRef  = useRef<SVGSVGElement>(null);
  const [label, setLabel] = useState(ICONS[0].label);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lineEls = Array.from(svg.querySelectorAll("line")) as SVGLineElement[];
    let currentKey = ICONS[0].key;
    let cssRot = ICONS[0].rotation ?? 0;
    let soloIdx = 0;
    let cancelCoord: (() => void) | null = null;
    let cancelRot: (() => void) | null = null;

    // Initialise first icon
    ICONS[0].lines.forEach((l, i) => {
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
          svg.style.transform = `rotate(${lerp(startRot, endRot, t)}deg)`;
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
            svg.style.transform = `rotate(${lerp(0, endRot, t)}deg)`;
          });
          cssRot = endRot;
        }
      }

      setLabel(to.label);
      currentKey = targetKey;
    }

    function handleClick() {
      soloIdx = (soloIdx + 1) % ICONS.length;
      morph(ICONS[soloIdx].key);
    }

    const card = svg.closest(".morphing-card") as HTMLElement | null;
    card?.addEventListener("click", handleClick);
    return () => card?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      className="morphing-card"
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
        cursor: "pointer",
        background: "#fff",
        color: "#1C1C1C",
        userSelect: "none",
        transition: "color 0.15s, box-shadow 0.2s, border-color 0.2s",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.color = "#3B5BDB";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,91,219,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 32px rgba(59,91,219,0.12)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.color = "#1C1C1C";
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
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        style={{ display: "block", overflow: "visible", transformBox: "fill-box", transformOrigin: "center" }}
      >
        <line /><line /><line />
      </svg>
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "-0.01em", color: "inherit" }}>
        {label}
      </span>
    </div>
  );
}
