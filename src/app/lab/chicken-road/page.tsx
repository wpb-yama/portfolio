import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import SpritePreview from "./SpritePreview";

export const metadata: Metadata = {
  title: "Chicken Road | Will Booth",
  description:
    "An experiment: could Claude one-shot a casino game? The logic: yes. Everything else needed work.",
};


const techStack = [
  { label: "Frontend", value: "React + Vite" },
  { label: "Renderer", value: "PixiJS (WebGL)" },
  { label: "Game Logic", value: "Custom hooks + pure JS" },
  { label: "Sprites", value: "Spritesheet animation (192px frames)" },
  { label: "Physics", value: "Tween-based movement, no engine" },
  { label: "Styling", value: "CSS BEM" },
];


const sectionLabel: React.CSSProperties = {
  fontFamily: "Roobert, Manrope, Arial, sans-serif",
  fontSize: 16, fontWeight: 400, color: "#AAA",
  marginBottom: 16, marginTop: 0,
};

const fieldLabel: React.CSSProperties = {
  fontSize: 10, fontWeight: 600, letterSpacing: "0.12em",
  textTransform: "uppercase", color: "#AAA", marginBottom: 8, marginTop: 0,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 22, fontWeight: 700, fontFamily: "Roobert, Manrope, Arial, sans-serif",
  color: "#1C1C1C", marginBottom: 16, marginTop: 0, letterSpacing: -0.5,
};

const bodyText: React.CSSProperties = {
  fontSize: 15, color: "#555", lineHeight: 1.8, marginBottom: 16,
};

const issueTag: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
  color: "#b03030", background: "#FFF0F0", borderRadius: 4, padding: "2px 6px",
  flexShrink: 0, marginTop: 2,
};

