"use client";
import { useRef } from "react";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

const projects = [
  {
    slug: "pickem",
    title: "Pick'em",
    description:
      "A B2B 'More or Less' sports prediction product built from scratch — live across 5 continents in 12 months.",
    duration: "12 Months",
    season: "2023–2024",
    role: "Senior Product Manager",
    images: [
      "/images/pickem/pickem.png",
      "/images/pickem/pickem.png",
      "/videos/pickem-1.webm",
    ],
  },
  {
    slug: "reveals",
    title: "Reveals",
    description:
      "A free-to-play daily engagement product for sportsbooks, built around Gacha mechanics and an AI personalisation loop.",
    duration: "6 Months",
    season: "2024",
    role: "Product Manager",
    images: [
      "/images/reveals/reveals-thumb2.png",
      "/images/reveals/reveals-thumb2.png",
      "/videos/reveals.webm",
    ],
  },
  {
    slug: "predict-6",
    title: "Predict 6",
    description:
      "The first white-label free-to-play score predictor — Sky Super 6 mechanics, available to every operator.",
    duration: "2 Months",
    season: "2025",
    role: "Associate Product Manager",
    images: [
      "/images/predict6/predict6-thumb1.png",
      "https://placehold.co/250x275/bcbcbc/888",
      "/images/predict6/predict6-thumb2.png",
    ],
  },
];

function ImageStack({ images }: { images: string[] }) {
  const backRef = useRef<HTMLVideoElement>(null);
  const frontRef = useRef<HTMLVideoElement>(null);

  function handleMouseEnter() {
    backRef.current?.play();
    frontRef.current?.play();
  }
  function handleMouseLeave() {
    backRef.current?.pause();
    frontRef.current?.pause();
  }

  return (
    <div
      className="relative w-[250px] h-[275px] mb-10 mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Back — video or image */}
      {images[0].endsWith(".webm") ? (
        <video
          ref={backRef}
          src={images[0]}
          loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-[28px] shadow-md origin-bottom
                     -rotate-6 -translate-x-2
                     transition-all duration-300
                     group-hover:rotate-[-14deg] group-hover:-translate-x-7 group-hover:translate-y-1"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={images[0]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[28px] shadow-md origin-bottom
                     -rotate-6 -translate-x-2
                     transition-all duration-300
                     group-hover:rotate-[-14deg] group-hover:-translate-x-7 group-hover:translate-y-1"
        />
      )}
      {/* Front — video or image; carries the feature shadow */}
      {images[2].endsWith(".webm") ? (
        <video
          ref={frontRef}
          src={images[2]}
          loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover rounded-[28px] origin-bottom
                     shadow-[0px_10px_58px_rgba(94,94,94,0.17)]
                     transition-all duration-300
                     group-hover:rotate-[4deg] group-hover:translate-x-4"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={images[2]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[28px] origin-bottom
                     shadow-[0px_10px_58px_rgba(94,94,94,0.17)]
                     transition-all duration-300
                     group-hover:rotate-[4deg] group-hover:translate-x-4"
        />
      )}
    </div>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="py-16 bg-white">
      <style>{`
        @media (max-width: 768px) {
          /* Grid → stacked column, no gap (card margin handles spacing) */
          .fp-grid {
            display: flex !important;
            flex-direction: column;
            gap: 0 !important;
            padding: 0 !important;
          }

          /* Card: white, rounded, shadowed, padded */
          .fp-card {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
            padding: 24px;
            margin: 0 0 20px;
            min-height: 44px;
          }

          /* Reorder: title first, then meta, then image, then desc, then role */
          .fp-title { order: 0; }
          .fp-meta  { order: 1; }
          .fp-img   { order: 2; }
          .fp-desc  { order: 3; }
          .fp-role  { order: 4; }

          /* Title */
          .fp-title {
            font-size: 28px !important;
            font-weight: 700 !important;
            line-height: 1.1 !important;
            color: #111111 !important;
            margin-bottom: 0 !important;
          }

          /* Meta spacing */
          .fp-meta { margin-bottom: 0; }

          /* Image wrap: full width, fixed height, no overflow */
          .fp-img {
            width: 100%;
            margin: 20px 0;
          }

          /* ImageStack inner container: fill width, reset height */
          .fp-img > div {
            width: 100% !important;
            height: 220px !important;
            margin-bottom: 0 !important;
          }

          /* Hide back and middle stacked images */
          .fp-img > div img:nth-child(1),
          .fp-img > div img:nth-child(2) {
            display: none !important;
          }

          /* Front image: no rotation, rounded, contain */
          .fp-img > div img:nth-child(3) {
            transform: none !important;
            border-radius: 12px !important;
            object-fit: contain !important;
            background: #f0f4ff;
          }

          /* Description: always visible, no truncation */
          .fp-desc {
            opacity: 1 !important;
            transform: none !important;
            -webkit-line-clamp: unset !important;
            line-clamp: unset !important;
            display: block !important;
            font-size: 15px !important;
            line-height: 1.6 !important;
            color: #555555 !important;
            margin-bottom: 12px !important;
          }

          /* Role: always visible */
          .fp-role {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen size={20} strokeWidth={1.8} className="text-[#1C1C1C]" />
              <h2 className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
                Featured Projects
              </h2>
            </div>
            <p className="text-sm text-[#888888] ml-7">
              A selection of product work I&apos;m proud of
            </p>
          </div>
          <Link
            href="/projects"
            className="flex-shrink-0 bg-[#1C1C1C] text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-neutral-700 transition-colors duration-150"
          >
            See All
          </Link>
        </div>

        {/* Project grid */}
        <div className="fp-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="fp-card group flex flex-col"
            >
              {/* Image stack — reordered to middle on mobile */}
              <div className="fp-img">
                <ImageStack images={project.images} />
              </div>

              {/* Meta row */}
              <div className="fp-meta mb-3">
                <p className="text-sm font-bold text-[#1C1C1C]">
                  {project.duration}
                </p>
                <p className="text-sm text-[#888888]">{project.season}</p>
              </div>

              {/* Title */}
              <h3 className="fp-title text-2xl font-medium text-[#1C1C1C] leading-snug mb-2">
                {project.title}
              </h3>

              {/* Description — hover-only on desktop, always visible on mobile */}
              <p className="fp-desc text-sm text-[#888888] leading-relaxed mb-3 line-clamp-2
                            opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-300">
                {project.description}
              </p>

              {/* Role — hover-only on desktop, always visible on mobile */}
              <p className="fp-role text-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                            transition-all duration-300 delay-75">
                <span className="text-[#888888]">Role — </span>
                <span className="font-bold text-[#1C1C1C]">{project.role}</span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
