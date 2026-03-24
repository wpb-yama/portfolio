import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import articles, { type BodyBlock } from "@/data/articles";
import summaries from "@/data/summaries.json";
import TLDRWidget from "@/components/TLDRWidget";
import ArticleTOC, { type TOCItem } from "@/components/ArticleTOC";

// ── Static params ──────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return { title: `${article.title} — Will Booth` };
}

// ── Body renderer ──────────────────────────────────────────────────────────────

function renderBlock(block: BodyBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          id={block.id}
          className={`text-[1.15rem] font-bold text-[#1C1C1C] mt-12 mb-4 leading-snug scroll-mt-8`}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          id={block.id}
          className={`text-[1.15rem] font-bold text-[#1C1C1C] mt-8 mb-3 leading-snug scroll-mt-8`}
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="text-[15px] text-[#444] leading-[1.8] mb-5">
          {block.text}
        </p>
      );
    case "blockquote":
      return (
        <blockquote
          key={index}
          className={`border-l-4 border-[#1C1C1C] pl-5 my-6 text-[1.15rem] text-[#1C1C1C] leading-snug italic`}
        >
          {block.text}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={index} className="my-5 flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[14.5px] text-[#444] leading-relaxed">
              <span className="mt-[6px] w-[5px] h-[5px] rounded-full bg-[#1C1C1C] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div
          key={index}
          className="my-6 flex gap-3 bg-[#FFFFFF] border border-[#EBEBEB] rounded-xl px-5 py-4"
        >
          <span className="text-[18px] flex-shrink-0 mt-[1px]">{block.icon}</span>
          <p className="text-[13.5px] text-[#555] leading-relaxed">{block.text}</p>
        </div>
      );
    case "image":
      return (
        <figure key={index} className="my-8">
          <img src={block.src} alt={block.alt} className="w-full rounded-xl border border-[#EBEBEB]" />
          {block.caption && (
            <figcaption className="text-[12px] text-[#AAA] text-center mt-3">{block.caption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const bullets: string[] =
    (summaries as Record<string, string[]>)[slug] ?? [];

  const tocItems: TOCItem[] = article.body
    .filter((b): b is Extract<BodyBlock, { type: "h2" | "h3" }> =>
      b.type === "h2" || b.type === "h3"
    )
    .map((b) => ({ id: b.id, text: b.text, level: b.type === "h2" ? 2 : 3 }));

  const related = articles.filter((a) => article.relatedSlugs?.includes(a.slug));

  return (
    <div className={`min-h-screen bg-[#FFFFFF]`}>
      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* ── Back link ─────────────────────────────────────────────────────── */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150 mb-10"
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          All articles
        </Link>

        {/* ── Article header ────────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#888]">
              {article.category}
            </span>
            <span className="text-[#DDD]">·</span>
            <span className="text-[11px] text-[#AAA]">{article.date}</span>
            <span className="text-[#DDD]">·</span>
            <span className="text-[11px] text-[#AAA]">{article.readTime}</span>
          </div>

          <h1 className={`text-[2.4rem] leading-[1.2] text-[#1C1C1C] mb-5 max-w-2xl`}>
            {article.title}
          </h1>

          <p className="text-[15px] text-[#888] leading-relaxed max-w-xl">
            {article.excerpt}
          </p>
        </div>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* ── Content + TOC ─────────────────────────────────────────────────── */}
        <div className="flex gap-16 items-start">

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {bullets.length > 0 && <TLDRWidget bullets={bullets} />}
            {article.body.map((block, i) => renderBlock(block, i))}
            <p className="text-[15px] text-[#888] leading-[1.8] mt-10 pt-8 border-t border-[#EBEBEB]">
              Thanks for reading.<br />—Will
            </p>
          </div>

          {/* Sticky TOC */}
          {tocItems.length > 0 && (
            <div className="hidden lg:block w-[200px] flex-shrink-0 sticky top-8 self-start">
              <ArticleTOC items={tocItems} />
            </div>
          )}

        </div>

        {/* ── Related articles ──────────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#EBEBEB]">
            <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-6">
              Related Reading
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="group bg-white rounded-2xl border border-[#EBEBEB] p-6 hover:border-[#1C1C1C] transition-colors duration-150"
                >
                  <p className="text-[10px] uppercase tracking-widest text-[#AAA] mb-2">
                    {a.category}
                  </p>
                  <h3 className={`text-[1.1rem] text-[#1C1C1C] leading-snug mb-2`}>
                    {a.title}
                  </h3>
                  <p className="text-[12.5px] text-[#888] line-clamp-2 leading-relaxed mb-3">
                    {a.excerpt}
                  </p>
                  <span className="text-[12px] font-medium text-[#888] group-hover:text-[#1C1C1C] transition-colors duration-150">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
