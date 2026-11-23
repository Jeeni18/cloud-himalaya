'use client'

import { useId, useMemo, useState } from 'react'

import type { AddonKey } from '../../content/pricing'
import { formatNpr, vpsEstimator } from '../../content/pricing'
import { step3 } from '../../content/services'

type Billing = 'monthly' | 'yearly'

const ADDON_KEYS = Object.keys(vpsEstimator.addons) as AddonKey[]

// "Build your own VPS" estimator, part of Step 3 (docs/design/services/).
// Real <input type="range"> sliders (labelled, keyboard-accessible, with
// the current value always shown as text) rather than a custom-drawn
// slider. estimate = base + (vCPU x rate) + (GB RAM x rate) + (GB
// storage x rate) + add-ons, all rates from pricing.ts; shows "NPR --"
// while any rate involved is still null. The navy panel and its white
// inner card are fixed in both themes, same as the homepage's blueprint
// rack/bubble and the about page's visitor pass.
export function VpsEstimator() {
  const [vcpu, setVcpu] = useState(vpsEstimator.vcpu.default)
  const [memoryGb, setMemoryGb] = useState(vpsEstimator.memoryGb.default)
  const [storageGb, setStorageGb] = useState(vpsEstimator.storageGb.default)
  const [billing, setBilling] = useState<Billing>('monthly')
  const [addons, setAddons] = useState<Set<AddonKey>>(new Set())
  const baseId = useId()

  function toggleAddon(key: AddonKey) {
    setAddons((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const estimate = useMemo(() => {
    const rates = [
      vpsEstimator.basePrice,
      vpsEstimator.vcpu.ratePerUnit === null ? null : vcpu * vpsEstimator.vcpu.ratePerUnit,
      vpsEstimator.memoryGb.ratePerUnit === null
        ? null
        : memoryGb * vpsEstimator.memoryGb.ratePerUnit,
      vpsEstimator.storageGb.ratePerUnit === null
        ? null
        : storageGb * vpsEstimator.storageGb.ratePerUnit,
      ...Array.from(addons).map((key) => vpsEstimator.addons[key].price),
    ]

    if (rates.some((rate) => rate === null)) return null

    const total = rates.reduce<number>((sum, rate) => sum + (rate ?? 0), 0)
    if (billing === 'yearly' && vpsEstimator.yearlyDiscountMultiplier !== null) {
      return total * vpsEstimator.yearlyDiscountMultiplier
    }
    return total
  }, [vcpu, memoryGb, storageGb, addons, billing])

  // Readable text /contact-us's form drops straight into its setup
  // textarea (docs/design/contact-us/), e.g. "VPS estimate: 4 vCPU, 8 GB
  // RAM, 200 GB SSD, + Backups" -- built here rather than passing raw
  // numbers for the receiving page to reassemble.
  const addonText = Array.from(addons)
    .map((key) => step3.estimator.addonsLabel[key])
    .join(', ')
  const configText = `VPS estimate: ${vcpu} vCPU, ${memoryGb} GB RAM, ${storageGb} GB SSD${addonText ? `, ${addonText}` : ''} (${billing})`

  const quoteParams = new URLSearchParams({
    topic: 'quote',
    service: 'vps',
    config: configText,
  })

  return (
    <div className="mt-5 grid grid-cols-1 gap-6 rounded-2xl bg-[#092B50] p-6 text-white sm:p-7 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-[14px] bg-white p-6">
        <p className="font-mono text-xs text-content-accent">
          {step3.estimator.heading.toUpperCase()}
        </p>

        <Slider
          id={`${baseId}-vcpu`}
          label="vCPU"
          max={vpsEstimator.vcpu.max}
          min={vpsEstimator.vcpu.min}
          onChange={setVcpu}
          step={vpsEstimator.vcpu.step}
          value={vcpu}
          valueLabel={`${vcpu}`}
        />
        <Slider
          id={`${baseId}-memory`}
          label="Memory"
          max={vpsEstimator.memoryGb.max}
          min={vpsEstimator.memoryGb.min}
          onChange={setMemoryGb}
          step={vpsEstimator.memoryGb.step}
          value={memoryGb}
          valueLabel={`${memoryGb} GB`}
        />
        <Slider
          id={`${baseId}-storage`}
          label="Storage"
          max={vpsEstimator.storageGb.max}
          min={vpsEstimator.storageGb.min}
          onChange={setStorageGb}
          step={vpsEstimator.storageGb.step}
          value={storageGb}
          valueLabel={`${storageGb} GB SSD`}
        />

        <div className="mt-5 flex flex-wrap gap-2">
          <BillingChip
            isSelected={billing === 'monthly'}
            label={step3.monthlyLabel}
            onClick={() => setBilling('monthly')}
          />
          <BillingChip
            isSelected={billing === 'yearly'}
            label={step3.estimator.yearlyDiscountLabel}
            onClick={() => setBilling('yearly')}
          />
        </div>

        <div className="mt-2.5 flex flex-wrap gap-2">
          {ADDON_KEYS.map((key) => (
            <BillingChip
              isSelected={addons.has(key)}
              key={key}
              label={step3.estimator.addonsLabel[key]}
              onClick={() => toggleAddon(key)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <p className="font-mono text-xs text-[#55A4E0]">
            {step3.estimator.estimatedPriceLabel.toUpperCase()}
          </p>
          <p className="mt-2 text-[44px] leading-none font-semibold tracking-[-0.03em] sm:text-[52px]">
            {formatNpr(estimate)}
          </p>
          <p className="text-[#D8EAF8]">{step3.estimator.perMonthLabel}</p>
          <p className="mt-4 text-[15px] text-[#D8EAF8]">{step3.estimator.disclaimer}</p>
        </div>

        <a
          className="mt-5 inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-[#55A4E0] px-5 text-[15px] font-semibold text-[#092B50] hover:opacity-90"
          href={`/contact-us?${quoteParams.toString()}`}
        >
          {step3.estimator.sendQuoteLabel}
        </a>
      </div>
    </div>
  )
}

type SliderProps = {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  valueLabel: string
  onChange: (value: number) => void
}

function Slider({ id, label, min, max, step, value, valueLabel, onChange }: SliderProps) {
  return (
    <div className="mt-[18px]">
      <div className="flex justify-between">
        <label className="font-medium text-content-head" htmlFor={id}>
          {label}
        </label>
        <span className="font-mono text-content-accent">{valueLabel}</span>
      </div>
      <input
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-services-slider-track accent-[var(--color-content-accent)]"
        id={id}
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </div>
  )
}

function BillingChip({
  label,
  isSelected,
  onClick,
}: {
  label: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      aria-pressed={isSelected}
      className={`min-h-9 rounded-full px-3.5 text-[13px] font-medium ${
        isSelected
          ? 'bg-content-selected-bg text-content-selected-text'
          : 'bg-content-icon-chip-bg text-content-head'
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
