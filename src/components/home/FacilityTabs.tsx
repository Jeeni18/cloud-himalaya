'use client'

import { useRef, useState } from 'react'

import { facilityTabs } from '../../content/home'
import { SectionHeading } from '../ui/SectionHeading'

// docs/LANDING_PAGE_SPEC.md section 4.8. WAI-ARIA tabs pattern: arrow
// keys move both focus and selection among the tabs.
export function FacilityTabs() {
  const [activeId, setActiveId] = useState(facilityTabs.tabs[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const activeIndex = facilityTabs.tabs.findIndex((tab) => tab.id === activeId)
  const active = facilityTabs.tabs[activeIndex]

  function selectByIndex(index: number) {
    const nextIndex = (index + facilityTabs.tabs.length) % facilityTabs.tabs.length
    const next = facilityTabs.tabs[nextIndex]
    setActiveId(next.id)
    tabRefs.current[next.id]?.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      selectByIndex(activeIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      selectByIndex(activeIndex - 1)
    }
  }

  return (
    <section className="bg-band text-band-text">
      <div className="mx-auto max-w-[1280px] px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-sm font-medium text-band-accent">{facilityTabs.eyebrow}</p>
            <SectionHeading className="mt-3" tone="inverted">
              {facilityTabs.heading}
            </SectionHeading>
          </div>
          <a className="font-bold text-band-accent" href={facilityTabs.cta.href}>
            {facilityTabs.cta.label}
          </a>
        </div>

        <div aria-label="Facility systems" className="mt-8 flex flex-wrap gap-2.5" role="tablist">
          {facilityTabs.tabs.map((tab) => {
            const isActive = tab.id === activeId
            return (
              <button
                aria-selected={isActive}
                className={`h-11 rounded-full px-5 text-[15px] font-semibold ${
                  isActive
                    ? 'bg-band-accent text-[#04121F]'
                    : 'border border-band-border bg-transparent text-band-text'
                }`}
                id={`facility-tab-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={handleKeyDown}
                ref={(el) => {
                  tabRefs.current[tab.id] = el
                }}
                role="tab"
                tabIndex={isActive ? 0 : -1}
                type="button"
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          aria-labelledby={`facility-tab-${active.id}`}
          className="mt-5 flex flex-wrap gap-5"
          id={`facility-panel-${active.id}`}
          role="tabpanel"
        >
          <div className="flex min-h-[300px] basis-[380px] items-center justify-center rounded-2xl border border-dashed border-band-border p-6 text-center font-mono text-sm text-band-muted">
            {active.photoCaption}
          </div>

          <div className="flex-[1.4] basis-[520px]">
            <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              {active.specs.map((spec) => (
                <div
                  className="rounded-xl border border-band-border bg-band-surface p-[26px]"
                  key={spec.label}
                >
                  <p className="text-[34px] font-bold text-band-accent">{spec.value}</p>
                  <p className="mt-1 text-band-muted">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
