'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { testimonials } from '../../content/home'

// docs/LANDING_PAGE_SPEC.md section 4.10 (right card). No auto-advance;
// the prev/next buttons are disabled rather than hidden when there's
// only one testimonial, since Phase 2 will add more over time.
export function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const hasMultiple = testimonials.length > 1
  const current = testimonials[index]

  function go(delta: number) {
    setIndex((value) => (value + delta + testimonials.length) % testimonials.length)
  }

  return (
    <div className="flex flex-1 basis-[380px] flex-col gap-[18px] rounded-2xl bg-feature p-9 text-feature-text">
      <svg aria-hidden="true" height={28} viewBox="0 0 36 28" width={36}>
        <path
          d="M0 28V16C0 7 5 1 14 0v6c-4 1-6 4-6 8h6v14zm20 0V16c0-9 5-15 14-16v6c-4 1-6 4-6 8h6v14z"
          fill="var(--color-feature-accent)"
        />
      </svg>

      <p className="text-[28px] font-semibold">{current.quote}</p>

      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <p className="font-bold">{current.name}</p>
          <p className="text-feature-muted">{current.company}</p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-feature-border disabled:opacity-40"
            disabled={!hasMultiple}
            onClick={() => go(-1)}
            type="button"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-feature-border disabled:opacity-40"
            disabled={!hasMultiple}
            onClick={() => go(1)}
            type="button"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
