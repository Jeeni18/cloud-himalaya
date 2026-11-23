import { lifeSection } from '../../content/about'
import { PlaceholderBox } from '../ui/PlaceholderBox'
import { SectionHeading } from '../ui/SectionHeading'

const ICON_PATHS = [
  'M8 8l-4 4 4 4M16 8l4 4-4 4',
  'M4 5h16v11H8l-4 4z',
  'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5',
  'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z',
]

function CardIcon({ d }: { d: string }) {
  return (
    <svg
      fill="none"
      height="22"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width="22"
    >
      <path d={d} />
      {d.includes('12 21') && <circle cx="12" cy="9.5" r="2.5" />}
    </svg>
  )
}

// Life at Cloud Himalaya, section 5 of /about-us (docs/design/about-us/).
// bg-section-services is the homepage's existing token (pixel-identical
// to this section's background, --z3 in the reference). The overlapping
// photo collage is desktop/tablet-and-up only (lg:); below that it's
// replaced with a plain 2-column grid, per "no overlaps... so nothing
// gets cut off" -- both are rendered, toggled with hidden/lg:hidden
// rather than one being built and the other left out.
export function LifeAtCloudHimalaya() {
  const [photoWork, photoCelebration, photoTraining, photoOuting] = lifeSection.collage

  return (
    <section className="bg-section-services py-[var(--section-y)]">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[13px] font-medium text-content-accent">
              {lifeSection.eyebrow}
            </p>
            <SectionHeading className="mt-3 text-content-head" tone="custom">
              {lifeSection.heading}
            </SectionHeading>
          </div>
          <p className="max-w-[24rem] text-content-body">{lifeSection.intro}</p>
        </div>

        {/* Desktop/tablet: overlapping collage, reference geometry scaled
            down ~20% (same positions/rotations/borders, smaller sizes) so
            it doesn't dominate a laptop-height screen. */}
        <div className="relative mt-10 hidden h-[430px] lg:block">
          <PlaceholderBox
            className="absolute top-0 left-0 h-[320px] w-[52%]"
            label={photoWork.caption}
          />
          <PlaceholderBox
            className="absolute top-8 right-[4%] h-[215px] w-[36%] border-8 border-about-collage-border"
            label={photoCelebration.caption}
          />
          <PlaceholderBox
            className="absolute bottom-0 left-[42%] h-[170px] w-[24%] rotate-[-2deg] border-8 border-about-collage-border"
            label={photoTraining.caption}
          />
          <PlaceholderBox
            className="absolute right-0 bottom-[24px] h-[135px] w-[20%] rotate-[2deg] border-8 border-about-collage-border"
            label={photoOuting.caption}
          />
          <div className="absolute bottom-[24px] left-0 w-[36%]">
            <p className="font-mono text-xs text-content-secondary">{lifeSection.figureLabel}</p>
            <p className="mt-1.5 text-content-body">{lifeSection.figureCaption}</p>
          </div>
        </div>

        {/* Below lg: plain grid, no overlaps/rotation, nothing cut off. */}
        <div className="mt-10 lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            {lifeSection.collage.map((photo) => (
              <PlaceholderBox
                className="h-[160px] sm:h-[200px]"
                key={photo.caption}
                label={photo.caption}
              />
            ))}
          </div>
          <div className="mt-4">
            <p className="font-mono text-xs text-content-secondary">{lifeSection.figureLabel}</p>
            <p className="mt-1.5 text-content-body">{lifeSection.figureCaption}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lifeSection.cards.map((card, index) => (
            <div
              className="rounded-2xl border border-content-card-border bg-content-panel-bg p-[26px]"
              key={card.title}
            >
              <div className="mb-[18px] flex h-11 w-11 items-center justify-center rounded-xl bg-content-icon-chip-bg text-content-accent">
                <CardIcon d={ICON_PATHS[index]} />
              </div>
              <h3 className="text-lg font-semibold text-content-head">{card.title}</h3>
              <p className="mt-2 text-content-secondary">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
