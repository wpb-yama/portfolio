"use client";
import { useEffect, useState } from "react";

const GREETINGS: { range: [number, number]; lines: string[] }[] = [
  { range: [5,  8],  lines: ["Good morning, hope the coffee's strong", "Early start. Respect.", "Rise and grind, or just coffee, that works too"] },
  { range: [8,  12], lines: ["Good morning, hope the day's off to a good start", "Morning, the best ideas happen before lunch", "Good morning, hope the inbox isn't too scary"] },
  { range: [12, 14], lines: ["Good afternoon, hope lunch was worth it", "Afternoon, the post-lunch slump is optional", "Good afternoon, the day is half yours"] },
  { range: [14, 18], lines: ["Good afternoon, nearly there", "Afternoon, four o'clock, the longest hour", "Good afternoon, you're in the home stretch"] },
  { range: [18, 22], lines: ["Good evening, you made it through the day", "Good evening, time to decompress", "Evening, well earned"] },
  { range: [22, 24], lines: ["Still up? Respect.", "Burning the midnight oil, classic", "Late night browsing. I respect the dedication"] },
  { range: [0,  5],  lines: ["Couldn't sleep?", "It's very late. Everything okay?", "The 3am portfolio browse, a bold move"] },
];

function getGreeting(hour: number): string {
  const match = GREETINGS.find(({ range }) => hour >= range[0] && hour < range[1]);
  const lines = match?.lines ?? GREETINGS[0].lines;
  return lines[Math.floor(Math.random() * lines.length)];
}

function buildLabel(): { text: string; time: string; city: string } {
  const now  = new Date();
  const hour = now.getHours();
  const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).toLowerCase();

  let city = "";
  try {
    const locale     = navigator.language;
    const regionCode = locale.split("-")[1];
    if (regionCode) {
      city = new Intl.DisplayNames([locale], { type: "region" }).of(regionCode) ?? "";
    }
  } catch {}

  return { text: getGreeting(hour), time, city };
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [label, setLabel] = useState<{ text: string; time: string; city: string } | null>(null);

  useEffect(() => {
    setLabel(buildLabel());
    const id = setInterval(() => setLabel(buildLabel()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const sharedStyles = `
    .hero-sticker {
      transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
    }
    .hero-sticker:hover { transform: rotate(15deg); }
  `;

  if (isMobile) {
    return (
      <>
        <style>{sharedStyles}</style>
        <section className="flex items-center py-10 px-6">
          <div className="w-full">
            <div className="flex items-center gap-3 leading-none mb-1">
              <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1, color: "#1c1c1c" }}>
                Will Booth
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/sticker-will.png"
                alt=""
                draggable={false}
                className="hero-sticker"
                style={{ width: 72, height: 72, objectFit: "contain", flexShrink: 0 }}
              />
            </div>
            <div style={{ fontSize: 26, fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.25 }}>
              Leading with AI.
            </div>
            <div style={{ fontSize: 26, fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.25 }}>
              Building products people love.
            </div>
            {label && (
              <div style={{ marginTop: 20, fontSize: 12, color: "#aaa", letterSpacing: 0.1 }}>
                {label.text}&nbsp;&nbsp;·&nbsp;&nbsp;{label.time}{label.city ? ` in ${label.city}` : ""}
              </div>
            )}
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <style>{sharedStyles}</style>

      <section className="flex items-center justify-center py-10">
        <div
          style={{ width: 760, position: "relative" }}
          className="flex flex-col justify-center px-16 py-16"
        >
          {/* Line 1: Name + sticker */}
          <div className="flex items-center gap-[18px] leading-none mb-0.5">
            <span style={{ fontSize: 52, fontWeight: 700, letterSpacing: -1, color: "#1c1c1c" }}>
              Will Booth
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sticker-will.png"
              alt=""
              draggable={false}
              className="hero-sticker"
              style={{ width: 108, height: 108, objectFit: "contain", flexShrink: 0 }}
            />
          </div>

          {/* Line 2 */}
          <div style={{ fontSize: 38, fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.15 }}>
            Leading with AI.
          </div>

          {/* Line 3 */}
          <div style={{ fontSize: 38, fontWeight: 400, letterSpacing: -0.5, color: "#1c1c1c", lineHeight: 1.15 }}>
            Building products people love.
          </div>

          {/* Greeting */}
          {label && (
            <div style={{ marginTop: 24, fontSize: 12, color: "#aaa", letterSpacing: 0.1 }}>
              {label.text}&nbsp;&nbsp;·&nbsp;&nbsp;{label.time}{label.city ? ` in ${label.city}` : ""}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
