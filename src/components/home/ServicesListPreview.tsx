import { servicesListPreview } from '../../content/home'
import { Eyebrow } from '../ui/Eyebrow'
import { MoreLink } from '../ui/MoreLink'
import { SectionHeading } from '../ui/SectionHeading'
import { ServicesBlueprint } from './ServicesBlueprint'

// Services preview, section (c) of the new homepage
// (docs/design/landing-preview.html). Separate from the fuller
// ServicesBento component, which still backs /services. id="services" is
// one of two scroll-spy targets (with DataCenterPreview's "data-center")
// for the header's "Services" link -- see useActiveNavHref.ts.
// The 5-row list this section originally had is now the interactive
// ServicesBlueprint drawing instead (docs/design/services-blueprint/);
// heading/intro/More and this section's own background are unchanged.
export function ServicesListPreview() {
  return (
    <section className="bg-section-services py-[var(--section-y)]" id="services">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{servicesListPreview.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3 max-w-[640px]">
              {servicesListPreview.heading}
            </SectionHeading>
            <p className="mt-3 max-w-[560px] text-muted">{servicesListPreview.intro}</p>
          </div>
          <MoreLink href={servicesListPreview.moreHref} label={servicesListPreview.moreLabel} />
        </div>

        <div className="mt-10">
          <ServicesBlueprint />
        </div>
      </div>
    </section>
  )
}
