'use client'

import { useState } from 'react'

import type { ServiceSlug } from '../../content/services'
import { Step1Understand } from './Step1Understand'
import { Step2FindService } from './Step2FindService'
import { Step3Pricing } from './Step3Pricing'

const STEP_3_ID = 'step-3-price'

// Owns the one piece of state shared across Steps 1-3: Step 1's "See
// prices" and Step 2's "See <service> plans" both need to select Step
// 3's tab and scroll down to it. Steps 1 and 2 otherwise manage their
// own, unrelated state (which tab/which needs are checked) internally.
export function ServicesPricingFlow() {
  const [pricingSlug, setPricingSlug] = useState<ServiceSlug>('vps')

  function goToPricing(slug: string) {
    setPricingSlug(slug as ServiceSlug)
    document.getElementById(STEP_3_ID)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <>
      <Step1Understand onSeePrices={goToPricing} />
      <Step2FindService onSeePlans={goToPricing} />
      <Step3Pricing id={STEP_3_ID} onSelectSlug={setPricingSlug} selectedSlug={pricingSlug} />
    </>
  )
}
