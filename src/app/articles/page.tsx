"use client";

import articles from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";

function parseDate(dateStr: string): Date {
  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) return new Date(`${parts[0]} 1, ${parts[1]}`);
  if (parts.length === 3) return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
  return new Date(0);
}

export default function ArticlesPage() {
  const sorted = [...articles]
    .filter((a) => !a.hidden)
    .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());

  return (
    <div className="min-h-screen bg-white">

      {/* Dark banner header */}
      <div style={{ background: '#FFFFFF', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AAA', marginBottom: 20 }}>Articles.</p>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 700, color: '#1C1C1C', letterSpacing: '-1px', lineHeight: 1, margin: '0 0 20px 0' }}>Writing &amp; Thinking</h1>
        <p style={{ fontSize: 15, color: '#888', maxWidth: 480, margin: '0 auto' }}>Thoughts on product, technology, and building things.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* Article grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[14px] pb-20">
          {sorted.map((article) => (
            <ArticleCard key={article.slug} article={article} heroHeight={160} />
          ))}
        </div>

      </div>
    </div>
  );
}
