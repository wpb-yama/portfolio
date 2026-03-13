"use client";

import { useRef, useEffect } from "react";

const row1 = [
  { image: "/images/about_carousel/hotairballoon.jpg",   caption: "", position: "center center" },
  { image: "/images/about_carousel/bali.jpg",            caption: "", position: "center center" },
  { image: "/images/about_carousel/firstfujivisit.JPEG", caption: "", position: "center center" },
  { image: "/images/about_carousel/paris.jpg",           caption: "", position: "center 80%"    },
  { image: "/images/about_carousel/will_1.jpg",          caption: "", position: "center 75%"    },
];

const row2 = [
  { image: "/images/about_carousel/jpn.jpg",             caption: "", position: "center center" },
  { image: "/images/about_carousel/bali2.jpg",           caption: "", position: "center center" },
  { image: "/images/about_carousel/arg.jpg",             caption: "", position: "center center" },
  { image: "/images/about_carousel/will_2.jpg",          caption: "", position: "center center" },
];

const CARD_W   = 272;
const CARD_H   = 187;
const CARD_GAP = 16;

const LOOP_MS = { left: 64_000, right: 72_000 };

const MASK =
  "linear-gradient(to right, transparent 0%, transparent max(0px, calc((100% - 64rem) / 2)), black calc(max(0px, (100% - 64rem) / 2) + 1.5rem), black calc(100% - max(0px, (100% - 64rem) / 2) - 1.5rem), transparent calc(100% - max(0px, (100% - 64rem) / 2)), transparent 100%)";

type Direction = "left" | "right";
type Item = { image: string; caption: string; position?: string };

function PhotoRow({ items, direction }: { items: Item[]; direction: Direction }) {
  const doubled   = [...items, ...items, ...items, ...items, ...items, ...items];
  const trackRef  = useRef<HTMLDivElement>(null);
  const posRef    = useRef(0);
  const lastRef   = useRef<number | null>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const totalWidth = items.length * (CARD_W + CARD_GAP);

    function tick(ts: number) {
      if (lastRef.current === null) lastRef.current = ts;
      const delta = ts - lastRef.current;
      lastRef.current = ts;

      posRef.current = (posRef.current + delta / LOOP_MS[direction]) % 1;

      const tx =
        direction === "left"
          ? -posRef.current * totalWidth
          : -(1 - posRef.current) * totalWidth;

      if (el) el.style.transform = `translateX(${tx}px)`;;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, items]);

  return (
    <div className="overflow-visible w-full py-2">
      <div ref={trackRef} className="flex w-max" style={{ gap: CARD_GAP }}>
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              width: CARD_W,
              height: CARD_H,
              flexShrink: 0,
              borderRadius: 14,
              overflow: "hidden",
              position: "relative",
              border: "1px solid #EBEBEB",
              boxSizing: "border-box",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.caption}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: item.position ?? "center center", display: "block" }}
            />
            {item.caption && (
              <div
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "24px 12px 10px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                  color: "white", fontSize: 11, fontWeight: 500,
                }}
              >
                {item.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutCarousel({ row }: { row?: 1 | 2 }) {
  return (
    <div
      className="relative flex flex-col gap-4 overflow-hidden"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      {(!row || row === 1) && <PhotoRow items={row1} direction="left" />}
      {(!row || row === 2) && <PhotoRow items={row2} direction="right" />}
    </div>
  );
}
