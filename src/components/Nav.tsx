'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type NavItem = {
  id?: string | null
  label: string
  url: string
}

type NavProps = {
  items: NavItem[]
}

// Desktop: a plain inline list. Below the md breakpoint: a toggle button
// that reveals the same links as a dropdown panel. Keyboard accessible --
// Escape closes the panel and returns focus to the toggle button, which
// is standard behavior a mouse-only implementation would miss.
export function Nav({ items }: NavProps) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

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
    <nav aria-label="Primary">
      <ul className="hidden items-center gap-6 md:flex">
        {items.map((item) => (
          <li key={item.id ?? item.label}>
            <Link className="text-text-primary hover:text-accent" href={item.url}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <button
        aria-controls="mobile-nav-panel"
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="rounded-sm border border-text-secondary/40 px-3 py-2 text-sm text-text-primary md:hidden"
        onClick={() => setOpen((value) => !value)}
        ref={toggleRef}
        type="button"
      >
        Menu
      </button>

      {open && (
        <ul
          className="absolute inset-x-0 top-full flex flex-col gap-1 border-t border-text-secondary/20 bg-surface px-6 py-4 md:hidden"
          id="mobile-nav-panel"
        >
          {items.map((item) => (
            <li key={item.id ?? item.label}>
              <Link
                className="block py-2 text-text-primary hover:text-accent"
                href={item.url}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
