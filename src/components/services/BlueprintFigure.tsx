import type { ServicesBlueprintService } from '../../content/home'

// Fixed presentational coordinates for the bubble's 5 alternate figures --
// not editorial content, so they live here rather than in home.ts.
const VM_BOXES_TOP = [
  { x: -102, tx: -96, bx: -96, label: 'VM-01' },
  { x: 6, tx: 12, bx: 12, label: 'VM-02' },
]
const VM_BOXES_BOTTOM = [
  { x: -102, tx: -96, bx: -96, label: 'VM-03' },
  { x: 6, tx: 12, bx: 12, label: 'VM-04' },
]
const COLO_RACKS = [-84, -30, 24].map((x) => ({
  x,
  vents: `M${x + 6} -56 H${x + 38} M${x + 6} -40 H${x + 38} M${x + 6} -24 H${x + 38} M${x + 6} -8 H${x + 38} M${x + 6} 8 H${x + 38}`,
}))
const PROBES = [
  [-130, -90],
  [130, -90],
  [-130, 80],
  [130, 80],
].map(([x, y]) => ({ x, y, rx: x - 6, ry: y - 6 }))

// The 5 alternate drawings used by both the homepage's blueprint detail
// bubble (ServicesBlueprint.tsx) and /services' ServiceCircle.tsx -- kept
// here, shared, rather than duplicated between the two, so both stay
// pixel-identical automatically. Colors are the rack/bubble's "fixed in
// both modes" set -- see the comment above the blueprint-* tokens in
// styles.css.
export function BlueprintFigure({ selectedKey }: { selectedKey: ServicesBlueprintService['key'] }) {
  switch (selectedKey) {
    case 'vps':
      return (
        <g>
          <rect
            fill="none"
            height="160"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            width="220"
            x="-110"
            y="-80"
          />
          <text fill="#D8EAF8" fontFamily="Geist Mono, monospace" fontSize="10" x="-110" y="-88">
            HOST · 2U
          </text>
          {VM_BOXES_TOP.map((v) => (
            <g key={v.label}>
              <rect
                fill="none"
                height="58"
                stroke="#55A4E0"
                strokeDasharray="5 3"
                strokeWidth="1.2"
                width="94"
                x={v.x}
                y="-62"
              />
              <text fill="#55A4E0" fontFamily="Geist Mono, monospace" fontSize="9" x={v.tx} y="-46">
                {v.label}
              </text>
              <rect fill="#55A4E0" height="5" width="70" x={v.bx} y="-38" />
              <rect fill="#1268A9" height="5" width="48" x={v.bx} y="-28" />
            </g>
          ))}
          {VM_BOXES_BOTTOM.map((v) => (
            <g key={v.label}>
              <rect
                fill="none"
                height="58"
                stroke="#55A4E0"
                strokeDasharray="5 3"
                strokeWidth="1.2"
                width="94"
                x={v.x}
                y="6"
              />
              <text fill="#55A4E0" fontFamily="Geist Mono, monospace" fontSize="9" x={v.tx} y="22">
                {v.label}
              </text>
              <rect fill="#55A4E0" height="5" width="70" x={v.bx} y="30" />
            </g>
          ))}
        </g>
      )
    case 'colo':
      return (
        <g>
          <rect
            fill="none"
            height="180"
            stroke="#FFFFFF"
            strokeDasharray="6 4"
            strokeWidth="1.5"
            width="200"
            x="-100"
            y="-90"
          />
          {COLO_RACKS.map((r) => (
            <g key={r.x}>
              <rect
                fill="none"
                height="130"
                stroke="#D8EAF8"
                strokeWidth="1.2"
                width="44"
                x={r.x}
                y="-70"
              />
              <path d={r.vents} fill="none" stroke="#55A4E0" strokeWidth="1" />
            </g>
          ))}
          <rect
            fill="none"
            height="18"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            width="22"
            x="70"
            y="-14"
          />
          <path
            d="M75 -14 V-20 A6 6 0 0 1 87 -20 V-14"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <text
            fill="#D8EAF8"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            textAnchor="middle"
            x="0"
            y="78"
          >
            CUSTOMER CAGE · YOUR HARDWARE
          </text>
        </g>
      )
    case 'managed':
      return (
        <g>
          <rect
            fill="none"
            height="104"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            width="180"
            x="-90"
            y="-60"
          />
          <path
            d="M-74 22 L-44 -4 L-20 8 L8 -26 L40 -12 L74 -34"
            fill="none"
            stroke="#55A4E0"
            strokeWidth="1.6"
          />
          <path d="M-30 44 L-40 70 H40 L30 44" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
          {PROBES.map((p) => (
            <g key={`${p.x}-${p.y}`}>
              <line
                stroke="#55A4E0"
                strokeDasharray="2 4"
                strokeWidth="0.8"
                x1="0"
                x2={p.x}
                y1="0"
                y2={p.y}
              />
              <rect
                fill="none"
                height="12"
                stroke="#D8EAF8"
                strokeWidth="1"
                width="12"
                x={p.rx}
                y={p.ry}
              />
            </g>
          ))}
        </g>
      )
    case 'web':
      return (
        <g>
          <rect
            fill="none"
            height="100"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            width="140"
            x="-125"
            y="-75"
          />
          <path d="M-125 -60 H15" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="-115" cy="-67.5" fill="#55A4E0" r="2.5" />
          <circle cx="-106" cy="-67.5" fill="#55A4E0" r="2.5" />
          <circle cx="-97" cy="-67.5" fill="#55A4E0" r="2.5" />
          <rect fill="#55A4E0" height="7" width="70" x="-113" y="-48" />
          <rect fill="#D8EAF8" height="4" width="110" x="-113" y="-34" />
          <rect fill="#D8EAF8" height="4" width="96" x="-113" y="-25" />
          <rect
            fill="none"
            height="30"
            stroke="#55A4E0"
            strokeDasharray="4 3"
            strokeWidth="1"
            width="52"
            x="-113"
            y="-14"
          />
          <rect
            fill="none"
            height="30"
            stroke="#55A4E0"
            strokeDasharray="4 3"
            strokeWidth="1"
            width="56"
            x="-53"
            y="-14"
          />
          <rect
            fill="none"
            height="100"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            width="72"
            x="50"
            y="-50"
          />
          <path
            d="M58 -34 H114 M58 -18 H114 M58 -2 H114 M58 14 H114 M58 30 H114"
            stroke="#55A4E0"
            strokeWidth="1"
          />
          <path
            className="blueprint-packet"
            d="M15 -25 H50 M15 -15 H50"
            stroke="#55A4E0"
            strokeDasharray="4 6"
            strokeWidth="1.5"
          />
          <text
            fill="#D8EAF8"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            textAnchor="middle"
            x="-55"
            y="44"
          >
            YOUR WEBSITE
          </text>
          <text
            fill="#D8EAF8"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            textAnchor="middle"
            x="86"
            y="68"
          >
            WEB SERVER
          </text>
        </g>
      )
    case 'email':
      return (
        <g>
          <rect
            fill="none"
            height="48"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            width="60"
            x="-120"
            y="-24"
          />
          <path d="M-116 -20 L-90 0 L-64 -20" fill="none" stroke="#FFFFFF" strokeWidth="1.3" />
          <g fill="none" stroke="#55A4E0" strokeWidth="1.2">
            <path d="M-60 0 C 0 -80, 60 -80, 110 -70 M-60 0 C 0 -20, 60 -20, 120 -20 M-60 0 C 0 30, 60 30, 120 30 M-60 0 C 0 80, 60 80, 110 80" />
          </g>
          <g fill="#092B50" stroke="#FFFFFF" strokeWidth="1.2">
            <rect height="14" width="14" x="104" y="-78" />
            <rect height="14" width="14" x="114" y="-27" />
            <rect height="14" width="14" x="114" y="23" />
            <rect height="14" width="14" x="104" y="73" />
          </g>
        </g>
      )
    default:
      return null
  }
}
