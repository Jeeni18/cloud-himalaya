import Link from 'next/link'

import { howCanWeHelp } from '../../content/contact'
import { SectionHeading } from '../ui/SectionHeading'

// "How can we help?", section 1 of /contact-us (docs/design/contact-us/).
// Each card is one big link, not a card with a small link inside -- the
// whole thing is clickable, with a visible focus ring. "Something is
// down" is the one exception: a tel: link (not the form), in its own red
// palette (--contact-down-*, no existing token matches it); it's shown
// first on phones per the responsive spec. bg-section-trust is the
// homepage's existing token (pixel-identical to this section's
// background).
export function HowCanWeHelp() {
  return (
    <section className="bg-section-trust py-[var(--section-y)]">
      <div className="mx-auto max-w-[760px] px-[var(--section-x)] text-center">
        <SectionHeading level={1}>{howCanWeHelp.heading}</SectionHeading>
        <p className="mt-3.5 text-content-body">{howCanWeHelp.subtitle}</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1280px] grid-cols-1 gap-5 px-[var(--section-x)] sm:grid-cols-2 lg:grid-cols-4">
        {howCanWeHelp.cards.map((card) => {
          const isDown = card.key === 'down'

          const className = `rounded-2xl border p-[26px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
            isDown
              ? 'order-first border-contact-down-border bg-contact-down-bg sm:order-none'
              : 'border-content-card-border bg-content-card-bg'
          }`

          const content = (
            <>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  isDown
                    ? 'bg-contact-down-icon-bg text-contact-down-text'
                    : 'bg-content-icon-chip-bg text-content-accent'
                }`}
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="22"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                  width="22"
                >
                  <path d={card.iconPath} />
                  {'iconRect' in card && card.iconRect && (
                    <rect
                      height={card.iconRect.height}
                      rx={card.iconRect.rx}
                      width={card.iconRect.width}
                      x={card.iconRect.x}
                      y={card.iconRect.y}
                    />
                  )}
                  {'iconCircle' in card && card.iconCircle && (
                    <circle cx={card.iconCircle.cx} cy={card.iconCircle.cy} r={card.iconCircle.r} />
                  )}
                </svg>
              </div>

              <h3 className="mt-3.5 text-lg font-semibold text-content-head">{card.title}</h3>
              <p className="mt-1.5 text-content-secondary">{card.description}</p>
              <p
                className={`mt-4 font-semibold ${isDown ? 'text-contact-down-text' : 'text-content-accent'}`}
              >
                {card.actionLabel} {!isDown && <span aria-hidden="true">→</span>}
              </p>
            </>
          )

          if ('phoneHref' in card && card.phoneHref) {
            return (
              <a className={className} href={card.phoneHref} key={card.key}>
                {content}
              </a>
            )
          }

          return (
            <Link
              className={className}
              href={`/contact-us?topic=${card.key}#contact-form`}
              key={card.key}
            >
              {content}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
