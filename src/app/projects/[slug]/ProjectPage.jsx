'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
      ann = window.RoughNotation.annotate(ref.current, { type: 'underline', color: '#F472B6', strokeWidth: 2, multiline: true, animate: true, animationDuration: 600 });
      setTimeout(() => ann.show(), 400);
    });
    return () => ann?.hide();
  }, []);
  return <span ref={ref}>{children}</span>;
}

function RoughBracket({ children, style, label, brackets = ['bottom'] }) {
  const ref = useRef(null);
  useEffect(() => {
    let ann;
    loadRoughNotation(() => {
      if (!ref.current) return;
      ann = window.RoughNotation.annotate(ref.current, { type: 'bracket', brackets, color: '#3B82F6', strokeWidth: 1.5, animate: true, animationDuration: 600 });
      setTimeout(() => ann.show(), 400);
    });
    return () => ann?.hide();
  }, []);
  return (
    <div>
      <span ref={ref} style={{ ...style, display: 'inline' }}>{children}</span>
      {label && (
        <p style={{
          fontFamily: "'Edu NSW ACT Foundation', cursive",
          fontSize: 13,
          color: '#3B82F6',
          margin: '6px 0 0 0',
        }}>{label}</p>
      )}
    </div>
  );
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

function ContextParagraph({ text, highlights, underlines, bracket, bracketLabel, style }) {
  const hasAnnotations = (highlights?.length > 0) || (underlines?.length > 0);
  const parts = hasAnnotations ? splitWithPhrases(text, highlights, underlines) : null;

  const inner = parts
    ? parts.map((part, i) =>
        part.type === 'highlight' ? <RoughHighlight key={i}>{part.text}</RoughHighlight>
        : part.type === 'underline' ? <RoughUnderline key={i}>{part.text}</RoughUnderline>
        : part.text
      )
    : text;

  if (bracket) return <RoughBracket style={style} label={bracketLabel}>{inner}</RoughBracket>;
  return <p style={style}>{inner}</p>;
}

// ── Annotated Section Body ─────────────────────────────────────────────────────

function AnnotatedSectionBody({ body, annotations, style }) {
  const paragraphs = (body || '').split('\n\n');
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
    <div style={{ flex: 2, overflow: 'hidden', borderRadius: 10, alignSelf: 'center', maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)' }}>
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
          <img key={i} src={src} alt="" style={{ width: 100, height: 'auto', borderRadius: 8, display: 'block', flexShrink: 0 }} />
        ))}
      </div>
    </div>
  );
}

// ── Instagram Profile Card ─────────────────────────────────────────────────────

function IGCard({ handle, name, followers, image }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'white', border: '1px solid #EBEBEB',
      borderRadius: 14, padding: '12px 16px',
    }}>
      {/* Avatar */}
      <div style={{ width: 46, height: 46, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', border: '1px solid #EBEBEB' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '0% 20%' }} />
      </div>
      {/* Info */}
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1C1C1C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{handle}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#3897f0" style={{ flexShrink: 0 }}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.83L6.18 12.42l1.41-1.41 2.99 2.99 6.36-6.36 1.41 1.41-7.76 7.78z"/>
          </svg>
        </div>
        <p style={{ fontSize: 11, color: '#888', margin: 0 }}>{followers} followers</p>
      </div>
    </div>
  );
}

// ── Floating TOC Pill ──────────────────────────────────────────────────────────

