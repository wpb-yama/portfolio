import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Chicken Road | Will Booth",
  description:
    "A casino-style Chicken Road game — guide a chicken across 8 lanes of traffic, cash out at any time, and watch your multiplier grow with every lane safely crossed.",
};

const techStack = [
  { label: "Frontend", value: "React + Vite" },
  { label: "Renderer", value: "PixiJS (WebGL)" },
  { label: "Game Logic", value: "Custom hooks + pure JS" },
  { label: "Sprites", value: "Spritesheet animation (192px frames)" },
  { label: "Physics", value: "Tween-based movement, no engine" },
  { label: "Styling", value: "CSS Modules + BEM" },
];

const features = [
  {
    heading: "Casino Mechanics",
    items: [
      "Bet any amount before each round",
      "Multiplier grows 0.5x per lane safely crossed",
      "Cash out at any time after crossing lane 1",
      "Hit a car and lose your full stake",
      "One hidden car per lane — random on game start",
    ],
  },
  {
    heading: "Game Feel",
    items: [
      "Animated chicken sprite with idle, walk, and death states",
      "Cars spawn in lanes ahead, stop at cleared barriers",
      "Yellow/black barrier drops behind each crossed lane",
      "Camera follows the chicken as it progresses",
      "Auto-reset to start after death animation completes",
    ],
  },
  {
    heading: "Scene Design",
    items: [
      "8-lane scrollable world rendered in PixiJS",
      "Custom start and end zone art",
      "Manhole cover multiplier badges per lane",
      "6 custom car sprite variants",
      "Parallax-style drag pan for the road view",
    ],
  },
  {
    heading: "Architecture",
    items: [
      "Game logic entirely in useGameState hook",
      "SceneManager class owns all PixiJS state",
      "React drives game state; Pixi drives visuals",
      "No game engine dependency — pure PixiJS + React",
      "Designed to be embedded in a casino platform",
    ],
  },
];

export default function ChickenRoadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        {/* Back link */}
        <BackButton href="/lab" label="Lab" />

        {/* Header */}
        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          Games · Casino
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-8">
          Chicken Road
        </h1>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Intro */}
        <div className="mb-10">
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            Chicken Road is a casino-style game built from scratch with React and PixiJS. Guide a chicken across 8 lanes of oncoming traffic. Each lane you safely cross raises your multiplier — but one wrong step and you lose your stake. Cash out any time you like.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed mb-6">
            The game mechanic is a take on the &ldquo;Chicken Road&rdquo; genre found across iGaming providers — a risk-ladder format where players self-select their risk tolerance by deciding when to walk away. The format is intuitive, requires no prior betting knowledge, and creates natural tension as multipliers climb.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed mb-8">
            This version is a fully playable prototype built to explore how the game could be implemented natively within a B2B casino platform, with custom art, smooth animations, and a clean betting UI.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            How it works
          </h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-4">
            At the start of each round a board of 8 lanes is generated. Each lane has one car hidden in a random column — unknown to the player. When you press Play, the chicken automatically steps into the first lane. Survive and your multiplier ticks up. The board is only revealed when you hit a car or cash out.
          </p>
          <p className="text-[15px] text-[#444] leading-relaxed">
            React handles all game state via a custom <code className="text-[13px] bg-[#F5F5F5] px-1.5 py-0.5 rounded">useGameState</code> hook. PixiJS handles all rendering via a <code className="text-[13px] bg-[#F5F5F5] px-1.5 py-0.5 rounded">SceneManager</code> class — the two are decoupled, so game logic never touches the canvas and the renderer never touches state.
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
                      <span className="mt-[5px] w-[5px] h-[5px] rounded-full bg-[#f0c040] flex-shrink-0" />
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
