import Link from "next/link";
import { FolderOpen } from "lucide-react";

const projects = [
  {
    slug: "pickem",
    title: "Pick'em",
    description: "A B2B 'More or Less' sports prediction product built from scratch — live across 5 continents in 12 months.",
    season: "2023–2024",
    role: "Senior Product Manager",
    image: "/images/pickem/pickem.png",
  },
  {
    slug: "reveals",
    title: "Reveals",
    description: "A free-to-play daily engagement product for sportsbooks, built around Gacha mechanics and an AI personalisation loop.",
    season: "2024",
    role: "Product Manager",
    image: "/images/reveals/reveals-thumb2.png",
  },
  {
    slug: "predict-6",
    title: "Predict 6",
    description: "The first white-label free-to-play score predictor — Sky Super 6 mechanics, available to every operator.",
    season: "2025",
    role: "Associate Product Manager",
    image: "/images/predict6/predict6-thumb1.png",
  },
];

export default function FeaturedProjects() {
  return (
    <section style={{ background: "#FFFFFF", padding: "1.5rem 0" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <FolderOpen size={18} strokeWidth={1.8} className="text-[#1C1C1C]" />
              <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 22, fontWeight: 700, color: "#1C1C1C", margin: 0, letterSpacing: "-0.02em" }}>
                Featured Projects
              </h2>
            </div>
            <p style={{ fontSize: 13, color: "#888", margin: "2px 0 0", paddingLeft: 26 }}>
              A selection of product work I&apos;m proud of
            </p>
          </div>
          <Link
            href="/projects"
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#888",
              border: "1px solid #EBEBEB",
              borderRadius: 9999,
              padding: "6px 14px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            className="hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all"
          >
            See All
          </Link>
        </div>

        {/* Tile row */}
        <div style={{ display: "flex", gap: 8, height: 340 }}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              style={{
                flex: 1,
                background: "#FAFAFA",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
                border: "1px solid #EBEBEB",
              }}
              className="group hover:bg-[#F5F5F5] hover:border-[#D0D0D0] hover:-translate-y-[3px] hover:shadow-xl transition-all duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                style={{ width: "100%", height: "55%", objectFit: "cover", display: "block", flexShrink: 0 }}
              />
              <div style={{ padding: "0.9rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                <div>
                  <p style={{ fontSize: 10, color: "#AAA", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 4px" }}>
                    {project.season}
                  </p>
                  <p
                    style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", lineHeight: 1.3, margin: "0 0 5px", fontFamily: "'Manrope', sans-serif" }}
                    className="group-hover:text-[#444] transition-colors"
                  >
                    {project.title}
                  </p>
                  <p style={{ fontSize: 12, color: "#888", lineHeight: 1.4, margin: 0 }}>
                    {project.description}
                  </p>
                </div>
                <p style={{ fontSize: 11, color: "#AAA", margin: 0 }}>
                  {project.role}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
