import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContentPending } from '../../../components/ui/ContentPending'
import { isCmsDisabled } from '../../../lib/cmsAvailability'
import { getPayloadClient } from '../../../lib/getPayloadClient'

// Workaround for a confirmed Next.js 16.3.3 + Payload 3.92.1 issue:
// revalidatePath() fires correctly on save (see src/hooks/revalidate.ts)
// but doesn't bust the Full Route Cache. Forces fresh rendering on every
// request instead. Remove once that's fixed upstream.
export const dynamic = 'force-dynamic'

async function getAbout() {
  // No database on a preview deployment, so there is nothing to read.
  if (isCmsDisabled) return null

  const payload = await getPayloadClient()
  const about = await payload.findGlobal({ slug: 'about', overrideAccess: false })

  // findGlobal returns {} (not a thrown error) when access denies the
  // read -- e.g. before an editor has ever published this global.
  if (!about.heading) return null

  return about
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()
  if (!about) return {}

  return {
    title: about.seo?.metaTitle || about.heading,
    description: about.seo?.metaDescription || undefined,
  }
}

export default async function AboutPage() {
  const about = await getAbout()
  if (!about) {
    if (isCmsDisabled) return <ContentPending title="About" />
    notFound()
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-text-primary">
      <h1 className="text-3xl font-bold">{about.heading}</h1>
      <div className="mt-8">
        <RichText data={about.body} />
      </div>
    </article>
  )
}
