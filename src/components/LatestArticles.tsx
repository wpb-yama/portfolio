import Link from "next/link";

import articles from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";

function parseDate(dateStr: string): Date {
  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) return new Date(`${parts[0]} 1, ${parts[1]}`);
  if (parts.length === 3) return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
  return new Date(0);
}

const recent = [...articles]
  .filter((a) => !a.hidden)
  .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
  .slice(0, 4);

export default function LatestArticles() {
  return (
    <section style={{ padding: "1rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-1">
              Articles
            </h2>
            <p className="text-sm text-[#888888]">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
          {recent.map((article) => (
            <ArticleCard key={article.slug} article={article} heroHeight={140} />
          ))}
        </div>


      </div>
    </section>
  );
}
