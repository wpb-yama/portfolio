"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function IframeWrapper() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    let bracket: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;

      bracket = RN.annotate(el, {
        type: "bracket",
        brackets: ["top"],
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
    <div style={{ width: 390, margin: "0 auto" }}>
      <p
        data-variant="cursive"
        style={{
          fontSize: 13,
          color: "#3B5BDB",
          fontFamily: "'Edu NSW ACT Foundation', cursive",
          fontStyle: "normal",
          margin: "0 0 20px 0",
          textAlign: "center",
        }}
      >
        Slow or impersonal if limited API credits
      </p>
      <div
        ref={wrapperRef}
        className="rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm"
        style={{ width: 390, height: 844 }}
      >
        <iframe
          src="/splendor-bot"
          title="Splendor Rules Assistant"
          style={{ width: "100%", height: "100%", border: "none" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}
