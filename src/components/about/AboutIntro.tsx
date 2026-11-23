import { aboutPreview } from '../../content/home'
import { AboutImageSlider } from '../home/AboutImageSlider'
import { SectionHeading } from '../ui/SectionHeading'

// Intro, section 1 of /about-us (docs/design/about-us/). Reuses the
// homepage About section's heading/paragraph/stats/photos directly --
// the reference's intro text is identical to the homepage's About Us
// preview -- and its image slider component, not duplicated. Nothing
// renders above the H1 (no breadcrumb, no "About Us" label) and there's
// no "More" button here, unlike the homepage's version of this content.
// bg-section-about is the homepage's existing token -- this section's
// background is pixel-identical to it (docs/design/about-us's --z2).
export function AboutIntro() {
  return (
    <section className="bg-section-about py-[var(--section-y)]">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <SectionHeading className="max-w-[860px]" level={1}>
          {aboutPreview.heading}
        </SectionHeading>

        <div className="mt-8 flex flex-col gap-14 lg:flex-row lg:items-start">
          <AboutImageSlider images={aboutPreview.photos} />

          <div className="lg:basis-[45%]">
            <p className="text-lg leading-relaxed text-muted">{aboutPreview.paragraph}</p>

            <div className="mt-8 grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2">
              {aboutPreview.stats.map((stat) => (
                <div className="border-t border-line pt-4" key={stat.label}>
                  <p className="text-[28px] font-semibold tracking-tight text-head">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
