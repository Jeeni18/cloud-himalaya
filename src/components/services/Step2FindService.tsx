'use client'

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'

import { servicesBlueprint } from '../../content/home'
import type { ServiceSlug } from '../../content/services'
import { step2 } from '../../content/services'
import { formatPlanPrice, getServicePricing } from '../../content/pricing'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'
import { ServiceCircle } from './ServiceCircle'

type Step2FindServiceProps = {
  onSeePlans: (slug: ServiceSlug) => void
}

// Step 2 "Find your service", section 2 of /services (docs/design/
// services/). A real checkbox per need (not a styled div), each mapped
// to a canonical service slug; checking several needs lists the
// deduplicated set of services they map to, rather than one. The result
// card has aria-live="polite" so screen reader users hear it update as
// checkboxes change. bg-section-about is the homepage's existing token
// (pixel-identical to this section's background, the reference's own
// Step 2 band color).
export function Step2FindService({ onSeePlans }: Step2FindServiceProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const baseId = useId()

  function toggle(index: number) {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const selectedSlugs = useMemo(() => {
    const slugs: ServiceSlug[] = []
    for (const index of checked) {
      const slug = step2.needs[index].resultSlug
      if (!slugs.includes(slug)) slugs.push(slug)
    }
    return slugs
  }, [checked])

  return (
    <section className="bg-section-about py-[var(--section-y)]">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{step2.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3 max-w-[520px]">{step2.heading}</SectionHeading>
          </div>
          <p className="max-w-[420px] text-muted">{step2.lead}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-content-card-border bg-content-card-bg p-3.5">
            <p className="px-3 py-2.5 font-mono text-xs text-content-secondary">
              {step2.needListLabel}
            </p>
            <ul className="flex flex-col gap-2">
              {step2.needs.map((need, index) => {
                const isChecked = checked.has(index)
                const inputId = `${baseId}-need-${index}`
                return (
                  <li key={need.label}>
                    <label
                      className={`grid min-h-11 cursor-pointer grid-cols-[1fr_auto] items-center gap-2 rounded-xl px-4 py-3 sm:grid-cols-[1fr_40px_auto] ${
                        isChecked
                          ? 'bg-content-icon-chip-bg shadow-[inset_3px_0_0_var(--color-content-accent)]'
                          : ''
                      }`}
                      htmlFor={inputId}
                    >
                      <span
                        className={`flex items-center gap-2.5 text-[16px] text-content-head ${isChecked ? 'font-semibold' : 'font-medium'}`}
                      >
                        <input
                          checked={isChecked}
                          className="h-4 w-4 accent-[var(--color-content-accent)]"
                          id={inputId}
                          onChange={() => toggle(index)}
                          type="checkbox"
                        />
                        {need.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="hidden text-content-label sm:block sm:text-center"
                      >
                        →
                      </span>
                      <span className="font-mono text-[13px] text-content-label">
                        {need.resultLabel}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
            <p className="px-4 py-3.5 text-sm text-content-secondary">{step2.combinedHint}</p>
          </div>

          <div
            aria-live="polite"
            className="flex flex-col overflow-hidden rounded-2xl border border-content-card-border bg-content-card-bg shadow-[0_30px_60px_-30px_rgba(16,61,112,0.45)]"
          >
            <div className="flex justify-between bg-[#092B50] px-6 py-4 font-mono text-xs">
              <span className="text-[#55A4E0]">{step2.resultHeaderLabel.toUpperCase()}</span>
              <span className="text-[#D8EAF8]">
                {step2.selectedCountLabel(selectedSlugs.length)}
              </span>
            </div>

            {selectedSlugs.length === 0 ? (
              <p className="flex-1 p-7 text-content-secondary">{step2.emptyState}</p>
            ) : (
              <ResultPanel onSeePlans={onSeePlans} slugs={selectedSlugs} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultPanel({
  slugs,
  onSeePlans,
}: {
  slugs: ServiceSlug[]
  onSeePlans: (slug: ServiceSlug) => void
}) {
  const services = slugs.map((slug) => ({
    slug,
    blueprint: servicesBlueprint.services.find((service) => service.slug === slug),
    pricing: getServicePricing(slug),
  }))

  return (
    <div className="flex-1 p-7">
      {services.map(({ slug, blueprint, pricing }, index) => (
        <div
          className={index > 0 ? 'mt-6 border-t border-content-card-border pt-6' : ''}
          key={slug}
        >
          <div className="flex items-center gap-5">
            <ServiceCircle service={slug} size={72} />
            <div>
              <h3 className="text-xl font-semibold text-content-head">{pricing.name}</h3>
              <p className="mt-1 text-sm text-content-secondary">{blueprint?.description}</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm text-content-secondary">Starting from</p>
            <p className="text-2xl font-semibold text-content-head">
              {formatPlanPrice(pricing.startingPrice)}
              <span className="text-base font-normal text-content-secondary">
                {pricing.startingPrice !== null ? pricing.startingUnit : ''}
              </span>
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-content-selected-bg px-5 text-[15px] font-semibold text-content-selected-text hover:opacity-90"
              href="/contact-us?type=quote"
            >
              {step2.getQuoteLabel}
            </Link>
            <button
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-content-card-border px-5 text-[15px] font-semibold text-content-head hover:bg-content-icon-chip-bg"
              onClick={() => onSeePlans(slug)}
              type="button"
            >
              {step2.seePlansLabel(pricing.name)} <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
