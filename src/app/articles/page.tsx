"use client";

import Link from "next/link";
import articles, { type Article } from "@/data/articles";

const featured  = articles.find((a) => a.featured)!;
const nonFeatured = articles.filter((a) => !a.featured);

// ── Sub-components ────────────────────────────────────────────────────────────

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-medium uppercase tracking-widest text-[#888]">
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-4">
      {children}
    </p>
  );
}

function FeaturedBlock({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid rounded-2xl border border-[#EBEBEB] overflow-hidden hover:shadow-md transition-shadow duration-200"
      style={{ gridTemplateColumns: "1fr 340px" }}
    >
      {/* Left — content */}
      <div className="bg-white p-10">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] text-[#888]">★ Featured</span>
          <span className="text-[#E0E0E0]">·</span>
          <CategoryTag label={article.category} />
        </div>
        <h2
          className={`text-[1.8rem] leading-snug text-[#1C1C1C] mb-4`}
        >
          {article.title}
        </h2>
        <p className="text-[14px] text-[#666] leading-relaxed mb-6">
          {article.excerpt}
        </p>
        <p className="text-[11px] text-[#AAA] mb-6">
          {article.date} · {article.readTime}
        </p>
        <span className="text-[13px] font-medium text-[#1C1C1C] inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-150">
          Read article <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
        </span>
      </div>

      {/* Right — image or dark accent panel */}
      <div className="bg-[#1C1C1C] flex items-center justify-center overflow-hidden">
        {article.featuredImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.featuredImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <span className="text-[120px] text-white/5 select-none leading-none">✦</span>
        )}
      </div>
    </Link>
  );
}

function RecentCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative bg-white p-7 hover:bg-[#FAFAFA] transition-colors duration-150"
    >
      <CategoryTag label={article.category} />
      <h3
        className={`text-[1.15rem] leading-snug text-[#1C1C1C] mt-2 mb-3`}
      >
        {article.title}
      </h3>
      <p className="text-[13px] text-[#888] leading-relaxed line-clamp-2 mb-4">
        {article.excerpt}
      </p>
      <p className="text-[11px] text-[#AAA]">
        {article.date} · {article.readTime}
      </p>
      {/* Slide-in arrow */}
      <span className="absolute bottom-7 right-7 text-[#1C1C1C] text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        →
      </span>
    </Link>
  );
}

function MoreRow({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid items-center border-b border-[#F4F4F4] last:border-b-0 hover:bg-[#FAFAFA] transition-colors duration-150"
      style={{ gridTemplateColumns: "60px 1fr 90px", padding: "20px 28px" }}
    >
      <span className="text-[#DDD] text-[12px] font-mono">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 pr-4">
        <p className="text-[13.5px] font-medium text-[#1C1C1C] truncate group-hover:text-black">
          {article.title}
        </p>
        <p className="text-[11px] text-[#AAA] mt-0.5">
          {article.category} · {article.date}
        </p>
      </div>
      <p className="text-[11px] text-[#AAA] text-right">{article.readTime}</p>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
  const recent = nonFeatured.slice(0, 3);
  const more   = nonFeatured.slice(3);

  return (
    <div className={`min-h-screen bg-white`}>
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
              Writing &amp; Thinking
            </p>
            <h1 className={`text-5xl text-[#1C1C1C]`}>
              Articles
            </h1>
          </div>
          <p className="text-[12px] text-[#888] pb-1">{articles.length} articles</p>
        </div>
        <div className="h-[2px] bg-[#1C1C1C] w-full mb-8" />

        {/* ── Featured ────────────────────────────────────────────────────── */}
        <div className="mb-12">
          <FeaturedBlock article={featured} />
        </div>

        {/* ── Recent ──────────────────────────────────────────────────────── */}
        {recent.length > 0 && (
          <div className="mb-12">
            <SectionLabel>Recent</SectionLabel>
            <div className="grid grid-cols-3 gap-px bg-[#EBEBEB] rounded-2xl overflow-hidden border border-[#EBEBEB]">
              {recent.map((a) => (
                <RecentCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        )}

        {/* ── More Articles ────────────────────────────────────────────────── */}
        {more.length > 0 && (
          <div>
            <SectionLabel>More Articles</SectionLabel>
            <div className="bg-white rounded-2xl border border-[#EBEBEB]">
              {more.map((a, i) => (
                <MoreRow key={a.slug} article={a} index={i} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
