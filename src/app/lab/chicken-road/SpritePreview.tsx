"use client";

import { useEffect, useRef, useState } from "react";

const COLS = 11;
const ROWS = 11;
const FRAME_SIZE = 192;
const TOTAL_FRAMES = COLS * ROWS;

export default function SpritePreview() {
  const [frame, setFrame] = useState(0);
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!hovering) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setFrame(0);
      return;
    }
    intervalRef.current = setInterval(() => {
      setFrame((f) => (f + 1) % TOTAL_FRAMES);
    }, 80);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [hovering]);

  const col = frame % COLS;
  const row = Math.floor(frame / COLS);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          width: FRAME_SIZE,
          height: FRAME_SIZE,
          backgroundImage: "url(/images/labs/chicken-spritesheet.png)",
          backgroundSize: `${COLS * FRAME_SIZE}px ${ROWS * FRAME_SIZE}px`,
          backgroundPosition: `${-(col * FRAME_SIZE)}px ${-(row * FRAME_SIZE)}px`,
          backgroundRepeat: "no-repeat",
          borderRadius: 12,
          border: "1px solid #EBEBEB",
          cursor: "pointer",
          flexShrink: 0,
        }}
      />
      <p style={{ fontSize: 11, color: "#AAA", margin: 0 }}>Hover to animate</p>
    </div>
  );
}
