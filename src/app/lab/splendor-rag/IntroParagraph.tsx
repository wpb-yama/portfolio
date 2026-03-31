"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function IntroParagraph() {
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;

    let annotation: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;

      annotation = RN.annotate(el, {
        type: "highlight",
        color: "rgba(255,214,0,0.5)",
        animate: true,
        animationDuration: 600,
        padding: 2,
      });

      setTimeout(() => annotation?.show(), 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { annotation?.hide(); };
  }, []);

  return (
    <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
      <span ref={highlightRef}>Learning a new board game with friends meant answering the same questions over and over.</span>
      {" "}I built a RAG chatbot trained on the Splendor rulebooks so anyone at
      the table could get an instant, accurate answer, with a citation pointing
      to which rulebook it came from.
    </p>
  );
}
