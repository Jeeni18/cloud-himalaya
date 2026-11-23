'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type HeroMotionControllerProps = {
  children: ReactNode
  className?: string
}

// Pauses the hero's CSS cloud-drift animation (see hero.css) when the
// hero scrolls out of view or the browser tab is hidden. CSS alone can't
// observe scroll position or tab visibility, so this is the one piece of
// the hero that needs JavaScript -- and even here, it only ever toggles
// a data attribute; the animation itself stays pure CSS.
export function HeroMotionController({ children, className = '' }: HeroMotionControllerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const isIntersectingRef = useRef(true)

  useEffect(() => {
    const node = wrapperRef.current
    if (!node) return

    function applyPauseState() {
      const shouldPause = document.hidden || !isIntersectingRef.current
      if (node) node.dataset.motionPaused = shouldPause ? 'true' : 'false'
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting
        applyPauseState()
      },
      { threshold: 0 },
    )
    observer.observe(node)
    document.addEventListener('visibilitychange', applyPauseState)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', applyPauseState)
    }
  }, [])

  return (
    <div className={className} data-motion-paused="false" ref={wrapperRef}>
      {children}
    </div>
  )
}
