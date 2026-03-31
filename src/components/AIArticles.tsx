import Link from "next/link";

import articles from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";

const AI_SLUGS = ["claude-job-finder", "autodream"];

const aiArticles = articles.filter((a) => AI_SLUGS.includes(a.slug));

export default function AIArticles() {
  return (
    <section style={{ padding: "4rem 0", background: "#FFFFFF" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>

        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
<h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
                AI Articles
              </h2>
            </div>
            <p className="text-sm text-[#888888] ">
              Exploring AI tools, workflows, and what they mean for product teams
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
          {aiArticles.map((article) => (
            <div key={article.slug} className="flex-shrink-0 w-[80vw] md:w-auto snap-start">
              <ArticleCard article={article} heroHeight={110} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
