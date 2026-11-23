import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  className?: string
  id?: string
  /** @default 'background' */
  tone?: 'background' | 'surface'
}

// Vertical rhythm + background for one page section. Pair with
// Container for the horizontal width constraint.
export function Section({ children, className = '', id, tone = 'background' }: SectionProps) {
  const toneClass = tone === 'surface' ? 'bg-surface' : 'bg-background'

  return (
    <section className={`${toneClass} py-16 md:py-24 ${className}`} id={id}>
      {children}
    </section>
  )
}
