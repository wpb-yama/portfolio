import Link from "next/link";
import type { Metadata } from "next";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Adaptive Reward Engine | Will Booth",
  description:
    "A contextual bandit system that personalises discount rewards in real time, maximising daily active engagement and reducing churn risk across iGaming and e-commerce platforms.",
};

const techStack = [
  { label: "Algorithm", value: "LinUCB (Contextual Bandit)" },
  { label: "State", value: "Spend · Frequency · Recency · Weekly logins" },
  { label: "Action", value: "Continuous discount, 0 – 30%" },
  { label: "Model serving", value: "FastAPI · sub-50ms latency" },
  { label: "Feature cache", value: "Redis" },
  { label: "Storage", value: "PostgreSQL (event log)" },
  { label: "Monitoring", value: "Reward drift detection · A/B holdout" },
];

export default function AdaptiveRewardEnginePage() {
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
          Adaptive Reward Engine
        </h1>

        <div className="h-[2px] bg-[#1C1C1C] w-full mb-10" />

        {/* Intro */}
        <div className="mb-10">
          <p className="text-[15px] text-[#555] leading-relaxed">
            A contextual bandit system that personalises discount rewards in real time, maximising daily active engagement and reducing churn risk across iGaming and e-commerce platforms, without over-investing in users who would have stayed anyway.
          </p>
        </div>

        {/* Problem */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Problem
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            Customer engagement in iGaming and subscription commerce follows a predictable pattern: new users engage frequently, plateau, then gradually drift. Flat loyalty mechanics (fixed points, uniform discounts) fail to respond to this drift in time. By the time a user churns, the cost of re-acquisition far exceeds the cost of retention. The challenge is knowing when to intervene, and by how much, without wasting budget on users who would have stayed anyway.
          </p>
        </div>

        {/* Approach */}
        <div className="mb-10">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Approach
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed">
            The Adaptive Reward Engine frames retention as a contextual bandit problem. Rather than segmenting users into fixed tiers and assigning static rewards, it treats every reward decision as an action with an uncertain outcome. At each eligible session the system observes the user&apos;s current context — their spend history, session frequency, login recency, and weekly active days — and selects a continuous discount value between 0–30% that maximises the probability of a return visit within 48 hours.
          </p>
          <p className="text-[15px] text-[#555] leading-relaxed mt-4">
            The algorithm is LinUCB (Linear Upper Confidence Bound). It fits a linear model to the relationship between user features and the expected value of each reward magnitude. The upper confidence bound component ensures the system explores uncertain actions (particularly for new users or unfamiliar behavioural patterns) while exploiting what it already knows works. Over time the model converges toward personalised discount curves per user profile without requiring those profiles to be defined upfront.
          </p>
        </div>

        {/* Feedback loop diagram */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-4 mt-0">
            Feedback loop
          </h2>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFAFA] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/adaptive-reward-engine/system-diagram.png"
              alt="System architecture diagram showing the LinUCB feedback loop: user profile to feature extraction to LinUCB model to discount offer to user response, then outcome tracked, reward signal computed, and model updated"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Inference runs on every eligible session · Model weights update continuously as outcomes arrive
          </p>
        </div>

        {/* User state space */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            User state space
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-4">
            Each user is mapped onto a two-dimensional state space defined by their engagement score (a composite of session frequency, daily login rate, and recency) and spend score (normalised lifetime value weighted by recent activity). This positioning gives the bandit a prior on reward magnitude before it refines the decision based on individual history.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#EBEBEB] bg-[#FAFAFA] p-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lab/adaptive-reward-engine/state-space.png"
              alt="2x2 state space chart with engagement score on the x-axis and spend score on the y-axis, showing four quadrants: High Value At Risk (15-25% discount), Loyal and Active (0-5%), Churning (10-20%), Engaged Low Value (0-5%)"
              className="w-full h-auto"
            />
          </div>
          <p className="text-[11px] text-[#AAA] mt-2 text-center">
            Quadrant boundaries shift dynamically as the model learns · Discount ranges are starting priors, not hard caps
          </p>
        </div>

        {/* Simulated results */}
        <div className="mb-12">
          <h2 className="text-[1.15rem] font-bold text-[#1C1C1C] mb-3 mt-0">
            Simulated results
          </h2>
          <p className="text-[15px] text-[#555] leading-relaxed mb-6">
            Simulated over a synthetic cohort of 10,000 users across a 90-day period, benchmarked against a flat 10% discount baseline applied uniformly across all users.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <div className="border border-[#EBEBEB] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-wide text-[#AAA] uppercase mb-2">DAU / WAU</p>
              <p className="text-[2rem] text-[#1C1C1C] leading-none mb-1">49%</p>
              <p className="text-[12px] text-[#22c55e]">up from 31%</p>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-wide text-[#AAA] uppercase mb-2">Churn Rate</p>
              <p className="text-[2rem] text-[#1C1C1C] leading-none mb-1">-26%</p>
              <p className="text-[12px] text-[#22c55e]">vs. flat baseline</p>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-wide text-[#AAA] uppercase mb-2">Avg. Discount</p>
              <p className="text-[2rem] text-[#1C1C1C] leading-none mb-1">7.4%</p>
              <p className="text-[12px] text-[#22c55e]">down from 10% flat</p>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-wide text-[#AAA] uppercase mb-2">Convergence</p>
              <p className="text-[2rem] text-[#1C1C1C] leading-none mb-1">3.2k</p>
              <p className="text-[12px] text-[#888]">interactions</p>
            </div>
          </div>

          <p className="text-[15px] text-[#555] leading-relaxed">
            High-value users (top spend quartile) received an average discount of 2.1%, while high-churn-risk users averaged 18.6%. The engine correctly concentrated spend where it mattered rather than distributing it uniformly — producing better retention outcomes at a lower average cost per user.
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
