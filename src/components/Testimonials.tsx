"use client";

import { useRef, useEffect } from "react";
import { MessageSquareQuote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Will's strong ownership mindset and commercial awareness helped reduce delivery waste. He balances customer needs, technical constraints, and business goals exceptionally.",
    name: "Tsanislava Yordanova",
    role: "Senior Delivery Manager",
    company: "WA Technology",
    avatar: "/avatars/tsans.jfif",
  },
  {
    quote:
      "Will brings clarity to ambiguity & balances customer needs with realities. As an Engineering Manager, I value how you partner with us; not to build features, but to build the right things.",
    name: "Daryl Camilleri",
    role: "Engineering Manager",
    company: "WA Technology",
    avatar: "/avatars/daryl.jfif",
  },
  {
    quote:
      "Will has combined strategic clarity with an exceptional ability to execute, turning vision into measurable results. Any team would be fortunate to have a leader who cares as deeply.",
    name: "Dave Hickey",
    role: "CEO",
    company: "DaithiBet",
    avatar: "/avatars/DaveHickey.jfif",
  },
  {
    quote:
      "Working together over the years, through every high and low, you've continuously brought resilience and an unwavering commitment to building something meaningful.",
    name: "Joe Adair",
    role: "Senior Sales Manager",
    company: "Sporting Risk",
    avatar: "/avatars/joeadair.jfif",
  },
  {
    quote:
      "As a designer, you hope to work with people who have a vision, are driven to make a big impact, and who constantly push themselves to grow—and Will was certainly that.",
    name: "Eduardo de Souza",
    role: "Design Leader",
    company: "WA Technology",
    avatar: "/avatars/eduardodesouza.png",
  },
  {
    quote:
      "It was a pleasure working alongside Will. His commitment and reliability made him someone I could always count on.",
    name: "Andreia Barros",
    role: "Account Manager",
    company: "Playtech",
    avatar: "/avatars/andreiabarros.jfif",
  },
  {
    quote:
      "Working with Will made projects smoother and more efficient. His hard work and accountability never went unnoticed.",
    name: "Michael Stephen",
    role: "Head of Trading Ops",
    company: "Angstrom Sports",
    avatar: "/avatars/michaelstephen.jfif",
  },
  {
    quote:
      "Will has been the sole architect of the product from inception to launch. Defining the product, how it works end-to-end and collaborating effectively with all business stakeholders.",
    name: "Morgan Collins",
    role: "Head of Product",
    company: "WA Technology",
    avatar: "/avatars/morgancollins.png",
  },
  {
    quote:
      "It was a pleasure to manage and work alongside Will. His commitment and work ethic were unquestionable, and he was always someone I could rely on.",
    name: "Sean Bannister",
    role: "Head of Tax",
    company: "Edwin Coe LLP",
    avatar: "/avatars/seanbannister.jfif",
  },
  {
    quote:
      "Will was a fantastic teammate. He consistently delivered high-quality work and supported others whenever needed.",
    name: "Michael Graham",
    role: "Head of Tax",
    company: "Sanders Chartered Accountants",
    avatar: "/avatars/michaelgraham.jfif",
  },
  {
    quote:
      "Will was a fantastic team member to manage. His hard work and commitment never went unnoticed, and I could always count on him to deliver.",
    name: "Michael Phillips",
    role: "Head of Sportsbook & Casino",
    company: "BestOdds",
    avatar: "/avatars/michaelphillips.jfif",
  },
];

const topRow = testimonials.slice(0, 6);
const bottomRow = testimonials.slice(6);

type Testimonial = (typeof testimonials)[number] & { avatar?: string };
type Direction = "left" | "right";

// Duration in ms for one full loop at normal and slow speed
const LOOP_MS = {
  normal: { left: 40_000, right: 44_000 },
  slow:   { left: 160_000, right: 176_000 },
};

function TestimonialCard({ quote, name, role, company, avatar }: Testimonial) {
  return (
    <div className="w-80 flex-shrink-0 bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 select-none">
      <p className="text-[#1C1C1C] text-sm leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt={name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#F0F0F0] flex items-center justify-center flex-shrink-0">
            <span className="text-[13px] font-semibold text-[#AAA]">
              {name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-[#1C1C1C] text-sm font-semibold">{name}</p>
          <p className="text-[#888888] text-xs mt-0.5">
            {role} &middot; {company}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  cards,
  direction,
}: {
  cards: Testimonial[];
  direction: Direction;
}) {
  const doubled = [...cards, ...cards];
  const trackRef  = useRef<HTMLDivElement>(null);

  // Mutable refs — no re-renders needed
  const posRef      = useRef(0);           // progress 0–1 through one loop
  const slowRef     = useRef(false);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef      = useRef<number>(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    // Measure after first paint so scrollWidth is accurate
    const totalWidth = el.scrollWidth / 2;

    function tick(timestamp: number) {
      if (lastTimeRef.current === null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const duration = slowRef.current
        ? LOOP_MS.slow[direction]
        : LOOP_MS.normal[direction];

      // Advance position; wrap at 1 for seamless loop
      posRef.current = (posRef.current + delta / duration) % 1;

      // left scrolls 0→-totalWidth; right scrolls -totalWidth→0
      const translateX =
        direction === "left"
          ? -posRef.current * totalWidth
          : -(1 - posRef.current) * totalWidth;

      el.style.transform = `translateX(${translateX}px)`;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction]);

  return (
    <div
      className="overflow-visible w-full py-3"
      onMouseEnter={() => { slowRef.current = true; }}
      onMouseLeave={() => { slowRef.current = false; }}
    >
      <div ref={trackRef} className="flex gap-5 w-max">
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-16 bg-[#FFFFFF]">
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquareQuote size={20} strokeWidth={1.8} className="text-[#1C1C1C]" />
          <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
            What People Say
          </h2>
        </div>
        <p className="text-sm text-[#888888] ml-7">
          Kind words from colleagues and collaborators
        </p>
      </div>

      <div
        className="relative flex flex-col gap-5 overflow-hidden"
        style={{
          // Fade stops align with max-w-5xl (64rem) auto margins + px-6 (1.5rem) padding,
          // matching the horizontal start of every other section on the page.
          maskImage:
            "linear-gradient(to right, transparent 0%, transparent max(0px, calc((100% - 64rem) / 2)), black calc(max(0px, (100% - 64rem) / 2) + 1.5rem), black calc(100% - max(0px, (100% - 64rem) / 2) - 1.5rem), transparent calc(100% - max(0px, (100% - 64rem) / 2)), transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, transparent max(0px, calc((100% - 64rem) / 2)), black calc(max(0px, (100% - 64rem) / 2) + 1.5rem), black calc(100% - max(0px, (100% - 64rem) / 2) - 1.5rem), transparent calc(100% - max(0px, (100% - 64rem) / 2)), transparent 100%)",
        }}
      >
        <MarqueeRow cards={topRow} direction="left" />
        <MarqueeRow cards={bottomRow} direction="right" />
      </div>
    </section>
  );
}
