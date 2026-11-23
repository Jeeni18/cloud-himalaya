import Link from 'next/link'

import { getPayloadClient } from '../lib/getPayloadClient'
import { ThemePreviewSwitch } from './ThemePreviewSwitch'
import { Nav } from './Nav'
import { Container } from './ui/Container'
import { Button } from './ui/Button'

export async function Header() {
  const payload = await getPayloadClient()
  const [header, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: 'header', overrideAccess: false }),
    payload.findGlobal({ slug: 'site-settings', overrideAccess: false }),
  ])

  return (
    <header className="relative border-b border-text-secondary/20 bg-surface">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link className="font-display text-xl font-bold text-text-primary" href="/">
          {siteSettings.companyName}
        </Link>

        <div className="flex items-center gap-4">
          <Nav items={header.navItems ?? []} />
          {siteSettings.clientPortalUrl && (
            <Link
              className="text-sm font-bold text-text-primary hover:text-accent"
              href={siteSettings.clientPortalUrl}
            >
              Client login
            </Link>
          )}
          {header.ctaLabel && header.ctaUrl && (
            <Button className="shrink-0 px-4 py-2 text-sm" href={header.ctaUrl}>
              {header.ctaLabel}
            </Button>
          )}
          <ThemePreviewSwitch />
        </div>
      </Container>
    </header>
  )
}
