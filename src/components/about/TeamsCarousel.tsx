'use client'

import { useEffect, useRef, useState } from 'react'

import { teamsSection } from '../../content/about'
import { PlaceholderBox } from '../ui/PlaceholderBox'
import { SectionHeading } from '../ui/SectionHeading'

const TOTAL = teamsSection.teams.length
const GAP_PX = 20
const SPEED_PX_PER_SEC = 32
const NUDGE_TRANSITION_MS = 380

// Teams, section 4 of /about-us (docs/design/about-us/): a continuous
// marquee, same technique as the homepage's ClientLogos trust bar (the
// track renders the list twice, aria-hidden on the second copy, and
// drifts left seamlessly) but driven by rAF instead of a CSS keyframe --
// unlike the logos strip, this one needs manual back/forth, so a single
// JS-owned offset backs both the automatic drift and the arrow nudges.
// Pauses on hover/keyboard focus (so reaching for an arrow doesn't fight
// the drift); never auto-advances under prefers-reduced-motion, though
// the arrows still jump (instantly, no transition) either way. It loops
// forever, so -- unlike the old bounded version -- the arrows are never
// disabled and there's no "01-03 / 06" position counter. TODO: cards
// aren't links yet -- there are no team pages to link to (flagged to the
// user in this task's summary).
export function TeamsCarousel() {
  const trackRef = useRef<HTMLUListElement>(null)
  const offsetRef = useRef(0)
  const stepRef = useRef(0)
  const setWidthRef = useRef(0)
  const pausedRef = useRef(false)
  const reducedMotionRef = useRef(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function measure() {
      if (!track) return
      const firstCard = track.children[0] as HTMLElement | undefined
      if (!firstCard) return
      stepRef.current = firstCard.getBoundingClientRect().width + GAP_PX
      setWidthRef.current = stepRef.current * TOTAL
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId: number
    let lastTime = 0

    function tick(time: number) {
      if (!lastTime) lastTime = time
      const dt = time - lastTime
      lastTime = time

      if (!pausedRef.current && !reducedMotionRef.current && setWidthRef.current > 0) {
        offsetRef.current += (SPEED_PX_PER_SEC * dt) / 1000
        if (offsetRef.current >= setWidthRef.current) {
          offsetRef.current -= setWidthRef.current
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  function nudge(direction: 1 | -1) {
    const track = trackRef.current
    const step = stepRef.current || track?.clientWidth || 0
    const setWidth = setWidthRef.current || step * TOTAL
    if (!track || setWidth <= 0) return

    if (!reducedMotionRef.current) {
      track.style.transition = `transform ${NUDGE_TRANSITION_MS}ms ease`
      window.setTimeout(() => {
        if (track) track.style.transition = ''
      }, NUDGE_TRANSITION_MS)
    }

    offsetRef.current = (((offsetRef.current + direction * step) % setWidth) + setWidth) % setWidth
    track.style.transform = `translateX(-${offsetRef.current}px)`
  }

  return (
    <section className="overflow-hidden bg-section-careers py-[var(--section-y)]">
      <div
        className="mx-auto max-w-[1280px] px-[var(--section-x)]"
        role="region"
        aria-label={teamsSection.regionLabel}
        onBlur={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[13px] font-medium text-content-accent">
              {teamsSection.eyebrow}
            </p>
            <SectionHeading className="mt-3 text-content-head" tone="custom">
              {teamsSection.heading}
            </SectionHeading>
          </div>

          <div className="flex gap-2.5">
            <button
              aria-label={teamsSection.prevLabel}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-content-selected-bg text-content-selected-text text-xl"
              onClick={() => nudge(-1)}
              type="button"
            >
              ←
            </button>
            <button
              aria-label={teamsSection.nextLabel}
              className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-content-selected-bg text-content-selected-text text-xl"
              onClick={() => nudge(1)}
              type="button"
            >
              →
            </button>
          </div>
        </div>

        <div className="teams-mask relative mt-10 overflow-hidden">
          <ul className="flex w-max gap-5" ref={trackRef}>
            {teamsSection.teams.map((team) => (
              <li
                className="w-[260px] shrink-0 overflow-hidden rounded-2xl border border-content-card-border bg-content-card-bg sm:w-[300px] lg:w-[340px]"
                key={team.slug}
              >
                <PlaceholderBox
                  className="h-[150px] rounded-none sm:h-[165px] lg:h-[180px]"
                  label={team.photoCaption}
                />
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-xl font-semibold text-content-head">{team.name}</h3>
                    <p className="mt-1.5 text-sm text-content-secondary">{team.description}</p>
                  </div>
                  <span className="font-mono text-xs whitespace-nowrap text-content-accent">
                    {team.peopleCount} PEOPLE →
                  </span>
                </div>
              </li>
            ))}

            {teamsSection.teams.map((team) => (
              <li
                aria-hidden="true"
                className="w-[260px] shrink-0 overflow-hidden rounded-2xl border border-content-card-border bg-content-card-bg sm:w-[300px] lg:w-[340px]"
                key={`dup-${team.slug}`}
              >
                <PlaceholderBox
                  className="h-[150px] rounded-none sm:h-[165px] lg:h-[180px]"
                  label={team.photoCaption}
                />
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <h3 className="text-xl font-semibold text-content-head">{team.name}</h3>
                    <p className="mt-1.5 text-sm text-content-secondary">{team.description}</p>
                  </div>
                  <span className="font-mono text-xs whitespace-nowrap text-content-accent">
                    {team.peopleCount} PEOPLE →
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
