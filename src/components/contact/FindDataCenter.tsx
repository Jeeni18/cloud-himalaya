import Link from 'next/link'

import { findDataCenter } from '../../content/contact'
import { SectionHeading } from '../ui/SectionHeading'
import { DataCenterMap } from './DataCenterMap'

const DETAILS = [
  { label: 'Address', value: findDataCenter.address },
  { label: 'Office hours', value: findDataCenter.officeHours },
  { label: 'NOC', value: findDataCenter.noc },
  { label: 'Parking', value: findDataCenter.parking },
]

// "Find the data center", section 3 of /contact-us (docs/design/
// contact-us/). bg-section-trust is the homepage's existing token
// (pixel-identical to this section's background, same one "How can we
// help?" uses).
export function FindDataCenter() {
  return (
    <section className="bg-section-trust py-[var(--section-y)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-stretch gap-10 px-[var(--section-x)] lg:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-xs font-medium text-content-accent">
            {findDataCenter.eyebrow.toUpperCase()}
          </p>
          <SectionHeading className="mt-3">{findDataCenter.heading}</SectionHeading>

          <div className="mt-6">
            {DETAILS.map((detail) => (
              <div className="border-t border-content-card-border py-4" key={detail.label}>
                <p className="font-mono text-xs text-content-label">{detail.label.toUpperCase()}</p>
                <p className="mt-1 font-semibold text-content-head">{detail.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-content-selected-bg px-5 text-[15px] font-semibold text-content-selected-text hover:opacity-90"
              href={findDataCenter.directionsHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              {findDataCenter.directionsLabel} <span aria-hidden="true">↗</span>
            </a>
            <Link
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-content-card-border px-5 text-[15px] font-semibold text-content-head hover:bg-content-icon-chip-bg"
              href="/contact-us?topic=tour#contact-form"
            >
              {findDataCenter.tourLabel}
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <DataCenterMap />
        </div>
      </div>
    </section>
  )
}
