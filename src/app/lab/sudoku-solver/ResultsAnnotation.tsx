"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function ResultsAnnotation() {
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = underlineRef.current;
    if (!el) return;
    let ann: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;
      ann = RN.annotate(el, {
        type: "underline",
        color: "#F472B6",
        strokeWidth: 2,
        multiline: true,
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
      The gap tells the real story. Getting 81.5% of individual cells right
      sounds reasonable, but a single wrong cell fails the whole puzzle. The
      model is{" "}
      <span ref={underlineRef}>
        making locally informed guesses without enforcing global constraints
      </span>
      . It has learned what goes where, but not that everything must fit
      together simultaneously.
    </p>
  );
}
