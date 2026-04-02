"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function IntroAnnotation() {
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;
    let ann: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;
      ann = RN.annotate(el, {
        type: "highlight",
        color: "rgba(255,214,0,0.5)",
        multiline: true,
        animate: true,
        animationDuration: 600,
        padding: 2,
      });
      setTimeout(() => ann?.show(), 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { ann?.hide(); };
  }, []);

  return (
    <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
      Can a small transformer learn to solve Sudoku puzzles by running the same
      weights over and over,{" "}
      <span ref={highlightRef}>using iteration as a form of reasoning</span>?
      This project builds and trains a looped transformer from scratch to find out.
    </p>
  );
}
