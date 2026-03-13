"use client";

import Link from "next/link";
// ── Data ──────────────────────────────────────────────────────────────────────

const labItems = [
  {
    slug: "netflix-casino",
    title: "Netflix Casino",
    tag: "Entertainment",
    description:
      "Exploring how casinos can modernise their UI to replicate the Netflix experience — personalisation, content surfaces and reduced friction.",
    accent: "#C0392B",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
  },
];

type LabItem = (typeof labItems)[number];

// ── Sub-components ────────────────────────────────────────────────────────────

function TagLabel({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-widest text-[#888]">
      {label}
    </span>
  );
}

function FeaturedBlock({ item }: { item: LabItem }) {
  return (
    <Link
      href={`/lab/${item.slug}`}
      className="group grid rounded-2xl border border-[#EBEBEB] overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{ gridTemplateColumns: "1fr 340px" }}
    >
      {/* Left — content */}
      <div className="bg-white p-10">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] text-[#888]">★ Featured</span>
          <span className="text-[#E0E0E0]">·</span>
          <TagLabel label={item.tag} />
        </div>
        <h2 className="text-[1.8rem] leading-snug text-[#1C1C1C] mb-4">
          {item.title}
        </h2>
        <p className="text-[14px] text-[#666] leading-relaxed mb-6">
          {item.description}
        </p>
        <span className="text-[13px] font-medium text-[#1C1C1C] inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-150">
          View experiment <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
        </span>
      </div>

      {/* Right — image panel */}
      <div className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundColor: item.accent, mixBlendMode: "multiply" }}
        />
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LabPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
              Experiments &amp; Concepts
            </p>
            <h1 className="text-5xl text-[#1C1C1C]">
              Lab
            </h1>
          </div>
          <p className="text-[12px] text-[#888] pb-1">{labItems.length} experiment</p>
        </div>
        <div className="h-[2px] bg-[#1C1C1C] w-full mb-8" />

        {/* ── Featured ────────────────────────────────────────────────────── */}
        <FeaturedBlock item={labItems[0]} />

      </div>
    </div>
  );
}
