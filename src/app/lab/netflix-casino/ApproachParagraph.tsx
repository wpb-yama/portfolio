"use client";

import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

export default function ApproachParagraph() {
  const highlightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = highlightRef.current;
    if (!el) return;

    let annotation: Annotation | null = null;

    function init() {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;

      annotation = RN.annotate(el, {
        type: "underline",
        color: "#F472B6",
        strokeWidth: 2,
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
      <span ref={highlightRef}>Netflix solves discovery at scale</span>
      {" "}with a small set of proven patterns: a full-bleed hero that puts the
      best content front and centre, horizontal rows that create rhythm without
      overwhelming, and subtle personalisation signals that make the experience
      feel curated. This prototype applies that same playbook to an iGaming lobby.
    </p>
  );
}
