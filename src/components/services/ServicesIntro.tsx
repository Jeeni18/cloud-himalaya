import { ServicesBlueprint } from '../home/ServicesBlueprint'
import { SectionHeading } from '../ui/SectionHeading'
import { intro } from '../../content/services'

// Intro, section 0 of /services (docs/design/services/). Same heading/
// subtitle/blueprint as the homepage's Services preview, minus the
// "More" link -- this page IS the destination that link points to.
// bg-section-services is the homepage's existing token (pixel-identical
// to this section's background, the reference's own intro band color).
export function ServicesIntro() {
  return (
    <section className="bg-section-services py-[var(--section-y)]">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <SectionHeading className="max-w-[900px]" level={1}>
          {intro.heading}
        </SectionHeading>
        <p className="mt-3 max-w-[560px] text-muted">{intro.subtitle}</p>

        <div className="mt-10">
          <ServicesBlueprint />
        </div>
      </div>
    </section>
  )
}
