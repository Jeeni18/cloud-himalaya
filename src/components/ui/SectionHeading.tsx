import type { ReactNode } from 'react'

type SectionHeadingProps = {
  level?: 1 | 2
  children: ReactNode
  className?: string
  // 'custom' omits the built-in text color entirely, for bands with their
  // own text-color token (e.g. DataCenterPreview) -- pass the color via
  // `className` instead so there's only ever one color class applying.
  tone?: 'default' | 'inverted' | 'custom'
}

// H1/H2 for the new homepage (docs/LANDING_PAGE_SPEC.md section 2.3) --
// separate from components/ui/Heading.tsx, which backs the rest of the
// site and uses a different type scale. Both now share the sitewide
// Geist font (applied globally via the h1-h6 rule in styles.css), so no
// font class is needed here.
export function SectionHeading({
  level = 2,
  children,
  className = '',
  tone = 'default',
}: SectionHeadingProps) {
  const Tag = level === 1 ? 'h1' : 'h2'
  const sizeClass = level === 1 ? 'text-lp-h1' : 'text-lp-h2'
  const colorClass = tone === 'custom' ? '' : tone === 'inverted' ? 'text-white' : 'text-head'

  return <Tag className={`font-bold ${sizeClass} ${colorClass} ${className}`}>{children}</Tag>
}
