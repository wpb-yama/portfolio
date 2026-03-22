import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "RAG Splendor | Will Booth",
  description:
    "A RAG chatbot built to answer Splendor board game rules questions, trained on the base game and all three expansion rulebooks using Pinecone, Gemini 2 embeddings, and Claude Haiku.",
};

const techStack = [
  { label: "Embeddings", value: "Gemini 2 Preview (3072-dim)" },
  { label: "Vector DB", value: "Pinecone Serverless" },
  { label: "LLM", value: "Claude 3.5 Haiku via OpenRouter" },
  { label: "Backend", value: "Next.js API route" },
  { label: "PDF parsing", value: "pypdf" },
  { label: "Rulebooks", value: "Base · Silk Road · Sun Never Sets" },
];

export default function SplendorRagPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        {/* Back link */}
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150 mb-10"
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          Lab
        </Link>

        {/* Header */}
        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          AI · Tools
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-4">
          RAG Splendor
        </h1>
        <p className="text-[15px] text-[#888] leading-relaxed mb-8">
          Learning a new board game with friends meant answering the same rules
          questions over and over. I built a RAG chatbot trained on the Splendor
          rulebooks so anyone at the table could get an instant, accurate answer,
          with a citation pointing to which rulebook it came from.
        </p>

        {/* CTAs */}
        <div className="flex gap-3 mb-10">
          <a
            href="/splendor-bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium px-5 py-2.5 rounded-xl bg-[#1C1C1C] text-white hover:bg-[#333] transition-colors"
          >
            Open assistant ↗
          </a>
        </div>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Problem */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Problem
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            Splendor has a base game plus three expansions (Silk Road, Sun Never
            Sets, and Cities of Splendor), each with its own rulebook and edge
            cases. Mid-game rules disputes meant someone had to stop playing,
            hunt through multiple PDFs, and read aloud to the table. It killed
            the pace of every session.
          </p>
        </div>

        {/* Approach */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Approach
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            I built a retrieval-augmented generation (RAG) pipeline that ingests
            all four rulebooks as PDFs, chunks and embeds them using Google
            Gemini 2, and stores the vectors in Pinecone. At query time, the
            user&apos;s question is embedded with the same model and matched
            against the stored vectors; the 10 most semantically similar chunks
            are retrieved and passed as context to Claude Haiku, which generates
            a grounded answer and attributes which rulebook edition it used.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">
            How it works
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFAFA] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/splendor-rag/rag-diagram.png"
              alt="RAG system diagram showing the ingestion pipeline (PDFs → chunk → embed → Pinecone) and the query pipeline (question → embed → semantic search → LLM → answer)"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Ingestion is a one-time setup · Each query embeds the question and retrieves the 10 closest chunks
          </p>
        </div>

        {/* Live demo */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">
            Try it
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] shadow-sm">
            <iframe
              src="/splendor-bot"
              title="Splendor Rules Assistant"
              className="w-full"
              style={{ height: "620px", border: "none" }}
              loading="lazy"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Ask any rules question · Sources are cited by edition
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">
            Tech stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 px-4 py-3 rounded-xl border border-[#EBEBEB] bg-white"
              >
                <span className="text-[11px] font-semibold tracking-wide text-[#AAA] uppercase w-24 flex-shrink-0 mt-px">
                  {label}
                </span>
                <span className="text-[13px] text-[#444] leading-snug">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
