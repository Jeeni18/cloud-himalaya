'use client'

import Link from 'next/link'
import { useId, useRef, useState } from 'react'

import { servicesBlueprint } from '../../content/home'
import type { ServiceSlug } from '../../content/services'
import { step1 } from '../../content/services'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCircle } from './ServiceCircle'

type Step1UnderstandProps = {
  onSeePrices: (slug: string) => void
}

// Step 1 "Understand it", section 1 of /services (docs/design/services/).
// An accessible tabs pattern (role="tablist"/"tab"/"tabpanel", automatic
// activation on arrow-key navigation, matching the homepage blueprint's
// own click/hover/focus-to-select behavior). bg-section-trust is the
// homepage's existing token (pixel-identical to this section's
// background, the reference's own Step 1 band color).
export function Step1Understand({ onSeePrices }: Step1UnderstandProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  const services = servicesBlueprint.services
  const selected = services[selectedIndex]
  const understand = step1.understand.find((item) => item.slug === selected.slug)

  function selectIndex(index: number) {
    setSelectedIndex(index)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectIndex((selectedIndex + 1) % services.length)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectIndex((selectedIndex - 1 + services.length) % services.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      selectIndex(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      selectIndex(services.length - 1)
    }
  }

  if (!understand) return null

  return (
    <section className="bg-section-trust py-[var(--section-y)]">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{step1.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3 max-w-[520px]">{step1.heading}</SectionHeading>
          </div>
          <p className="max-w-[420px] text-muted">{step1.lead}</p>
        </div>

        <div
          aria-label={step1.heading}
          className="-mx-[var(--section-x)] mt-8 flex gap-2 overflow-x-auto px-[var(--section-x)] sm:mx-0 sm:flex-wrap sm:px-0"
          onKeyDown={handleKeyDown}
          role="tablist"
        >
          {services.map((service, index) => {
            const isSelected = index === selectedIndex
            return (
              <button
                aria-controls={`${baseId}-panel-${service.slug}`}
                aria-selected={isSelected}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-content-selected-bg text-content-selected-text'
                    : 'bg-content-card-bg text-content-body hover:bg-content-icon-chip-bg'
                }`}
                id={`${baseId}-tab-${service.slug}`}
                key={service.slug}
                onClick={() => selectIndex(index)}
                ref={(el) => {
                  tabRefs.current[index] = el
                }}
                role="tab"
                tabIndex={isSelected ? 0 : -1}
                type="button"
              >
                <span className="font-mono text-xs opacity-70">{service.number}</span>
                {service.name}
              </button>
            )
          })}
        </div>

        <div
          aria-labelledby={`${baseId}-tab-${selected.slug}`}
          className="mt-5 grid grid-cols-1 gap-9 rounded-2xl border border-content-card-border bg-content-card-bg p-6 sm:p-10 lg:grid-cols-[auto_1fr_1fr]"
          id={`${baseId}-panel-${selected.slug}`}
          role="tabpanel"
          tabIndex={0}
        >
          <div className="flex justify-center lg:block">
            <ServiceCircle service={selected.slug as ServiceSlug} size={160} />
          </div>

          <div>
            <p className="font-mono text-xs font-medium text-content-accent">In plain words</p>
            <p className="mt-2 text-[26px] leading-[1.3] font-medium tracking-[-0.015em] text-content-head">
              {understand.analogy}
            </p>

            <div className="mt-6 rounded-xl bg-section-trust p-4">
              <p className="font-mono text-xs text-content-accent">You need this if</p>
              <p className="mt-1.5 text-content-head">{understand.needThisIf}</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-medium text-content-label">What&apos;s included</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {understand.included.map((item) => (
                <li className="flex items-start gap-2.5 text-content-body" key={item}>
                  <svg
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-content-accent"
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M5 12l4 4 10-10" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-content-selected-bg px-5 text-[15px] font-semibold text-content-selected-text hover:opacity-90"
                href={`/services/${selected.slug}`}
              >
                {step1.detailsLabel(selected.name)} <span aria-hidden="true">→</span>
              </Link>
              <button
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-content-card-border px-5 text-[15px] font-semibold text-content-head hover:bg-content-icon-chip-bg"
                onClick={() => onSeePrices(selected.slug)}
                type="button"
              >
                {step1.seePricesLabel} <span aria-hidden="true">↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
