"use client";

import Link from "next/link";
import { type Article } from "@/data/articles";

type CategoryStyle = {
  heroBg: string;
  badgeBg: string;
  badgeText: string;
  color: string;
};

export const categoryStyles: Record<string, CategoryStyle> = {
  "AI & Tech":        { heroBg: "#DBEAFE", badgeBg: "#EFF6FF", badgeText: "#1D4ED8", color: "#3B82F6" },
  "Product Strategy": { heroBg: "#FFEDD5", badgeBg: "#FFF7ED", badgeText: "#C2410C", color: "#F97316" },
  "Leadership":       { heroBg: "#EDE9FE", badgeBg: "#F5F3FF", badgeText: "#6D28D9", color: "#8B5CF6" },
};

const fallback: CategoryStyle = {
  heroBg: "#F3F4F6", badgeBg: "#F9FAFB", badgeText: "#374151", color: "#9CA3AF",
};

function ThumbJobFinder({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={14} y={7 + i * 13} width={52} height={9} rx={3} fill={c} opacity={0.12 + i * 0.06}/>
      ))}
      <polygon points="76,4 76,96 108,58 108,42" fill={c} opacity="0.12"/>
      <line x1="76" y1="4"  x2="108" y2="42" stroke={c} strokeWidth="1.5" opacity="0.35"/>
      <line x1="76" y1="96" x2="108" y2="58" stroke={c} strokeWidth="1.5" opacity="0.35"/>
      <line x1="112" y1="50" x2="136" y2="50" stroke={c} strokeWidth="2" opacity="0.5"/>
      <polygon points="136,46 144,50 136,54" fill={c} opacity="0.5"/>
      <rect x="148" y="22" width="56" height="56" rx="5" fill={c} opacity="0.13"/>
      <rect x="148" y="22" width="56" height="56" rx="5" fill="none" stroke={c} strokeWidth="1.5" opacity="0.35"/>
      <line x1="160" y1="44" x2="192" y2="44" stroke={c} strokeWidth="1.5" opacity="0.55"/>
      <line x1="160" y1="53" x2="192" y2="53" stroke={c} strokeWidth="1.5" opacity="0.55"/>
      <line x1="160" y1="62" x2="182" y2="62" stroke={c} strokeWidth="1.5" opacity="0.55"/>
      <rect x="148" y="22" width="18" height="14" rx="3" fill={c} opacity="0.25"/>
      <text x="220" y="44" fontSize="8.5" fill={c} opacity="0.65" fontFamily="system-ui, sans-serif" fontWeight="600">DAILY</text>
      <text x="220" y="57" fontSize="8.5" fill={c} opacity="0.65" fontFamily="system-ui, sans-serif" fontWeight="600">REPORT</text>
    </svg>
  );
}

function ThumbPostCodeEra({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3].map(col => [0,1,2].map(row => (
        <circle key={`${col}-${row}`} cx={20 + col * 18} cy={20 + row * 22} r={6} fill={c} opacity={0.18}/>
      )))}
      <line x1="10" y1="10" x2="95" y2="90" stroke={c} strokeWidth="2" opacity="0.2" strokeLinecap="round"/>
      <line x1="108" y1="50" x2="148" y2="50" stroke={c} strokeWidth="2" opacity="0.45"/>
      <polygon points="148,46 156,50 148,54" fill={c} opacity="0.45"/>
      <circle cx="200" cy="50" r="22" fill={c} opacity="0.12"/>
      <circle cx="200" cy="50" r="14" fill={c} opacity="0.22"/>
      <circle cx="200" cy="50" r="7"  fill={c} opacity="0.7"/>
      <text x="230" y="34" fontSize="9" fill={c} opacity="0.7" fontFamily="system-ui, sans-serif" fontWeight="700">+AI</text>
      <circle cx="232" cy="50" r="2" fill={c} opacity="0.5"/>
      <circle cx="242" cy="44" r="1.5" fill={c} opacity="0.4"/>
      <circle cx="240" cy="58" r="1.5" fill={c} opacity="0.3"/>
      <circle cx="252" cy="51" r="1" fill={c} opacity="0.3"/>
    </svg>
  );
}

