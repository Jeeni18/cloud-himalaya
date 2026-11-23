import { ChevronRight } from 'lucide-react'

import { careersPreview } from '../../content/home'
import { Eyebrow } from '../ui/Eyebrow'
import { MoreLink } from '../ui/MoreLink'
import { SectionHeading } from '../ui/SectionHeading'

// Careers preview, section (f) of the new homepage
// (docs/design/landing-preview.html). Full listings live at /careers,
// which doesn't exist yet -- roles are bracketed placeholders (no real
// openings to show), so each row is plain text rather than a link to a
// job page that isn't there.
export function CareersPreview() {
  return (
    <section className="bg-section-careers py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{careersPreview.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3 max-w-[560px]">{careersPreview.heading}</SectionHeading>
            <p className="mt-3 max-w-[560px] text-muted">{careersPreview.paragraph}</p>
          </div>
          <MoreLink href={careersPreview.moreHref} label={careersPreview.moreLabel} />
        </div>

        <div className="mt-10 flex flex-wrap gap-10 lg:flex-nowrap">
          <div className="flex min-h-[260px] flex-1 items-end rounded-2xl bg-soft p-5 lg:basis-1/2">
            <p className="font-mono text-xs text-subtle">{careersPreview.photoCaption}</p>
          </div>

          <div className="flex-1 border-b border-line lg:basis-1/2">
            {careersPreview.roles.map((role, index) => (
              <div
                className="flex items-center justify-between gap-4 border-t border-line py-5"
                key={index}
              >
                <div>
                  <p className="text-lg font-semibold text-head">{role.title}</p>
                  <p className="text-sm text-subtle">{role.location}</p>
                </div>
                <ChevronRight aria-hidden="true" className="shrink-0 text-subtle" size={20} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
