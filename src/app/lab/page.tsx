"use client";

import Link from "next/link";

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

function LabCard({ item }: { item: LabItem }) {
  return (
    <Link
      href={`/lab/${item.slug}`}
      className="group block bg-white border border-[#EBEBEB] rounded-2xl p-6 hover:-translate-y-[2px] hover:shadow-md transition-all duration-200"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#AAA] mb-2">
        {item.tag}
      </p>
      <h2 className="text-[1.1rem] leading-snug text-[#1C1C1C] mb-2">
        {item.title}
      </h2>
      <p className="text-[13px] text-[#888] leading-relaxed mb-4">
        {item.description}
      </p>
      <div className="flex items-center justify-end">
        <span className="text-[12px] font-medium text-[#1C1C1C] opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          View →
        </span>
      </div>
    </Link>
  );
}

export default function LabPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
              Experiments &amp; Concepts
            </p>
            <h1 className="text-3xl md:text-5xl text-[#1C1C1C]">Lab</h1>
          </div>
          <p className="text-[12px] text-[#888] pb-1">{labItems.length} experiment</p>
        </div>
        <div className="h-[2px] bg-[#1C1C1C] w-full mb-8" />

        {/* Lab list */}
        <div className="flex flex-col gap-4">
          {labItems.map((item) => (
            <LabCard key={item.slug} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}
