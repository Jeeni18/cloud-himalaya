import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '../../../../lib/getPayloadClient'

type LegalPageProps = {
  params: Promise<{ slug: string }>
}

async function getLegalPage(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'legal',
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: false,
  })

  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getLegalPage(slug)

  if (!page) return {}

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription || undefined,
  }
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params
  const page = await getLegalPage(slug)

  if (!page) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-text-primary">
      <h1 className="text-3xl font-bold">{page.title}</h1>
      <div className="mt-8">
        <RichText data={page.body} />
      </div>
    </article>
  )
}
