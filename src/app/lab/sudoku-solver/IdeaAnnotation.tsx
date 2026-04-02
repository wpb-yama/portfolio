"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function IdeaAnnotation() {
  const highlightRef = useRef<HTMLSpanElement>(null);
  const cotRef       = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = [highlightRef.current, cotRef.current];
    if (els.some(el => !el)) return;
    const anns: Annotation[] = [];

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN) return;
      const configs = [
        { ref: highlightRef, type: "highlight", color: "rgba(255,214,0,0.5)", multiline: true, padding: 2 },
        { ref: cotRef,       type: "highlight", color: "rgba(255,214,0,0.5)", multiline: true, padding: 2 },
      ];
      configs.forEach(({ ref, ...opts }, i) => {
        if (!ref.current) return;
        const a = RN.annotate(ref.current, { animate: true, animationDuration: 600, ...opts });
        setTimeout(() => a.show(), 400 + i * 200);
        anns.push(a);
      });
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => anns.forEach(a => a.hide());
  }, []);

  return (
    <>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
        Most transformers are deep stacks: many layers, each with their own
        weights, processed once. A looped transformer does something different.
        It takes a small block of layers and calls them repeatedly in a loop:{" "}
        <span ref={highlightRef}>the same weights, over and over</span>, each
        pass a chance to refine the answer.
      </p>
      <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: "16px 0 0 0" }}>
        The intuition is that solving a constraint puzzle like Sudoku isn&apos;t
        a single forward pass problem. It requires propagating information,
        resolving contradictions, and progressively filling in what&apos;s
        certain before tackling what isn&apos;t. A loop lets the model think in
        steps without paying the parameter cost of a deep network. The
        architecture sits in the same family of ideas as recurrent networks
        and{" "}
        <span ref={cotRef}>chain-of-thought prompting</span>.
      </p>
    </>
  );
}
