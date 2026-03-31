"use client";

import { useEffect, useRef, useState } from "react";

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
  { key:"arrowRight",   label:"Arrow →",  group:"arrow", rotation:0,   lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowDown",    label:"Arrow ↓",  group:"arrow", rotation:90,  lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowLeft",    label:"Arrow ←",  group:"arrow", rotation:180, lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowUp",      label:"Arrow ↑",  group:"arrow", rotation:270, lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"chevronRight", label:"Chevron →",group:"chevron", rotation:0,   lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronDown",  label:"Chevron ↓",group:"chevron", rotation:90,  lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronLeft",  label:"Chevron ←",group:"chevron", rotation:180, lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronUp",    label:"Chevron ↑",group:"chevron", rotation:270, lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
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

function StaticIcon({ icon, size }: { icon: Icon; size: number }) {
  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="none"
      stroke="currentColor" strokeWidth={1.5} strokeLinecap="round"
      style={{ display:"block", overflow:"visible", transformBox:"fill-box", transformOrigin:"center",
               transform: icon.rotation ? `rotate(${icon.rotation}deg)` : undefined }}>
      {icon.lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} opacity={l.opacity} />
      ))}
    </svg>
  );
}

export default function SequenceBuilder() {
  const [seq, setSeq]           = useState<string[]>([]);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [playerLabel, setPlayerLabel] = useState("");
  const [playing, setPlaying]   = useState(false);

  const svgRef     = useRef<SVGSVGElement>(null);
  const seqRef     = useRef<string[]>([]);
  const playingRef = useRef(false);

  // All animation state lives here -- never in React state
  const anim = useRef({
    currentKey: null as string | null,
    cssRot: 0,
    cancelCoord: () => {},
    cancelRot:   () => {},
  });

  useEffect(() => { seqRef.current = seq; }, [seq]);

  // ── Initialise SVG lines to collapsed/invisible on mount ──
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const lines = Array.from(svg.querySelectorAll("line")) as SVGLineElement[];
    lines.forEach(l => {
      l.setAttribute("x1","7"); l.setAttribute("y1","7");
      l.setAttribute("x2","7"); l.setAttribute("y2","7");
      l.setAttribute("opacity","0");
    });
  }, []);

  // ── Set lines directly (no animation) ────────────────────
  function initIcon(key: string) {
    const svg = svgRef.current;
    if (!svg) return;
    const icon = ICON_MAP[key];
    const lines = Array.from(svg.querySelectorAll("line")) as SVGLineElement[];
    icon.lines.forEach((l, i) => {
      lines[i].setAttribute("x1", String(l.x1));
      lines[i].setAttribute("y1", String(l.y1));
      lines[i].setAttribute("x2", String(l.x2));
      lines[i].setAttribute("y2", String(l.y2));
      lines[i].setAttribute("opacity", String(l.opacity));
    });
    const rot = icon.rotation ?? 0;
    svg.style.transform = rot ? `rotate(${rot}deg)` : "";
    anim.current.cssRot = rot;
    anim.current.currentKey = key;
  }

  // ── Animated morph ────────────────────────────────────────
  function morph(targetKey: string) {
    const svg = svgRef.current;
    if (!svg) return;
    const s = anim.current;

    // First icon -- set directly, no animation
    if (!s.currentKey) {
      initIcon(targetKey);
      setPlayerLabel(ICON_MAP[targetKey].label);
      return;
    }

    const lineEls = Array.from(svg.querySelectorAll("line")) as SVGLineElement[];
    const from = ICON_MAP[s.currentKey];
    const to   = ICON_MAP[targetKey];
    const sameGroup = !!(from.group && from.group === to.group);

    if (sameGroup) {
      let delta = (to.rotation ?? 0) - (from.rotation ?? 0);
      if (delta >  180) delta -= 360;
      if (delta < -180) delta += 360;
      const startRot = s.cssRot;
      s.cssRot += delta;
      const endRot = s.cssRot;
      s.cancelRot();
      s.cancelRot = tween(420, t => {
        svg.style.transform = `rotate(${lerp(startRot, endRot, t)}deg)`;
      });
    } else {
      // Flatten accumulated CSS rotation into line attributes
      const angle = ((s.cssRot % 360) + 360) % 360;
      if (angle !== 0) {
        lineEls.forEach(line => {
          const p1 = rotatePoint(+line.getAttribute("x1")!, +line.getAttribute("y1")!, angle);
          const p2 = rotatePoint(+line.getAttribute("x2")!, +line.getAttribute("y2")!, angle);
          line.setAttribute("x1", p1.x.toFixed(4)); line.setAttribute("y1", p1.y.toFixed(4));
          line.setAttribute("x2", p2.x.toFixed(4)); line.setAttribute("y2", p2.y.toFixed(4));
        });
      }
      s.cancelRot(); s.cancelCoord();
      svg.style.transform = "rotate(0deg)";
      s.cssRot = 0;

      const fromSnap = lineEls.map(el => ({
        x1: +el.getAttribute("x1")!, y1: +el.getAttribute("y1")!,
        x2: +el.getAttribute("x2")!, y2: +el.getAttribute("y2")!,
        opacity: +el.getAttribute("opacity")!,
      }));

      s.cancelCoord = tween(420, t => {
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
        s.cancelRot = tween(420, t => {
          svg.style.transform = `rotate(${lerp(0, endRot, t)}deg)`;
        });
        s.cssRot = endRot;
      }
    }

    setPlayerLabel(to.label);
    s.currentKey = targetKey;
  }

  // ── Add icon to sequence ──────────────────────────────────
  function addIcon(key: string) {
    setSeq(prev => {
      const next = [...prev, key];
      if (next.length === 1) {
        // First icon: set directly
        initIcon(key);
        setPlayerLabel(ICON_MAP[key].label);
      }
      return next;
    });
  }

  // ── Clear ─────────────────────────────────────────────────
  function clear() {
    const svg = svgRef.current;
    const s = anim.current;
    s.cancelCoord(); s.cancelRot();
    s.currentKey = null; s.cssRot = 0;
    playingRef.current = false;
    setPlaying(false);
    setSeq([]);
    setActiveIdx(null);
    setPlayerLabel("");
    if (svg) {
      svg.style.transform = "";
      const lines = Array.from(svg.querySelectorAll("line")) as SVGLineElement[];
      lines.forEach(l => {
        l.setAttribute("x1","7"); l.setAttribute("y1","7");
        l.setAttribute("x2","7"); l.setAttribute("y2","7");
        l.setAttribute("opacity","0");
      });
    }
  }

  // ── Play sequence ─────────────────────────────────────────
  function play() {
    const currentSeq = seqRef.current;
    if (playingRef.current || currentSeq.length < 2) return;
    playingRef.current = true;
    setPlaying(true);
    morph(currentSeq[0]);
    setActiveIdx(0);
    let step = 0;
    function advance() {
      step++;
      if (step >= currentSeq.length) {
        playingRef.current = false;
        setPlaying(false);
        setTimeout(() => setActiveIdx(null), 600);
        return;
      }
      morph(currentSeq[step]);
      setActiveIdx(step);
      setTimeout(advance, 1200);
    }
    setTimeout(advance, 900);
  }

  const isEmpty = seq.length === 0;
  const canPlay = seq.length >= 2 && !playing;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

      {/* Player + strip */}
      <div style={{ display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap" }}>

        {/* Player box -- always rendered so SVG ref is stable */}
        <div
          onClick={() => canPlay && play()}
          style={{
            width:72, height:72, flexShrink:0,
            borderRadius:8, display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center", gap:10,
            cursor: canPlay ? "pointer" : "default",
            transition:"border-color 0.15s, box-shadow 0.2s",
            ...(isEmpty
              ? { border:"2px dashed #CCC",
                  background:"repeating-conic-gradient(#F4F4F4 0% 25%, #FAFAFA 0% 50%) 0 0 / 14px 14px" }
              : { border:"1px solid #E8E8E8", background:"#fff" }),
          }}
          onMouseEnter={e => { if (canPlay) { (e.currentTarget as HTMLElement).style.borderColor="rgba(59,91,219,0.3)"; (e.currentTarget as HTMLElement).style.boxShadow="0 4px 20px rgba(59,91,219,0.1)"; }}}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=isEmpty?"#CCC":"#E8E8E8"; (e.currentTarget as HTMLElement).style.boxShadow="none"; }}
        >
          <svg ref={svgRef} viewBox="0 0 14 14" width={28} height={28}
            fill="none" stroke="#1C1C1C" strokeWidth={1.5} strokeLinecap="round"
            style={{ display:"block", overflow:"visible", transformBox:"fill-box", transformOrigin:"center",
                     visibility: isEmpty ? "hidden" : "visible" }}>
            <line /><line /><line />
          </svg>
          {!isEmpty && (
            <span style={{ fontSize:10, fontWeight:600, color:"#1C1C1C", letterSpacing:"-0.01em" }}>
              {playerLabel}
            </span>
          )}
        </div>

        {/* Strip + hint */}
        <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", gap:10 }}>
          {seq.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {seq.map((key, idx) => (
                <div key={idx} style={{
                  width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center",
                  borderRadius:8, border:"1px solid", flexShrink:0,
                  borderColor: activeIdx === idx ? "#3B5BDB" : "#E8E8E8",
                  background:  activeIdx === idx ? "rgba(59,91,219,0.07)" : "#fff",
                  color:       activeIdx === idx ? "#3B5BDB" : "#1C1C1C",
                  transition:"border-color 0.15s, background 0.15s, color 0.15s",
                }}>
                  <StaticIcon icon={ICON_MAP[key]} size={16} />
                </div>
              ))}
            </div>
          )}
          <p style={{ fontSize:13, color:"#AAA", margin:0 }}>
            {seq.length === 0
              ? "Select icons below to build a sequence"
              : seq.length === 1
              ? "Add more icons, then click the preview to play"
              : `${seq.length} icons -- click the preview to play`}
          </p>
          {seq.length > 0 && (
            <button onClick={clear} style={{
              alignSelf:"flex-start", fontSize:12, color:"#AAA",
              background:"none", border:"none", cursor:"pointer",
              padding:0, textDecoration:"underline",
            }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Picker */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(10, 1fr)", gap:6 }}>
        {ICONS.map(icon => (
          <button key={icon.key} onClick={() => addIcon(icon.key)} style={{
            height:36, display:"flex", alignItems:"center", justifyContent:"center",
            border:"1px solid #E8E8E8", borderRadius:8, background:"#fff",
            color:"#1C1C1C", cursor:"pointer", padding:0,
            transition:"border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(59,91,219,0.3)"; (e.currentTarget as HTMLElement).style.color="#3B5BDB"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#E8E8E8"; (e.currentTarget as HTMLElement).style.color="#1C1C1C"; }}
          >
            <StaticIcon icon={icon} size={18} />
          </button>
        ))}
      </div>

    </div>
  );
}
