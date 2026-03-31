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
        multiline: true,
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
      A proof-of-concept casino lobby redesign built to look and feel like
      Netflix:{" "}
      <span ref={highlightRef}>content discovery, personalisation, parallax hero</span>
      , and a playable Mines game.
    </p>
  );
}
