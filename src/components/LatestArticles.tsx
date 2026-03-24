import Link from "next/link";
import { BookOpen } from "lucide-react";
import articles from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";

function parseDate(dateStr: string): Date {
  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) return new Date(`${parts[0]} 1, ${parts[1]}`);
  if (parts.length === 3) return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
  return new Date(0);
}

const recent = [...articles]
  .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
  .slice(0, 3);

export default function LatestArticles() {
  return (
    <section style={{ padding: "4rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

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

        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {recent.map((article) => (
            <div key={article.slug} className="flex-shrink-0 w-[80vw] md:w-auto snap-start">
              <ArticleCard article={article} heroHeight={110} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
