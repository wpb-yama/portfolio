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
      className="group bg-white rounded-[20px] border border-[#EBEBEB] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-[3px] hover:shadow-xl flex flex-col md:aspect-square"
      onClick={() => router.push(`/projects/${project.slug}`)}
    >
      {/* Visual block — full-width, fills top */}
      <div
        className="h-48 md:h-auto md:flex-1 relative overflow-hidden"
        style={{ background: project.gradient }}
      >
        {project.cardImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.cardImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
      </div>

      {/* Text content */}
      <div className="p-4 flex-shrink-0">
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

      {/* Dark banner header */}
      <div style={{ background: '#FFFFFF', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#AAA', marginBottom: 20 }}>Projects.</p>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 700, color: '#1C1C1C', letterSpacing: '-1px', lineHeight: 1, margin: '0 0 20px 0' }}>Selected Work</h1>
        <p style={{ fontSize: 15, color: '#888', maxWidth: 480, margin: '0 auto' }}>A selection of product work across iGaming, AI and platform delivery.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6">

        {/* Grid — 1 col on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[14px] pb-20">

          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

      </div>
    </div>
  );
}
