'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import projects from '@/data/projects';
import TLDRWidget from '@/components/TLDRWidget';
import ArticleTOC from '@/components/ArticleTOC';

// ── Highlighted context paragraph ──────────────────────────────────────────────

function loadRoughNotation(cb) {
  if (window.RoughNotation) { cb(); return; }
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/rough-notation/lib/rough-notation.iife.js';
  s.onload = cb;
  document.head.appendChild(s);
}

function RoughHighlight({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    let ann;
    loadRoughNotation(() => {
      if (!ref.current) return;
      ann = window.RoughNotation.annotate(ref.current, { type: 'highlight', color: 'rgba(255,214,0,0.5)', multiline: true, animate: true, animationDuration: 600, padding: 2 });
      setTimeout(() => ann.show(), 400);
    });
    return () => ann?.hide();
  }, []);
  return <span ref={ref}>{children}</span>;
}

function RoughUnderline({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    let ann;
    loadRoughNotation(() => {
      if (!ref.current) return;
      ann = window.RoughNotation.annotate(ref.current, { type: 'underline', color: '#F472B6', strokeWidth: 2, animate: true, animationDuration: 600 });
      setTimeout(() => ann.show(), 400);
    });
    return () => ann?.hide();
  }, []);
  return <span ref={ref}>{children}</span>;
}

function RoughBracket({ children, style }) {
  const ref = useRef(null);
  useEffect(() => {
    let ann;
    loadRoughNotation(() => {
      if (!ref.current) return;
      ann = window.RoughNotation.annotate(ref.current, { type: 'bracket', brackets: ['left', 'right'], color: '#1C1C1C', strokeWidth: 1.5, animate: true, animationDuration: 600 });
      setTimeout(() => ann.show(), 400);
    });
    return () => ann?.hide();
  }, []);
  return <p ref={ref} style={style}>{children}</p>;
}

function splitWithPhrases(text, highlights, underlines) {
  let parts = [{ text, type: null }];
  (highlights || []).forEach(phrase => {
    parts = parts.flatMap(part => {
      if (part.type) return [part];
      const pieces = part.text.split(phrase);
      return pieces.flatMap((piece, i) => {
        const result = [{ text: piece, type: null }];
        if (i < pieces.length - 1) result.push({ text: phrase, type: 'highlight' });
        return result;
      });
    });
  });
  (underlines || []).forEach(phrase => {
    parts = parts.flatMap(part => {
      if (part.type) return [part];
      const pieces = part.text.split(phrase);
      return pieces.flatMap((piece, i) => {
        const result = [{ text: piece, type: null }];
        if (i < pieces.length - 1) result.push({ text: phrase, type: 'underline' });
        return result;
      });
    });
  });
  return parts;
}

function ContextParagraph({ text, highlights, underlines, bracket, style }) {
  const hasAnnotations = (highlights?.length > 0) || (underlines?.length > 0);
  const parts = hasAnnotations ? splitWithPhrases(text, highlights, underlines) : null;

  const inner = parts
    ? parts.map((part, i) =>
        part.type === 'highlight' ? <RoughHighlight key={i}>{part.text}</RoughHighlight>
        : part.type === 'underline' ? <RoughUnderline key={i}>{part.text}</RoughUnderline>
        : part.text
      )
    : text;

  if (bracket) return <RoughBracket style={style}>{inner}</RoughBracket>;
  return <p style={style}>{inner}</p>;
}

// ── Annotated Section Body ─────────────────────────────────────────────────────

