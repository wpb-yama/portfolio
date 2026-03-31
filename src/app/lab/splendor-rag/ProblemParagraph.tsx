"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function ProblemParagraph() {
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
      Splendor has a{" "}
      <span ref={highlightRef}>base game plus three expansions</span>
      {" "}(Silk Road, Sun Never Sets, and Cities of Splendor), each with its
      own rulebook and edge cases. Mid-game rules disputes meant someone had to
      stop playing, hunt through multiple PDFs, and read aloud to the table. It
      killed the pace of every session.
    </p>
  );
}
