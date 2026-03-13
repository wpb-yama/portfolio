import Testimonials from "@/components/Testimonials";
import LatestArticles from "@/components/LatestArticles";
import SpeakingResearch from "@/components/SpeakingResearch";
import Labs from "@/components/Labs";
import Hero from "@/components/Hero";
import FeaturedProjectsBar from "@/components/FeaturedProjectsBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProjectsBar />
      <Labs />
      <Testimonials />
      <LatestArticles />
      <SpeakingResearch />
    </main>
  );
}