export default function ChickenRoadPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        <BackButton href="/lab" label="Lab" />

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", color: "#AAA", textTransform: "uppercase", marginBottom: 8, marginTop: 0 }}>
                Games · Casino · Experiment
              </p>
              <h1 style={{ fontFamily: "Roobert, Manrope, Arial, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: "#1C1C1C", margin: 0, letterSpacing: -1 }}>
                Chicken Road
              </h1>
            </div>
            <a
              href="/lab/chicken-road/app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, fontWeight: 500, padding: "8px 20px", borderRadius: 10, background: "#1C1C1C", color: "white", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
            >
              Play game ↗
            </a>
          </div>
        </div>

        {/* The Question */}
        <section style={{ marginBottom: 64 }}>
          <p style={sectionLabel}>The Question</p>
          <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Could Claude one-shot a casino game?</h2>
          <p style={{ ...bodyText, marginBottom: 0 }}>
            The question I wanted to answer is: how far can AI take you when building a casino game. Chicken Road was the casino game chosen because it has a well-defined ruleset, clear visual requirements, and has exploded in popularity over the last year.
          </p>
        </section>

        {/* Casino Game */}
        <section style={{ marginBottom: 64 }}>
          <p style={sectionLabel}>Casino Game</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <h2 style={{ ...sectionTitle, marginBottom: 20 }}>What is Chicken Road?</h2>
              <p style={bodyText}>
                Chicken Road is a crash-style casino game that has grown rapidly in popularity across online operators. The player places a bet, then guides a chicken across a series of lanes -- each one occupied by oncoming traffic. Every lane crossed increases the multiplier. The player can cash out at any point, or lose the bet if a car makes contact.
              </p>
              <p style={{ ...bodyText, marginBottom: 0 }}>
                The format works because the risk is immediate and the decision is constant. There is no complexity to hide behind -- and the core loop borrows directly from the early video game Frogger.
              </p>
            </div>
            <div style={{ position: "relative", height: 400 }}>
              {[
                { src: "/images/labs/chicken-road1.png", top: 0,   left: "32%", rotate: 1.5,  zIndex: 5, width: 120 },
                { src: "/images/labs/chicken-road2.jpg", top: 60,  left: "2%",  rotate: -2,   zIndex: 4, width: 130 },
                { src: "/images/labs/chicken-road4.webp",top: 20,  left: "60%", rotate: 2,    zIndex: 3, width: 115 },
                { src: "/images/labs/chicken-road3.jpg", top: 190, left: "36%", rotate: 1,    zIndex: 2, width: 120 },
                { src: "/images/labs/chicken-road5.webp",top: 170, left: "4%",  rotate: -1.5, zIndex: 1, width: 125 },
              ].map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img.src} alt="" style={{
                  position: "absolute",
                  top: img.top,
                  left: img.left,
                  width: img.width,
                  objectFit: "cover",
                  borderRadius: 16,
                  transform: `rotate(${img.rotate}deg)`,
                  zIndex: img.zIndex,
                  filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.14))",
                  display: "block",
                }} />
              ))}
            </div>
          </div>
        </section>

        {/* Initial attempt */}
        <section style={{ marginBottom: 64 }}>
          <p style={sectionLabel}>The Initial Prompt</p>
          <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Chicken Road v1.0</h2>
          <p style={bodyText}>The Claude prompt used is below:</p>
          <div style={{ background: "#FAFAF8", border: "1px solid #EBEBEB", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
            <p style={{ fontSize: 14, color: "#1C1C1C", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
              Build me a browser-based casino game called Chicken Road using React and PixiJS. A chicken starts at the bottom of the screen and must cross 8 lanes of moving traffic. Each lane the chicken survives increases a multiplier. The player can cash out at any point or lose everything if a car hits them. The chicken should be animated with idle, walk, and death states using a spritesheet. Cars should spawn from the top of the screen at varying speeds. Include a bet input, a cash out button, a difficulty selector (Easy / Medium / Hard), and a total win display. Style it like a polished casino game: dark background, neon accents, clear UI hierarchy.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", marginBottom: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Positives */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a7a4a", marginBottom: 10, marginTop: 0 }}>Positive</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { title: "Game logic", body: "Rules, board generation, multiplier progression, and cashout mechanics were all correct first time." },
                    { title: "State management", body: "The useGameState hook and overall game loop were scaffolded cleanly in a single pass." },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#EDFAF4", border: "1px solid #A7F3D0" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#1a7a4a" }}>{i + 1}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1C", margin: "0 0 2px 0", lineHeight: 1.4 }}>{item.title}</p>
                        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negatives */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b03030", marginBottom: 10, marginTop: 0 }}>Negative</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { title: "Poor chicken quality", body: "The chicken was a basic SVG with no spritesheet, no animation states, and poor visual quality." },
                    { title: "No cars", body: `Collision was simulated with a text message saying "hit by a car". Nothing visual was rendered.` },
                    { title: "Select-a-square mechanic", body: "Instead of free movement, the chicken advanced lane by lane by selecting one of three squares, each with a hidden crash probability. Closer to a slot mechanic than a crossing game." },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF0F0", border: "1px solid #FECACA" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#b03030" }}>{i + 1}</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1C", margin: "0 0 2px 0", lineHeight: 1.4 }}>{item.title}</p>
                        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
              <div style={{ width: "60%" }}>
                <video src="/videos/croad.mp4" controls playsInline style={{ width: "100%", borderRadius: 12, border: "1px solid #EBEBEB", display: "block" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Sprite pipeline */}
        <section style={{ marginBottom: 64 }}>
          <p style={sectionLabel}>Iterating</p>
          <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Attempt 1: Fixing the chicken</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start", marginBottom: 24 }}>
            <div>
              <p style={bodyText}>
                I was unhappy with the chicken sprite delivered by Claude. I therefore attempted to generate a proper chicken sprite using a chain of AI tools.
              </p>
              <p style={{ ...bodyText, marginBottom: 20 }}>
                A character image generated in Gemini was fed into Grok Imagine to produce short reference animations for each state the game required: idle, walk, and death. Spritely then sliced each video into a spritesheet.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                {["Gemini", "Grok Imagine", "Spritely", "Spritesheet"].map((stage, i, arr) => (
                  <div key={stage} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ background: "#FEFCE8", border: "1px solid #F5E6A3", borderRadius: 999, padding: "5px 14px" }}>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#8B6914" }}>{stage}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "50%" }}>
                <video src="/videos/chicken-road-grok.mp4" controls playsInline style={{ width: "100%", borderRadius: 12, border: "1px solid #EBEBEB", display: "block" }} />
              </div>
            </div>
          </div>
          <p style={bodyText}>Below you will find the spritesheet created from the walk video. Hover the preview to animate.</p>

          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
            <SpritePreview />
            <div style={{ width: "34%", borderRadius: 12, overflow: "hidden", border: "1px solid #EBEBEB" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/labs/chicken-spritesheet.png" alt="Chicken spritesheet" style={{ width: "100%", display: "block" }} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b03030", marginBottom: 10, marginTop: 0 }}>Negative</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { title: "Frames too small", body: "The source image resolution meant individual frames were too low quality to use at game scale." },
                  { title: "No seamless loop", body: "The first and last frames did not match, so the animation visibly snapped when it cycled." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF0F0", border: "1px solid #FECACA" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#b03030" }}>{i + 1}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1C", margin: "0 0 2px 0", lineHeight: 1.4 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Attempt 2 */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Attempt 2: Fixing the chicken</h2>
          <p style={{ ...bodyText, marginBottom: 24 }}>
            The second attempt bypassed image generation entirely. Claude guided the process of building the sprite directly inside Unity -- a tool I had never opened. The output was a markedly higher quality character with distinct, usable animation states. The idle state is below.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1a7a4a", marginBottom: 10, marginTop: 0 }}>Positive</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { title: "Significantly higher visual quality", body: "The Unity-generated sprite was markedly better than anything produced through Grok or Gemini. Frame clarity, proportions, and overall fidelity were all improved." },
                  { title: "Proper animation states", body: "Idle, walk, and death states were all produced with distinct, legible poses. The character read clearly in each state, which was the core requirement." },
                  { title: "No Unity experience required", body: "Claude walked through the entire setup from scratch. Getting a working animated sprite out of a tool I had never opened was a practical demonstration of how much friction AI can remove from unfamiliar tooling." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#EDFAF4", border: "1px solid #A7F3D0" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#1a7a4a" }}>{i + 1}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1C", margin: "0 0 2px 0", lineHeight: 1.4 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "60%" }}>
                <video src="/videos/chicken-road-sprite.mp4" controls playsInline style={{ width: "100%", borderRadius: 12, border: "1px solid #EBEBEB", display: "block" }} />
              </div>
            </div>
          </div>
        </section>


        {/* Adding the cars */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ ...sectionTitle, marginBottom: 20 }}>Fixing the cars</h2>
          <p style={bodyText}>
            Unlike the chicken, cars are static images -- no animation states, no spritesheet pipeline. I was initially optimistic that this would be more straightforward. The same quality issues reappeared, and a new category of problem emerged: one specific to how AI models understand spatial context.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 32, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b03030", marginBottom: 10, marginTop: 0 }}>Negative</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  {
                    title: "Poor image quality",
                    body: "Flat, generic assets with inconsistent lighting. The same resolution issues as the early chicken sprites.",
                  },
                  {
                    title: "Style mismatch",
                    body: "Cars and chicken were visibly from different sources. Getting two AI tools to produce a coherent art style is harder than it looks.",
                  },
                  {
                    title: "Wrong orientation",
                    body: "No concept of which direction a lane-travelling car should face. Required repeated corrections that should not have been necessary.",
                  },
                  {
                    title: "Spawning over stopped cars",
                    body: "New cars spawned into cleared lanes, driving directly over stopped vehicles. The AI implemented spawning without modelling lane state.",
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF0F0", border: "1px solid #FECACA" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#b03030" }}>{i + 1}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1C", margin: "0 0 2px 0", lineHeight: 1.4 }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative", height: 280 }}>
              {[
                { src: "/images/labs/car1.png", top: 0,   left: "28%", rotate: 2,   zIndex: 3, width: 100 },
                { src: "/images/labs/car2.png", top: 90,  left: "2%",  rotate: -2,  zIndex: 2, width: 110 },
                { src: "/images/labs/car3.png", top: 170, left: "40%", rotate: 1.5, zIndex: 1, width: 100 },
              ].map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={img.src} alt="" style={{
                  position: "absolute",
                  top: img.top,
                  left: img.left,
                  width: img.width,
                  objectFit: "cover",
                  borderRadius: 16,
                  transform: `rotate(${img.rotate}deg)`,
                  zIndex: img.zIndex,
                  filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.14))",
                  display: "block",
                }} />
              ))}
            </div>
          </div>

          <p style={bodyText}>
            Better prompts could have prevented some of this. But that is the insight the exercise produces: you only know how to write those prompts after you have already seen how the model fails. It has no spatial awareness, no shared mental model of what the game looks like. Each instruction is processed in isolation. That gap is invisible until you are inside it.
          </p>
        </section>

        {/* Verdict */}
        <section style={{ marginBottom: 64 }}>
          <p style={sectionLabel}>Verdict</p>
          <h2 style={{ ...sectionTitle, marginBottom: 20 }}>The logic is the easy part</h2>
          <p style={bodyText}>
            Claude got the game working in a single pass. State management, multipliers, cashout logic -- all correct first time. The problems started the moment the output needed to be judged by feel rather than correctness. Sprite orientation, animation states, art style coherence -- these are not things you can fully specify in a prompt. You only know how to describe them after you have already seen how the model gets them wrong.
          </p>
          <p style={{ ...bodyText, marginBottom: 0 }}>
            The gap between a working game and one that feels like a game is where the real work lives.
          </p>
        </section>

        {/* Tech stack */}
        <section style={{ marginBottom: 80 }}>
          <p style={sectionLabel}>Tech Stack</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {techStack.map(({ label, value }) => (
              <div key={label} style={{ background: "white", border: "1px solid #EBEBEB", borderRadius: 12, padding: 20 }}>
                <p style={fieldLabel}>{label}</p>
                <p style={{ fontSize: 14, color: "#1C1C1C", margin: 0, fontWeight: 500, fontFamily: "Roobert, Manrope, Arial, sans-serif" }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