function ThumbAcquireChurn({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect x="20" y="40" width="200" height="20" rx="10" fill={c} opacity="0.1"/>
      <rect x="20" y="40" width="200" height="20" rx="10" fill="none" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      {[0,1,2,3,4].map(i => (
        <circle key={i} cx={30 + i * 14} cy={50} r={5} fill={c} opacity={0.7 - i * 0.1}/>
      ))}
      <circle cx="100" cy="68" r="4" fill={c} opacity="0.35"/>
      <circle cx="125" cy="76" r="3.5" fill={c} opacity="0.25"/>
      <circle cx="150" cy="72" r="3" fill={c} opacity="0.18"/>
      <line x1="100" y1="60" x2="100" y2="66" stroke={c} strokeWidth="1.2" opacity="0.3"/>
      <line x1="125" y1="60" x2="125" y2="74" stroke={c} strokeWidth="1.2" opacity="0.25"/>
      <line x1="150" y1="60" x2="150" y2="70" stroke={c} strokeWidth="1.2" opacity="0.2"/>
      <circle cx="230" cy="50" r="5"  fill={c} opacity="0.7"/>
      <circle cx="244" cy="50" r="4.5" fill={c} opacity="0.5"/>
      <path d="M 258 30 Q 285 20 292 50 Q 285 80 258 70" fill="none" stroke={c} strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
      <polygon points="258,68 252,74 264,76" fill={c} opacity="0.3"/>
    </svg>
  );
}

function ThumbOutcomeRoadmaps({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <circle cx="200" cy="50" r="42" fill={c} opacity="0.07"/>
      <circle cx="200" cy="50" r="30" fill={c} opacity="0.1"/>
      <circle cx="200" cy="50" r="18" fill={c} opacity="0.15"/>
      <circle cx="200" cy="50" r="7"  fill={c} opacity="0.65"/>
      <line x1="28" y1="50" x2="186" y2="50" stroke={c} strokeWidth="2.5" opacity="0.55"/>
      <polygon points="186,45 196,50 186,55" fill={c} opacity="0.55"/>
      <line x1="28" y1="50" x2="40" y2="42" stroke={c} strokeWidth="1.5" opacity="0.35"/>
      <line x1="28" y1="50" x2="40" y2="58" stroke={c} strokeWidth="1.5" opacity="0.35"/>
      <text x="22" y="30" fontSize="8" fill={c} opacity="0.55" fontFamily="system-ui, sans-serif" fontWeight="600">OUTCOME-LED</text>
    </svg>
  );
}

function ThumbArtOfKill({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {[0,1,2,3,4].map(i => {
        const y = 18 + i * 16;
        const killed = i < 3;
        return (
          <g key={i}>
            <rect x="40" y={y} width="160" height="10" rx="3" fill={c} opacity={killed ? 0.08 : 0.25}/>
            {killed ? (
              <>
                <line x1="42" y1={y+5} x2="198" y2={y+5} stroke={c} strokeWidth="1.5" opacity="0.4"/>
                <text x="210" y={y+8} fontSize="9" fill={c} opacity="0.45" fontFamily="system-ui, sans-serif">✕</text>
              </>
            ) : (
              <text x="210" y={y+8} fontSize="9" fill={c} opacity="0.8" fontFamily="system-ui, sans-serif" fontWeight="700">✓</text>
            )}
          </g>
        );
      })}
      <text x="240" y="52" fontSize="22" fill={c} opacity="0.15" fontFamily="system-ui, sans-serif" fontWeight="900">?</text>
    </svg>
  );
}

