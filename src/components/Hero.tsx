"use client";
import { useEffect, useState } from "react";

import { buildLabel } from "@/lib/greeting";

export default function Hero() {
  const [showSticker, setShowSticker] = useState(false);
  const [label, setLabel] = useState<{ text: string; time: string; city: string } | null>(null);

  useEffect(() => {
    setLabel(buildLabel());
    const id = setInterval(() => setLabel(buildLabel()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="flex items-center py-0">
      <div className="flex flex-col justify-center max-w-5xl mx-auto w-full px-6 py-10 md:py-16">
        <div className="flex flex-col" style={{ gap: 6 }}>
          {/* Circle */}
          <div
            onClick={() => setShowSticker(s => !s)}
            className="w-[110px] h-[110px] md:w-[200px] md:h-[200px]"
            style={{
              flexShrink: 0,
              borderRadius: "50%", overflow: "hidden",
              border: "3px solid #1a1a1a",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              background: "#f0f0f0", cursor: "pointer",
              marginBottom: 24,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {showSticker ? (
              <img src="/sticker-will.png" alt="" draggable={false}
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            ) : (
              <img src="/images/about_carousel/will2.jpg" alt="Will Booth"
                style={{ width: "120%", height: "120%", objectFit: "cover", objectPosition: "20% 65%", display: "block", marginLeft: "0%", marginTop: "-10%" }} />
            )}
          </div>

          <span className="text-[36px] md:text-[44px]" style={{ fontWeight: 700, letterSpacing: -1, color: "#1c1c1c", lineHeight: 1 }}>
            Will Booth
          </span>
          <div style={{ fontSize: 14, fontWeight: 400, letterSpacing: 0.1, color: "#aaa", lineHeight: 1.15 }}>
            Senior Product Manager
          </div>
          <div className="text-[24px] md:text-[32px]" style={{ fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.15, marginTop: 24 }}>
            Leading with AI.
          </div>
          <div className="text-[24px] md:text-[32px]" style={{ fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.15 }}>
            Building products people love.
          </div>
          {label && (
            <div style={{ marginTop: 24, fontSize: 12, color: "#aaa", letterSpacing: 0.1 }}>
              {label.text}&nbsp;&nbsp;·&nbsp;&nbsp;{label.time}{label.city ? ` in ${label.city}` : ""}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
