import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Apex Tracker | Will Booth",
  description:
    "A dark-themed stats and esports tracker for Apex Legends — player lookup, ALGS tournament standings, match-level breakdowns, and player career histories.",
};

const techStack = [
  { label: "Frontend", value: "React + Vite" },
  { label: "Routing", value: "React Router v6" },
  { label: "Styling", value: "Tailwind CSS" },
  { label: "Player API", value: "mozambiquehe.re" },
  { label: "ALGS Data", value: "apexlegendsstatus.com (scraped)" },
  { label: "Fonts", value: "Space Grotesk · Rajdhani" },
];

const features = [
  {
    heading: "Player Stats",
    items: [
      "Search any player across PC, PlayStation, and Xbox",
      "Rank tier, K/D, kills, damage, and wins",
      "Top legends with usage stats",
      "Live data from mozambiquehe.re API",
    ],
  },
  {
    heading: "ALGS Events",
    items: [
      "Full tournament standings from Y3 to Y6",
      "Regional leagues: NA, EMEA, APAC N/S, SA",
      "Match-day score matrices and game replays",
      "Lobby layouts with team and legend picks",
    ],
  },
  {
    heading: "Player Profiles",
    items: [
      "Career stats aggregated across all events",
      "Total kills, damage, knocks, and assists",
      "Full event history with placements",
      "Cross-referenced team rosters",
    ],
  },
  {
    heading: "Data Pipeline",
    items: [
      "Node.js scraper fetches static HTML on build",
      "Parses standings, score matrices, player stats",
      "Replay timestamps used to derive accurate dates",
      "36 events across 4 years in a single JSON file",
    ],
  },
];

export default function ApexTrackerPage() {
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
          Apex Tracker
        </h1>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Intro */}
        <div className="mb-10">
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            A dark-themed stats and esports tracker for Apex Legends. Look up any player&apos;s live ranked stats, or dive into the ALGS competitive scene — tournament standings, match-by-match breakdowns, and individual player career histories across every tracked event.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed mb-6">
            Built because I watch a lot of ALGS and wanted a single place to track players and teams across seasons. The official ALGS site covers individual events well, but doesn&apos;t aggregate player stats across the calendar — so this does.
          </p>

          {/* Open Tool CTA */}
          <a
            href="/lab/apex-legends/app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CC1A1A] text-white text-[0.9rem] font-semibold hover:opacity-90 transition-opacity"
          >
            Open Tracker
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* How it works */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            How it works
          </h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            Player stats are pulled live from the mozambiquehe.re API — the same data source used by most community trackers. ALGS tournament data is a different problem: apexlegendsstatus.com renders its overview pages client-side, so a scraper runs at build time to fetch the static HTML from individual match-day pages, parsing standings, score matrices, player stats, and game replay metadata.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed">
            That produces a single 36-event JSON file covering Y3 through Y6. Player career profiles are then derived client-side by aggregating across all events — cross-referencing team rosters to attach placement data to each player&apos;s stat line.
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
                      <span className="mt-[5px] w-[5px] h-[5px] rounded-full bg-[#CC1A1A] flex-shrink-0" />
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
