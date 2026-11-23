import type { Home } from '../../payload-types'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Section } from '../ui/Section'

type WhyUsSectionProps = Home['whyUs']

// Narrow heading column, wider numbered-list column -- an asymmetric
// split that reads differently from the image/text split above it and
// the card grid above that, per CLAUDE.md section 7.
export function WhyUsSection({ heading, points }: WhyUsSectionProps) {
  if (!heading || !points?.length) return null

  return (
    <Section tone="surface">
      <Container className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-16">
        <Heading level={2}>{heading}</Heading>

        <ol className="divide-y divide-text-secondary/15 border-t border-text-secondary/15">
          {points.map((point, index) => (
            <li className="flex gap-6 py-5" key={point.id ?? index}>
              <span className="font-mono text-sm text-text-secondary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-lg text-text-primary">{point.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
