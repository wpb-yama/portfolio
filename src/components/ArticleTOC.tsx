"use client";

import { useState, useEffect } from "react";

export type TOCItem = { id: string; text: string; level: 2 | 3 };

export default function ArticleTOC({ items }: { items: TOCItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  if (!items.length) return null;

  return (
    <nav>
      <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-4">
        On This Page
      </p>
      <ul>
        {items.map(({ id, text, level }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`w-full text-left py-[5px] border-l-2 leading-[1.4] transition-colors duration-150 ${
                level === 3 ? "pl-[22px] text-[11px]" : "pl-3 text-[12px]"
              } ${
                active === id
                  ? "text-[#1C1C1C] font-medium border-l-[#1C1C1C]"
                  : "text-[#888] border-transparent hover:text-[#1C1C1C] hover:border-[#CCC]"
              }`}
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
