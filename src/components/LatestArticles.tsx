import Link from "next/link";

import articles from "@/data/articles";
import { thumbnailMap, categoryStyles } from "@/components/ArticleCard";

function parseDate(dateStr: string): Date {
  const parts = dateStr.trim().split(" ");
  if (parts.length === 2) return new Date(`${parts[0]} 1, ${parts[1]}`);
  if (parts.length === 3) return new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
  return new Date(0);
}

const recent = [...articles]
  .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
  .slice(0, 4);

export default function LatestArticles() {
  return (
    <section style={{ padding: "4rem 0", background: "#FFFFFF" }}>
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

        <div className="flex flex-col">
          {recent.map((article, i) => {
            const s = categoryStyles[article.category] ?? { heroBg: "#F3F4F6", color: "#9CA3AF" };
            const thumb = thumbnailMap[article.slug];
            const year = article.date?.split(" ").at(-1) ?? "";

            return (
              <div key={article.slug}>
                {i > 0 && (
                  <div style={{ height: 1, background: "#EBEBEB" }} />
                )}
                <Link
                  href={`/articles/${article.slug}`}
                  className="flex gap-5 py-6 group"
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 130,
                      height: 88,
                      borderRadius: 8,
                      overflow: "hidden",
                      background: article.thumbnailBg ?? s.heroBg,
                      position: "relative",
                    }}
                  >
                    {article.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        style={{ width: "100%", height: "100%", objectFit: article.thumbnailFit ?? "cover" }}
                      />
                    ) : thumb ? (
                      thumb(s.color)
                    ) : null}
                  </div>

                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-sm text-[#888888] mb-1">{year}</p>
                    <p className="text-base font-bold text-[#1C1C1C] leading-snug mb-1.5 group-hover:text-[#444] transition-colors">
                      {article.title}
                    </p>
                    <p className="text-sm text-[#888888] leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}
