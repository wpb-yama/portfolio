"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const cardRef     = useRef<HTMLDivElement>(null);
  const ghostRef    = useRef<HTMLSpanElement>(null);
  const pieceRef    = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const card    = cardRef.current;
    const ghost   = ghostRef.current;
    const piece   = pieceRef.current;
    const hint    = hintRef.current;
    const headline = headlineRef.current;
    if (!card || !ghost || !piece || !hint || !headline) return;

    /* ── Size ghost to match piece ─────────────────────── */
    function syncGhost() {
      ghost!.style.width  = piece!.offsetWidth  + "px";
      ghost!.style.height = piece!.offsetHeight + "px";
    }

    /* ── Snap coords relative to card ──────────────────── */
    function snapCoords() {
      const cRect = card!.getBoundingClientRect();
      const gRect = ghost!.getBoundingClientRect();
      return { x: gRect.left - cRect.left, y: gRect.top - cRect.top };
    }

    /* ── Initial placement ──────────────────────────────── */
    function placeInitial() {
      syncGhost();
      const sc = snapCoords();
      piece!.style.left = sc.x + 120 + "px";
      piece!.style.top  = sc.y + 85  + "px";
      hint!.style.left  = sc.x + 116 + "px";
      hint!.style.top   = sc.y + 85 + piece!.offsetHeight + 10 + "px";
    }
    const rafInit = requestAnimationFrame(placeInitial);

    /* ── Spring ─────────────────────────────────────────── */
    let rafId: number | null = null;
    let vx = 0, vy = 0;
    const K = 0.20, D = 0.74;

    function springTo(tx: number, ty: number, onDone?: () => void) {
      if (rafId) cancelAnimationFrame(rafId);
      vx = 0; vy = 0;
      let cx = parseFloat(piece!.style.left);
      let cy = parseFloat(piece!.style.top);

      function tick() {
        const dx = tx - cx, dy = ty - cy;
        vx = (vx + dx * K) * D;
        vy = (vy + dy * K) * D;
        cx += vx; cy += vy;
        piece!.style.left = cx + "px";
        piece!.style.top  = cy + "px";
        if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4 &&
            Math.abs(vx) < 0.08 && Math.abs(vy) < 0.08) {
          piece!.style.left = tx + "px";
          piece!.style.top  = ty + "px";
          onDone?.();
          return;
        }
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
    }

    /* ── On snap ────────────────────────────────────────── */
    function onSnapped() {
      ghost!.classList.add("filled");
      hint!.style.display = "none";
      piece!.style.border     = "none";
      piece!.style.background = "none";
      piece!.style.cursor     = "default";
      piece!.style.padding    = "2px 0";
      piece!.querySelectorAll(".c-dot").forEach((el) => el.remove());
      headline!.classList.add("shimmer");
      headline!.addEventListener("animationend", () => {
        headline!.classList.remove("shimmer");
      }, { once: true });
    }

    /* ── Drag ───────────────────────────────────────────── */
    let dragging = false;
    let ox = 0, oy = 0;
    let snapped = false;

    function distToSnap(px: number, py: number) {
      const sc = snapCoords();
      return Math.hypot(px - sc.x, py - sc.y);
    }

    function onPointerDown(e: PointerEvent) {
      if (snapped) return;
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      dragging = true;
      const cRect = card!.getBoundingClientRect();
      ox = e.clientX - cRect.left - parseFloat(piece!.style.left);
      oy = e.clientY - cRect.top  - parseFloat(piece!.style.top);
      piece!.setPointerCapture(e.pointerId);
      piece!.style.cursor = "grabbing";
      e.preventDefault();
    }

    function onPointerMove(e: PointerEvent) {
      if (!dragging) return;
      const cRect = card!.getBoundingClientRect();
      const nx = e.clientX - cRect.left - ox;
      const ny = e.clientY - cRect.top  - oy;
      piece!.style.left = nx + "px";
      piece!.style.top  = ny + "px";
      ghost!.classList.toggle("near", distToSnap(nx, ny) < 80);
    }

    function onPointerUp() {
      if (!dragging) return;
      dragging = false;
      piece!.style.cursor = "grab";
      ghost!.classList.remove("near");
      const px = parseFloat(piece!.style.left);
      const py = parseFloat(piece!.style.top);
      if (distToSnap(px, py) < 80) {
        snapped = true;
        const sc = snapCoords();
        springTo(sc.x, sc.y, onSnapped);
      }
    }

    piece.addEventListener("pointerdown", onPointerDown);
    piece.addEventListener("pointermove", onPointerMove);
    piece.addEventListener("pointerup", onPointerUp);

    return () => {
      cancelAnimationFrame(rafInit);
      if (rafId) cancelAnimationFrame(rafId);
      piece.removeEventListener("pointerdown", onPointerDown);
      piece.removeEventListener("pointermove", onPointerMove);
      piece.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <>
      <style>{`
        .hero-headline {
          position: relative;
          display: inline-block;
          overflow: hidden;
        }
        .hero-headline::after {
          content: '';
          position: absolute;
          top: 0; left: -120%;
          width: 60%; height: 100%;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255,255,255,0.72) 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
          pointer-events: none;
          opacity: 0;
        }
        .hero-headline.shimmer::after {
          animation: heroShimmer 0.65s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
        }
        @keyframes heroShimmer {
          0%   { left: -120%; opacity: 1; }
          100% { left:  160%; opacity: 1; }
        }
        .hero-sticker {
          transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hero-sticker:hover { transform: rotate(15deg); }
        .ghost-slot {
          display: inline-block;
          vertical-align: middle;
          border: 1.5px dashed rgba(59,91,219,0.35);
          border-radius: 8px;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .ghost-slot.near {
          border-color: rgba(59,91,219,0.82);
          box-shadow: 0 0 16px rgba(59,91,219,0.22);
        }
        .ghost-slot.filled {
          border-color: transparent !important;
          box-shadow: none !important;
        }
        .drag-piece {
          position: absolute;
          display: inline-flex;
          align-items: center;
          padding: 2px 10px;
          font-size: 38px;
          font-weight: 400;
          letter-spacing: -0.5px;
          color: #1c1c1c;
          white-space: nowrap;
          border: 1.5px solid #3b5bdb;
          border-radius: 8px;
          background: rgba(59,91,219,0.05);
          cursor: grab;
          user-select: none;
          touch-action: none;
          z-index: 10;
        }
        .c-dot {
          position: absolute;
          width: 8px; height: 8px;
          background: #fff;
          border: 1.5px solid #3b5bdb;
          border-radius: 2px;
        }
        .c-dot.tl { top: -5px; left: -5px; }
        .c-dot.tr { top: -5px; right: -5px; }
        .c-dot.bl { bottom: -5px; left: -5px; }
        .c-dot.br { bottom: -5px; right: -5px; }
        .drag-hint {
          position: absolute;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3b5bdb;
          pointer-events: none;
          animation: hintBob 1.4s ease-in-out infinite;
          white-space: nowrap;
          z-index: 11;
        }
        @keyframes hintBob {
          0%, 100% { transform: translateY(0px);  opacity: 1; }
          50%       { transform: translateY(-6px); opacity: 0.5; }
        }
      `}</style>

      <section className="flex items-center justify-center py-10">
        {/* 760×420 card */}
        <div
          ref={cardRef}
          style={{ width: 760, height: 420, position: "relative", overflow: "visible" }}
          className="flex flex-col justify-center px-16"
        >
          {/* Line 1: Name + sticker */}
          <div className="flex items-center gap-[18px] leading-none mb-0.5">
            <span
              ref={headlineRef}
              className="hero-headline"
              style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1, color: "#1c1c1c" }}
            >
              Will Booth
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sticker-will.png"
              alt=""
              draggable={false}
              className="hero-sticker"
              style={{ width: 108, height: 108, objectFit: "contain", flexShrink: 0 }}
            />
          </div>

          {/* Line 2 */}
          <div style={{ fontSize: 38, fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.15 }}>
            Leading with AI.
          </div>

          {/* Line 3: ghost slot */}
          <div style={{ fontSize: 38, fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.15 }}>
            <span ref={ghostRef} className="ghost-slot">&nbsp;</span>
          </div>

          {/* Drag piece (positioned by useEffect) */}
          <div ref={pieceRef} className="drag-piece">
            Building products people love.
            <span className="c-dot tl" />
            <span className="c-dot tr" />
            <span className="c-dot bl" />
            <span className="c-dot br" />
          </div>

          {/* Drag hint (positioned by useEffect) */}
          <div ref={hintRef} className="drag-hint">⟵ drag me</div>
        </div>
      </section>
    </>
  );
}
