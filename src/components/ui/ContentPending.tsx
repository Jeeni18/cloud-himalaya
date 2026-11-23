import Link from 'next/link'

import { Container } from './Container'

type ContentPendingProps = {
  // What the visitor was trying to reach, used as the page heading so the
  // route still reads as itself rather than as a generic error.
  title: string
}

// Stands in for a CMS-backed route on a preview deployment that has no
// database (see src/lib/cmsAvailability.ts). Keeps the page navigable and
// honest -- it says the content is not published yet, rather than showing
// an error or inventing placeholder copy.
export function ContentPending({ title }: ContentPendingProps) {
  return (
    <Container className="py-24">
      <h1 className="text-lp-h2 font-bold text-head">{title}</h1>
      <p className="mt-4 max-w-prose text-text-secondary">
        This page is managed through the content management system, which is not connected on this
        preview. The published version will appear here.
      </p>
      <Link className="mt-8 inline-block font-medium text-accent hover:underline" href="/">
        Back to the homepage
      </Link>
    </Container>
  )
}
