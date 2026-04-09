import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "YouTube Tool | Will Booth",
  description:
    "A local browser UI for downloading YouTube videos and pulling transcripts. No signup, no paywall, no ads. Built with Flask and yt-dlp.",
};

const techStack = [
  { label: "Backend", value: "Flask (Python)" },
  { label: "Video", value: "yt-dlp" },
  { label: "Transcripts", value: "youtube-transcript-api" },
  { label: "Frontend", value: "Vanilla HTML / CSS / JS" },
  { label: "Fonts", value: "Outfit · Caveat" },
  { label: "Annotations", value: "Rough Notation" },
];

const features = [
  {
    heading: "Download",
    items: [
      "Any public YouTube video",
      "Choose quality up to 1080p",
      "MP4 output, saves directly to your device",
    ],
  },
  {
    heading: "Transcript",
    items: [
      "Auto captions — no API key needed",
      "Timestamps on/off toggle",
      "30s and 60s chunks for RAG pipelines",
      "Full-text search with inline highlights",
      "Click any line to seek the video player",
      "Export as .txt, .csv, or .json",
    ],
  },
];

export default function YouTubeToolPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        {/* Back link */}
        <BackButton href="/lab" label="Lab" />

        {/* Header */}
        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          Tools
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-8">
          YouTube Tool
        </h1>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Intro */}
        <div className="mb-10">
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            A local browser UI for downloading YouTube videos and pulling transcripts. Inspired by sites like getyoutubetext.com but without the paywall, the ads, or the rate limits. Runs entirely on your machine.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed mb-6">
            Paste one or more YouTube URLs and it fetches video metadata, loads an embedded player, and pulls the transcript automatically. You can search the transcript, toggle timestamps on or off, export as plain text or RAG-ready chunks, and download the video in your chosen quality.
          </p>

          {/* Open Tool CTA */}
          <a
            href="/lab/youtube-tool/app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E11D48] text-white text-[0.9rem] font-semibold hover:opacity-90 transition-opacity"
          >
            Open Tool
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Why */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Why
          </h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            I watch a lot of YouTube. I also travel a lot and like downloading videos for flights. Most download tools are buried behind ads or subscription gates. Transcript tools are either slow, limited, or charge per use.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed">
            This does both in one place, locally, with no account required. It also produces 30s and 60s transcript chunks — useful for feeding content into a RAG pipeline or an LLM.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-6 mt-0">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {features.map(({ heading, items }) => (
              <div key={heading}>
                <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-[#1C1C1C] mb-3">
                  {heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-[#555] leading-snug">
                      <span className="mt-[5px] w-[5px] h-[5px] rounded-full bg-[#E11D48] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">
            Tech stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 px-4 py-3 rounded-xl border border-[#EBEBEB] bg-white"
              >
                <span className="text-[11px] font-semibold tracking-wide text-[#AAA] uppercase w-24 flex-shrink-0 mt-px">
                  {label}
                </span>
                <span className="text-[13px] text-[#444] leading-snug">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
