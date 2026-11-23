import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

// Horizontal width constraint + gutter, used everywhere content needs to
// line up instead of running edge-to-edge. Nests inside Section, which
// handles vertical rhythm and background.
export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</div>
}
