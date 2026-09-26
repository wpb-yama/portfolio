import Link from "next/link";

const projects = [
  { slug: "chicken-road", title: "Chicken Road", image: "/images/labs/chicken-road.png", summary: "A browser-based arcade game built with vanilla JS and a custom sprite engine." },
  { slug: "apex-legends", title: "Apex Tracker", image: "/images/labs/apex-legends.png", summary: "Live stat tracking for Apex Legends — kill stats, rank history, and legend breakdown." },
  { slug: "youtube-tool", title: "YouTube Tool", image: "/images/labs/youtube-tool.png", summary: "Download videos and pull transcripts locally. No paywall, no ads, no account." },
];

export default function Labs() {
  return (
    <section style={{ background: "#FFFFFF", padding: "1.5rem 0" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 22, fontWeight: 700, color: "#1C1C1C", margin: 0, letterSpacing: "-0.02em" }}>
              Labs
            </h2>
            <p style={{ fontSize: 13, color: "#888", margin: "2px 0 0" }}>
              Experiments, prototypes, and side projects
            </p>
          </div>
          <Link
            href="/lab"
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

        {/* Grid */}
        <div style={{ display: "flex", gap: 8, height: 340 }}>

          {/* Video column */}
          <div style={{ flex: 1, borderRadius: 14, overflow: "hidden", position: "relative" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            >
              <source src="/videos/dream.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Project columns */}
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/lab/${project.slug}`}
              style={{
                flex: 1,
                background: "#FAFAFA",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1C", lineHeight: 1.3, margin: "0 0 5px", fontFamily: "'Manrope', sans-serif" }}
                    className="group-hover:text-[#444] transition-colors">
                    {project.title}
                  </p>
                  <p style={{ fontSize: 12, color: "#888", lineHeight: 1.4, margin: 0 }}>
                    {project.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
