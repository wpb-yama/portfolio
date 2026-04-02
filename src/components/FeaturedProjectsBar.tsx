"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type Annotation = { show: () => void; hide: () => void };
type RN = { annotate: (el: Element, opts: object) => Annotation };

const projects = [
  {
    slug: "pickem",
    title: "Pick'em",
    tag: "Sportsbook",
    description: "A standalone sportsbook designed to remove the friction of traditional sports betting.",
    accent: "#E8399A",
    image: "/videos/pickem-1.webm",
    trophy: true,
    award: "Winner 2025 · Sportsbook Innovation (Supplier)",
  },
  {
    slug: "reveals",
    title: "Reveals",
    tag: "Free-to-Play",
    description: "A daily free-to-play game powered by an AI agent recommendation engine.",
    accent: "#6C3483",
    image: "/images/reveals/reveals-thumb2.png",
    trophy: false,
  },
  {
    slug: "predict-6",
    title: "Predict 6",
    tag: "Free-to-Play",
    description: "A weekly free-to-play game designed as an acquisition funnel with a 6-figure jackpot.",
    accent: "#1A3A6B",
    image: "/images/predict6/predict6-thumb3.png",
    trophy: false,
  },
];


function ProjectCard({
  slug,
  title,
  tag,
  description,
  accent,
  image,
  trophy,
  award,
}: (typeof projects)[number]) {
  const isVideo = image.endsWith(".webm") || image.endsWith(".mp4");
  const winnerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!trophy) return;
    const el = winnerRef.current;
    if (!el) return;
    let circle: Annotation | null = null;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    function draw(animated: boolean) {
      const RN = (window as { RoughNotation?: RN }).RoughNotation;
      if (!RN || !el) return;
      circle?.hide();
      circle = RN.annotate(el, {
        type: "highlight",
        color: "rgba(255,214,0,0.5)",
        multiline: true,
        animate: animated,
        animationDuration: animated ? 600 : 0,
        padding: 2,
      });
      circle.show();
    }

    function onScroll() {
      circle?.hide();
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => draw(false), 150);
    }

    function init() {
      setTimeout(() => draw(true), 400);
      const scrollContainer = el?.closest(".overflow-x-auto");
      scrollContainer?.addEventListener("scroll", onScroll);
    }

    if ((window as { RoughNotation?: unknown }).RoughNotation) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/rough-notation/lib/rough-notation.iife.js";
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      circle?.hide();
      const scrollContainer = el?.closest(".overflow-x-auto");
      scrollContainer?.removeEventListener("scroll", onScroll);
    };
  }, [trophy]);

  return (
    <div className="flex-shrink-0 flex flex-col items-start snap-start" style={{ width: 280 }}>
    <Link
      href={`/projects/${slug}`}
      className="group relative w-full h-[340px] rounded-[20px] overflow-visible block
                 transition-all duration-300 ease-out
                 hover:-translate-y-[6px] hover:shadow-xl"
    >
      {/* Clipped inner container */}
      <div className="absolute inset-0 rounded-[20px] overflow-hidden">
        {/* Background — video or image */}
        {isVideo ? (
          <video
            src={image}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          />
        )}

        {/* Colour wash overlay — Pick'em only */}
        {trophy && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-[0.55] transition-opacity duration-300"
            style={{ backgroundColor: "rgb(0,0,0)", mixBlendMode: "multiply" }}
          />
        )}

        {/* Gradient */}
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

          <div className="grid transition-all duration-300 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100">
            <div className="overflow-hidden">
              <p className="text-xs text-white/75 leading-relaxed mt-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

    </Link>

    {/* Award label below card */}
    {award && (
      <div className="flex items-center gap-1.5 mt-3 px-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/trophy.png" alt="" style={{ width: 45, height: 45, objectFit: "contain", mixBlendMode: "multiply", flexShrink: 0 }} />
        <div className="text-[11px] text-[#888] leading-snug">
          <div className="font-semibold"><span ref={winnerRef}>Winner 2025</span></div>
          <div>Sportsbook Innovation (Supplier)</div>
        </div>
      </div>
    )}
    </div>
  );
}

export default function FeaturedProjectsBar() {
  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
<h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
                Featured Projects
              </h2>
            </div>
            <p className="text-sm text-[#888888] ">
              A selection of product work
            </p>
          </div>
          <Link
            href="/projects"
            className="flex-shrink-0 inline-flex items-center text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150"
          >
            See All
          </Link>
        </div>

        {/* Carousel track — extra vertical padding so trophy isn't clipped */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-8 -my-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>

      </div>
    </section>
  );
}
