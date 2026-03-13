'use client';

import { useRouter } from 'next/navigation';
import projects from '@/data/projects';

const DiagonalArrow = ({ className = '' }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    className={className}
  >
    <polyline points="7,17 17,7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

function ProjectCard({ project }) {
  const router = useRouter();
  const displayCategory = project.category.find((c) => c !== 'B2B') ?? project.category[0];

  return (
    <div
      className="group bg-white rounded-[20px] border border-[#EBEBEB] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-xl flex flex-col"
      style={{ aspectRatio: '1 / 1' }}
      onClick={() => router.push(`/projects/${project.slug}`)}
    >
      {/* Visual block — full-width, fills top */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{ background: project.gradient }}
      >
        {project.cardImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.cardImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
      </div>

      {/* Text content */}
      <div className="p-6 flex-shrink-0">
          {displayCategory && (
            <p className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-1.5 text-[#AAA]">
              {displayCategory}
            </p>
          )}
          <h2 className={`text-[1.15rem] leading-[1.25] mb-1.5 text-[#1C1C1C]`}>
            {project.title}
          </h2>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[11px] text-[#AAA]">
              {project.season} · {project.duration}
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#F5F5F5] border border-[#EBEBEB] transition-all duration-200 group-hover:bg-[#1C1C1C] group-hover:border-[#1C1C1C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <DiagonalArrow className="text-[#999] group-hover:text-white" />
            </div>
          </div>
        </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div style={{ paddingTop: 64 }}>
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="text-[11px] tracking-widest text-[#AAA] uppercase mb-2">
                Selected Work
              </p>
              <h1 className={`text-5xl text-[#1C1C1C]`}>
                Projects
              </h1>
            </div>
            <p className="text-[12px] text-[#888] pb-1">{projects.length} projects</p>
          </div>
          <div className="h-[2px] bg-[#1C1C1C] w-full mb-8" />
        </div>

        {/* 3-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
            paddingBottom: 80,
          }}
        >

          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </div>
  );
}
