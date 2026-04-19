import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Chicken Road | Will Booth",
  description:
    "An experiment: could Claude one-shot a casino game? The logic — yes. Everything else needed work.",
};

const logItems = [
  {
    status: "worked",
    note: "Game logic one-shotted — useGameState hook, board generation, multiplier, cashout all correct first time",
  },
  {
    status: "worked",
    note: "PixiJS SceneManager scaffolded correctly — WebGL canvas, ticker loop, z-ordering",
  },
  {
    status: "problem",
    note: "Car sprites faced the wrong direction — took three rounds of back-and-forth to get orientation right",
  },
  {
    status: "problem",
    note: "Cars continued past the barrier line after a lane was cleared — needed explicit lane-clearing logic",
  },
  {
    status: "problem",
    note: "The chicken animation didn't work as intended — movement states (idle, walk, dead) needed significant iteration",
  },
  {
    status: "problem",
    note: "On death, the car that killed the chicken kept moving over it — then froze too early — took multiple passes to get right",
  },
  {
    status: "problem",
    note: "The end zone image was squished — aspect ratio handling needed a manual fix",
  },
  {
    status: "problem",
    note: "Bet panel moved on game start as status text was injected above controls — fixed with a fixed-height slot",
  },
  {
    status: "worked",
    note: "Difficulty system (Easy / Medium / Difficult) and multiplier steps added cleanly in one pass",
  },
  {
    status: "worked",
    note: "Total Win banner, car speed boost on death, and greyed-out idle badges all one-shotted",
  },
];

const techStack = [
  { label: "Frontend", value: "React + Vite" },
  { label: "Renderer", value: "PixiJS (WebGL)" },
  { label: "Game Logic", value: "Custom hooks + pure JS" },
  { label: "Sprites", value: "Spritesheet animation (192px frames)" },
  { label: "Physics", value: "Tween-based movement, no engine" },
  { label: "Styling", value: "CSS BEM" },
];

export default function ChickenRoadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        <BackButton href="/lab" label="Lab" />

        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          Games · Casino · Experiment
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-3">
          Could it one-shot a casino game?
        </h1>
        <p className="text-[15px] text-[#AAA] mb-8">Chicken Road — built with Claude</p>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* The question */}
        <div className="mb-10">
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            I wanted to understand what the limitations were of building a casino game entirely through Claude. The motivation was practical — not to ship a real game, but to stress-test where AI-assisted development breaks down in a domain I know well. I was not overly concerned with getting the maths exactly right or setting a precise RTP. I just wanted to see how far it could get.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            The short answer: it could one-shot the logic. The game rules, board generation, multiplier progression, and cashout mechanics were all correct first time. What you see below — the playable result — is representative of the images and references it was fed.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed">
            However, there were problems. Several things didn&rsquo;t work as initially intended, and some aspects of the game — particularly the chicken — required a lot of back-and-forth to get right.
          </p>
        </div>

        {/* One-shot video */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-1 mt-0">
            The initial attempt
          </h2>
          <p className="text-[13px] text-[#AAA] mb-4">
            This is what came out of the first prompt — unedited.
          </p>
          <video
            src="/videos/chicken-road-oneshot.mp4"
            controls
            playsInline
            className="w-full rounded-xl border border-[#EBEBEB]"
          />
        </div>

        {/* Build log */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-1 mt-0">
            Build log
          </h2>
          <p className="text-[13px] text-[#AAA] mb-6">
            Documented throughout the process — what worked first time and what didn&rsquo;t.
          </p>
          <div className="flex flex-col gap-3">
            {logItems.map(({ status, note }) => (
              <div
                key={note}
                className="flex items-start gap-4 px-4 py-3 rounded-xl border border-[#EBEBEB]"
              >
                <span
                  className={[
                    "mt-[3px] flex-shrink-0 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded",
                    status === "worked"
                      ? "bg-[#EDFAF4] text-[#1a7a4a]"
                      : "bg-[#FFF0F0] text-[#b03030]",
                  ].join(" ")}
                >
                  {status === "worked" ? "Worked" : "Problem"}
                </span>
                <span className="text-[14px] text-[#444] leading-snug">{note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verdict */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Verdict
          </h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            Pure game logic — state machines, RNG, multipliers — is well within what Claude can one-shot. It understands the domain. The gaps show up in visual and physical behaviour: sprite orientation, collision feel, animation timing. These require human judgement calls that are hard to communicate through prompts alone.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed">
            The overall impression is that you could get a representative, playable prototype built quickly — but you&rsquo;d still need to iterate on anything that relies on feel rather than logic.
          </p>
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
