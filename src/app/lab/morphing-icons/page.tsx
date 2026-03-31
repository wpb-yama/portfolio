import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import MorphingIconSolo from "./MorphingIconSolo";
import BracketAnnotation from "./BracketAnnotation";
import InsightParagraph from "./InsightParagraph";
import IconGrid from "./IconGrid";
import RotationGroupDemo from "./RotationGroupDemo";
import CrossGroupDemo from "./CrossGroupDemo";
import SequenceBuilder from "./SequenceBuilder";

export const metadata: Metadata = {
  title: "Morphing Icons | Will Booth",
  description:
    "Every icon is built from exactly three SVG line elements. That single constraint is what makes it possible to morph between any two icons without fading or swapping.",
};

export default function MorphingIconsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        {/* Back link */}
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150 mb-10"
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          Lab
        </Link>

        {/* Header */}
        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          AI · Craft
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-8">
          Morphing Icons
        </h1>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Overview */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Overview
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            I experiment with Claude Code more every day. As the person I am,
            I&apos;m fascinated by the subtle animations that make something feel
            premium, without the user really noticing. This is one thing I love
            with my Android phone. The small moments where icons transform rather
            than swap. The hamburger menu that rotates into an X. The play button
            that becomes pause. These transitions feel considered in a way that
            static changes don&apos;t.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-6">
            I wanted to see if Claude could help me build something like this,
            but with a twist: every icon should be able to become any other icon.
            Not through any animation tricks, but through actual transformation
            of the underlying shapes.
          </p>

          {/* Solo icon teaser */}
          <div className="flex justify-center mb-6">
            <BracketAnnotation>
              <MorphingIconSolo />
            </BracketAnnotation>
          </div>

          <p className="text-[15px] text-[#555] leading-relaxed mb-10">
            The result was 20 icons, any of which can morph into another. This
            took roughly 30 minutes to complete with Claude&apos;s assistance.
          </p>
        </div>

        {/* The Boundaries */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            The Boundaries
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            The first attempt was as predicted -- an icon component set with
            smooth transitions that fade in and out. This is technically correct,
            but not what I had in mind. There&apos;s no sense of transformation.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-6">
            I wanted the lines to move, not fade.
          </p>

          <div className="mb-6">
            <InsightParagraph />
          </div>

          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            I gave Claude this new blueprint. Every icon, regardless of
            complexity, would be represented by exactly three lines, with unused
            lines collapsing and becoming invisible.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            Some icons mapped naturally. For example a Cross is just plus rotated
            45°. Others required more creativity, such as the checkmark that uses
            two lines and collapses the third.
          </p>

          <IconGrid />
        </div>

        {/* Rotation groups */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Rotation groups
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            I started clicking through transitions. Most looked good. However
            there were several where something looked wrong. For example,
            arrow-right to arrow-down, which should just require a rotation of
            90°, was still transforming, given the boundaries provided to Claude.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            I described this to Claude as well as the idea of rotation groups.
            Icons in the same group that share coordinates and differ only by
            rotation, do not transform but instead rotate.
          </p>

          <div className="mb-6">
            <RotationGroupDemo />
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: "Arrows",       desc: "Four directions, 90° apart." },
              { label: "Chevrons",     desc: "Same shape as arrows, without the shaft." },
              { label: "Plus / Cross", desc: "The same perpendicular lines, 45° apart." },
            ].map(({ label, desc }) => (
              <div key={label}>
                <p className="text-[13px] font-semibold text-[#1C1C1C] mb-0.5">{label}</p>
                <p className="text-[12px] text-[#999]">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-group morphs */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Cross-group morphs
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            When transitioning between different groups, the lines interpolate
            through coordinate space. This gives certain transitions a magical
            feeling. You&apos;re watching shapes genuinely transform into other shapes.
            The below are my favourite:
          </p>
          <CrossGroupDemo />
        </div>

        {/* Testing tool */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Testing tool
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-8">
            I asked Claude to build this tool so that transitions could be tested
            effectively. It proved to be an incredibly helpful tool for feedback.
            I could simply point to specific sequences that felt off and explain
            why.
          </p>
          <SequenceBuilder />
        </div>

        {/* Reflections */}
        <div className="mb-16">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Reflections
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            I&apos;m genuinely impressed with what Claude was able to build here. The
            core architecture is elegant: three lines per icon, rotation groups
            for same-shape icons, coordinate morphing for everything else.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            With that said, there were limitations. Claude couldn&apos;t tell when
            something looked wrong. The insight that arrows should rotate rather
            than morph coordinates, for example, had to come from me, even
            though rotating would have meant smoother, more natural animations.
            It optimised for working rather than feeling right, which meant I
            had to watch the transitions and describe what felt off. Once I did,
            it started to understand the why.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed">
            The underlying approach is sound though. From there, it&apos;s iteration.
            Play with the result, notice what&apos;s wrong, describe it, repeat.
          </p>
        </div>

      </div>
    </div>
  );
}
