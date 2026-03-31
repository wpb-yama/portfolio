"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function IframeNote() {
  const noteRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = noteRef.current;
    if (!el) return;

    let bracket: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;

      bracket = RN.annotate(el, {
        type: "bracket",
        brackets: ["left", "right"],
        color: "#3B5BDB",
        strokeWidth: 1.5,
        padding: 6,
        animate: true,
        animationDuration: 500,
      });

      setTimeout(() => bracket?.show(), 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { bracket?.hide(); };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
      <span
        ref={noteRef}
        data-variant="cursive"
        style={{
          fontSize: 13,
          color: "#3B5BDB",
          fontFamily: "'Edu NSW ACT Foundation', cursive",
          fontStyle: "normal",
        }}
      >
        Slow or impersonal if limited API credits
      </span>
    </div>
  );
}
