"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function InsightParagraph() {
  const paraRef      = useRef<HTMLParagraphElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const paraEl      = paraRef.current;
    const highlightEl = highlightRef.current;
    if (!paraEl || !highlightEl) return;

    let bracket:   Annotation | null = null;
    let highlight: Annotation | null = null;
    let label:     Annotation | null = null;

    // label element created in DOM so we can annotate it
    const labelEl = paraEl.parentElement?.querySelector(".key-insight-label") as HTMLElement | null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN) return;

      highlight = RN.annotate(highlightEl!, {
        type: "highlight",
        color: "rgba(255,214,0,0.5)",
        multiline: true,
        animate: true,
        animationDuration: 600,
        padding: 2,
      });

      bracket = RN.annotate(paraEl!, {
        type: "bracket",
        brackets: ["right"],
        color: "#3B5BDB",
        strokeWidth: 1.5,
        padding: 6,
        animate: true,
        animationDuration: 500,
      });

      setTimeout(() => {
        highlight?.show();
        setTimeout(() => bracket?.show(), 300);
      }, 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { highlight?.hide(); bracket?.hide(); };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p
        ref={paraRef}
        style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}
      >
        Every icon should use exactly{" "}
        <span ref={highlightRef}>three SVG lines</span>
        . Icons that need fewer collapse the extras to invisible points. This
        means any icon can morph into any other, since they share the same
        underlying structure.
      </p>
      <span
        className="key-insight-label"
        data-variant="cursive"
        style={{
          marginLeft: 20,
          fontSize: 14,
          color: "#3B5BDB",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          userSelect: "none",
          flexShrink: 0,
          fontFamily: "'Edu NSW ACT Foundation', cursive",
          fontStyle: "normal",
        }}
      >
        Key insight
      </span>
    </div>
  );
}
