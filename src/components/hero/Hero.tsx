import Link from 'next/link'

import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Button } from '../ui/Button'
import { Clouds } from './Clouds'
import { HeroMotionController } from './HeroMotionController'
import { Ridgelines } from './Ridgelines'
import './hero.css'

type HeroProps = {
  heading: string
  subheading?: string | null
  ctaLabel?: string | null
  ctaUrl?: string | null
  secondaryLabel?: string | null
  secondaryUrl?: string | null
}

// "Infrastructure built at altitude" (CLAUDE.md section 7). The scenery
// is confined to the bottom band of the hero -- structurally, not just
// visually -- so the headline's own area never has anything behind it,
// satisfying "headline area stays on clean, empty sky" by construction
// rather than by hoping colors/positions happen not to clash.
export function Hero({
  heading,
  subheading,
  ctaLabel,
  ctaUrl,
  secondaryLabel,
  secondaryUrl,
}: HeroProps) {
  return (
    <section className="relative min-h-[480px] overflow-hidden bg-background md:min-h-[600px]">
      <HeroMotionController className="absolute inset-x-0 bottom-0 h-[260px] md:h-[380px]">
        <Clouds />
        <Ridgelines />
      </HeroMotionController>

      <Container className="relative z-10 flex min-h-[480px] items-center md:min-h-[600px]">
        <div className="max-w-xl">
          <Heading level={1}>{heading}</Heading>
          {subheading && <p className="mt-4 text-lg text-text-secondary">{subheading}</p>}
          {(ctaLabel && ctaUrl) || (secondaryLabel && secondaryUrl) ? (
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {ctaLabel && ctaUrl && <Button href={ctaUrl}>{ctaLabel}</Button>}
              {secondaryLabel && secondaryUrl && (
                <Link className="font-bold text-text-primary hover:text-accent" href={secondaryUrl}>
                  {secondaryLabel}
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