function ThumbGachaTrap({ c }: { c: string }) {
  const bars = [
    { label: "5★", h: 8,  x: 30 },
    { label: "4★", h: 22, x: 70 },
    { label: "3★", h: 42, x: 110 },
    { label: "2★", h: 62, x: 150 },
    { label: "1★", h: 76, x: 190 },
  ];
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <line x1="20" y1="86" x2="240" y2="86" stroke={c} strokeWidth="1" opacity="0.25"/>
      {bars.map(({ label, h, x }, i) => (
        <g key={i}>
          <rect x={x} y={86 - h} width={28} height={h} rx={3} fill={c} opacity={0.15 + i * 0.12}/>
          <text x={x + 14} y={94} fontSize="7.5" textAnchor="middle" fill={c} opacity="0.55"
            fontFamily="system-ui, sans-serif" fontWeight="600">{label}</text>
        </g>
      ))}
      <text x="44" y="74" fontSize="7" textAnchor="middle" fill={c} opacity="0.6" fontFamily="system-ui, sans-serif">0.6%</text>
      <circle cx="268" cy="50" r="18" fill={c} opacity="0.12"/>
      <circle cx="268" cy="50" r="18" fill="none" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <text x="268" y="55" fontSize="14" textAnchor="middle" fill={c} opacity="0.5" fontFamily="system-ui, sans-serif" fontWeight="700">¥</text>
    </svg>
  );
}

function ThumbStopHelpful({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect x="125" y="10" width="50" height="22" rx="4" fill={c} opacity="0.15"/>
      <line x1="150" y1="32" x2="150" y2="44" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <line x1="80"  y1="44" x2="220" y2="44" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <line x1="80"  y1="44" x2="80"  y2="52" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <line x1="220" y1="44" x2="220" y2="52" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <rect x="55"  y="52" width="50" height="22" rx="4" fill={c} opacity="0.15"/>
      <rect x="195" y="52" width="50" height="22" rx="4" fill={c} opacity="0.15"/>
      <line x1="80"  y1="74" x2="80"  y2="82" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <line x1="220" y1="74" x2="220" y2="82" stroke={c} strokeWidth="1.5" opacity="0.3"/>
      <rect x="55"  y="80" width="50" height="12" rx="3" fill={c} opacity="0.12"/>
      <rect x="193" y="78" width="54" height="16" rx="4" fill={c} opacity="0.5"/>
      <rect x="193" y="78" width="54" height="16" rx="4" fill="none" stroke={c} strokeWidth="1.5" opacity="0.7"/>
      <circle cx="220" cy="70" r="5" fill={c} opacity="0.6"/>
      <line x1="218" y1="75" x2="222" y2="75" stroke={c} strokeWidth="1.5" opacity="0.6"/>
      <line x1="220" y1="75" x2="220" y2="78" stroke={c} strokeWidth="1.5" opacity="0.6"/>
    </svg>
  );
}

