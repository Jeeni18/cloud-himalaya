import type { Post } from '../../payload-types'

type Category = Post['category']

// Exported for reuse by PostCard's own category/date meta line, so the
// label text is defined once.
export const CATEGORY_LABELS: Record<Category, string> = {
  announcement: 'ANNOUNCEMENT',
  guide: 'GUIDE',
  maintenance: 'MAINTENANCE',
  security: 'SECURITY',
  'company-news': 'COMPANY NEWS',
}

// Icon drawings, copied from docs/design/insights/'s own inline SVG covers
// (one <g>, centered at 0,0, matching the reference exactly). Drawn at
// the cover's center via the shared transform below, not individually
// positioned, so every icon lines up the same way regardless of shape.
function CategoryIcon({ category }: { category: Category }) {
  switch (category) {
    case 'announcement':
      return <path d="M-40 -10 L20 -40 V40 L-40 10 Z M-40 -10 H-60 V10 H-40 M20 -15 Q40 0 20 15" />
    case 'guide':
      return (
        <>
          <rect x="-45" y="-40" width="90" height="80" rx="4" />
          <path d="M-30 -20 H30 M-30 -5 H30 M-30 10 H10" />
          <path d="M0 -40 V40" strokeDasharray="4 4" />
        </>
      )
    case 'maintenance':
      return (
        <>
          <circle r="30" />
          <circle r="10" />
          <path d="M0 -42 V-30 M0 30 V42 M-42 0 H-30 M30 0 H42 M-30 -30 L-21 -21 M21 21 L30 30 M-30 30 L-21 21 M21 -21 L30 -30" />
        </>
      )
    case 'security':
      return (
        <>
          <path d="M0 -42 L36 -28 V2 C36 24 18 38 0 44 C-18 38 -36 24 -36 2 V-28 Z" />
          <path d="M-14 2 L-3 13 L16 -8" />
        </>
      )
    case 'company-news':
      return (
        <>
          <rect x="-46" y="-30" width="92" height="64" rx="3" />
          <path d="M-34 -16 H6 M-34 -2 H6 M-34 12 H34 M18 -16 H34 V-2 H18 Z" />
        </>
      )
    default:
      return null
  }
}

type PostCoverProps = {
  category: Category
  className?: string
}

// Drawn cover for a post with no image (docs/design/insights/): navy
// background, a faint grid, the category's line icon in a dashed circle,
// the category label, and "CLOUD HIMALAYA · INSIGHTS". Looks the same in
// both themes -- same "fixed in both modes" exception as the homepage's
// blueprint/rack and the about page's visitor pass. The root element
// always keeps the artwork's own 600:285 aspect ratio (via `aspect-`),
// rather than being stretched or cropped to fit whatever height a card
// layout gives it, so the category label is never cut off at any size.
export function PostCover({ category, className = '' }: PostCoverProps) {
  return (
    <svg
      aria-hidden="true"
      className={`block aspect-[600/285] w-full ${className}`}
      viewBox="0 0 600 285"
    >
      <rect fill="#092B50" height="285" width="600" />
      <g stroke="rgba(216,234,248,0.07)">
        {Array.from({ length: 25 }, (_, i) => i * 24).map((x) => (
          <path d={`M${x} 0V285`} key={`v${x}`} />
        ))}
        {Array.from({ length: 12 }, (_, i) => i * 24).map((y) => (
          <path d={`M0 ${y}H600`} key={`h${y}`} />
        ))}
      </g>
      <g
        fill="none"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        transform="translate(450 142) scale(1.15)"
      >
        <CategoryIcon category={category} />
      </g>
      <circle cx="450" cy="142" fill="none" r="92" stroke="#55A4E0" strokeDasharray="3 6" />
      <text fill="#55A4E0" fontFamily="Geist Mono, monospace" fontSize="16" x="28" y="44">
        {CATEGORY_LABELS[category]}
      </text>
      <text fill="#D8EAF8" fontFamily="Geist Mono, monospace" fontSize="14" x="28" y="257">
        CLOUD HIMALAYA · INSIGHTS
      </text>
    </svg>
  )
}
