import Link from 'next/link'

import { announcementBar } from '../../content/home'

// Phase 2: shows the latest Insights post flagged as "announcement";
// hidden if none (docs/LANDING_PAGE_SPEC.md section 4.1). Phase 1 always
// renders the typed placeholder content.
export function AnnouncementBar() {
  return (
    <Link
      className="block bg-announce px-6 py-2.5 text-center text-sm text-announce-text hover:opacity-90"
      href={announcementBar.href}
    >
      <span className="font-mono font-bold">{announcementBar.label}</span>{' '}
      <span>{announcementBar.text}</span> <span className="font-bold">{announcementBar.cta}</span>
    </Link>
  )
}
