import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '../../../lib/getPayloadClient'

// Workaround for a confirmed Next.js 16.3.3 + Payload 3.92.1 issue:
// revalidatePath() fires correctly on save (see src/hooks/revalidate.ts)
// but doesn't bust the Full Route Cache. Forces fresh rendering on every
// request instead. Remove once that's fixed upstream.
export const dynamic = 'force-dynamic'

async function getDataCenter() {
  const payload = await getPayloadClient()
  const dataCenter = await payload.findGlobal({ slug: 'data-center', overrideAccess: false })

  // findGlobal returns {} (not a thrown error) when access denies the
  // read -- e.g. before an editor has ever published this global.
  if (!dataCenter.heading) return null

  return dataCenter
}

export async function generateMetadata(): Promise<Metadata> {
  const dataCenter = await getDataCenter()
  if (!dataCenter) return {}

  return {
    title: dataCenter.seo?.metaTitle || dataCenter.heading,
    description: dataCenter.seo?.metaDescription || undefined,
  }
}

export default async function DataCenterPage() {
  const dataCenter = await getDataCenter()
  if (!dataCenter) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-text-primary">
      <h1 className="text-3xl font-bold">{dataCenter.heading}</h1>
      <div className="mt-8">
        <RichText data={dataCenter.body} />
      </div>
    </article>
  )
}
