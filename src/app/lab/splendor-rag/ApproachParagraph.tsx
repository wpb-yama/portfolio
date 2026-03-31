"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function ApproachParagraph() {
  const geminiRef  = useRef<HTMLSpanElement>(null);
  const pineconeRef = useRef<HTMLSpanElement>(null);
  const haikuRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = [geminiRef.current, pineconeRef.current, haikuRef.current];
    if (els.some(el => !el)) return;

    let annotations: Annotation[] = [];

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN) return;

      annotations = els.map(el => RN.annotate(el!, {
        type: "underline",
        color: "#F472B6",
        strokeWidth: 2,
        animate: true,
        animationDuration: 600,
      }));

      setTimeout(() => annotations.forEach(a => a.show()), 400);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => annotations.forEach(a => a.hide());
  }, []);

  return (
    <p style={{ fontSize: 15, color: "#555", lineHeight: 1.7, margin: 0 }}>
      I built a RAG pipeline that ingests all four rulebooks as PDFs, chunks
      and embeds them using{" "}
      <span ref={geminiRef}>Google Gemini 2</span>, and stores the vectors in{" "}
      <span ref={pineconeRef}>Pinecone</span>. At query time, the user&apos;s
      question is embedded with the same model and matched against the stored
      vectors; the 10 most similar chunks are retrieved. This is passed as
      context to <span ref={haikuRef}>Claude Haiku</span>, which generates a
      grounded answer and attributes which rulebook edition it used.
    </p>
  );
}
