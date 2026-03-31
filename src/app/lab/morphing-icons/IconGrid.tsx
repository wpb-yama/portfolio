// Static grid of all icons -- no animation, server-renderable

type IconLine = { x1: number; y1: number; x2: number; y2: number; opacity: number };
type Icon = { key: string; label: string; rotation?: number; lines: IconLine[] };

const ICONS: Icon[] = [
  { key:"menu",         label:"Menu",     lines:[{x1:2,y1:3,x2:12,y2:3,opacity:1},{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:2,y1:11,x2:12,y2:11,opacity:1}] },
  { key:"cross",        label:"Close",    rotation:45,  lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"plus",         label:"Plus",     lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"minus",        label:"Minus",    lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"equals",       label:"Equals",   lines:[{x1:2,y1:5,x2:12,y2:5,opacity:1},{x1:2,y1:9,x2:12,y2:9,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"asterisk",     label:"Asterisk", lines:[{x1:7,y1:2,x2:7,y2:12,opacity:1},{x1:2.67,y1:9.5,x2:11.33,y2:4.5,opacity:1},{x1:2.67,y1:4.5,x2:11.33,y2:9.5,opacity:1}] },
  { key:"play",         label:"Play",     lines:[{x1:4,y1:3,x2:4,y2:11,opacity:1},{x1:4,y1:3,x2:11,y2:7,opacity:1},{x1:4,y1:11,x2:11,y2:7,opacity:1}] },
  { key:"pause",        label:"Pause",    lines:[{x1:4,y1:3,x2:4,y2:11,opacity:1},{x1:10,y1:3,x2:10,y2:11,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"check",        label:"Check",    lines:[{x1:2,y1:7,x2:5.5,y2:11,opacity:1},{x1:5.5,y1:11,x2:12,y2:3,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"download",     label:"Download", lines:[{x1:4,y1:5,x2:7,y2:9,opacity:1},{x1:10,y1:5,x2:7,y2:9,opacity:1},{x1:3,y1:12,x2:11,y2:12,opacity:1}] },
  { key:"upload",       label:"Upload",   lines:[{x1:4,y1:9,x2:7,y2:5,opacity:1},{x1:10,y1:9,x2:7,y2:5,opacity:1},{x1:3,y1:12,x2:11,y2:12,opacity:1}] },
  { key:"external",     label:"External", lines:[{x1:3,y1:11,x2:11,y2:3,opacity:1},{x1:11,y1:3,x2:6,y2:3,opacity:1},{x1:11,y1:3,x2:11,y2:8,opacity:1}] },
  { key:"arrowRight",   label:"Arrow →",  rotation:0,   lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowDown",    label:"Arrow ↓",  rotation:90,  lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowLeft",    label:"Arrow ←",  rotation:180, lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"arrowUp",      label:"Arrow ↑",  rotation:270, lines:[{x1:2,y1:7,x2:12,y2:7,opacity:1},{x1:7,y1:3,x2:12,y2:7,opacity:1},{x1:7,y1:11,x2:12,y2:7,opacity:1}] },
  { key:"chevronRight", label:"Chevron →",rotation:0,   lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronDown",  label:"Chevron ↓",rotation:90,  lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronLeft",  label:"Chevron ←",rotation:180, lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
  { key:"chevronUp",    label:"Chevron ↑",rotation:270, lines:[{x1:5,y1:3,x2:10,y2:7,opacity:1},{x1:5,y1:11,x2:10,y2:7,opacity:1},{x1:7,y1:7,x2:7,y2:7,opacity:0}] },
];

export default function IconGrid() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {ICONS.map(icon => (
        <div
          key={icon.key}
          style={{
            width: 72,
            height: 72,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            border: "1px solid #E8E8E8",
            borderRadius: 8,
            background: "#fff",
          }}
        >
          <svg
            viewBox="0 0 14 14"
            width={28}
            height={28}
            fill="none"
            stroke="#1C1C1C"
            strokeWidth={1.5}
            strokeLinecap="round"
            style={{
              display: "block",
              overflow: "visible",
              transformBox: "fill-box",
              transformOrigin: "center",
              transform: icon.rotation ? `rotate(${icon.rotation}deg)` : undefined,
            }}
          >
            {icon.lines.map((l, i) => (
              <line
                key={i}
                x1={l.x1} y1={l.y1}
                x2={l.x2} y2={l.y2}
                opacity={l.opacity}
              />
            ))}
          </svg>
          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: "#999",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {icon.label}
          </span>
        </div>
      ))}
    </div>
  );
}
