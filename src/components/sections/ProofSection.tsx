import Image from 'next/image'

import type { Home, Media } from '../../payload-types'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { DummyImage } from '../DummyImage'

type ProofSectionProps = Home['proof']

function isPopulatedMedia(image: Media | number | undefined): image is Media {
  return typeof image === 'object' && image !== null
}

// Centered pull-quote with a logo strip above it -- the company may
// never approve this section, so it stays behind its own CMS toggle
// (showSection) rather than being deleted and rebuilt later.
export function ProofSection({
  showSection,
  heading,
  clientLogos,
  testimonialQuote,
  testimonialAttribution,
}: ProofSectionProps = {}) {
  if (!showSection) return null

  const hasLogos = Boolean(clientLogos?.length)
  const hasTestimonial = Boolean(testimonialQuote)
  if (!hasLogos && !hasTestimonial) return null

  return (
    <Section>
      <Container className="flex flex-col items-center text-center">
        {heading && <p className="font-mono text-sm text-text-secondary">{heading}</p>}

        {hasLogos && (
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-10">
            {clientLogos?.map((logo) => (
              <li key={logo.id ?? logo.label}>
                {isPopulatedMedia(logo.image) ? (
                  <Image
                    alt={logo.image.alt}
                    className="h-8 w-auto opacity-70"
                    height={32}
                    src={logo.image.url ?? ''}
                    width={120}
                  />
                ) : (
                  <DummyImage className="h-8 w-28" label={logo.label} />
                )}
              </li>
            ))}
          </ul>
        )}

        {hasTestimonial && (
          <blockquote className="mt-12 max-w-2xl">
            <p className="text-2xl text-text-primary">&ldquo;{testimonialQuote}&rdquo;</p>
            {testimonialAttribution && (
              <cite className="mt-4 block text-sm text-text-secondary not-italic">
                {testimonialAttribution}
              </cite>
            )}
          </blockquote>
        )}
      </Container>
    </Section>
  )
}
