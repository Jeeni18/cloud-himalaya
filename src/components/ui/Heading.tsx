import type { ReactNode } from 'react'

type HeadingProps = {
  /** Semantic heading level -- drives the actual <h1>-<h6> tag used. */
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: ReactNode
  className?: string
  /** Visual size, if it needs to differ from the semantic level. Defaults to a sensible size per level. */
  size?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

const defaultSizeByLevel: Record<HeadingProps['level'], NonNullable<HeadingProps['size']>> = {
  1: '6xl',
  2: '5xl',
  3: '4xl',
  4: '3xl',
  5: '2xl',
  6: 'xl',
}

const sizeClass: Record<NonNullable<HeadingProps['size']>, string> = {
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
}

// Always use this instead of a raw <h1>-<h6>: it keeps the semantic
// level (for correct heading order/accessibility) and the visual size
// (from the fixed type scale) as two separate, intentional choices
// instead of accidentally coupling them.
export function Heading({ level, children, className = '', size }: HeadingProps) {
  const Tag = `h${level}` as const
  const resolvedSize = size ?? defaultSizeByLevel[level]

  return (
    <Tag className={`font-bold text-text-primary ${sizeClass[resolvedSize]} ${className}`}>
      {children}
    </Tag>
  )
}
