import Link from "next/link";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import IntroParagraph from "./IntroParagraph";
import ProblemParagraph from "./ProblemParagraph";
import ApproachParagraph from "./ApproachParagraph";
import IframeWrapper from "./IframeWrapper";

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
        <BackButton href="/lab" label="Lab" />

        {/* Header */}
        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          AI · Tools
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-8">
          RAG Splendor
        </h1>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Intro */}
        <div className="mb-10">
          <IntroParagraph />
        </div>

        {/* Problem */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Problem
          </h2>
          <ProblemParagraph />
        </div>

        {/* Approach */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Approach
          </h2>
          <ApproachParagraph />
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
          <IframeWrapper />
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
