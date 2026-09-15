import Link from "next/link";

const DiagonalArrow = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="7,17 17,7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

const projects = [
  {
    slug: "chicken-road",
    title: "Chicken Road",
    tag: "Games · Casino",
    description:
      "A casino-style Chicken Road game built with React and PixiJS. Cross 8 lanes of traffic, cash out before you get hit, and watch your multiplier climb.",
    image: "/images/labs/chicken-road.png",
  },
  {
    slug: "apex-legends",
    title: "Apex Tracker",
    tag: "Tools",
    description:
      "Player stats and ALGS esports tracker for Apex Legends. Live ranked stats, tournament standings from Y3 to Y6, match breakdowns, and player career histories.",
    image: "/images/labs/apex-legends.png",
  },
  {
    slug: "youtube-tool",
    title: "YouTube Tool",
    tag: "Tools",
    description:
      "A local browser UI for downloading YouTube videos and pulling transcripts. No signup, no paywall, no ads.",
    image: "/images/labs/youtube-tool.png",
  },
  {
    slug: "morphing-icons",
    title: "Morphing Icons",
    tag: "AI · Craft",
    description:
      "Every icon is built from exactly three SVG lines. That single constraint makes it possible to morph between any two icons without crossfades.",
    image: "/images/labs/morphing-icons.png",
  },
  {
    slug: "netflix-casino",
    title: "Netflix Casino",
    tag: "Entertainment",
    description:
      "Exploring how casinos can modernise their UI to replicate the Netflix experience.",
    image: "/images/labs/netflix-casino.png",
  },
  {
    slug: "splendor-rag",
    title: "Boardgame RAG",
    tag: "AI · Tools",
    description:
      "A RAG chatbot that answers Splendor rules questions on the fly — trained on the base game and all three expansion rulebooks.",
    image: "/images/labs/splendor-rag.png",
  },
  {
    slug: "adaptive-reward-engine",
    title: "Adaptive Reward Engine",
    tag: "AI · Tools",
    description:
      "A contextual bandit system that personalises discount rewards in real time, maximising daily active engagement and reducing churn risk.",
    image: "/images/labs/adaptive-reward-engine.png",
  },
];

export default function Labs() {
  const latest = projects.slice(0, 2);

  return (
    <section style={{ padding: "1rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-1">
              Labs
            </h2>
            <p className="text-sm text-[#888888]">
              Experiments, prototypes, and side projects
            </p>
          </div>
          <Link
            href="/lab"
            className="flex-shrink-0 inline-flex items-center text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150"
          >
            See All
          </Link>
        </div>

        {/* Grid: hero left + 3 cards right */}
        <div className="flex gap-3 pb-8" style={{ minHeight: 340 }}>

          {/* Hero placeholder card */}
          <div
            className="flex-shrink-0 rounded-2xl overflow-hidden relative"
            style={{
              width: "42%",
              background: "linear-gradient(160deg, #F3F4F6 0%, #E9EAEC 100%)",
              border: "1px solid #EBEBEB",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle at 60% 40%, #DDDEE0 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                opacity: 0.6,
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-2">
                Coming Soon
              </p>
              <p className="text-[#1C1C1C] text-lg font-bold leading-snug">
                The next experiment
              </p>
            </div>
          </div>

          {/* 3 lab cards */}
          <div className="flex flex-col gap-3 flex-1">
            {latest.map((project) => (
              <Link
                key={project.slug}
                href={`/lab/${project.slug}`}
                className="group flex-1 rounded-2xl p-5 flex flex-col justify-between transition-colors duration-150"
                style={{
                  background: "#FAFAFA",
                  border: "1px solid #EBEBEB",
                  textDecoration: "none",
                }}
              >
                <div>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      overflow: "hidden",
                      marginBottom: 14,
                      border: "1px solid #EBEBEB",
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-1">
                    {project.tag}
                  </p>
                  <p className="text-[15px] font-bold text-[#1C1C1C] leading-snug mb-2 group-hover:text-[#444] transition-colors">
                    {project.title}
                  </p>
                  <p className="text-[13px] text-[#888] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-3 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F5F5F5] border border-[#EBEBEB] text-[#999] transition-all duration-200 group-hover:bg-[#1C1C1C] group-hover:border-[#1C1C1C] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <DiagonalArrow />
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
