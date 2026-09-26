"use client";

import Link from "next/link";
import articles from "@/data/articles";
import { categoryStyles, thumbnailMap } from "@/components/ArticleCard";

// ── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    slug: "pickem",
    title: "Pick'em",
    tag: "Sportsbook",
    image: "/videos/pickem-1.webm",
    award: "Winner 2025 · Sportsbook Innovation (Supplier)",
  },
  {
    slug: "reveals",
    title: "Reveals",
    tag: "Free-to-Play",
    image: "/images/reveals/reveals-thumb2.png",
  },
];

const labs = [
  { slug: null,             title: "",                tag: "",                video: "/videos/dream.mp4" },
  { slug: "chicken-road",   title: "Chicken Road",    tag: "Games · Casino",  image: "/images/labs/chicken-road.png",  summary: "A browser-based arcade game built with vanilla JS and a custom sprite engine." },
  { slug: "apex-legends",   title: "Apex Tracker",    tag: "Tools",           image: "/images/labs/apex-legends.png",  summary: "Live stat tracking for Apex Legends — kill stats, rank history, and legend breakdown." },
  { slug: "youtube-tool",   title: "YouTube Tool",    tag: "Tools",           image: "/images/labs/youtube-tool.png",  summary: "Download videos and pull transcripts locally. No paywall, no ads, no account." },
];

function parseDate(dateStr: string): Date {
  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) return new Date(`${parts[0]} 1, ${parts[1]}`);
  if (parts.length === 3) return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
  return new Date(0);
}

const recentArticles = [...articles]
  .filter((a) => !a.hidden)
  .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
  .slice(0, 5);

// ── Shared card sizes ─────────────────────────────────────────────────────────

const CARD_W = 220;
const CARD_H = 280;

// ── Cards ─────────────────────────────────────────────────────────────────────

function DarkCard({ href, image, tag, title, award }: {
  href: string; image: string; tag: string; title: string; award?: string;
}) {
  const isVideo = image.endsWith(".webm") || image.endsWith(".mp4");
  return (
    <Link
      href={href}
      className="group"
      style={{
        flexShrink: 0,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
        display: "block",
        textDecoration: "none",
        background: "#111",
        scrollSnapAlign: "start",
      }}
    >
      {isVideo ? (
        <video src={image} autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title}
          className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
          {tag}
        </p>
        <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{title}</p>
        {award && <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{award}</p>}
      </div>
    </Link>
  );
}

function ArticleCarouselCard({ article }: { article: (typeof recentArticles)[number] }) {
  const s = categoryStyles[article.category] ?? { heroBg: "#F3F4F6", badgeBg: "#F9FAFB", badgeText: "#374151", color: "#9CA3AF" };
  const thumb = thumbnailMap[article.slug];
  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{
        flexShrink: 0,
        width: CARD_W,
        height: CARD_H,
        borderRadius: 14,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: "1px solid #EBEBEB",
        textDecoration: "none",
        scrollSnapAlign: "start",
      }}
    >
      <div style={{ height: 130, backgroundColor: article.thumbnailBg ?? s.heroBg, flexShrink: 0, overflow: "hidden" }}>
        {article.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.featuredImage} alt={article.title}
            style={{ width: "100%", height: "100%", objectFit: article.thumbnailFit ?? "cover" }} />
        ) : thumb ? thumb(s.color) : null}
      </div>
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", flex: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 500, backgroundColor: s.badgeBg, color: s.badgeText, padding: "2px 7px", borderRadius: 4, alignSelf: "flex-start", marginBottom: 8 }}>
          {article.category}
        </span>
        <p style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1C", lineHeight: 1.4, flex: 1, margin: 0 }}>
          {article.title}
        </p>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "#AAA" }}>{article.date}</span>
          <span style={{ fontSize: 10, color: "#AAA" }}>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────

function CarouselSection({ title, subtitle, href, children }: {
  title: string; subtitle?: string; href: string; children: React.ReactNode;
}) {
  return (
    <div style={{ padding: "1.25rem 0 0.5rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: subtitle ? "flex-start" : "baseline", justifyContent: "space-between", padding: "0 1.5rem", marginBottom: 14 }}>
        <div>
          <h2 style={{ fontFamily: "'Manrope', ui-sans-serif, system-ui, sans-serif", fontSize: 18, fontWeight: 700, color: "#1C1C1C", margin: 0, letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0" }}>{subtitle}</p>
          )}
        </div>
        <Link
          href={href}
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#888",
            border: "1px solid #EBEBEB",
            borderRadius: 9999,
            padding: "6px 14px",
            textDecoration: "none",
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          See All
        </Link>
      </div>
      {/* Scroll track */}
      <div style={{
        display: "flex",
        gap: 10,
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        scrollPaddingLeft: "1.5rem",
        WebkitOverflowScrolling: "touch",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        paddingBottom: 8,
        scrollbarWidth: "none",
      }}
        className="[&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function HomeCarousel() {
  return (
    <div>
      <CarouselSection title="Featured Projects" subtitle="A selection of product work" href="/projects">
        {projects.map((p) => (
          <DarkCard key={p.slug} href={`/projects/${p.slug}`} image={p.image} tag={p.tag} title={p.title} award={p.award} />
        ))}
      </CarouselSection>

      <CarouselSection title="Labs" subtitle="Experiments, prototypes, and side projects" href="/lab">
        {labs.map((l, i) =>
          l.slug === null ? (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: CARD_W,
                height: CARD_H,
                borderRadius: 14,
                overflow: "hidden",
                position: "relative",
                scrollSnapAlign: "start",
              }}
            >
              <video src={l.video} autoPlay loop muted playsInline
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ) : (
            <DarkCard key={l.slug} href={`/lab/${l.slug}`} image={l.image!} tag={l.tag} title={l.title} />
          )
        )}
      </CarouselSection>

      <CarouselSection title="Articles" subtitle="Thoughts on product, technology, and building things" href="/articles">
        {recentArticles.map((a) => (
          <ArticleCarouselCard key={a.slug} article={a} />
        ))}
      </CarouselSection>
    </div>
  );
}
