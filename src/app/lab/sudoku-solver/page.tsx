import type { Metadata } from "next";
import BackButton from "@/components/BackButton";
import IntroAnnotation from "./IntroAnnotation";
import IdeaAnnotation from "./IdeaAnnotation";
import ResultsAnnotation from "./ResultsAnnotation";
import ConfidenceAnnotation from "./ConfidenceAnnotation";
import AttentionAnnotation from "./AttentionAnnotation";

export const metadata: Metadata = {
  title: "Sudoku Solver | Will Booth",
  description:
    "A looped transformer trained to solve Sudoku puzzles by running the same weights repeatedly, using iteration as a form of reasoning.",
};

const techStack = [
  { label: "Architecture", value: "Looped Transformer (shared weights, 8 iterations)" },
  { label: "Parameters", value: "277,001" },
  { label: "Layers / Heads", value: "2 transformer layers · 4 attention heads" },
  { label: "Model dim", value: "d_model 128 · d_ff 256" },
  { label: "Training", value: "AdamW · cosine LR · reverse curriculum" },
  { label: "Dataset", value: "1M Sudoku puzzles (80k train / 5k val)" },
  { label: "Framework", value: "PyTorch · CPU training" },
];

export default function SudokuSolverPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6" style={{ paddingTop: 64 }}>

        <BackButton href="/lab" label="Lab" />

        <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
          AI · Research
        </p>
        <h1 className="text-3xl md:text-5xl text-[#1C1C1C] mb-8">
          Sudoku Solver
        </h1>
        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Intro */}
        <div className="mb-10">
          <IntroAnnotation />
        </div>

        {/* The idea */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">The Idea</h2>
          <IdeaAnnotation />
        </div>

        {/* Training */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">Training</h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            Rather than starting on easy puzzles, the model trains on the hardest 50% first (fewest given cells) for the first half of training, then opens up to all puzzles. The logic: force generalisation under constraint before allowing easier pattern matching. The loss is averaged across all 8 loop iterations, so the model must make useful progress at every step, not just the final one.
          </p>
        </div>

        {/* Training curves */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">Training Curves</h2>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFAFA] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/sudoku-solver/training_curves.png"
              alt="Training loss and validation accuracy over 20 epochs, with curriculum phase annotated"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            The curriculum switch at epoch 11 is clearly visible: loss drops sharply when easier puzzles are introduced
          </p>
        </div>

        {/* Results */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">Results</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="border border-[#EBEBEB] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-wide text-[#AAA] uppercase mb-2">Cell Accuracy</p>
              <p className="text-[2rem] text-[#1C1C1C] leading-none mb-1">81.5%</p>
              <p className="text-[12px] text-[#888]">individual cells correct</p>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-wide text-[#AAA] uppercase mb-2">Puzzle Accuracy</p>
              <p className="text-[2rem] text-[#1C1C1C] leading-none mb-1">2.8%</p>
              <p className="text-[12px] text-[#888]">all 81 cells correct</p>
            </div>
          </div>
          <ResultsAnnotation />
        </div>

        {/* Iteration scaling */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">Test-Time Compute Scaling</h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-6">
            One of the interesting properties of a looped transformer is that you can vary the number of iterations at inference without retraining. More loops should mean more refinement, in theory.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFAFA] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/sudoku-solver/iteration_scaling.png"
              alt="Puzzle accuracy vs iterations at inference, showing accuracy peaks at 8 (training count) and degrades beyond"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Accuracy peaks exactly at the trained iteration count and degrades beyond it: no free compute
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mt-6">
            The result is clear: accuracy peaks at exactly 8 (the training iteration count) and degrades beyond it. The model doesn&apos;t generalise to extra loops: it gets confused. Extra iterations aren&apos;t acting as reasoning steps; they&apos;re just noise after the model has already committed to its answer.
          </p>
        </div>

        {/* Confidence evolution */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">Confidence Evolution</h2>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFAFA] p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/sudoku-solver/confidence_evolution.png"
              alt="Grid predictions across 16 iterations showing cells barely changing after the first few passes"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Green = correct · Red = wrong · Grey = given. The grid barely changes after iteration 2.
          </p>
          <div className="mt-6"><ConfidenceAnnotation /></div>
        </div>

        {/* Attention maps */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">What the Attention Learns</h2>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFAFA] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/sudoku-solver/attention_maps.png"
              alt="Attention maps across 2 layers and 4 heads for a focus cell, showing row and column attention patterns"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Attention from cell (2,2) across all 8 heads at final iteration. L1 H1 shows clear row and column patterns.
          </p>
          <div className="mt-6"><AttentionAnnotation /></div>
        </div>

        {/* Why it plateaus */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">Why It Plateaus</h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            The 81.5% / 2.8% split is a specific kind of failure: the model solves cells in isolation rather than satisfying the global constraint system. No constraint enforcement is applied: the model learns statistical associations between cell values, but nothing forces it to produce a valid grid. Iterations don&apos;t cascade because predictions stabilise too early. And at 277K parameters on CPU, this is a proof of concept; published results on this architecture use larger models, more data, and GPU training.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mt-4">
            Two approaches that would actually fix it: constraint-guided decoding (apply Sudoku rules as a post-processing step after each forward pass), or a larger model with training incentives that reward progressive refinement rather than static predictions.
          </p>
        </div>

        {/* Tech stack */}
        <div className="mb-16">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">Tech Stack</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {techStack.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-start gap-3 px-4 py-3 rounded-xl border border-[#EBEBEB] bg-white"
              >
                <span className="text-[11px] font-semibold tracking-wide text-[#AAA] uppercase w-28 flex-shrink-0 mt-px">
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
