"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  label?: string;
}

export default function BracketAnnotation({ children, label = "Click me" }: Props) {
  const targetRef  = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el      = targetRef.current;
    const labelEl = labelRef.current;
    if (!el || !labelEl) return;

    let bracketAnnotation: { show: () => void; hide: () => void } | null = null;
    let labelAnnotation:   { show: () => void; hide: () => void } | null = null;

    function init() {
      const RN = (window as { RoughNotation?: { annotate: (el: Element, opts: object) => { show: () => void; hide: () => void } } }).RoughNotation;
      if (!RN || !el || !labelEl) return;

      bracketAnnotation = RN.annotate(el, {
        type: "bracket",
        brackets: ["right"],
        color: "#3B5BDB",
        strokeWidth: 1.5,
        padding: 6,
        animate: true,
        animationDuration: 500,
      });

      setTimeout(() => bracketAnnotation?.show(), 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => { bracketAnnotation?.hide(); labelAnnotation?.hide(); };
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div ref={targetRef}>
        {children}
      </div>
      <span
        ref={labelRef}
        data-variant="cursive"
        style={{
          marginLeft: 20,
          fontSize: 14,
          color: "#3B5BDB",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          userSelect: "none",
          fontFamily: "'Edu NSW ACT Foundation', cursive",
          fontStyle: "normal",
        }}
      >
        {label}
      </span>
    </div>
  );
}
