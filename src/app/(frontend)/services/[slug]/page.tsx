import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContentPending } from '../../../../components/ui/ContentPending'
import { isCmsDisabled } from '../../../../lib/cmsAvailability'
import { getPayloadClient } from '../../../../lib/getPayloadClient'

type ServicePageProps = {
  params: Promise<{ slug: string }>
}

async function getService(slug: string) {
  // No database on a preview deployment, so there is nothing to read.
  if (isCmsDisabled) return null

  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  })

  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) return {}

  return {
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.summary,
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    if (isCmsDisabled) return <ContentPending title="Service" />
    notFound()
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold text-text-primary">{service.title}</h1>
      <p className="mt-4 text-lg text-text-secondary">{service.summary}</p>
      <div className="mt-8 text-text-primary">
        <RichText data={service.details} />
      </div>
    </article>
  )
}
