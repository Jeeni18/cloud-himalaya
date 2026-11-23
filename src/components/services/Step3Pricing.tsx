'use client'

import Link from 'next/link'
import { useState } from 'react'

import type { ServiceSlug } from '../../content/services'
import { step3 } from '../../content/services'
import { formatPlanPrice, getServicePricing, servicePricing } from '../../content/pricing'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'
import { StartingPricesTable } from './StartingPricesTable'
import { VpsEstimator } from './VpsEstimator'

type Billing = 'monthly' | 'yearly'

type Step3PricingProps = {
  id: string
  selectedSlug: ServiceSlug
  onSelectSlug: (slug: ServiceSlug) => void
}

// Step 3 "See the price" (docs/design/services/). Service tabs select
// which service's 3 (or however many -- see pricing.ts) plan cards show;
// a separate Monthly/Yearly toggle only changes the displayed billing
// unit label, since no real rates exist yet to recompute from. The VPS
// estimator and starting-prices table below are unaffected by either
// toggle -- the estimator has its own Monthly/Yearly chips.
// bg-services-step3-bg is this page's own token: its light value matches
// the homepage's --section-services, but dark doesn't, so it isn't a
// full reuse.
export function Step3Pricing({ id, selectedSlug, onSelectSlug }: Step3PricingProps) {
  const [billing, setBilling] = useState<Billing>('monthly')
  const pricing = getServicePricing(selectedSlug)

  return (
    <section className="bg-services-step3-bg py-[var(--section-y)]" id={id}>
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{step3.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3 max-w-[520px]">{step3.heading}</SectionHeading>
          </div>
          <p className="max-w-[420px] text-content-body">{step3.lead}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
          <div
            aria-label={step3.heading}
            className="-mx-[var(--section-x)] flex gap-2 overflow-x-auto px-[var(--section-x)] sm:mx-0 sm:flex-wrap sm:px-0"
            role="tablist"
          >
            {servicePricing.map((service) => {
              const isSelected = service.slug === selectedSlug
              return (
                <button
                  aria-selected={isSelected}
                  className={`min-h-11 shrink-0 rounded-full px-4 text-[15px] font-medium ${
                    isSelected
                      ? 'bg-content-selected-bg text-content-selected-text'
                      : 'bg-content-card-bg text-content-body'
                  }`}
                  key={service.slug}
                  onClick={() => onSelectSlug(service.slug)}
                  role="tab"
                  type="button"
                >
                  {service.name}
                </button>
              )
            })}
          </div>

          <div className="flex min-h-11 rounded-full border border-content-card-border bg-content-card-bg p-1">
            <button
              aria-pressed={billing === 'monthly'}
              className={`rounded-full px-4 text-[15px] font-medium ${
                billing === 'monthly'
                  ? 'bg-content-selected-bg text-content-selected-text'
                  : 'text-content-body'
              }`}
              onClick={() => setBilling('monthly')}
              type="button"
            >
              {step3.monthlyLabel}
            </button>
            <button
              aria-pressed={billing === 'yearly'}
              className={`rounded-full px-4 text-[15px] font-medium ${
                billing === 'yearly'
                  ? 'bg-content-selected-bg text-content-selected-text'
                  : 'text-content-body'
              }`}
              onClick={() => setBilling('yearly')}
              type="button"
            >
              {step3.yearlyLabel}
            </button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <div
              className={`relative flex flex-col rounded-2xl border bg-content-card-bg p-7 ${
                plan.mostChosen
                  ? 'order-first border-2 border-content-selected-bg shadow-[0_24px_50px_-24px_rgba(9,84,166,0.55)] sm:order-none'
                  : 'border-content-card-border'
              }`}
              key={plan.name}
            >
              {plan.mostChosen && (
                <span className="absolute -top-3 left-7 rounded-full bg-content-selected-bg px-2.5 py-1 font-mono text-[11px] text-content-selected-text">
                  {step3.mostChosenLabel}
                </span>
              )}

              <h3 className="text-[22px] font-bold text-content-head">{plan.name}</h3>
              <p className="mt-1 text-content-secondary">{plan.description}</p>

              <div className="mt-5">
                <span className="text-2xl font-bold text-content-head">
                  {formatPlanPrice(plan.price)}
                </span>
                {plan.price !== null && (
                  <span className="text-content-secondary">
                    {' '}
                    {billing === 'yearly' ? step3.yearlyLabel.toLowerCase() : plan.billingUnit}
                  </span>
                )}
              </div>
              {plan.price !== null && (
                <p className="text-[13px] text-content-secondary">{step3.exclVat}</p>
              )}

              <ul className="mt-5 flex flex-1 flex-col gap-2.5 border-t border-content-card-border pt-3.5">
                {plan.features.map((feature) => (
                  <li className="flex items-start gap-2.5 text-content-body" key={feature}>
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
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                className={`mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-lg px-5 text-[15px] font-semibold ${
                  plan.mostChosen
                    ? 'bg-content-selected-bg text-content-selected-text hover:opacity-90'
                    : 'border border-content-card-border text-content-head hover:bg-content-icon-chip-bg'
                }`}
                href={`/contact-us?type=quote&service=${pricing.slug}&plan=${encodeURIComponent(plan.name)}`}
              >
                Choose {plan.name}
              </Link>
            </div>
          ))}
        </div>

        {/* VPS-only (the task's own scope), but stays visible regardless
            of which tab is selected -- a standing tool under the plan
            cards, not part of any one service's panel, matching the
            reference's own layout. */}
        <VpsEstimator />

        <StartingPricesTable onSeePlans={onSelectSlug} />
      </div>
    </section>
  )
}
