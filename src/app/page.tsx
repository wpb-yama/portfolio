import Testimonials from "@/components/Testimonials";
import LatestArticles from "@/components/LatestArticles";
import SpeakingResearch from "@/components/SpeakingResearch";
import Labs from "@/components/Labs";
import Hero from "@/components/Hero";
import FeaturedProjectsBar from "@/components/FeaturedProjectsBar";
import TechStack from "@/components/TechStack";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjectsBar />
      <Labs />
      <LatestArticles />
      <Testimonials />
      <TechStack />
      <SpeakingResearch />
    </main>
  );
}
