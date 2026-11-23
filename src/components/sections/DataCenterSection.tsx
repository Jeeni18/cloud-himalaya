import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

import type { Home, Media } from '../../payload-types'
import { Container } from '../ui/Container'
import { Heading } from '../ui/Heading'
import { Section } from '../ui/Section'
import { DummyImage } from '../DummyImage'

type DataCenterSectionProps = Home['dataCenter']

function isPopulatedMedia(image: DataCenterSectionProps['image']): image is Media {
  return typeof image === 'object' && image !== null
}

// Image-left, text-right -- the section after this one (a card grid) has
// a deliberately different composition, per CLAUDE.md section 7's "every
// section should have its own composition" rule.
export function DataCenterSection({ heading, body, image }: DataCenterSectionProps) {
  // heading/body became required fields after the Home document already
  // existed, so the stored value can still be null even though the
  // generated type says string -- degrade gracefully rather than crash
  // the rest of the homepage over one section's missing content.
  if (!heading || !body) return null

  return (
    <Section tone="surface">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        {isPopulatedMedia(image) ? (
          <Image
            alt={image.alt}
            className="h-64 w-full rounded-lg object-cover md:h-80"
            height={image.height ?? 600}
            src={image.url ?? ''}
            width={image.width ?? 800}
          />
        ) : (
          <DummyImage className="h-64 w-full rounded-lg md:h-80" />
        )}

        <div>
          <Heading level={2}>{heading}</Heading>
          <div className="mt-4 text-text-secondary">
            <RichText data={body} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
