import Hero from "@/components/Hero";
import FeaturedProjectsBar from "@/components/FeaturedProjectsBar";
import Labs from "@/components/Labs";
import LatestArticles from "@/components/LatestArticles";
import HomeCarousel from "@/components/HomeCarousel";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Desktop: stacked sections */}
      <div className="hidden md:block">
        <FeaturedProjectsBar />
        <Labs />
        <LatestArticles />
      </div>
      {/* Mobile: horizontal carousel */}
      <div className="md:hidden">
        <HomeCarousel />
      </div>
    </main>
  );
}
