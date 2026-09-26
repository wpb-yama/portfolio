"use client";

import Link from "next/link";

const projects = [
  {
    slug: "pickem",
    title: "Pick'em",
    tag: "Sportsbook",
    description: "A standalone sportsbook designed to remove the friction of traditional sports betting.",
    accent: "#E8399A",
    image: "/videos/pickem-1.webm",
    trophy: true,
    award: "Winner 2025 · Sportsbook Innovation (Supplier)",
  },
  {
    slug: "reveals",
    title: "Reveals",
    tag: "Free-to-Play",
    description: "A daily free-to-play game powered by an AI agent recommendation engine.",
    accent: "#6C3483",
    image: "/images/reveals/reveals-thumb2.png",
    trophy: false,
  },
  {
    slug: "",
    title: "Coming Soon",
    tag: "In Progress",
    description: "",
    accent: "",
    image: "",
    trophy: false,
    placeholder: true,
  },
];



export default function FeaturedProjectsBar() {
  return (
    <section style={{ padding: "1rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-1">
              Featured Projects
            </h2>
            <p className="text-sm text-[#888888]">
              A selection of product work
            </p>
          </div>
          <Link
            href="/projects"
            className="flex-shrink-0 inline-flex items-center text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150"
          >
            See All
          </Link>
        </div>

        {/* Tile row */}
        <div className="flex gap-3 pb-8" style={{ height: 340 }}>
          {projects.map((project, i) => {
            if (project.placeholder) {
              return (
                <div
                  key={i}
                  className="flex-1 rounded-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(160deg, #F3F4F6 0%, #E9EAEC 100%)",
                    border: "1px solid #EBEBEB",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: "radial-gradient(circle at 60% 40%, #DDDEE0 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                      opacity: 0.6,
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-1">In Progress</p>
                    <p className="text-[15px] font-bold text-[#1C1C1C] leading-snug">Coming Soon</p>
                  </div>
                </div>
              );
            }
            const isVideo = project.image.endsWith(".webm") || project.image.endsWith(".mp4");
            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex-1 rounded-2xl overflow-hidden relative block transition-all duration-300 ease-out hover:-translate-y-[3px] hover:shadow-xl"
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  {isVideo ? (
                    <video
                      src={project.image}
                      autoPlay loop muted playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-[4px] group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <p className="text-[10px] uppercase tracking-widest text-white/70 mb-1">{project.tag}</p>
                    <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>
                    <div className="grid transition-all duration-300 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <p className="text-xs text-white/75 leading-relaxed mt-2">{project.description}</p>
                      </div>
                    </div>
                    {project.award && (
                      <div className="flex items-center gap-1.5 mt-3">
                        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
                          <circle cx="16" cy="19" r="10" fill="#F5F0D8" stroke="#C9A800" strokeWidth="1.5" />
                          <polygon points="16,13 17.5,17 22,17 18.5,19.5 19.8,24 16,21.5 12.2,24 13.5,19.5 10,17 14.5,17" fill="#C9A800" />
                          <path d="M12 10 L10 4 L16 7 L22 4 L20 10" fill="none" stroke="#C9A800" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[11px] text-white/60">{project.award}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
