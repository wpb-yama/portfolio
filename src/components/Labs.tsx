import Link from "next/link";

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
  return (
    <section style={{ padding: "1rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

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

        <div className="flex flex-col">
          {projects.slice(0, 4).map((project, i) => (
            <div key={project.slug}>
              {i > 0 && (
                <div style={{ height: 1, background: "#EBEBEB" }} />
              )}
              <Link
                href={`/lab/${project.slug}`}
                className="flex gap-5 py-6 group"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 130,
                    height: 88,
                    borderRadius: 8,
                    overflow: "hidden",
                    position: "relative",
                    background: "#F3F4F6",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div className="flex flex-col justify-center min-w-0">
                  <p className="text-sm text-[#888888] mb-1">{project.tag}</p>
                  <p className="text-base font-bold text-[#1C1C1C] leading-snug mb-1.5 group-hover:text-[#444] transition-colors">
                    {project.title}
                  </p>
                  <p className="text-sm text-[#888888] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
