import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Netflix Casino | Will Booth",
  description:
    "A proof-of-concept casino lobby redesign built to look and feel like Netflix: content discovery, personalisation, parallax hero, and a playable Mines game.",
};

export default function NetflixCasinoPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        {/* Back link */}
        <Link
          href="/lab"
          className="inline-flex items-center gap-1 text-[12px] text-[#888] hover:text-[#1C1C1C] transition-colors mb-10"
        >
          ← Lab
        </Link>

        {/* Header */}
        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          Entertainment · Concept
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-4">
          Netflix Casino
        </h1>
        <p className="text-[15px] text-[#888] leading-relaxed max-w-xl mb-8">
          A proof-of-concept casino lobby redesign built to look and feel like
          Netflix: content discovery, personalisation, parallax hero, and a
          playable Mines game.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 mb-10">
          <a
            href="/lab/netflix-casino/lobby.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium px-5 py-2.5 rounded-xl bg-[#1C1C1C] text-white hover:bg-[#333] transition-colors"
          >
            Open lobby ↗
          </a>
          <a
            href="/lab/netflix-casino/mines.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium px-5 py-2.5 rounded-xl border border-[#EBEBEB] text-[#1C1C1C] hover:border-[#CCC] transition-colors"
          >
            Play Mines ↗
          </a>
        </div>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Problem */}
        <div className="mb-10">
          <h2 className="text-[11px] tracking-widest text-[#AAA] uppercase mb-3">
            Problem
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            Traditional online casino lobbies are visually identical: flat
            grids of game thumbnails with no hierarchy or editorial curation.
            They offer little reason to browse, no sense of personalisation, and
            friction at every step between the player and the game they want to
            play.
          </p>
        </div>

        {/* Approach */}
        <div className="mb-12">
          <h2 className="text-[11px] tracking-widest text-[#AAA] uppercase mb-3">
            Approach
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            Netflix solves discovery at scale with a small set of proven
            patterns: a full-bleed hero that puts the best content front and
            centre, horizontal rows that create rhythm without overwhelming, and
            subtle personalisation signals that make the experience feel curated.
            This prototype applies that same playbook to an iGaming lobby.
          </p>
        </div>

        {/* Prototype embed */}
        <div className="mb-16">
          <h2 className="text-[11px] tracking-widest text-[#AAA] uppercase mb-4">
            Prototype
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm">
            <iframe
              src="/lab/netflix-casino/lobby.html"
              title="Netflix Casino Lobby"
              className="w-full"
              style={{ height: "620px", border: "none" }}
              loading="lazy"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Scroll and interact freely · Click &ldquo;Play Now&rdquo; on Mines to open the game
          </p>
        </div>

      </div>
    </div>
  );
}
