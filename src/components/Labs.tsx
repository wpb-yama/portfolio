import Link from "next/link";

const projects = [
  { slug: "chicken-road", title: "Chicken Road", image: "/images/labs/chicken-road.png" },
  { slug: "apex-legends", title: "Apex Tracker", image: "/images/labs/apex-legends.png" },
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
          <div style={{ flexShrink: 0, width: "26%", borderRadius: 14, overflow: "hidden", position: "relative" }}>
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
              className="group hover:bg-[#F5F5F5] hover:border-[#D0D0D0] transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                style={{ width: "100%", height: "55%", objectFit: "cover", display: "block", flexShrink: 0 }}
              />
              <div style={{ padding: "0.9rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                <div>
                  <p style={{ fontSize: 10, color: "#AAA", fontWeight: 600, letterSpacing: "0.05em", margin: "0 0 6px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1C", lineHeight: 1.3, margin: 0, fontFamily: "'Manrope', sans-serif" }}
                    className="group-hover:text-[#444] transition-colors">
                    {project.title}
                  </p>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2" className="group-hover:stroke-[#888] transition-colors" style={{ marginTop: 10 }}>
                  <polyline points="7,17 17,7" />
                  <polyline points="7,7 17,7 17,17" />
                </svg>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
