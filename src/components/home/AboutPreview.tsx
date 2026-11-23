import { aboutPreview } from '../../content/home'
import { Eyebrow } from '../ui/Eyebrow'
import { MoreLink } from '../ui/MoreLink'
import { SectionHeading } from '../ui/SectionHeading'
import { AboutImageSlider } from './AboutImageSlider'

// About Us preview, section (b) of the new homepage
// (docs/design/landing-preview.html). The full story lives at /about.
// id="about" is the scroll-spy target for the header's "About Us" link
// (useActiveNavHref.ts); scroll-margin-top keeps it clear of the sticky
// top bar + header (styles.css).
export function AboutPreview() {
  return (
    <section className="bg-section-about py-[var(--section-y)]" id="about">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>{aboutPreview.eyebrow}</Eyebrow>
            <SectionHeading className="mt-3 max-w-[560px]">{aboutPreview.heading}</SectionHeading>
          </div>
          <MoreLink href={aboutPreview.moreHref} label={aboutPreview.moreLabel} />
        </div>

        {/* flex-col/lg:flex-row, not flex-wrap: flex-wrap alone never
            actually wrapped these two below lg, since neither child has a
            minimum width of its own -- they were both just shrinking to
            ~150px side by side instead of stacking (found during the
            responsive-homepage audit). */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row">
          <AboutImageSlider images={aboutPreview.photos} />

          <div className="flex flex-1 flex-col justify-between gap-8 lg:basis-[45%]">
            <p className="text-lg leading-relaxed text-muted">{aboutPreview.paragraph}</p>

            {/* 1 column under ~400px wide -- 2 columns there squeezed
                values like "ISO 27001" into ~44px and forced horizontal
                overflow (found during the responsive-homepage audit). */}
            <div className="grid grid-cols-1 gap-x-7 gap-y-5 sm:grid-cols-2">
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
