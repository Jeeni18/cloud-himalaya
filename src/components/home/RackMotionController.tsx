'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

// Toggles data-rack-paused on its own container so the CSS animations
// inside (styles.css: .rack-blink / .rack-traffic / .rack-replicate)
// pause via `animation-play-state` -- without this, a looping animation
// the user can't see still costs a repaint every frame.
export function RackMotionController({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function setPaused(paused: boolean) {
      if (container) container.dataset.rackPaused = String(paused)
    }

    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting || document.hidden),
      { threshold: 0 },
    )
    observer.observe(container)

    function handleVisibilityChange() {
      setPaused(document.hidden)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}
