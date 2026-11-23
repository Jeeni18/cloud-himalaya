'use client'

import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

const MAX_PX = 20
const LERP = 0.08

// Mouse parallax (docs/figma-hero-notes.md): each descendant with a
// `data-depth` attribute translates opposite to the pointer, scaled by
// its own depth factor, smoothed frame-to-frame. Off entirely on touch
// devices and under prefers-reduced-motion (both checked once, before
// any listener is attached -- per the notes, this isn't a "pause",
// parallax simply never runs). Also pauses while the hero is off-screen
// or the tab is hidden, so it never costs anything the user can't see.
export function HeroParallax({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isTouch) return

    const layers = container.querySelectorAll<HTMLElement>('[data-depth]')
    if (layers.length === 0) return

    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let paused = false
    let frameId = 0

    function handlePointerMove(event: PointerEvent) {
      target.x = (event.clientX / window.innerWidth) * 2 - 1
      target.y = (event.clientY / window.innerHeight) * 2 - 1
    }

    function handleVisibilityChange() {
      paused = document.hidden
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting
      },
      { threshold: 0 },
    )
    observer.observe(container)

    function tick() {
      if (!paused) {
        current.x += (target.x - current.x) * LERP
        current.y += (target.y - current.y) * LERP

        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth)
          const x = -current.x * depth * MAX_PX
          const y = -current.y * depth * MAX_PX
          layer.style.transform = `translate3d(${x}px, ${y}px, 0)`
        })
      }
      frameId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    frameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      observer.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <div className="absolute inset-0" ref={containerRef}>
      {children}
    </div>
  )
}
