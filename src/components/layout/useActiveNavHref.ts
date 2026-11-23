'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Maps each homepage section id to the header link it should highlight.
// Sections not listed here (Hero, the trust bar) intentionally highlight
// nothing. "services" and "data-center" both point at the same link, per
// spec: either section on screen highlights "Services".
const SECTION_HREFS: Record<string, string> = {
  about: '/about-us',
  services: '/services',
  'data-center': '/services',
  insights: '/insights',
  contact: '/contact-us',
}

type ActiveNav = {
  activeHref: string | null
  // 'section': homepage scroll-spy match. 'page': current-page fallback
  // (aria-current should read "page" rather than "true" for this case).
  mode: 'section' | 'page'
}

// Drives the header's active-link highlight. On the homepage, the
// highlighted link follows whichever tracked section is on screen, via
// IntersectionObserver (not a scroll listener). On every other page --
// where none of the tracked ids exist in the DOM -- it falls back to
// matching the current URL instead, so e.g. /about always highlights
// "About Us" there.
export function useActiveNavHref(navHrefs: string[]): ActiveNav {
  const pathname = usePathname()
  const [sectionHref, setSectionHref] = useState<string | null>(null)

  useEffect(() => {
    const ids = Object.keys(SECTION_HREFS)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // No tracked sections on this page (not the homepage) -- nothing to
    // observe. `sectionHref` is already null on first load of a page
    // like this; a stale non-null value left over from navigating away
    // from the homepage is cleared below, by the previous effect run's
    // own cleanup, not synchronously here.
    if (elements.length === 0) return

    // IntersectionObserver callbacks only report entries whose state
    // just changed, not every observed element's current state -- so a
    // running record of who's currently intersecting has to be kept by
    // hand rather than trusted to each callback's `entries` alone.
    const intersecting = new Set<string>()

    // The sticky top bar + header's combined height (--sticky-offset,
    // styles.css) now varies by breakpoint, so it's read from the
    // header's own real, rendered position instead of a hardcoded
    // number -- this is the one true source, nothing to keep in sync.
    const headerBottom = Math.ceil(
      document.querySelector('header')?.getBoundingClientRect().bottom ?? 0,
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersecting.add(entry.target.id)
          } else {
            intersecting.delete(entry.target.id)
          }
        }

        // If more than one tracked section is intersecting at once,
        // prefer whichever comes first in the page (topmost).
        const activeId = ids.find((id) => intersecting.has(id))
        setSectionHref(activeId ? SECTION_HREFS[activeId] : null)
      },
      // Shrinks the effective viewport to a thin band just below the
      // sticky top bar + header and above the vertical midpoint, so a
      // section counts as "current" once it reaches that band while
      // scrolling.
      { rootMargin: `-${headerBottom}px 0px -60% 0px`, threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      // Runs right before the next pathname's effect body, so navigating
      // away from the homepage clears the match before the new page's
      // (empty) element lookup ever runs.
      setSectionHref(null)
    }
  }, [pathname])

  if (sectionHref && navHrefs.includes(sectionHref)) {
    return { activeHref: sectionHref, mode: 'section' }
  }

  const pageMatch = navHrefs.find(
    (href) => href !== '/' && (pathname === href || pathname.startsWith(`${href}/`)),
  )
  return { activeHref: pageMatch ?? null, mode: 'page' }
}
