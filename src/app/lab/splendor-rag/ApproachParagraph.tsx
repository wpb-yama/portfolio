"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function ApproachParagraph() {
  const circleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = circleRef.current;
    if (!el) return;

    let annotation: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;

      annotation = RN.annotate(el, {
        type: "circle",
        color: "#3B5BDB",
        strokeWidth: 1.5,
        padding: 4,
        animate: true,
        animationDuration: 600,
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
      I built a retrieval-augmented generation{" "}
      <span ref={circleRef}>(RAG) pipeline</span>
      {" "}that ingests all four rulebooks as PDFs, chunks and embeds them
      using Google Gemini 2, and stores the vectors in Pinecone. At query time,
      the user&apos;s question is embedded with the same model and matched
      against the stored vectors; the 10 most semantically similar chunks are
      retrieved and passed as context to Claude Haiku, which generates a
      grounded answer and attributes which rulebook edition it used.
    </p>
  );
}
