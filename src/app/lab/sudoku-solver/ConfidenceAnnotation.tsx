"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function ConfidenceAnnotation() {
  const circleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    let ann: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;
      ann = RN.annotate(el, {
        type: "circle",
        color: "#3B5BDB",
        strokeWidth: 1.5,
        padding: 4,
        animate: true,
        animationDuration: 600,
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
      The model locks in its predictions early and doesn&apos;t update them,
      even when those predictions are wrong. The same cells stay red across all
      16 iterations. There&apos;s{" "}
      <span ref={circleRef}>no self-correction mechanism</span>: the model has
      no way to detect that its own output violates Sudoku constraints.
    </p>
  );
}
