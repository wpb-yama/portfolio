import Link from "next/link";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import IntroParagraph from "./IntroParagraph";
import ApproachParagraph from "./ApproachParagraph";
import BracketAnnotation from "../morphing-icons/BracketAnnotation";

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
        <BackButton href="/lab" label="Lab" />

        {/* Header */}
        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          Entertainment · Concept
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-8">
          Netflix Casino
        </h1>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Intro */}
        <div className="mb-6">
          <IntroParagraph />
        </div>

        {/* CTAs */}
        <div className="mb-10">
          <BracketAnnotation label="Click me">
            <div className="flex gap-3">
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
          </BracketAnnotation>
        </div>

        {/* Problem */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
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
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Approach
          </h2>
          <ApproachParagraph />
        </div>

        {/* Prototype embed */}
        <div className="mb-16">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">
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
