'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import type { NavItem } from '../../content/home'
import { Button } from '../ui/Button'
import { ClientLoginLink } from '../ui/ClientLoginLink'
import { useActiveNavHref } from './useActiveNavHref'

type MobileMenuProps = {
  navItems: NavItem[]
  clientLoginHref: string
}

// Below 1024px the header collapses its nav links and action buttons
// into this panel (docs/LANDING_PAGE_SPEC.md section 4.2). Keyboard
// accessible: Escape closes the panel and returns focus to the toggle.
// Uses the same active-section/active-page hook as the desktop nav
// (HeaderNav.tsx) so whichever link opens highlighted matches it, just
// with a plain background instead of a sliding pill -- the panel isn't
// visible while scrolling, so there's nothing to slide between.
export function MobileMenu({ navItems, clientLoginHref }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navHrefs = navItems.map((item) => item.href)
  const { activeHref, mode } = useActiveNavHref(navHrefs)

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-nav-panel"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface text-head focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={() => setOpen((value) => !value)}
        ref={toggleRef}
        type="button"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-line bg-surface px-6 py-5"
          id="mobile-nav-panel"
        >
          {navItems.map((item) => {
            const isActive = item.href === activeHref
            return (
              <Link
                aria-current={isActive ? (mode === 'page' ? 'page' : 'true') : undefined}
                className={`rounded-md px-2 py-2.5 text-[15px] font-medium ${
                  isActive
                    ? 'bg-nav-active-bg text-nav-active-text'
                    : 'text-muted hover:bg-alt hover:text-head'
                }`}
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          })}

          <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4">
            <ClientLoginLink
              className="px-2 py-2.5 text-center text-[15px] font-medium text-muted hover:text-head"
              href={clientLoginHref}
              onClick={() => setOpen(false)}
            />
            <Button
              className="w-full justify-center text-[15px]"
              href="/contact-us?type=quote"
              onClick={() => setOpen(false)}
              size="md"
              variant="primary"
            >
              Get a quote
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
