"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const DiagonalArrow = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="7,17 17,7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

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
    slug: "",
    title: "Coming Soon",
    tag: "In Progress",
    description: "",
    accent: "",
    image: "",
    trophy: false,
    placeholder: true,
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
}: Omit<(typeof projects)[number], "placeholder">) {
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
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0, display: "block" }}>
          <circle cx="16" cy="19" r="10" fill="#F5F0D8" stroke="#C9A800" strokeWidth="1.5" />
          <polygon points="16,13 17.5,17 22,17 18.5,19.5 19.8,24 16,21.5 12.2,24 13.5,19.5 10,17 14.5,17" fill="#C9A800" />
          <path d="M12 10 L10 4 L16 7 L22 4 L20 10" fill="none" stroke="#C9A800" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
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
  const [hero, ...rest] = projects;

  return (
    <section style={{ padding: "1rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-1">
              Featured Projects
            </h2>
            <p className="text-sm text-[#888888]">
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

        {/* Grid: hero left + cards right */}
        <div className="flex gap-3 pb-8" style={{ minHeight: 340 }}>

          {/* Hero card */}
          <Link
            href={`/projects/${hero.slug}`}
            className="group flex-shrink-0 rounded-2xl overflow-hidden relative block"
            style={{ width: "42%" }}
          >
            {hero.image.endsWith(".webm") || hero.image.endsWith(".mp4") ? (
              <video
                src={hero.image}
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.image}
                alt={hero.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
            )}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">{hero.tag}</p>
              <h3 className="text-lg font-bold text-white leading-snug">{hero.title}</h3>
              {hero.award && (
                <div className="flex items-center gap-1.5 mt-3">
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="16" cy="19" r="10" fill="#F5F0D8" stroke="#C9A800" strokeWidth="1.5" />
                    <polygon points="16,13 17.5,17 22,17 18.5,19.5 19.8,24 16,21.5 12.2,24 13.5,19.5 10,17 14.5,17" fill="#C9A800" />
                    <path d="M12 10 L10 4 L16 7 L22 4 L20 10" fill="none" stroke="#C9A800" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[11px] text-white/60">{hero.award}</span>
                </div>
              )}
            </div>
          </Link>

          {/* Right cards */}
          <div className="flex flex-col gap-3 flex-1">
            {rest.map((project, i) => {
              if (project.placeholder) {
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-2xl relative overflow-hidden"
                    style={{
                      background: "linear-gradient(160deg, #F3F4F6 0%, #E9EAEC 100%)",
                      border: "1px solid #EBEBEB",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: "radial-gradient(circle at 60% 40%, #DDDEE0 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        opacity: 0.6,
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-1">In Progress</p>
                      <p className="text-[15px] font-bold text-[#1C1C1C] leading-snug">Coming Soon</p>
                    </div>
                  </div>
                );
              }
              const isVideo = project.image.endsWith(".webm") || project.image.endsWith(".mp4");
              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex-1 rounded-2xl p-5 flex flex-col justify-between transition-colors duration-150"
                  style={{ background: "#FAFAFA", border: "1px solid #EBEBEB", textDecoration: "none" }}
                >
                  <div>
                    <div style={{ width: 38, height: 38, borderRadius: 8, overflow: "hidden", marginBottom: 14, border: "1px solid #EBEBEB", flexShrink: 0 }}>
                      {isVideo ? (
                        <video src={project.image} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      )}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-1">{project.tag}</p>
                    <p className="text-[15px] font-bold text-[#1C1C1C] leading-snug mb-2 group-hover:text-[#444] transition-colors">{project.title}</p>
                  </div>
                  <div className="mt-3 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F5F5F5] border border-[#EBEBEB] text-[#999] transition-all duration-200 group-hover:bg-[#1C1C1C] group-hover:border-[#1C1C1C] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <DiagonalArrow />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
