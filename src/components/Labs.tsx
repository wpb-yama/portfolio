"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FlaskConical } from "lucide-react";

const projects = [
  {
    slug: "netflix-casino",
    title: "Netflix Casino",
    tag: "Entertainment",
    description:
      "Exploring how casinos can modernise their UI to replicate the Netflix experience.",
    accent: "#C0392B",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
  },
];

const CARD_WIDTH = 280;
const CARD_GAP = 24;
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

function LabCard({
  slug,
  title,
  tag,
  description,
  accent,
  image,
}: (typeof projects)[number]) {
  return (
    <Link
      href={`/lab/${slug}`}
      className="group relative flex-shrink-0 w-[280px] h-[340px] rounded-[20px] overflow-hidden snap-start block
                 transition-all duration-300 ease-out
                 hover:-translate-y-[6px]"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
      />

      {/* Colour wash overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.55] transition-opacity duration-300"
        style={{ backgroundColor: accent, mixBlendMode: "multiply" }}
      />

      {/* Gradient — always on, ensures text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)",
        }}
      />

      {/* Card content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-[4px] group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">
          {tag}
        </p>
        <h3 className="text-lg font-bold text-white leading-snug">{title}</h3>

        {/* Description — reveals on hover */}
        <div className="grid transition-all duration-300 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100">
          <div className="overflow-hidden">
            <p className="text-xs text-white/75 leading-relaxed mt-2">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Labs() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    trackRef.current?.scrollBy({
      left: dir === "right" ? SCROLL_AMOUNT : -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FlaskConical size={20} strokeWidth={1.8} className="text-[#1C1C1C]" />
              <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
                Labs
              </h2>
            </div>
            <p className="text-sm text-[#888888] ml-7">
              Experiments, prototypes, and side projects
            </p>
          </div>
          <Link
            href="/lab"
            className="flex-shrink-0 bg-[#1C1C1C] text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-neutral-700 transition-colors duration-150"
          >
            See All
          </Link>
        </div>

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-6 -my-6"
        >
          {projects.map((project) => (
            <LabCard key={project.slug} {...project} />
          ))}
        </div>

        {/* Arrow buttons — hidden on mobile */}
        <div className="hidden sm:flex gap-3 mt-6">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-[#1C1C1C] flex items-center justify-center text-[#1C1C1C]
                       hover:bg-[#1C1C1C] hover:text-white transition-colors duration-150"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-[#1C1C1C] flex items-center justify-center text-[#1C1C1C]
                       hover:bg-[#1C1C1C] hover:text-white transition-colors duration-150"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
