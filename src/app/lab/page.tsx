"use client";

import { useRouter } from "next/navigation";

const labItems = [
  {
    slug: "apex-legends",
    title: "Apex Tracker",
    tag: "Tools",
    description:
      "Player stats and ALGS esports tracker for Apex Legends. Live ranked stats, full tournament standings from Y3 to Y6, match breakdowns, and player career histories.",
    accent: "#CC1A1A",
    image: "/images/labs/apex-legends.png",
  },
  {
    slug: "youtube-tool",
    title: "YouTube Tool",
    tag: "Tools",
    description:
      "A local browser UI for downloading YouTube videos and pulling transcripts. No signup, no paywall, no ads. Built with Flask and yt-dlp.",
    accent: "#E11D48",
    image: "/images/labs/youtube-tool.png",
  },
  {
    slug: "morphing-icons",
    title: "Morphing Icons",
    tag: "AI · Craft",
    description:
      "Every icon is built from exactly three SVG line elements. That single constraint makes it possible to morph between any two icons without crossfades or swaps.",
    accent: "#3B5BDB",
    image: "/images/labs/morphing-icons.png",
  },
  {
    slug: "netflix-casino",
    title: "Netflix Casino",
    tag: "Entertainment",
    description:
      "Exploring how casinos can modernise their UI to replicate the Netflix experience — personalisation, content surfaces and reduced friction.",
    accent: "#C0392B",
    image: "/images/labs/netflix-casino.png",
  },
  {
    slug: "splendor-rag",
    title: "Boardgame RAG",
    tag: "AI · Tools",
    description:
      "A RAG chatbot that answers Splendor rules questions using the base game and all three expansion rulebooks — Pinecone, Gemini 2 embeddings, and Claude Haiku.",
    accent: "#4338CA",
    image: "/images/labs/splendor-rag.png",
  },
  {
    slug: "adaptive-reward-engine",
    title: "Adaptive Reward Engine",
    tag: "AI · Tools",
    description:
      "A contextual bandit system that personalises discount rewards in real time, maximising daily active engagement and reducing churn risk across iGaming and e-commerce platforms.",
    accent: "#7C3AED",
    image: "/images/labs/adaptive-reward-engine.png",
  },
  {
    slug: "sudoku-solver",
    title: "Sudoku Solver",
    tag: "AI · Research",
    description:
      "A looped transformer trained to solve Sudoku puzzles by running the same 277K-parameter block 8 times, using iteration as a form of reasoning.",
    accent: "#22C55E",
    image: "/images/labs/sudoku-solver.png",
  },
  {
    slug: "chicken-road",
    title: "Chicken Road",
    tag: "Games · Casino",
    description:
      "A casino-style Chicken Road game built with React and PixiJS. Cross 8 lanes of traffic, cash out before you get hit, and watch your multiplier climb.",
    accent: "#f0c040",
    image: "/images/labs/chicken-road.svg",
  },
];

type LabItem = (typeof labItems)[number];

const DiagonalArrow = ({ className = "" }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    className={className}
  >
    <polyline points="7,17 17,7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

function LabCard({ item }: { item: LabItem }) {
  const router = useRouter();
  const isComingSoon = item.slug === "chicken-road";

  return (
    <div
      className={`group bg-white rounded-[20px] border border-[#EBEBEB] overflow-hidden flex flex-col transition-all duration-200 ${isComingSoon ? "cursor-default opacity-75" : "cursor-pointer hover:-translate-y-[3px] hover:shadow-xl"}`}
      onClick={() => { if (!isComingSoon) router.push(`/lab/${item.slug}`); }}
    >
      {/* Visual block */}
      <div className="h-40 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {isComingSoon && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "rgba(28,28,28,0.7)", padding: "5px 12px", borderRadius: 20 }}>Coming Soon</span>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-6 flex-shrink-0">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5 text-[#AAA]">
          {item.tag}
        </p>
        <h2 className="text-[1.15rem] leading-[1.25] mb-1.5 text-[#1C1C1C]">
          {item.title}
        </h2>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[11px] text-[#AAA]">Concept</span>
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F5F5F5] border border-[#EBEBEB] transition-all duration-200 group-hover:bg-[#1C1C1C] group-hover:border-[#1C1C1C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <DiagonalArrow className="text-[#999] group-hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LabPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div style={{ paddingTop: 64 }}>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
                Experiments &amp; Concepts
              </p>
              <h1 className="text-3xl md:text-5xl text-[#1C1C1C]">Lab</h1>
            </div>
            <p className="text-[12px] text-[#888] pb-1">{labItems.length} experiments</p>
          </div>
          <div className="h-[2px] bg-[#1C1C1C] w-full mb-8" />
        </div>

        {/* Lab grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] pb-20">
          {labItems.map((item) => (
            <LabCard key={item.slug} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}
