import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '../../../lib/getPayloadClient'

// Workaround for a confirmed Next.js 16.3.3 + Payload 3.92.1 issue:
// revalidatePath() fires correctly on save (see src/hooks/revalidate.ts)
// but doesn't bust the Full Route Cache. Forces fresh rendering on every
// request instead. Remove once that's fixed upstream.
export const dynamic = 'force-dynamic'

async function getContact() {
  const payload = await getPayloadClient()
  const contact = await payload.findGlobal({ slug: 'contact', overrideAccess: false })

  // findGlobal returns {} (not a thrown error) when access denies the
  // read -- e.g. before an editor has ever published this global.
  if (!contact.heading) return null

  return contact
}

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact()
  if (!contact) return {}

  return {
    title: contact.seo?.metaTitle || contact.heading,
    description: contact.seo?.metaDescription || undefined,
  }
}

export default async function ContactPage() {
  const contact = await getContact()
  if (!contact) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16 text-text-primary">
      <h1 className="text-3xl font-bold">{contact.heading}</h1>
      <div className="mt-8">
        <RichText data={contact.body} />
      </div>
      {/* The enquiry form itself is separate, later work (see CLAUDE.md section 9). */}
    </article>
  )
}
