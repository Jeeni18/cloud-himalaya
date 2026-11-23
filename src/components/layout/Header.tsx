import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '../../config/site'
import { primaryNav } from '../../content/home'
import { Button } from '../ui/Button'
import { ClientLoginLink } from '../ui/ClientLoginLink'
import { HeaderNav } from './HeaderNav'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

// Sticky header (docs/LANDING_PAGE_SPEC.md section 4.2), stuck directly
// below the also-sticky TopBar. `top`/`height` read --topbar-h/--header-h
// (styles.css) rather than fixed values, so both bars stay in sync with
// each other and with the hero/scroll-spy offsets that reuse the same
// variables -- change the sizing in one place, not several.
// Both logo images render always; dark:hidden / hidden dark:block swap
// between them with no flash, instead of picking one at render time from
// a theme value that isn't known until after hydration. The real image
// file is 1200x155px (a wide banner lockup, not the 4.44:1 box its old
// width/height props implied) -- those props are now the true ratio, and
// the rendered height is fluid (clamp) so the correct width follows it
// down smoothly on narrow phones instead of forcing horizontal overflow.
export function Header() {
  return (
    <header className="sticky top-[var(--topbar-h)] z-10 h-[var(--header-h)] border-b border-line bg-nav-bg backdrop-blur">
      <div className="relative mx-auto flex h-full max-w-[1280px] items-center gap-2 px-4 lg:gap-5 sm:px-6">
        <Link aria-label="Cloud Himalaya" className="mr-auto shrink-0" href="/">
          <Image
            alt="Cloud Himalaya"
            className="h-[clamp(1.5rem,1.1rem+2.2vw,2.25rem)] w-auto dark:hidden"
            height={155}
            priority
            sizes="280px"
            src="/brand/logo-nav.png"
            width={1200}
          />
          <Image
            alt="Cloud Himalaya"
            className="hidden h-[clamp(1.5rem,1.1rem+2.2vw,2.25rem)] w-auto dark:block"
            height={155}
            priority
            sizes="280px"
            src="/brand/logo-nav-white.png"
            width={1200}
          />
        </Link>

        <HeaderNav navItems={primaryNav} />

        <div className="hidden items-center gap-3 lg:flex">
          <ClientLoginLink
            className="text-[15px] font-medium text-muted hover:text-head"
            href={siteConfig.clientPortalUrl}
          />
          <Button href="/contact-us?type=quote" size="sm" variant="primary">
            Get a quote
          </Button>
        </div>

        <ThemeToggle />
        <MobileMenu clientLoginHref={siteConfig.clientPortalUrl} navItems={primaryNav} />
      </div>
    </header>
  )
}
