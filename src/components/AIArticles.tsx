import Link from "next/link";

import articles from "@/data/articles";
import { thumbnailMap, categoryStyles } from "@/components/ArticleCard";

const AI_SLUGS = ["claude-job-finder", "autodream"];

const aiArticles = articles.filter((a) => AI_SLUGS.includes(a.slug));

export default function AIArticles() {
  return (
    <div>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight mb-1">
              AI Articles
            </h2>
            <p className="text-sm text-[#888888]">
              Exploring AI tools, workflows, and what they mean for product teams
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {aiArticles.map((article, i) => {
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
                  {/* Thumbnail */}
                  <div
                    style={{
                      flexShrink: 0,
                      width: 130,
                      height: 88,
                      borderRadius: 8,
                      overflow: "hidden",
                      background: s.heroBg,
                      position: "relative",
                    }}
                  >
                    {article.featuredImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : thumb ? (
                      thumb(s.color)
                    ) : null}
                  </div>

                  {/* Text */}
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

        <div style={{ height: 1, background: "#EBEBEB", marginBottom: "1.5rem" }} />

        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#E05A3A] hover:text-[#C0391A] transition-colors"
        >
          Read more articles ↗
        </Link>

    </div>
  );
}
