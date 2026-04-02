"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function AttentionAnnotation() {
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
      Layer 1, Head 1 is the most interpretable: attention concentrates on
      cells in the same row and column: exactly the structure a Sudoku solver
      needs. The model has{" "}
      <span ref={highlightRef}>
        learned the constraint geometry of the problem from data alone, with no
        rules hardcoded
      </span>
      . The representations are structured correctly. The bottleneck isn&apos;t
      that the model is looking in the wrong places: it&apos;s that it can&apos;t
      reliably use that information to satisfy all constraints at once.
    </p>
  );
}