function FloatingTOC({ items, isMobile }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return;
    const observers = [];
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  if (!items.length) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(22, 22, 22, 0.9)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderRadius: 999,
      padding: '5px 5px',
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      zIndex: 50,
      boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
      whiteSpace: 'nowrap',
      ...(isMobile ? { maxWidth: 'calc(100vw - 32px)', overflowX: 'auto' } : {}),
    }}>
      {items.map(({ id, text }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: active === id ? 500 : 400,
            color: active === id ? '#1C1C1C' : 'rgba(255,255,255,0.45)',
            background: active === id ? 'white' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

// ── useIsMobile ────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const params  = useParams();
  const project = projects.find((p) => p.slug === params?.slug);

  if (!project) { notFound(); return null; }

  const isMobile = useIsMobile();

  const tldrBullets = project.tldrBullets ?? [];

  function slugify(title) {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  const tocItems = [
    ...(project.opportunitySection ? [{ id: 'opportunity-section', text: project.opportunitySection.label ?? 'Opportunity', level: 2 }] : []),
    ...(project.productDecisions   ? [{ id: 'product-decisions',   text: 'Product decisions', level: 2 }] : []),
    ...(project.coreIdeas          ? [{ id: 'core-ideas',          text: project.coreIdeas.label ?? 'Core ideas',  level: 2 }] : []),
    ...(project.userExperience     ? [{ id: 'user-experience',     text: project.userExperience.label ?? 'User experience', level: 2 }] : []),
    ...(project.integrationProcess ? [{ id: 'integration-process', text: project.integrationProcess.label ?? 'Integration process', level: 2 }] : []),
    ...(project.launch             ? [{ id: 'launch',              text: project.launch.label ?? 'Launch', level: 2 }] : []),
    ...(project.learnings?.length  ? [{ id: 'learnings',           text: "I've learned that", level: 2 }] : []),
    ...(project.sections?.filter((s) => s.title).map((s) => ({ id: slugify(s.title), text: s.title, level: 2 })) ?? []),
    ...(project.research     ? [{ id: 'research',      text: 'Research',      level: 2 }] : []),
    ...(project.development  ? [{ id: 'development',   text: 'Development',   level: 2 }] : []),
    ...(project.testing      ? [{ id: 'testing',       text: 'Testing',       level: 2 }] : []),
    ...(project.finalProduct ? [{ id: 'final-product', text: 'Final Product', level: 2 }] : []),
  ];

  const sectionBody = { fontSize: 15, color: '#555', lineHeight: 1.8, margin: 0 };
  const mb40 = { marginBottom: project.sectionGap ?? 40 };
  const mbSection = project.sectionGap ?? 56;
  const sLabel = { fontFamily: 'Roobert', fontSize: 16, fontWeight: 400, color: '#AAA' };

  return (
    <div className={`min-h-screen bg-white`} style={{ overflowX: 'hidden' }}>

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(rgb(254, 252, 225) -2%, rgb(255, 255, 243) 3%, rgba(255, 255, 255, 0.96) 13%, rgb(255, 255, 255) 23%)' }}>
        <div className="max-w-5xl mx-auto px-6 pt-16 pb-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#E0DDD6] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150 mb-10"
          >
            <ChevronLeft size={13} strokeWidth={2.5} />
            All Projects
          </Link>

          <div style={{ display: 'flex', gap: isMobile ? 20 : 24, alignItems: 'flex-start', flexDirection: isMobile ? 'column' : undefined }}>
            {/* Left: title + description */}
            <div style={{ maxWidth: isMobile ? '100%' : (project.heroAward ? 520 : '100%'), minWidth: 0, width: '100%' }}>
              <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.6rem', lineHeight: 1.15, color: '#1C1C1C', margin: '0 0 16px 0' }}>
                {project.heroTitle ?? project.title}
              </h1>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.75, margin: 0, maxWidth: project.heroAward ? 520 : 680 }}>
                {project.description}
              </p>
            </div>

            {/* Right: award */}
            {project.heroAward && (
              <div style={{ flexShrink: 0, ...(isMobile ? { alignSelf: 'flex-start' } : {}) }}>
                <div style={{ background: 'white', border: '1px solid #E0DDD6', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  {/* Medal icon */}
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="16" cy="19" r="10" fill="#F5F0D8" stroke="#C9A800" strokeWidth="1.5" />
                    <polygon points="16,13 17.5,17 22,17 18.5,19.5 19.8,24 16,21.5 12.2,24 13.5,19.5 10,17 14.5,17" fill="#C9A800" />
                    <path d="M12 10 L10 4 L16 7 L22 4 L20 10" fill="none" stroke="#C9A800" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p style={{ fontSize: 11, color: '#AAA', margin: '0 0 2px 0', lineHeight: 1 }}>{project.heroAward.year}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C', margin: '0 0 1px 0', lineHeight: 1.3 }}>{project.heroAward.title}</p>
                    <p style={{ fontSize: 12, color: '#666', margin: 0, lineHeight: 1.4, whiteSpace: isMobile ? 'normal' : 'nowrap' }}>{project.heroAward.category}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div style={{ paddingTop: '32px' }} className="max-w-5xl mx-auto px-6">
        <div>
          <div>

          {/* Hero images */}
          {!project.hideHeroGrid && project.heroImages?.some(Boolean) && (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${project.heroImages.filter(Boolean).length}, 1fr)`, gap: 10, marginBottom: 40 }}>
              {project.heroImages.filter(Boolean).map((src, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: 'hidden', background: 'transparent', aspectRatio: '1 / 1' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: project.heroImagesFit?.[i] ?? 'cover' }} />
                </div>
              ))}
            </div>
          )}

          {/* Below-hero video */}
          {project.belowHeroVideo && (
            <div style={{ marginBottom: 40 }}>
              <div style={{ width: isMobile ? '100%' : 190, overflow: 'hidden' }}>
                <video src={project.belowHeroVideo} autoPlay loop muted playsInline style={{ width: 'calc(100% + 30px)', marginLeft: -10, display: 'block' }} />
              </div>
            </div>
          )}
          {/* Below-hero images */}
          {project.belowHeroImages?.length > 0 && (
            <div style={{ marginBottom: 40, display: 'flex', gap: 12, justifyContent: isMobile ? 'flex-start' : 'center' }}>
              {project.belowHeroImages.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" style={{ width: isMobile ? '50%' : 'auto', maxHeight: isMobile ? undefined : 380, borderRadius: 12, display: 'block', objectFit: 'contain' }} />
              ))}
            </div>
          )}

          {/* Overview + Impact */}
          {(project.overviewStatement || project.impactStats?.length > 0) && (
            <div style={{ paddingBottom: 40, marginBottom: 40 }}>
              {(project.overviewStatement || project.impactStats?.length > 0) && (() => {
                const hasMetadata = project.role || project.dateRange;
                return (
                  <div style={{ display: 'flex', gap: isMobile ? 32 : 48, alignItems: 'stretch', flexDirection: isMobile ? 'column' : undefined }}>
                    {/* Left: overview + impact */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {project.overviewStatement && (
                        <>
                          <p style={{ ...sLabel, marginBottom: 16, marginTop: 0 }}>Overview</p>
                          <p style={{ fontSize: isMobile ? '1.15rem' : '1.45rem', lineHeight: 1.55, color: '#1C1C1C', margin: '0 0 32px 0', fontWeight: 400 }}>
                            {project.overviewStatement}
                          </p>
                        </>
                      )}
                      {project.impactStats?.length > 0 && (
                        <>
                          <p style={{ ...sLabel, marginBottom: 20, marginTop: 0 }}>Impact</p>
                          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${project.impactStats.length}, 1fr)`, gap: isMobile ? 24 : 24 }}>
                            {project.impactStats.map((stat, i) => (
                              <div key={i}>
                                <p style={{ fontFamily: 'Roobert', fontSize: 30, fontWeight: 400, color: '#1C1C1C', margin: '0 0 4px 0', lineHeight: 1 }}>{stat.value}</p>
                                <p style={{ fontSize: 13, fontWeight: 400, color: '#666', margin: '0 0 10px 0' }}>{stat.label}</p>
                                {stat.delta && (
                                  <p style={{ fontSize: 13, fontWeight: 400, color: '#16a34a', margin: 0, lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                                    <svg width="20" height="20" viewBox="0 0 12 12" fill="none" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                                      <line x1="6" y1="11" x2="6" y2="1" />
                                      <polyline points="2,5 6,1 10,5" />
                                    </svg>
                                    <span>{stat.delta}</span>
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Right: Role + Year */}
                    {hasMetadata && (
                      <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', gap: 20, flexShrink: 0, width: isMobile ? '100%' : 170, paddingTop: isMobile ? 0 : 30, flexWrap: isMobile ? 'wrap' : undefined }}>
                        {project.role && (
                          <div>
                            <p style={{ ...sLabel, margin: '0 0 4px 0' }}>Role</p>
                            <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.4 }}>{project.role}</p>
                          </div>
                        )}
                        {project.services?.length > 0 && (
                          <div>
                            <p style={{ ...sLabel, margin: '0 0 6px 0' }}>Services</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                              {project.services.map((s, i) => (
                                <p key={i} style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.4 }}>{s}</p>
                              ))}
                            </div>
                          </div>
                        )}
                        {project.dateRange && (
                          <div>
                            <p style={{ ...sLabel, margin: '0 0 4px 0' }}>Year</p>
                            <p style={{ fontSize: 13, color: '#555', margin: 0 }}>{project.dateRange}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Opportunity */}
          {project.opportunitySection && (
            <div id="opportunity-section" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <div style={{ display: 'grid', gridTemplateColumns: (!isMobile && project.opportunitySection.bonusWidgets?.length > 0) ? '1fr 1fr' : (project.opportunitySection.imageBelow || !project.opportunitySection.images?.length) ? '1fr' : isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48, alignItems: 'start' }}>
                <div>
                  <p style={{ ...sLabel, margin: '0 0 12px 0' }}>{project.opportunitySection.label}</p>
                  <h2 style={{ fontSize: 28, fontWeight: 400, color: '#1C1C1C', margin: '0 0 28px 0', lineHeight: 1.2 }}>
                    {project.opportunitySection.heading}
                  </h2>
                  {project.opportunitySection.paragraphs?.map((para, i) => {
                    const parts = project.opportunitySection.highlights?.length
                      ? splitWithPhrases(para, project.opportunitySection.highlights, [])
                      : null;
                    return (
                      <span key={i}>
                        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                          {parts
                            ? parts.map((part, j) =>
                                part.type === 'highlight'
                                  ? <RoughHighlight key={j}>{part.text}</RoughHighlight>
                                  : part.text
                              )
                            : para}
                        </p>
                        {i === 0 && project.opportunitySection.pullQuote && (
                          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 16px 0' }}>
                          <div style={{ background: '#FAFAF8', border: '1px solid #EBEBEB', borderRadius: 12, padding: '16px 20px', maxWidth: 420, width: '100%' }}>
                            <p style={{ fontSize: 14, color: '#1C1C1C', lineHeight: 1.65, margin: '0 0 8px 0', fontStyle: 'italic' }}>
                              &ldquo;{project.opportunitySection.pullQuote.text}&rdquo;
                            </p>
                            <p style={{ fontSize: 11, color: '#AAA', margin: 0, fontWeight: 500, letterSpacing: '0.04em' }}>
                              {project.opportunitySection.pullQuote.source}
                            </p>
                          </div>
                          </div>
                        )}
                      </span>
                    );
                  })}
                </div>
                {project.opportunitySection.bonusWidgets?.length > 0 && !isMobile && (
                  <div style={{ position: 'relative', height: 420, marginTop: 32 }}>
                    {project.opportunitySection.bonusWidgets.map((w, i) => {
                      const offsets = [
                        { top: 0,   left: '18%', rotate: 2 },
                        { top: 90,  left: '2%',  rotate: -1.5 },
                        { top: 185, left: '30%', rotate: 1 },
                        { top: 275, left: '5%',  rotate: -1 },
                      ];
                      const o = offsets[i] ?? offsets[0];
                      return (
                        <div key={i} style={{
                          position: 'absolute',
                          top: o.top,
                          left: o.left,
                          width: 190,
                          background: w.bg,
                          borderRadius: 10,
                          padding: '12px 14px',
                          transform: `rotate(${o.rotate}deg)`,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
                          zIndex: 3 - i,
                        }}>
                          <span style={{ ...w.brandStyle, display: 'inline-block', marginBottom: 8 }}>{w.brand}</span>
                          <p style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 4px 0', lineHeight: 1.2 }}>{w.offer}</p>
                          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{w.sub}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
                {project.opportunitySection.images?.length > 0 && !project.opportunitySection.imageBelow && (
                  <div style={{ position: 'relative', height: 480, marginTop: 48 }}>
                    {project.opportunitySection.images.map((src, i) => {
                      const offsets = [
                        { top: 0,   left: '28%', rotate: 1.5,  zIndex: 4, size: 90 },
                        { top: 90,  left: '2%',  rotate: -2,   zIndex: 3, size: 100 },
                        { top: 200, left: '35%', rotate: 1,    zIndex: 2, size: 130 },
                        { top: 310, left: '5%',  rotate: -1.5, zIndex: 1, size: 130 },
                      ];
                      const o = offsets[i] ?? offsets[0];
                      return (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={src} alt="" style={{
                          position: 'absolute',
                          top: o.top,
                          left: o.left,
                          width: o.size,
                          height: o.size,
                          objectFit: 'contain',
                          borderRadius: 16,
                          transform: `rotate(${o.rotate}deg)`,
                          zIndex: o.zIndex,
                          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.14))',
                          display: 'block',
                        }} />
                      );
                    })}
                  </div>
                )}
              </div>
              {project.opportunitySection.wideParagraph && (
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, margin: '20px 0 0 0' }}>
                  {project.opportunitySection.highlights?.length
                    ? splitWithPhrases(project.opportunitySection.wideParagraph, project.opportunitySection.highlights, []).map((part, j) =>
                        part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                      )
                    : project.opportunitySection.wideParagraph}
                </p>
              )}
              {project.opportunitySection.images?.length > 0 && project.opportunitySection.imageBelow && (
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 16 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.opportunitySection.images[0]} alt="" style={{ width: isMobile ? '100%' : '40%', borderRadius: 12, display: 'block', objectFit: 'cover' }} />
                  {project.opportunitySection.imageLabel && !isMobile && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, paddingTop: 12 }}>
                      <span style={{ fontFamily: "'Edu NSW ACT Foundation', cursive", fontSize: 13, color: '#888', maxWidth: 150, lineHeight: 1.4 }}>
                        {project.opportunitySection.imageLabel}
                      </span>
                      <svg width="52" height="32" viewBox="0 0 52 32" fill="none" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M48 6 C36 4 18 12 6 24" />
                        <path d="M6 24 L14 22" />
                        <path d="M6 24 L8 16" />
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Core ideas */}
          {project.coreIdeas && (
            <div id="core-ideas" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <p style={{ ...sLabel, margin: '0 0 12px 0' }}>{project.coreIdeas.label}</p>
              <h2 style={{ fontSize: 28, fontWeight: 400, color: '#1C1C1C', margin: '0 0 20px 0', lineHeight: 1.2 }}>
                {project.coreIdeas.heading}
              </h2>
              {project.coreIdeas.intro && (
                <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: '0 0 40px 0', maxWidth: '52%' }}>
                  {project.coreIdeas.intro}
                </p>
              )}
              {project.coreIdeas.ideas?.map((idea, i) => (
                <div key={i}>
                  <div style={{ borderTop: '1px solid #EBEBEB', paddingTop: 32, paddingBottom: idea.images?.length ? 0 : 32 }}>
                    {idea.video && !idea.videoWide ? (
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40, alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: 13, color: '#AAA', margin: '0 0 8px 0' }}>#{i + 1}</p>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#1C1C1C', margin: '0 0 16px 0', lineHeight: 1.3 }}>{idea.title}</h3>
                          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>
                            {idea.highlights?.length
                              ? splitWithPhrases(idea.body, idea.highlights, []).map((part, j) =>
                                  part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                                )
                              : idea.body}
                          </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <video src={idea.video} autoPlay loop muted playsInline style={{ width: isMobile ? '100%' : 200, height: isMobile ? 'auto' : 444.44, aspectRatio: isMobile ? '9/16' : undefined, borderRadius: 10, display: 'block', objectFit: 'cover' }} />
                        </div>
                      </div>
                    ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40 }}>
                      <div>
                        <p style={{ fontSize: 13, color: '#AAA', margin: '0 0 8px 0' }}>#{i + 1}</p>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#1C1C1C', margin: '0 0 6px 0', lineHeight: 1.3 }}>{idea.title}</h3>
                        {idea.bracketNote && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: "'Edu NSW ACT Foundation', cursive", fontSize: 13, color: '#888' }}>
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="#888" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 16 C6.8 12 7.3 8.5 7 3" />
                              <path d="M7 3 C5.5 5.5 4 6.5 2 7.5" />
                              <path d="M7 3 C8.5 5.5 10 6.5 12 7.5" />
                            </svg>
                            {idea.bracketNote}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>
                        {idea.highlights?.length
                          ? splitWithPhrases(idea.body, idea.highlights, []).map((part, j) =>
                              part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                            )
                          : idea.body}
                      </p>
                    </div>
                    )}
                    {idea.igCards?.length > 0 && (() => {
                      const rotations = [-3, 1.5, -1, 2.5, -2];
                      const tops = [8, 0, 12, 4, 10];
                      if (isMobile) {
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24, marginBottom: 24 }}>
                            {idea.igCards.map((card, ii) => (
                              <div key={ii} style={{ borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                                <IGCard {...card} />
                              </div>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <div style={{ position: 'relative', height: 100, marginTop: 32, marginBottom: 48 }}>
                          {idea.igCards.map((card, ii) => (
                            <div key={ii} style={{
                              position: 'absolute',
                              left: `${ii * 17}%`,
                              top: tops[ii],
                              transform: `rotate(${rotations[ii]}deg)`,
                              zIndex: ii,
                              width: 210,
                              boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                              borderRadius: 14,
                            }}>
                              <IGCard {...card} />
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                    {!idea.igCards && !idea.video && idea.images?.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28, marginBottom: 32 }}>
                        {idea.images.map((src, ii) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={ii} src={src} alt="" style={{ width: '100%', borderRadius: 12, display: 'block', objectFit: 'cover', maxHeight: 320 }} />
                        ))}
                      </div>
                    )}
                    {idea.videoWide && idea.video && (
                      <div style={{ marginTop: 28, marginBottom: 32 }}>
                        <video src={idea.video} autoPlay loop muted playsInline style={{ width: '100%', borderRadius: 12, display: 'block' }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Game Section */}
          {project.gameSection && (
            <div id="game-section" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : project.gameSection.video ? '1fr auto' : '1fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
                <div>
                  <p style={{ ...sLabel, margin: '0 0 16px 0' }}>{project.gameSection.label}</p>
                  <h2 style={{ fontSize: isMobile ? 26 : 32, fontWeight: 400, color: '#1C1C1C', margin: '0 0 32px 0', lineHeight: 1.2 }}>
                    {project.gameSection.heading}
                  </h2>
                  {project.gameSection.intro && (
                    <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, margin: '0 0 20px 0' }}>{project.gameSection.intro}</p>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {project.gameSection.steps?.map((step, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#FEF9E7', border: '1px solid #F5E6A3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#8B6914' }}>{i + 1}</span>
                        </div>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1C', margin: '0 0 2px 0', lineHeight: 1.4 }}>{step.title}</p>
                          <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 }}>{step.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {project.gameSection.aiNote && (
                    <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #EBEBEB' }}>
                      <h2 style={{ fontSize: isMobile ? 26 : 32, fontWeight: 400, color: '#1C1C1C', margin: '0 0 12px 0', lineHeight: 1.2 }}>{project.gameSection.aiNote.heading}</h2>
                      {project.gameSection.aiNote.intro && (
                        <p style={{ fontSize: 14, color: '#888', lineHeight: 1.7, margin: '0 0 20px 0' }}>{project.gameSection.aiNote.intro}</p>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {project.gameSection.aiNote.steps?.map((step, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#FEF9E7', border: '1px solid #F5E6A3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                              <span style={{ fontSize: 11, fontWeight: 700, color: '#8B6914' }}>{i + 1}</span>
                            </div>
                            <div>
                              <p style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1C', margin: '0 0 2px 0', lineHeight: 1.4 }}>{step.title}</p>
                              <p style={{ fontSize: 13, color: '#888', lineHeight: 1.6, margin: 0 }}>{step.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {project.gameSection.video && !isMobile && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <video src={project.gameSection.video} autoPlay loop muted playsInline style={{ width: 200, height: 444.44, borderRadius: 10, display: 'block', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Why It Works */}
          {project.whyItWorks && (
            <div id="why-it-works" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <p style={{ ...sLabel, margin: '0 0 12px 0' }}>{project.whyItWorks.label}</p>
              <h2 style={{ fontSize: 28, fontWeight: 400, color: '#1C1C1C', margin: '0 0 24px 0', lineHeight: 1.2 }}>
                {project.whyItWorks.heading}
              </h2>

              {(project.whyItWorks.preQuote || project.whyItWorks.quote) && (
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 40, alignItems: 'start', marginBottom: 32 }}>
                  {project.whyItWorks.preQuote && (
                    <p style={{ fontSize: 14, color: '#555', lineHeight: 1.8, margin: 0 }}>
                      {(() => {
                        const highlights = project.whyItWorks.preQuoteHighlights ?? [];
                        const links = project.whyItWorks.preQuoteLinks ?? [];
                        let parts = [{ type: 'text', content: project.whyItWorks.preQuote }];
                        highlights.forEach((phrase) => {
                          parts = parts.flatMap((part) => {
                            if (part.type !== 'text') return [part];
                            const idx = part.content.indexOf(phrase);
                            if (idx === -1) return [part];
                            return [
                              { type: 'text', content: part.content.slice(0, idx) },
                              { type: 'highlight', content: phrase },
                              { type: 'text', content: part.content.slice(idx + phrase.length) },
                            ];
                          });
                        });
                        links.forEach(({ text, url }, li) => {
                          parts = parts.flatMap((part) => {
                            if (part.type !== 'text') return [part];
                            const idx = part.content.indexOf(text);
                            if (idx === -1) return [part];
                            return [
                              { type: 'text', content: part.content.slice(0, idx) },
                              { type: 'link', content: text, url },
                              { type: 'text', content: part.content.slice(idx + text.length) },
                            ];
                          });
                        });
                        return parts.map((part, i) => {
                          if (part.type === 'highlight') return <RoughHighlight key={i}>{part.content}</RoughHighlight>;
                          if (part.type === 'link') return <a key={i} href={part.url} target="_blank" rel="noopener noreferrer" style={{ color: '#555', textDecoration: 'underline' }}>{part.content}</a>;
                          return part.content;
                        });
                      })()}
                    </p>
                  )}
                  {project.whyItWorks.quote && (
                    <div style={{ background: '#FAFAF8', border: '1px solid #EBEBEB', borderRadius: 12, padding: '16px 20px' }}>
                      <p style={{ fontSize: 14, color: '#1C1C1C', lineHeight: 1.65, margin: '0 0 8px 0', fontStyle: 'italic' }}>
                        &ldquo;{project.whyItWorks.quote}&rdquo;
                      </p>
                      {project.whyItWorks.quoteAttribution && (
                        <p style={{ fontSize: 11, color: '#AAA', margin: 0, fontWeight: 500, letterSpacing: '0.04em' }}>
                          {project.whyItWorks.quoteAttributionUrl
                            ? (() => {
                                const parts = project.whyItWorks.quoteAttribution.split(project.whyItWorks.quoteAttributionLinkText ?? 'Hooked');
                                const linkText = project.whyItWorks.quoteAttributionLinkText ?? 'Hooked';
                                return <>{parts[0]}<a href={project.whyItWorks.quoteAttributionUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#AAA', textDecoration: 'underline' }}>{linkText}</a>{parts[1]}</>;
                              })()
                            : project.whyItWorks.quoteAttribution}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Loop diagram */}
              {project.whyItWorks.principles?.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: isMobile ? 'wrap' : 'nowrap', gap: 6, marginBottom: 12 }}>
                    {project.whyItWorks.principles.map((p, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ background: '#FEFCE8', border: '1px solid #F5E6A3', borderRadius: 999, padding: '5px 14px' }}>
                          <span style={{ fontSize: 12, fontWeight: 500, color: '#8B6914' }}>{p.stage}</span>
                        </div>
                        {i < project.whyItWorks.principles.length - 1 && (
                          <ChevronRight size={13} strokeWidth={2} style={{ color: '#CCC', flexShrink: 0 }} />
                        )}
                      </div>
                    ))}
                  </div>
                  {project.whyItWorks.intro && (
                    <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7, margin: 0, textAlign: 'center' }}>{project.whyItWorks.intro}</p>
                  )}
                </div>
              )}

              {/* Principles */}
              <div>
                {project.whyItWorks.principles?.map((p, i) => (
                  <div key={i} style={{ borderTop: '1px solid #EBEBEB', paddingTop: 32, paddingBottom: 32 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40, alignItems: 'start' }}>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#AAA', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px 0' }}>{p.stage}</p>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#1C1C1C', margin: 0, lineHeight: 1.3 }}>{p.title}</h3>
                      </div>
                      <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>
                        {p.highlights?.length
                          ? splitWithPhrases(p.body, p.highlights, []).map((part, j) =>
                              part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                            )
                          : p.body}
                      </p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #EBEBEB' }} />
              </div>
            </div>
          )}

          {/* Product Decisions */}
          {project.productDecisions && (
            <div id="product-decisions" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <div style={{ display: 'flex', gap: isMobile ? 16 : 48, flexDirection: isMobile ? 'column' : undefined }}>
                <div style={{ flexShrink: 0, width: 140 }}>
                  <p style={{ ...sLabel, margin: 0, lineHeight: 1.5 }}>Product decisions</p>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px 48px' }}>
                    {project.productDecisions.items?.map((item, i) => (
                      <div key={i}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1C', margin: '0 0 8px 0' }}>{item.title}</p>
                        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>
                          {item.highlights?.length
                            ? splitWithPhrases(item.body, item.highlights, []).map((part, j) =>
                                part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                              )
                            : item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {project.productDecisions.videos?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, marginTop: 32, justifyContent: 'center' }}>
                  {project.productDecisions.videos.map((src, i) => (
                    <video
                      key={i}
                      src={src}
                      autoPlay loop muted playsInline
                      style={{ width: isMobile ? '100%' : 200, height: isMobile ? 'auto' : 444.44, aspectRatio: isMobile ? '9/16' : undefined, borderRadius: 10, display: 'block', objectFit: 'cover', flexShrink: 0 }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User Experience */}
          {project.userExperience && (
            <div id="user-experience" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <p style={{ ...sLabel, margin: '0 0 12px 0' }}>{project.userExperience.label}</p>
              <h2 style={{ fontSize: 28, fontWeight: 400, color: '#1C1C1C', margin: '0 0 20px 0', lineHeight: 1.2 }}>
                {project.userExperience.heading}
              </h2>
              {project.userExperience.intro && (
                <div style={{ marginBottom: 40 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: project.userExperience.introImages?.length > 0 && !isMobile ? '1fr 1fr' : '1fr', gap: 40, alignItems: 'start' }}>
                    <div>
                      <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: '0 0 12px 0' }}>
                        {project.userExperience.introHighlights?.length
                          ? splitWithPhrases(project.userExperience.intro, project.userExperience.introHighlights, []).map((part, j) =>
                              part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                            )
                          : project.userExperience.intro}
                      </p>
                      {project.userExperience.introSub && (
                        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>{project.userExperience.introSub}</p>
                      )}
                    </div>
                    {project.userExperience.introImages?.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${project.userExperience.introImages.length}, 1fr)`, gap: 12, transform: 'scale(0.9)', transformOrigin: 'top left' }}>
                        {project.userExperience.introImages.map((src, i) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img key={i} src={src} alt="" style={{ width: '100%', borderRadius: 12, display: 'block', objectFit: 'cover' }} />
                        ))}
                      </div>
                    )}
                  </div>
                  {project.userExperience.introImageCards?.length > 0 && (
                    <div style={{ marginTop: 12, width: '50%', display: 'grid', gridTemplateColumns: `repeat(${project.userExperience.introImageCards.length}, 1fr)`, gap: 12 }}>
                      {project.userExperience.introImageCards.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={src} alt="" style={{ width: '100%', borderRadius: 12, display: 'block', objectFit: 'cover' }} />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {project.userExperience.ideas?.map((idea, i) => (
                <div key={i}>
                  <div style={{ borderTop: '1px solid #EBEBEB', paddingTop: 32, paddingBottom: idea.images?.length || idea.carousel?.length || idea.video ? 0 : 32 }}>
                    {idea.video ? (
                      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40, alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: 13, color: '#AAA', margin: '0 0 8px 0' }}>#{i + 1}</p>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#1C1C1C', margin: '0 0 16px 0', lineHeight: 1.3 }}>{idea.title}</h3>
                          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>
                            {idea.highlights?.length
                              ? splitWithPhrases(idea.body, idea.highlights, []).map((part, j) =>
                                  part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                                )
                              : idea.body}
                          </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 32 }}>
                          <video src={idea.video} autoPlay loop muted playsInline style={{ width: isMobile ? '100%' : 200, height: isMobile ? 'auto' : 444.44, aspectRatio: isMobile ? '9/16' : undefined, borderRadius: 12, display: 'block', objectFit: 'cover' }} />
                        </div>
                      </div>
                    ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 40 }}>
                      <div>
                        <p style={{ fontSize: 13, color: '#AAA', margin: '0 0 8px 0' }}>#{i + 1}</p>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 400, color: '#1C1C1C', margin: 0, lineHeight: 1.3 }}>{idea.title}</h3>
                      </div>
                      <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>{idea.body}</p>
                    </div>
                    )}
                    {idea.images?.length > 0 && (
                      <div style={{ maxWidth: idea.images.length === 3 ? 520 : '100%', marginTop: 28, marginBottom: 32 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: idea.images.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr', gap: 16 }}>
                          {idea.images.map((src, ii) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={ii} src={src} alt="" style={{ width: '100%', borderRadius: 12, display: 'block', objectFit: 'contain' }} />
                          ))}
                        </div>
                      </div>
                    )}
                    {idea.carousel?.length > 0 && (
                      <div style={{ marginTop: 28, marginBottom: 32, display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: isMobile ? '85%' : '50%' }}>
                          <PlayerCarousel images={idea.carousel} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Integration Process */}
          {project.integrationProcess && (
            <div id="integration-process" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <p style={{ ...sLabel, margin: '0 0 12px 0' }}>{project.integrationProcess.label}</p>
              <h2 style={{ fontSize: 28, fontWeight: 400, color: '#1C1C1C', margin: '0 0 28px 0', lineHeight: 1.2 }}>
                {project.integrationProcess.heading}
              </h2>
              {project.integrationProcess.columns?.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40 }}>
                  {project.integrationProcess.columns.map((col, i) => (
                    <p key={i} style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>
                      {project.integrationProcess.columnHighlights?.length
                        ? splitWithPhrases(col, project.integrationProcess.columnHighlights, []).map((part, j) =>
                            part.type === 'highlight' ? <RoughHighlight key={j}>{part.text}</RoughHighlight> : part.text
                          )
                        : col}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bonus */}
          {project.bonus && (
            <div id="bonus" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 40, alignItems: 'flex-start' }}>
                <div>
                  <p style={{ ...sLabel, margin: '0 0 12px 0' }}>{project.bonus.label}</p>
                  <h2 style={{ fontSize: 28, fontWeight: 400, color: '#1C1C1C', margin: '0 0 16px 0', lineHeight: 1.2 }}>
                    {project.bonus.heading}
                  </h2>
                  <p style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>
                    {project.bonus.body}
                  </p>
                </div>
                {project.bonus.images?.length > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={project.bonus.images[0]} alt="" style={{ width: isMobile ? '70%' : '40%', display: 'block', borderRadius: 12, objectFit: 'contain' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Launch */}
          {project.launch && (
            <div id="launch" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <p style={{ ...sLabel, margin: '0 0 12px 0' }}>{project.launch.label}</p>
              <h2 style={{ fontSize: 28, fontWeight: 400, color: '#1C1C1C', margin: '0 0 28px 0', lineHeight: 1.2 }}>
                {project.launch.heading}
              </h2>
              {project.launch.columns?.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {project.launch.columns.map((col, i) => {
                    const text = typeof col === 'string' ? col : col.text;
                    const highlights = typeof col === 'object' ? col.highlights : null;
                    const underlines = typeof col === 'object' ? col.underlines : null;
                    const allPhrases = [...(highlights ?? []), ...(underlines ?? [])];
                    return (
                      <p key={i} style={{ fontSize: 14, color: '#555', lineHeight: 1.75, margin: 0 }}>
                        {allPhrases.length
                          ? splitWithPhrases(text, allPhrases, []).map((part, j) => {
                              if (part.type !== 'highlight') return part.text;
                              if (underlines?.includes(part.text)) return <RoughUnderline key={j}>{part.text}</RoughUnderline>;
                              return <RoughHighlight key={j}>{part.text}</RoughHighlight>;
                            })
                          : text}
                      </p>
                    );
                  })}
                </div>
              )}
              {project.launch.image && (
                <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.launch.image} alt="" style={{ width: isMobile ? '100%' : '44%', display: 'block', borderRadius: 12, objectFit: 'cover' }} />
                  {project.launch.imageLabel && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                      <span style={{ fontFamily: "'Edu NSW ACT Foundation', cursive", fontSize: 15, color: '#888' }}>↩ {project.launch.imageLabel}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* I've learned that */}
          {project.learnings?.length > 0 && (
            <div id="learnings" style={{ marginBottom: mbSection, scrollMarginTop: 80 }}>
              <div style={{ display: 'flex', gap: isMobile ? 16 : 48, flexDirection: isMobile ? 'column' : undefined }}>
                <div style={{ flexShrink: 0, width: 140 }}>
                  <p style={{ ...sLabel, margin: 0, lineHeight: 1.5 }}>I've learned that</p>
                </div>
                <div style={{ flex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : '32px 48px' }}>
                  {project.learnings.map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1C', margin: '0 0 8px 0' }}>{item.title}</p>
                      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Overview section */}
          <section id="overview" style={{ scrollMarginTop: 80 }}>
            {/* Hero images — 2-column row */}
            {!project.hideHeroGrid && !project.heroImages?.some(Boolean) && (
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
            {!project.hideRoleWidget && (project.role || project.durationMonths) && (
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


            {/* Opportunity images */}
            {project.opportunityImages?.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', ...mb40 }}>
                {project.opportunityImages.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="" style={{ width: project.opportunityImageWidth ?? 'auto', height: project.opportunityImageHeight ?? 200, borderRadius: 10, display: 'block', objectFit: 'contain' }} />
                ))}
              </div>
            )}

            {/* Opportunity */}
            {project.opportunity && (
              <div id="opportunity" style={mb40}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1C1C', marginBottom: 12, marginTop: 0 }}>The Problem</h3>
                {project.opportunity.split('\n\n').map((para, i) => (
                  <ContextParagraph key={i} text={para} highlights={i === 0 ? [] : project.opportunityHighlights} underlines={i === 0 ? [] : project.opportunityUnderlines} bracket={i === 0 && !!project.opportunityBracket} bracketLabel={i === 0 ? project.opportunityBracketLabel : undefined} style={{ ...sectionBody, marginBottom: 12 }} />
                ))}
              </div>
            )}

            {/* Custom sections */}
            {project.sections?.map((section, i) => (
              <div key={i} id={section.title ? slugify(section.title) : undefined} style={mb40}>
                {section.title && <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1C1C1C', marginBottom: 12, marginTop: 0 }}>{section.title}</h3>}
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
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 40, paddingTop: 36, borderTop: '1px solid #EBEBEB', paddingBottom: 80,
          }}>
            {project.prevProject ? (
              <Link
                href={`/projects/${project.prevProject.slug}`}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#E0DDD6] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150"
              >
                <ChevronLeft size={13} strokeWidth={2.5} />
                {project.prevProject.title}
              </Link>
            ) : <div />}

            {project.nextProject ? (
              <Link
                href={`/projects/${project.nextProject.slug}`}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#888] border border-[#E0DDD6] rounded-full px-3.5 py-1.5 hover:border-[#1C1C1C] hover:text-[#1C1C1C] transition-all duration-150"
              >
                {project.nextProject.title}
                <ChevronRight size={13} strokeWidth={2.5} />
              </Link>
            ) : <div />}
          </div>
          </div>
        </div>

      </div>

      {tocItems.length > 0 && !project.hideFloatingTOC && <FloatingTOC items={tocItems} isMobile={isMobile} />}
    </div>
  );
}