function AnnotatedSectionBody({ body, annotations, style }) {
  const paragraphs = body.split('\n\n');
  const circleRefs = useRef({});
  const bracketRefs = useRef({});

  useEffect(() => {
    if (!annotations || annotations.length === 0) return;
    const anns = [];

    function init() {
      const RN = window.RoughNotation;
      if (!RN) return;

      annotations.forEach(ann => {
        if (ann.type === 'underline') {
          const el = circleRefs.current[`${ann.paragraphIdx}_underline`];
          if (!el) return;
          const a = RN.annotate(el, {
            type: 'underline',
            color: '#F472B6',
            strokeWidth: 2,
            animate: true,
            animationDuration: 600,
          });
          setTimeout(() => a.show(), 400);
          anns.push(a);
        } else if (ann.type === 'circle') {
          const el = circleRefs.current[ann.paragraphIdx];
          if (!el) return;
          const a = RN.annotate(el, {
            type: 'circle',
            color: '#3B5BDB',
            strokeWidth: 1.5,
            padding: 4,
            animate: true,
            animationDuration: 600,
          });
          setTimeout(() => a.show(), 400);
          anns.push(a);
        } else if (ann.type === 'bracket') {
          const el = bracketRefs.current[ann.paragraphIdx];
          if (!el) return;
          const a = RN.annotate(el, {
            type: 'bracket',
            color: '#3B5BDB',
            strokeWidth: 2,
            brackets: ['right'],
            animate: true,
            animationDuration: 600,
          });
          setTimeout(() => a.show(), 500);
          anns.push(a);
        }
      });
    }

    if (window.RoughNotation) {
      init();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/rough-notation/lib/rough-notation.iife.js';
      script.onload = init;
      document.head.appendChild(script);
    }

    return () => anns.forEach(a => a?.hide());
  }, [annotations]);

  return (
    <>
      {paragraphs.map((para, j) => {
        const circleAnn = annotations?.find(a => a.type === 'circle' && a.paragraphIdx === j);
        const bracketAnn = annotations?.find(a => a.type === 'bracket' && a.paragraphIdx === j);
        const isLast = j === paragraphs.length - 1;
        const paraStyle = { ...style, marginBottom: isLast ? 0 : 16 };

        const highlightAnn = annotations?.find(a => a.type === 'highlight' && a.paragraphIdx === j);
        const underlineAnn = annotations?.find(a => a.type === 'underline' && a.paragraphIdx === j);

        let pEl;
        if (underlineAnn) {
          const parts = para.split(underlineAnn.phrase);
          pEl = (
            <p style={paraStyle}>
              {parts.map((piece, i) => (
                <span key={i}>
                  {piece}
                  {i < parts.length - 1 && (
                    <span ref={el => { circleRefs.current[`${j}_underline`] = el; }}>{underlineAnn.phrase}</span>
                  )}
                </span>
              ))}
            </p>
          );
        } else if (highlightAnn) {
          const parts = para.split(highlightAnn.phrase);
          pEl = (
            <p style={paraStyle}>
              {parts.map((piece, i) => (
                <span key={i}>
                  {piece}
                  {i < parts.length - 1 && (
                    <span style={{ backgroundColor: 'rgba(255,214,0,0.5)', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone', padding: '2px 0' }}>{highlightAnn.phrase}</span>
                  )}
                </span>
              ))}
            </p>
          );
        } else if (circleAnn) {
          const parts = para.split(circleAnn.phrase);
          pEl = (
            <p style={paraStyle}>
              {parts.map((piece, i) => (
                <span key={i}>
                  {piece}
                  {i < parts.length - 1 && (
                    <span ref={el => { circleRefs.current[j] = el; }}>{circleAnn.phrase}</span>
                  )}
                </span>
              ))}
            </p>
          );
        } else if (bracketAnn) {
          pEl = (
            <p ref={el => { bracketRefs.current[j] = el; }} style={paraStyle}>{para}</p>
          );
        } else {
          pEl = <p style={paraStyle}>{para}</p>;
        }

        if (bracketAnn) {
          return (
            <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 20, paddingRight: 4 }}>
              <div style={{ flex: 1 }}>{pEl}</div>
              <span style={{
                fontFamily: "'Edu NSW ACT Foundation', cursive",
                fontSize: 16,
                color: '#3B5BDB',
                flexShrink: 0,
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)',
                alignSelf: 'center',
              }}>
                {bracketAnn.label}
              </span>
            </div>
          );
        }

        return <span key={j} style={{ display: 'block' }}>{pEl}</span>;
      })}
    </>
  );
}

// ── Polaroid Fan ───────────────────────────────────────────────────────────────

function PolaroidCard({ image, gradient, left, rotate, zBase }) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        bottom: -40,
        width: 152,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center bottom',
        boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
        zIndex: zBase,
        cursor: 'default',
      }}
    >
      <div style={{ background: 'white', padding: 4, borderRadius: 10 }}>
        <div style={{ aspectRatio: '4/3', borderRadius: 7, overflow: 'hidden', background: gradient || '#e0e0e0' }}>
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
      </div>
    </div>
  );
}

function PolaroidFan({ images, gradient }) {
  const cards = [
    { left: 20,  rotate: -11, zBase: 1 },
    { left: 118, rotate:  -1, zBase: 2 },
    { left: 216, rotate:   9, zBase: 3 },
  ];
  return (
    <div style={{ width: 400, height: 200, overflow: 'hidden', alignSelf: 'flex-end', position: 'relative', flexShrink: 0 }}>
      {cards.map((c, i) => (
        <PolaroidCard
          key={i}
          image={images?.[i] ?? null}
          gradient={gradient}
          left={c.left}
          rotate={c.rotate}
          zBase={c.zBase}
        />
      ))}
    </div>
  );
}

