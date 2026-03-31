"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function IntroParagraph() {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const circleRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const underlineEl = underlineRef.current;
    const circleEl    = circleRef.current;
    if (!underlineEl || !circleEl) return;

    let underline: Annotation | null = null;
    let circle:    Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN) return;

      underline = RN.annotate(underlineEl!, {
        type: "highlight",
        color: "rgba(255,214,0,0.5)",
        multiline: true,
        animate: true,
        animationDuration: 600,
        padding: 2,
      });

      circle = RN.annotate(circleEl!, {
        type: "circle",
        color: "#3B5BDB",
        strokeWidth: 1.5,
        padding: 4,
        animate: true,
        animationDuration: 600,
      });

      setTimeout(() => { underline?.show(); circle?.show(); }, 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { underline?.hide(); circle?.hide(); };
  }, []);

  return (
    <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
      Learning a new board game with friends meant{" "}
      <span ref={underlineRef}>answering the same questions over and over</span>
      . I built a <span ref={circleRef}>RAG chatbot</span> trained on the
      Splendor rulebooks so anyone at the table could get an instant, accurate
      answer, with a citation pointing to which rulebook it came from.
    </p>
  );
}
