import { findDataCenter } from '../../content/contact'

// Navy schematic map, part of section 3 of /contact-us (docs/design/
// contact-us/) -- a placeholder until the real address is confirmed
// (see content/contact.ts's own TODOs on address/coordinates/the
// directions URL). TODO: once the address is confirmed, swap this for a
// real embedded map (lazy-loaded, e.g. only mounted once scrolled near,
// or behind a "load map" click to avoid pulling in a third-party script
// on every page view). Fixed colors in both themes, same "fixed in both
// modes" exception as the homepage blueprint/rack.
export function DataCenterMap() {
  return (
    <svg
      aria-hidden="true"
      className="block h-[280px] w-full lg:h-[460px]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 460"
    >
      <rect fill="#092B50" height="460" width="800" />
      <g stroke="rgba(216,234,248,0.06)">
        {Array.from({ length: 27 }, (_, i) => i * 30).map((x) => (
          <path d={`M${x} 0V460`} key={`v${x}`} />
        ))}
        {Array.from({ length: 16 }, (_, i) => i * 30).map((y) => (
          <path d={`M0 ${y}H800`} key={`h${y}`} />
        ))}
      </g>

      <path
        d="M-20 359 C 200 322, 380 437, 620 368 S 980 253, 820 285"
        fill="none"
        stroke="#1268A9"
        strokeLinecap="round"
        strokeWidth="22"
      />
      <path d="M0 161 H800" fill="none" stroke="#D8EAF8" strokeOpacity="0.35" strokeWidth="6" />
      <path d="M0 267 L800 184" fill="none" stroke="#D8EAF8" strokeOpacity="0.35" strokeWidth="6" />
      <path d="M300 0 L360 460" fill="none" stroke="#D8EAF8" strokeOpacity="0.35" strokeWidth="6" />
      <path d="M760 0 L700 460" fill="none" stroke="#D8EAF8" strokeOpacity="0.35" strokeWidth="6" />
      <path
        d="M520 0 C 540 138, 600 184, 640 460"
        fill="none"
        stroke="#D8EAF8"
        strokeOpacity="0.35"
        strokeWidth="6"
      />
      <path d="M0 69 H800" fill="none" stroke="#D8EAF8" strokeOpacity="0.18" strokeWidth="2" />
      <path d="M140 0 V460" fill="none" stroke="#D8EAF8" strokeOpacity="0.18" strokeWidth="2" />
      <path d="M1000 0 V460" fill="none" stroke="#D8EAF8" strokeOpacity="0.18" strokeWidth="2" />
      <path d="M0 414 H500" fill="none" stroke="#D8EAF8" strokeOpacity="0.18" strokeWidth="2" />

      <circle cx="340" cy="212" fill="none" r="70" stroke="#55A4E0" strokeDasharray="3 6" />
      <circle cx="340" cy="212" fill="#55A4E0" fillOpacity="0.18" r="40" />
      <path d="M340 230 C 318 206, 318 178, 340 178 S 362 206, 340 230 Z" fill="#fff" />
      <circle cx="340" cy="198" fill="#092B50" r="7" />

      <g transform="translate(430 172)">
        <rect fill="#fff" height="64" rx="10" width="230" />
        <text fill="#0954A6" fontFamily="Geist Mono, monospace" fontSize="12" x="16" y="26">
          {findDataCenter.map.pinLabel}
        </text>
        <text
          fill="#103D70"
          fontFamily="Geist, sans-serif"
          fontSize="17"
          fontWeight="600"
          x="16"
          y="48"
        >
          {findDataCenter.map.pinSublabel}
        </text>
      </g>
    </svg>
  )
}
