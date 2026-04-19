"use client";

import articles from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import BackButton from "@/components/BackButton";

function parseDate(dateStr: string): Date {
  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) return new Date(`${parts[0]} 1, ${parts[1]}`);
  if (parts.length === 3) return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
  return new Date(0);
}

export default function ArticlesPage() {
  const sorted = [...articles].sort(
    (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div style={{ paddingTop: 64 }}>
          <BackButton href="/" label="Home" />
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
                Writing &amp; Thinking
              </p>
              <h1 className="text-3xl md:text-5xl text-[#1C1C1C]">Articles</h1>
            </div>
            <p className="text-[12px] text-[#888] pb-1">{articles.length} articles</p>
          </div>
          <div className="h-[2px] bg-[#1C1C1C] w-full mb-8" />
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] pb-20">
          {sorted.map((article) => (
            <ArticleCard key={article.slug} article={article} heroHeight={160} />
          ))}
        </div>

      </div>
    </div>
  );
}
