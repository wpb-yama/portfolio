"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const sections = [
  { id: "overview",      label: "Overview"      },
  { id: "research",      label: "Research"      },
  { id: "development",   label: "Development"   },
  { id: "testing",       label: "Testing"       },
  { id: "final-product", label: "Final Product" },
];

export default function ProjectNav() {
  const router = useRouter();
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    // Clears the mobile fixed top bar (top-14); sits flush at top on desktop
    <div className="sticky top-14 lg:top-0 z-30 bg-[#FFFFFF]/90 backdrop-blur-sm py-3 px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-center gap-4">

        {/* Back button */}
        <button
          onClick={() => router.push("/projects")}
          aria-label="Back to projects"
          className="flex-shrink-0 bg-[#1C1C1C] text-white rounded-xl p-2 hover:bg-neutral-700 transition-colors duration-150"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
        </button>

        {/* Pill tab bar */}
        <div className="bg-[#1C1C1C] rounded-full px-2 py-1.5 flex items-center gap-0.5 overflow-x-auto no-scrollbar">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-colors duration-150 ${
                active === id
                  ? "bg-white text-[#1C1C1C] font-medium"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
