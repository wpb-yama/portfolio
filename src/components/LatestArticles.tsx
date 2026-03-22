import Link from "next/link";
import { BookOpen } from "lucide-react";
import articles from "@/data/articles";

const recent = articles.slice(0, 3);

type CategoryStyle = {
  heroBg: string;
  badgeBg: string;
  badgeText: string;
  svgColor: string;
};

const categoryStyles: Record<string, CategoryStyle> = {
  "AI & Tech": {
    heroBg: "#DBEAFE",
    badgeBg: "#EFF6FF",
    badgeText: "#1D4ED8",
    svgColor: "#3B82F6",
  },
  "Product Strategy": {
    heroBg: "#FFEDD5",
    badgeBg: "#FFF7ED",
    badgeText: "#C2410C",
    svgColor: "#F97316",
  },
  "Leadership": {
    heroBg: "#EDE9FE",
    badgeBg: "#F5F3FF",
    badgeText: "#6D28D9",
    svgColor: "#8B5CF6",
  },
};

const fallback: CategoryStyle = {
  heroBg: "#F3F4F6",
  badgeBg: "#F9FAFB",
  badgeText: "#374151",
  svgColor: "#9CA3AF",
};

function TechIllustration({ color }: { color: string }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="8" fill={color} opacity="0.85" />
      <circle cx="32" cy="32" r="14" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="32" cy="32" r="22" stroke={color} strokeWidth="1" opacity="0.15" />
      <line x1="32" y1="10" x2="32" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="32" y1="46" x2="32" y2="54" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="10" y1="32" x2="18" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="46" y1="32" x2="54" y2="32" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function ProductIllustration({ color }: { color: string }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="8" y="40" width="10" height="16" rx="2" fill={color} opacity="0.4" />
      <rect x="22" y="30" width="10" height="26" rx="2" fill={color} opacity="0.6" />
      <rect x="36" y="20" width="10" height="36" rx="2" fill={color} opacity="0.8" />
      <rect x="50" y="10" width="8" height="46" rx="2" fill={color} opacity="1" />
      <polyline
        points="13,38 27,27 41,17 54,10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
        fill="none"
      />
    </svg>
  );
}

function LeadershipIllustration({ color }: { color: string }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <polygon
        points="32,8 38,24 56,24 42,34 48,50 32,40 16,50 22,34 8,24 26,24"
        fill={color}
        opacity="0.75"
      />
    </svg>
  );
}

function HeroIllustration({ category, color }: { category: string; color: string }) {
  if (category === "AI & Tech") return <TechIllustration color={color} />;
  if (category === "Product Strategy") return <ProductIllustration color={color} />;
  if (category === "Leadership") return <LeadershipIllustration color={color} />;
  return <TechIllustration color={color} />;
}

export default function LatestArticles() {
  return (
    <section style={{ padding: "4rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Header */}
        {/* Section header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={20} strokeWidth={1.8} className="text-[#1C1C1C]" />
              <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
                Latest Articles
              </h2>
            </div>
            <p className="text-sm text-[#888888] ml-7">
              Thoughts on product, technology, and building things
            </p>
          </div>
          <Link
            href="/articles"
            className="flex-shrink-0 inline-flex items-center text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150"
          >
            See All
          </Link>
        </div>

        {/* Grid / Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {recent.map((article) => {
            const s = categoryStyles[article.category] ?? fallback;
            return (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="flex-shrink-0 w-[80vw] md:w-auto snap-start"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="hover:-translate-y-[3px] hover:shadow-xl transition-all duration-200"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EBEBEB",
                    borderRadius: 12,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Hero */}
                  <div
                    style={{
                      height: 100,
                      backgroundColor: s.heroBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <HeroIllustration category={article.category} color={s.svgColor} />
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    {/* Badge */}
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        backgroundColor: s.badgeBg,
                        color: s.badgeText,
                        padding: "3px 8px",
                        borderRadius: 4,
                        alignSelf: "flex-start",
                        marginBottom: 10,
                      }}
                    >
                      {article.category}
                    </span>

                    {/* Title */}
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#1C1C1C",
                        lineHeight: 1.4,
                        flex: 1,
                        margin: 0,
                      }}
                    >
                      {article.title}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: 11, color: "#AAAAAA" }}>{article.date}</span>
                      <span style={{ fontSize: 11, color: "#AAAAAA" }}>{article.readTime}</span>
                    </div>
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
