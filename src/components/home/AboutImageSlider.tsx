'use client'

import { useEffect, useRef, useState } from 'react'

type AboutImageSliderProps = {
  images: string[]
}

const INTERVAL_MS = 4000

// Small client island inside the (server) AboutPreview section: a
// crossfading image slider with dots. Auto-advances on an interval,
// pauses on hover/focus, and -- under prefers-reduced-motion -- never
// auto-advances at all (the dots still work by hand). Same size/position
// as the single photo placeholder it replaces, so there's no layout
// jump moving between sections while this hasn't mounted yet.
export function AboutImageSlider({ images }: AboutImageSliderProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    if (paused || reducedMotionRef.current) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [paused, images.length])

  return (
    <div
      className="relative flex min-h-[320px] flex-1 overflow-hidden rounded-2xl bg-soft lg:basis-[55%]"
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((label, i) => (
        <p
          aria-hidden={i !== index}
          className="absolute inset-0 flex items-end p-5 font-mono text-xs text-subtle transition-opacity duration-700"
          key={label}
          style={{ opacity: i === index ? 1 : 0 }}
        >
          {label}
        </p>
      ))}

      {/* Scrim so the dots stay readable once these placeholders become real photos. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent"
      />

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((label, i) => (
          <button
            aria-current={i === index}
            aria-label={`Show ${label}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
            key={label}
            onClick={() => setIndex(i)}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
