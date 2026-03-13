"use client";
import { Mic } from "lucide-react";

const items = [
  { image: "/images/speaking_worktrips/speaking-turkey.jpg",     caption: "Speaking in Antalya, Turkey" },
  { image: "/images/speaking_worktrips/team1.jpeg",              caption: "Client trip in Rio, Brazil" },
  { image: "/images/speaking_worktrips/conference-london.jpg",   caption: "Conference in London, UK" },
  { image: "/images/speaking_worktrips/team3.jpeg",              caption: "Maracanã in Rio, Brazil" },
  { image: "/images/speaking_worktrips/research-manila.jpg",     caption: "Research team, Manila" },
  { image: "/images/speaking_worktrips/team4.jpeg",              caption: "Work trip in Antalya, Turkey" },
  { image: "/images/speaking_worktrips/conference-saopaulo.jpg", caption: "Conference in São Paulo, Brazil" },
  { image: "/images/speaking_worktrips/team2.jpeg",              caption: "Work trip in Rio, Brazil" },
];

// 15% smaller than original 320 × 220
const CARD_W  = 272;
const CARD_H  = 187;
const CARD_GAP = 16;
const STRIP_W = items.length * (CARD_W + CARD_GAP);

const MASK =
  "linear-gradient(to right, transparent 0%, transparent max(0px, calc((100% - 64rem) / 2)), black calc(max(0px, (100% - 64rem) / 2) + 1.5rem), black calc(100% - max(0px, (100% - 64rem) / 2) - 1.5rem), transparent calc(100% - max(0px, (100% - 64rem) / 2)), transparent 100%)";

export default function SpeakingResearch() {
  const doubled = [...items, ...items];

  return (
    <section className="py-16 bg-[#FFFFFF] overflow-hidden">
      <style>{`
        @keyframes scroll-speaking {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${STRIP_W}px); }
        }
      `}</style>

      {/* Header — constrained like every other section */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-2 mb-1">
          <Mic size={20} strokeWidth={1.8} className="text-[#1C1C1C]" />
          <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
            Speaking, Research &amp; Work Trips
          </h2>
        </div>
        <p className="text-sm text-[#888888] ml-7">
          Conferences, workshops, and research sessions
        </p>
      </div>

      {/* Full-width carousel with edge fades matching Testimonials */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: CARD_GAP,
            width: "max-content",
            animation: `scroll-speaking ${items.length * 9}s linear infinite`,
          }}
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              style={{
                width: CARD_W,
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
                style={{ width: "100%", height: CARD_H, objectFit: "cover", display: "block" }}
              />
              {item.caption && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px 12px 10px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                    color: "white",
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
