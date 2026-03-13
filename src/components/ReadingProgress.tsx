"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 lg:left-60 right-0 h-[2px] bg-[#EBEBEB] z-50 pointer-events-none">
      <div
        className="h-full bg-[#1C1C1C]"
        style={{ width: `${progress}%`, transition: "width 80ms linear" }}
      />
    </div>
  );
}
