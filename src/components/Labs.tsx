"use client";

import Link from "next/link";

const projects = [
  {
    slug: "morphing-icons",
    title: "Morphing Icons",
    tag: "AI · Craft",
    description:
      "Every icon is built from exactly three SVG lines. That single constraint makes it possible to morph between any two icons without crossfades.",
    accent: "#3B5BDB",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
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
  {
    slug: "splendor-rag",
    title: "RAG Splendor",
    tag: "AI · Tools",
    description:
      "A RAG chatbot that answers Splendor rules questions on the fly — trained on the base game and all three expansion rulebooks.",
    accent: "#4338CA",
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    slug: "adaptive-reward-engine",
    title: "Adaptive Reward Engine",
    tag: "AI · Tools",
    description:
      "A contextual bandit system that personalises discount rewards in real time, maximising daily active engagement and reducing churn risk.",
    accent: "#7C3AED",
    image:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
  },
];


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
                 hover:-translate-y-[6px] hover:shadow-xl"
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
  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
<h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
                Labs
              </h2>
            </div>
            <p className="text-sm text-[#888888] ">
              Experiments, prototypes, and side projects
            </p>
          </div>
          <Link
            href="/lab"
            className="flex-shrink-0 inline-flex items-center text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150"
          >
            See All
          </Link>
        </div>

        {/* Carousel track */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar py-6 -my-6">
          {projects.map((project) => (
            <LabCard key={project.slug} {...project} />
          ))}
        </div>

      </div>
    </section>
  );
}
