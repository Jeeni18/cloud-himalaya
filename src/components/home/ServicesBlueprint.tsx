'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { servicesBlueprint } from '../../content/home'
import { BlueprintFigure } from '../services/BlueprintFigure'

// Rack geometry, copied from the reference's own renderVals(): unit 1
// starts at y=74, each U is 14.2px tall.
const TOP = 74
const UNIT_HEIGHT = 14.2
const TOUR_INTERVAL_MS = 3400

// Interactive server-cabinet blueprint, replacing the 5-row service list
// in ServicesListPreview.tsx. A small client island -- the rest of that
// section stays a server component. Geometry/colors copied verbatim from
// docs/design/services-blueprint/services-blueprint-{light,dark}.html;
// behavior (auto-tour, reduced motion, on-screen gating) is this
// project's own addition on top of that reference.
export function ServicesBlueprint() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [userInteracted, setUserInteracted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.2,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (userInteracted || !isVisible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = window.setInterval(() => {
      setSelectedIndex((current) => (current + 1) % servicesBlueprint.services.length)
    }, TOUR_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [userInteracted, isVisible])

  const selected = servicesBlueprint.services[selectedIndex]

  function selectService(index: number) {
    setUserInteracted(true)
    setSelectedIndex(index)
  }

  const units = servicesBlueprint.rackUnits.map((unit) => {
    const y = TOP + (unit.start - 1) * UNIT_HEIGHT
    const h = unit.height * UNIT_HEIGHT - 2
    const isSelected = unit.key === selected.key
    const lineY = y + Math.min(h, UNIT_HEIGHT) / 2
    return {
      ...unit,
      y,
      h,
      lineY,
      textY: lineY + 3,
      fill: isSelected ? '#1268A9' : unit.key === 'colo' ? 'rgba(216,234,248,0.04)' : '#092B50',
      dash: unit.key === 'colo' ? '5 4' : undefined,
    }
  })

  const targets = servicesBlueprint.rackUnits.filter((unit) => unit.key === selected.key)
  const firstTarget = targets[0]
  const lastTarget = targets[targets.length - 1]
  const y0 = TOP + (firstTarget.start - 1) * UNIT_HEIGHT
  const y1 = TOP + (lastTarget.start - 1 + lastTarget.height) * UNIT_HEIGHT
  const leaderMidY = (y0 + y1) / 2
  const leaderPath = `M316 ${leaderMidY.toFixed(1)} H360 L${(560 - 170 * 0.94).toFixed(1)} 330`

  return (
    // flex-col-reverse (not flex-col): the list is the second DOM child
    // (after the drawing) but needs to appear first when stacked, per
    // the original "list first, then the drawing full width" mobile/
    // tablet spec -- reversed only below lg, where the drawing has no
    // focusable content of its own, so visual and keyboard-tab order
    // don't actually diverge here.
    <div className="flex flex-col-reverse gap-9 lg:flex-row lg:items-start" ref={wrapperRef}>
      <div className="min-w-0 lg:max-w-[52%] lg:flex-[3]">
        {/* The drawing is nearly square (760x720), so a full-width SVG
            becomes as tall as it is wide -- on a tablet that alone was
            ~660px, pushing the rest of the section off-screen. Capping
            the height lets it scale down (and centre) on short or
            medium screens instead of dictating the section's height. */}
        <svg
          aria-label={servicesBlueprint.ariaLabel}
          className="mx-auto block h-auto max-h-[min(58svh,520px)] w-full"
          overflow="visible"
          role="img"
          viewBox="0 0 760 720"
        >
          <g fill="none" stroke="var(--color-blueprint-measure)" strokeWidth="1">
            <path d="M110 30 H330 M110 24 V36 M330 24 V36" />
            <path d="M80 60 V680 M74 60 H86 M74 680 H86" />
          </g>
          <text
            fill="var(--color-blueprint-measure)"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            textAnchor="middle"
            x="220"
            y="20"
          >
            600
          </text>
          <text
            fill="var(--color-blueprint-measure)"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            textAnchor="middle"
            transform="rotate(-90 66 370)"
            x="66"
            y="370"
          >
            42U
          </text>

          {/* Rack body: #092B50 fill, white/pale/blue lines -- fixed in
              both themes, same as ServerRack.tsx's own exception. */}
          <rect
            fill="#092B50"
            height="620"
            stroke="#FFFFFF"
            strokeWidth="2"
            width="220"
            x="110"
            y="60"
          />
          <rect
            fill="none"
            height="600"
            stroke="#55A4E0"
            strokeWidth="0.8"
            width="200"
            x="120"
            y="70"
          />

          {units.map((unit) => (
            <g key={unit.label}>
              <rect
                className="blueprint-unit"
                fill={unit.fill}
                height={unit.h}
                stroke="#D8EAF8"
                strokeDasharray={unit.dash}
                strokeWidth="0.8"
                width="192"
                x="124"
                y={unit.y}
              />
              <line
                stroke="#55A4E0"
                strokeWidth="1"
                x1="134"
                x2="200"
                y1={unit.lineY}
                y2={unit.lineY}
              />
              <text
                fill="#D8EAF8"
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                textAnchor="end"
                x="310"
                y={unit.textY}
              >
                {unit.label}
              </text>
            </g>
          ))}

          <path
            d={leaderPath}
            fill="none"
            stroke="var(--color-blueprint-leader)"
            strokeWidth="1.5"
          />
          <path
            className="blueprint-packet"
            d={leaderPath}
            fill="none"
            stroke="#FFFFFF"
            strokeDasharray="3 21"
            strokeWidth="2"
          />

          <g className="blueprint-fade" key={selected.key} transform="translate(560 330)">
            <circle fill="#092B50" r="170" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle fill="none" r="162" stroke="#55A4E0" strokeDasharray="3 5" strokeWidth="0.8" />
            <BlueprintFigure selectedKey={selected.key} />
            <text
              fill="var(--color-blueprint-ink)"
              fontFamily="Geist Mono, monospace"
              fontSize="11"
              textAnchor="middle"
              y="196"
            >
              DETAIL {selected.number} · {selected.figureLabel}
            </text>
          </g>
        </svg>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4.5">
        <div
          aria-label="Services"
          className="flex flex-col border-t border-blueprint-divider"
          role="group"
        >
          {servicesBlueprint.services.map((service, index) => {
            const isSelected = index === selectedIndex
            return (
              <button
                aria-pressed={isSelected}
                className={`flex min-h-11 items-baseline gap-3.5 border-b border-blueprint-divider px-3 py-3.5 text-left font-sans text-blueprint-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-blueprint-selected-bg shadow-[inset_3px_0_0_var(--color-blueprint-selected-bar)]'
                    : 'bg-transparent'
                }`}
                key={service.key}
                onClick={() => selectService(index)}
                onFocus={() => selectService(index)}
                onMouseEnter={() => selectService(index)}
                type="button"
              >
                <span className="font-mono text-xs text-blueprint-number">{service.number}</span>
                <span className="flex-1 text-xl font-semibold">{service.name}</span>
                <span className="font-mono text-[11px] text-blueprint-muted">{service.units}</span>
              </button>
            )
          })}
        </div>

        <p
          aria-live="polite"
          className="blueprint-fade text-base leading-relaxed text-blueprint-muted"
          key={`desc-${selected.key}`}
        >
          {selected.description}
        </p>

        <Link
          aria-label={servicesBlueprint.detailsLabel(selected.name)}
          className="self-start font-semibold text-accent hover:underline"
          href={`/services/${selected.slug}`}
        >
          Details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
