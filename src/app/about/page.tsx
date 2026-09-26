


import SpeakingResearch from "@/components/SpeakingResearch";
import TechStack from "@/components/TechStack";
import AboutHero from "@/components/AboutHero";
import FunFacts from "@/components/FunFacts";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <AboutHero />

      {/* ── Experience ────────────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "3rem 0" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">Experience</h2>
          </div>

          <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
            Based in England, I have 8+ years of experience building and scaling digital products in iGaming, from early‑stage start‑ups to software used by millions.
          </p>

          <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
            Currently, I&apos;m a Senior Product Manager at WA Technology where I&apos;m working with Sportsbooks and Casinos. Prior to iGaming, earlier roles included providing financial advice to high net worth individuals at law firms and banks.
          </p>

          <p className="text-[15px] text-[#555] leading-[1.8] mb-5">
            I specialise in using AI to personalise user journeys, building agentic systems that keep teams efficient, and shipping API-driven products built to scale.
          </p>
        </div>
      </section>


      {/* ── Tools ─────────────────────────────────────────────────────────── */}
      <TechStack />

      {/* ── What People Say ───────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Speaking, Research & Work Trips ───────────────────────────────── */}
      <SpeakingResearch />

      {/* ── Fun Facts ──────────────────────────────────────────────────────── */}
      <FunFacts />

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <Contact />

    </div>
  );
}
