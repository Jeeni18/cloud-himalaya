'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import type { NavItem } from '../../content/home'
import { useActiveNavHref } from './useActiveNavHref'

type HeaderNavProps = {
  navItems: NavItem[]
}

type PillRect = {
  left: number
  width: number
}

// Desktop nav list with the active-section/active-page highlight pill.
// The pill's position and width are measured from the active link's own
// DOM node and animated with a CSS transition (.nav-pill, styles.css) --
// that transition is itself skipped under prefers-reduced-motion, so the
// pill just appears in place there instead of sliding.
export function HeaderNav({ navItems }: HeaderNavProps) {
  const navHrefs = navItems.map((item) => item.href)
  const { activeHref, mode } = useActiveNavHref(navHrefs)
  const listRef = useRef<HTMLUListElement>(null)
  const [pillRect, setPillRect] = useState<PillRect | null>(null)

  useEffect(() => {
    function measure() {
      const list = listRef.current
      if (!activeHref || !list) {
        setPillRect(null)
        return
      }

      const activeLink = list.querySelector<HTMLAnchorElement>(`a[href="${activeHref}"]`)
      if (!activeLink) {
        setPillRect(null)
        return
      }

      setPillRect({ left: activeLink.offsetLeft, width: activeLink.offsetWidth })
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeHref])

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="relative flex items-center gap-1" ref={listRef}>
        {pillRect && (
          <span
            aria-hidden="true"
            className="nav-pill pointer-events-none absolute inset-y-0 rounded-full bg-nav-active-bg"
            style={{ left: pillRect.left, width: pillRect.width }}
          />
        )}

        {navItems.map((item) => {
          const isActive = item.href === activeHref
          return (
            <li key={item.href}>
              <Link
                aria-current={isActive ? (mode === 'page' ? 'page' : 'true') : undefined}
                className={`relative z-10 block rounded-full px-3 py-2 text-[15px] font-medium transition-colors ${
                  isActive ? 'text-nav-active-text' : 'text-muted hover:text-head'
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
