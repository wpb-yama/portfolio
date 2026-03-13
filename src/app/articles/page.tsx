"use client";

import Link from "next/link";
import articles, { type Article } from "@/data/articles";

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block bg-white border border-[#EBEBEB] rounded-2xl p-6 hover:-translate-y-[2px] hover:shadow-md transition-all duration-200"
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#AAA] mb-2">
        {article.category}
      </p>
      <h2 className="text-[1.1rem] leading-snug text-[#1C1C1C] mb-2">
        {article.title}
      </h2>
      <p className="text-[13px] text-[#888] leading-relaxed line-clamp-2 mb-4">
        {article.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-[#AAA]">
          {article.date} · {article.readTime}
        </p>
        <span className="text-[12px] font-medium text-[#1C1C1C] opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          Read →
        </span>
      </div>
    </Link>
  );
}

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
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

        {/* Article list */}
        <div className="flex flex-col gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

      </div>
    </div>
  );
}
