import Link from 'next/link'

import { servicesBento } from '../../content/home'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'

// docs/LANDING_PAGE_SPEC.md section 4.6. Colocation spans the full row;
// the other cards and the help card share one grid with it.
export function ServicesBento() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>{servicesBento.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3">{servicesBento.heading}</SectionHeading>
        </div>
        <p className="max-w-[440px] text-muted">{servicesBento.intro}</p>
      </div>

      <div className="mt-9 grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        <Link
          className="col-span-full rounded-2xl bg-feature p-[34px] text-feature-text"
          href={`/services/${servicesBento.colocation.slug}`}
        >
          <div className="flex flex-wrap items-center gap-4 font-mono text-[13px]">
            <span className="text-feature-accent">{servicesBento.colocation.tag1}</span>
            <span className="text-feature-muted">{servicesBento.colocation.tag2}</span>
          </div>
          <h3 className="mt-3 text-[34px] font-bold">{servicesBento.colocation.title}</h3>
          <p className="mt-3 max-w-[560px] text-feature-muted">
            {servicesBento.colocation.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {servicesBento.colocation.pills.map((pill) => (
              <span
                className="rounded-full border border-feature-border px-3.5 py-1.5 text-sm"
                key={pill}
              >
                {pill}
              </span>
            ))}
          </div>
          <p className="mt-6 font-bold text-feature-accent">{servicesBento.colocation.cta}</p>
        </Link>

        {servicesBento.cards.map((card) => (
          <Link
            className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-[30px]"
            href={`/services/${card.slug}`}
            key={card.slug}
          >
            <p className="font-mono text-[13px] text-accent">{card.eyebrow}</p>
            <h3 className="text-2xl font-bold text-head">{card.title}</h3>
            <p className="text-muted">{card.description}</p>

            <div className="mt-auto border-t border-line pt-4">
              {card.chips ? (
                <div className="flex flex-wrap gap-1.5">
                  {card.chips.map((chip) => (
                    <span
                      className="rounded-md bg-soft px-2 py-1 font-mono text-xs text-accent"
                      key={chip}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-subtle">
                  from <span className="text-2xl font-bold text-head">{card.priceLabel}</span>{' '}
                  <span className="text-sm text-subtle">{card.priceSuffix}</span>
                </p>
              )}
            </div>
          </Link>
        ))}

        <Link
          className="rounded-2xl border border-dashed border-line-strong bg-alt p-[30px]"
          href={servicesBento.helpCard.href}
        >
          <h3 className="text-xl font-bold text-head">{servicesBento.helpCard.title}</h3>
          <p className="mt-2 text-muted">{servicesBento.helpCard.description}</p>
          <p className="mt-4 font-bold text-accent">{servicesBento.helpCard.cta}</p>
        </Link>
      </div>
    </div>
  )
}
