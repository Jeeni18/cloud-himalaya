import { Database, RefreshCw, Server, Users } from 'lucide-react'

import { dataCenterPreview } from '../../content/home'
import { MoreLink } from '../ui/MoreLink'
import { SectionHeading } from '../ui/SectionHeading'
import { SectionRidge } from '../ui/SectionRidge'

const PATH_ICONS = [Users, Server, RefreshCw, Database]

// Our data center preview, section (d) of the new homepage
// (docs/design/landing-preview.html). Full specs live at
// /services/data-center, which doesn't exist yet -- the "More" link
// points there regardless, since that's explicitly fine for now.
// id="data-center" is the other scroll-spy target (with
// ServicesListPreview's "services") for the header's "Services" link.
export function DataCenterPreview() {
  return (
    <>
      <SectionRidge fromVar="--color-section-services" toVar="--color-section-dc" />
      <section className="bg-section-dc py-[var(--section-y)]" id="data-center">
        <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[13px] font-medium text-section-dc-accent">
                {dataCenterPreview.eyebrow}
              </p>
              <SectionHeading className="mt-3 max-w-[640px] text-section-dc-text" tone="custom">
                {dataCenterPreview.heading}
              </SectionHeading>
              <p className="mt-3 max-w-[560px] text-section-dc-muted">
                {dataCenterPreview.paragraph}
              </p>
            </div>
            <MoreLink href={dataCenterPreview.moreHref} label={dataCenterPreview.moreLabel} />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {dataCenterPreview.path.map((step, index) => {
              const Icon = PATH_ICONS[index]
              return (
                <div className="flex flex-1 basis-[180px] items-center gap-4" key={step.title}>
                  <div className="flex-1 rounded-xl border border-section-dc-text/15 bg-section-dc-text/5 p-4">
                    <Icon aria-hidden="true" className="text-section-dc-accent" size={22} />
                    <p className="mt-2 font-semibold text-section-dc-text">{step.title}</p>
                    <p className="text-sm text-section-dc-muted">{step.sub}</p>
                  </div>
                  {index < dataCenterPreview.path.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden h-0.5 w-8 shrink-0 bg-section-dc-accent sm:block"
                    />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-7 gap-y-5 lg:grid-cols-4">
            {dataCenterPreview.specs.map((spec) => (
              <div className="border-t border-section-dc-text/20 pt-4" key={spec.label}>
                <p className="font-mono text-xs text-section-dc-accent">{spec.label}</p>
                <p className="mt-1 text-lg font-semibold text-section-dc-text">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