// ── Photo Cell ─────────────────────────────────────────────────────────────────

function PhotoCell({ image, caption, gradient, style: extraStyle = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 12, overflow: 'hidden', position: 'relative', ...extraStyle }}
    >
      <div style={{
        width: '100%', height: '100%',
        background: gradient || '#d0d0d0',
        filter: hovered ? 'brightness(0.75) saturate(1)' : 'brightness(0.35) saturate(0.5)',
        transition: 'filter 0.3s ease',
      }}>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
      </div>
      {caption && (
        <p style={{
          position: 'absolute', bottom: 12, left: 12, right: 12,
          color: 'white', fontSize: 11, fontWeight: 500,
          opacity: hovered ? 0.85 : 0.5, transition: 'opacity 0.3s ease', margin: 0,
        }}>
          {caption}
        </p>
      )}
    </div>
  );
}

// ── Sidebar Card ───────────────────────────────────────────────────────────────

function SidebarCard({ label, children }) {
  return (
    <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: 20 }}>
      <p style={{
        fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#AAA', marginBottom: 12, marginTop: 0,
      }}>
        {label}
      </p>
      {children}
    </div>
  );
}

// ── Section label ──────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 600, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: '#AAA', marginBottom: 16, marginTop: 0,
    }}>
      {children}
    </p>
  );
}

// ── Player Carousel ────────────────────────────────────────────────────────────