function ThumbAutoDream({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Messy stacked files on left */}
      <rect x="14" y="22" width="38" height="28" rx="3" fill={c} opacity="0.10"/>
      <rect x="20" y="16" width="38" height="28" rx="3" fill={c} opacity="0.12"/>
      <rect x="26" y="10" width="38" height="28" rx="3" fill={c} opacity="0.17"/>
      <line x1="33" y1="18" x2="57" y2="18" stroke={c} strokeWidth="1.2" opacity="0.35"/>
      <line x1="33" y1="24" x2="57" y2="24" stroke={c} strokeWidth="1.2" opacity="0.3"/>
      <line x1="33" y1="30" x2="50" y2="30" stroke={c} strokeWidth="1.2" opacity="0.22"/>
      {/* Arrow right */}
      <line x1="72" y1="50" x2="106" y2="50" stroke={c} strokeWidth="2" opacity="0.4"/>
      <polygon points="106,46 114,50 106,54" fill={c} opacity="0.4"/>
      {/* Crescent moon */}
      <path d="M 148 26 Q 134 34 134 50 Q 134 66 148 74 Q 124 72 116 50 Q 124 28 148 26 Z" fill={c} opacity="0.65"/>
      {/* ZZZ rising */}
      <text x="154" y="36" fontSize="8"  fill={c} opacity="0.45" fontFamily="system-ui, sans-serif" fontWeight="700">Z</text>
      <text x="163" y="27" fontSize="11" fill={c} opacity="0.62" fontFamily="system-ui, sans-serif" fontWeight="700">Z</text>
      <text x="174" y="18" fontSize="14" fill={c} opacity="0.78" fontFamily="system-ui, sans-serif" fontWeight="700">Z</text>
      {/* Arrow right */}
      <line x1="196" y1="50" x2="222" y2="50" stroke={c} strokeWidth="2" opacity="0.4"/>
      <polygon points="222,46 230,50 222,54" fill={c} opacity="0.4"/>
      {/* Clean single file on right */}
      <rect x="232" y="22" width="52" height="56" rx="4" fill={c} opacity="0.13"/>
      <rect x="232" y="22" width="52" height="56" rx="4" fill="none" stroke={c} strokeWidth="1.5" opacity="0.38"/>
      <line x1="242" y1="38" x2="274" y2="38" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <line x1="242" y1="48" x2="274" y2="48" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <line x1="242" y1="58" x2="264" y2="58" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <polyline points="238,70 244,76 258,63" fill="none" stroke={c} strokeWidth="2" opacity="0.65" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ThumbCricketAI({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <path
        d="M 20 85 Q 60 80 90 55 Q 120 30 150 20 Q 180 10 210 30 Q 240 50 260 70 Q 275 80 290 85"
        fill={c} fillOpacity="0.1" stroke={c} strokeWidth="2" strokeOpacity="0.45"
      />
      {[
        [80,62],[95,48],[110,38],[125,30],[140,24],[155,22],[170,28],[185,38],[200,52],[215,64],
        [88,70],[103,55],[118,44],[133,34],[148,28],[163,26],[178,33],[193,46],[208,60],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={2} fill={c} opacity={0.3 + (i % 3) * 0.1}/>
      ))}
      <rect x="120" y="72" width="5" height="20" rx="1" fill={c} opacity="0.65"/>
      <rect x="130" y="70" width="5" height="22" rx="1" fill={c} opacity="0.65"/>
      <rect x="140" y="72" width="5" height="20" rx="1" fill={c} opacity="0.65"/>
      <line x1="118" y1="72" x2="147" y2="72" stroke={c} strokeWidth="2" opacity="0.5"/>
      <text x="22" y="20" fontSize="7.5" fill={c} opacity="0.55" fontFamily="system-ui, sans-serif" fontWeight="600">10,000 simulations</text>
    </svg>
  );
}

export const thumbnailMap: Record<string, (c: string) => React.ReactElement> = {
  "autodream":            (c) => <ThumbAutoDream c={c} />,
  "claude-job-finder":    (c) => <ThumbJobFinder c={c} />,
  "post-code-era":        (c) => <ThumbPostCodeEra c={c} />,
  "acquire-churn-repeat": (c) => <ThumbAcquireChurn c={c} />,
  "outcome-led-roadmaps": (c) => <ThumbOutcomeRoadmaps c={c} />,
  "art-of-the-kill":      (c) => <ThumbArtOfKill c={c} />,
  "gacha-trap":           (c) => <ThumbGachaTrap c={c} />,
  "stop-being-helpful":   (c) => <ThumbStopHelpful c={c} />,
  "cricket-odds-ai":      (c) => <ThumbCricketAI c={c} />,
};

export default function ArticleCard({ article, heroHeight = 140 }: { article: Article; heroHeight?: number }) {
  const s = categoryStyles[article.category] ?? fallback;
  const thumb = thumbnailMap[article.slug];

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="hover:-translate-y-[3px] hover:shadow-xl transition-all duration-200"
      style={{ textDecoration: "none", display: "block", height: "100%", borderRadius: 12, overflow: "hidden" }}
    >
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #EBEBEB",
          borderRadius: 12,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Hero */}
        <div
          style={{
            height: heroHeight,
            backgroundColor: s.heroBg,
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
        >
          {article.featuredImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.featuredImage}
              alt={article.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : thumb ? thumb(s.color) : null}
        </div>

        {/* Content */}
        <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flex: 1 }}>
          <span
            style={{
              fontSize: 11, fontWeight: 500,
              backgroundColor: s.badgeBg, color: s.badgeText,
              padding: "3px 8px", borderRadius: 4,
              alignSelf: "flex-start", marginBottom: 10,
            }}
          >
            {article.category}
          </span>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1C", lineHeight: 1.4, flex: 1, margin: 0 }}>
            {article.title}
          </p>
          <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#AAAAAA" }}>{article.date}</span>
            <span style={{ fontSize: 11, color: "#AAAAAA" }}>{article.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