function PlayerCarousel({ images }) {
  const doubled = [...images, ...images];
  return (
    <div style={{ flex: 2, overflow: 'hidden', borderRadius: 10, alignSelf: 'center' }}>
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        width: 'max-content',
        animation: 'scroll-left 30s linear infinite',
      }}>
        {doubled.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt="" style={{ width: 200, height: 'auto', borderRadius: 8, display: 'block', flexShrink: 0 }} />
        ))}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const params  = useParams();
  const project = projects.find((p) => p.slug === params?.slug);

  if (!project) { notFound(); return null; }

  const tldrBullets = project.tldrBullets ?? [];

  function slugify(title) {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  const tocItems = [
    ...(project.context      ? [{ id: 'context',       text: 'Context',       level: 2 }] : []),
    ...(project.opportunity  ? [{ id: 'opportunity',   text: 'The Problem',   level: 2 }] : []),
    ...(project.sections?.map((s) => ({ id: slugify(s.title), text: s.title, level: 2 })) ?? []),
    ...(project.research     ? [{ id: 'research',      text: 'Research',      level: 2 }] : []),
    ...(project.development  ? [{ id: 'development',   text: 'Development',   level: 2 }] : []),
    ...(project.testing      ? [{ id: 'testing',       text: 'Testing',       level: 2 }] : []),
    ...(project.finalProduct ? [{ id: 'final-product', text: 'Final Product', level: 2 }] : []),
  ];

  const sectionBody = { fontSize: 15, color: '#555', lineHeight: 1.8, margin: 0 };
  const mb40 = { marginBottom: 40 };

  return (
    <div className={`min-h-screen bg-white`}>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-1">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#EBEBEB] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150 mb-10"
        >
          <ChevronLeft size={13} strokeWidth={2.5} />
          All Projects
        </Link>
        <div className="mb-10">
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-4">
            {project.category?.filter((c) => c !== 'B2B').slice(0, 1).map((c) => (
              <span key={c} className="text-[11px] font-semibold uppercase tracking-widest text-[#888]">{c}</span>
            ))}
            {project.dateRange && (
              <>
                <span className="text-[#DDD]">·</span>
                <span className="text-[11px] text-[#AAA]">{project.dateRange}</span>
              </>
            )}
            {project.duration && (
              <>
                <span className="text-[#DDD]">·</span>
                <span className="text-[11px] text-[#AAA]">{project.duration}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1
            style={{ fontSize: '2.4rem', lineHeight: 1.2, color: '#1C1C1C', maxWidth: 640, margin: '0 0 20px 0' }}
          >
            {project.title}
          </h1>

        </div>
        <div className="h-[2px] bg-[#1C1C1C] w-full mb-2" />
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div style={{ paddingTop: '10px' }} className="max-w-5xl mx-auto px-6">
        <div className="flex gap-16 items-start">
          <div className="flex-1 min-w-0">

          {/* Overview section */}
          <section id="overview" style={{ scrollMarginTop: 80 }}>
            {/* Hero images — 2-column row */}
            {!project.hideHeroGrid && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                {[0, 2].map((i) => {
                  const src = project.heroImages?.[i];
                  return (
                    <div
                      key={i}
                      style={{
                        height: 280, borderRadius: 12, overflow: 'hidden',
                        background: project.heroImagesBg?.[i] ?? project.gradient ?? '#1C1C1C',
                      }}
                    >
                      {i === 0 && project.heroVideo ? (
                        <video src={project.heroVideo} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: project.heroImagesFit?.[i] ?? 'cover', padding: project.heroImagesFit?.[i] === 'contain' ? '12px' : 0 }} />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TL;DR widget */}
            {tldrBullets.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <TLDRWidget bullets={tldrBullets} />
              </div>
            )}

            {/* Role + Duration */}
            {(project.role || project.durationMonths) && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                {project.role && (
                  <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: 20 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAA', marginBottom: 12, marginTop: 0 }}>My Role</p>
                    <p style={{ fontSize: '1.2rem', color: '#1C1C1C', marginBottom: project.roleDescription ? 8 : 0, marginTop: 0 }}>
                      {project.role}
                    </p>
                    {project.roleDescription && (
                      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.65, margin: 0 }}>{project.roleDescription}</p>
                    )}
                  </div>
                )}
                {project.durationMonths && (
                  <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: 20 }}>
                    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAA', marginBottom: 12, marginTop: 0 }}>Duration</p>
                    <p style={{ fontSize: '1.2rem', color: '#1C1C1C', marginBottom: project.durationDescription ? 8 : 0, marginTop: 0 }}>
                      {project.durationMonths} Months
                    </p>
                    {project.durationDescription && (
                      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.65, marginBottom: 12, marginTop: 0 }}>{project.durationDescription}</p>
                    )}
                    {project.dateRange && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                        <span style={{ fontSize: 11, color: '#888' }}>{project.dateRange}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Context */}
            {project.context && (
              <div id="context" style={mb40}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1C1C', marginBottom: 12, marginTop: 0 }}>Context</h3>
                <ContextParagraph text={project.context} highlights={project.contextHighlights} style={sectionBody} />
              </div>
            )}

            {/* Opportunity */}
            {project.opportunity && (
              <div id="opportunity" style={mb40}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1C1C', marginBottom: 12, marginTop: 0 }}>The Problem</h3>
                {project.opportunity.split('\n\n').map((para, i) => (
                  <ContextParagraph key={i} text={para} highlights={i === 0 ? [] : project.opportunityHighlights} underlines={i === 0 ? [] : project.opportunityUnderlines} bracket={i === 0 && !!project.opportunityBracket} style={{ ...sectionBody, marginBottom: 12 }} />
                ))}
              </div>
            )}

            {/* Opportunity images */}
            {project.opportunityImages?.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', ...mb40 }}>
                {project.opportunityImages.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="" style={{ width: project.opportunityImageWidth ?? 'auto', height: project.opportunityImageHeight ?? 200, borderRadius: 10, display: 'block', objectFit: 'contain' }} />
                ))}
              </div>
            )}

            {/* Custom sections */}
            {project.sections?.map((section, i) => (
              <div key={i} id={slugify(section.title)} style={mb40}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1C1C', marginBottom: 12, marginTop: 0 }}>{section.title}</h3>
                <AnnotatedSectionBody body={section.body} annotations={section.annotations} style={sectionBody} />
                {section.video && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
                    <video
                      src={section.video}
                      autoPlay loop muted playsInline
                      style={{ width: section.videoWidth ?? 250, borderRadius: 10, display: 'block' }}
                    />
                  </div>
                )}
                {section.videos?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 16 }}>
                    {section.videos.map((src, vi) => (
                      <video
                        key={vi}
                        src={src}
                        autoPlay loop muted playsInline
                        style={{ flex: '1 1 140px', maxWidth: 250, minWidth: 0, borderRadius: 10, display: 'block' }}
                      />
                    ))}
                  </div>
                )}
                {section.mediaRow && (
                  <div style={{ display: 'flex', gap: 24, marginTop: 16, alignItems: 'center' }}>
                    <video
                      src={section.mediaRow.video}
                      autoPlay loop muted playsInline
                      style={{ flex: 1, minWidth: 0, borderRadius: 10, display: 'block' }}
                    />
                    {section.mediaRow.carousel && (
                      <PlayerCarousel images={section.mediaRow.carousel} />
                    )}
                  </div>
                )}
                {section.image && (
                  <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.image}
                      alt=""
                      style={{ width: section.imageWidth ?? '100%', borderRadius: 10, display: 'block' }}
                    />
                  </div>
                )}
                {section.images?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16, justifyContent: 'center' }}>
                    {section.images.map((src, ii) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={ii}
                        src={src}
                        alt=""
                        style={{ flex: '1 1 80px', maxWidth: 128, minWidth: 0, borderRadius: 10, display: 'block', objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Overview text */}
            {project.overview && (
              <p style={{ ...sectionBody, ...mb40 }}>{project.overview}</p>
            )}
          </section>

          {/* Research section */}
          {project.research && (
            <section id="research" style={{ ...mb40, scrollMarginTop: 80 }}>
              <SectionLabel>Research</SectionLabel>
              <p style={sectionBody}>{project.research}</p>
            </section>
          )}

          {/* Photo grid */}
          {project.images?.length > 0 && (
            <div style={mb40}>
              <SectionLabel>From the Project</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
                <PhotoCell image={project.images[0]} caption="Overview" gradient={project.gradient} style={{ minHeight: 300 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <PhotoCell image={project.images[1]} caption="Detail" gradient={project.gradient} style={{ flex: 1 }} />
                  <PhotoCell image={project.images[2]} caption="Detail" gradient={project.gradient} style={{ flex: 1 }} />
                </div>
              </div>
            </div>
          )}

          {/* Development section */}
          {project.development && (
            <section id="development" style={{ ...mb40, scrollMarginTop: 80 }}>
              <SectionLabel>Development</SectionLabel>
              <p style={sectionBody}>{project.development}</p>
            </section>
          )}

          {/* Pull quote */}
          {project.pullQuote && (
            <div style={{ borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB', padding: '24px 0', ...mb40 }}>
              <p
                style={{ fontSize: '1.2rem', color: '#1C1C1C', lineHeight: 1.55, fontStyle: 'italic', marginBottom: 8, marginTop: 0 }}
              >
                {project.pullQuote}
              </p>
              {project.pullQuoteAttribution && (
                <p style={{ fontSize: 12, color: '#888', margin: 0 }}>{project.pullQuoteAttribution}</p>
              )}
            </div>
          )}

          {/* Testing section */}
          {project.testing && (
            <section id="testing" style={{ ...mb40, scrollMarginTop: 80 }}>
              <SectionLabel>Testing</SectionLabel>
              <p style={sectionBody}>{project.testing}</p>
            </section>
          )}

          {/* Before & After */}
          {project.beforeAfterImages?.length >= 2 && (
            <div style={mb40}>
              <SectionLabel>Before &amp; After</SectionLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <PhotoCell image={project.beforeAfterImages[0]} caption="Before" gradient={project.gradient} style={{ height: 200 }} />
                <PhotoCell image={project.beforeAfterImages[1]} caption="After"  gradient={project.gradient} style={{ height: 200 }} />
              </div>
            </div>
          )}

          {/* Final Product section */}
          {project.finalProduct && (
            <section id="final-product" style={{ ...mb40, scrollMarginTop: 80 }}>
              <SectionLabel>Final Product</SectionLabel>
              <p style={sectionBody}>{project.finalProduct}</p>
            </section>
          )}

          {/* Prev / Next */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
            marginTop: 40, paddingTop: 36, borderTop: '1px solid #EBEBEB', paddingBottom: 80,
          }}>
            {project.prevProject ? (
              <Link href={`/projects/${project.prevProject.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '16px 20px', cursor: 'pointer' }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAA', marginBottom: 6, marginTop: 0 }}>
                    ← Previous
                  </p>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: '#1C1C1C', margin: 0 }}>{project.prevProject.title}</p>
                </div>
              </Link>
            ) : <div />}

            {project.nextProject ? (
              <Link href={`/projects/${project.nextProject.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'white', border: '1px solid #EBEBEB', borderRadius: 12, padding: '16px 20px', textAlign: 'right', cursor: 'pointer' }}>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#AAA', marginBottom: 6, marginTop: 0 }}>
                    Next →
                  </p>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: '#1C1C1C', margin: 0 }}>{project.nextProject.title}</p>
                </div>
              </Link>
            ) : <div />}
          </div>
          </div>{/* /flex-1 */}

          {/* Sticky TOC */}
          {tocItems.length > 0 && (
            <div className="hidden lg:block w-[200px] flex-shrink-0 sticky top-8 self-start">
              <ArticleTOC items={tocItems} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
