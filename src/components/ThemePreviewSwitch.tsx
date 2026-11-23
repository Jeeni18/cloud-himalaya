'use client'
import { useEffect, useState } from 'react'

// TEMPORARY: lets us show both light and dark to the company before the
// design is approved. Not part of the final site. To remove: delete this
// file and its one usage in Header.tsx -- nothing else depends on it.
export function ThemePreviewSwitch() {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null)

  useEffect(() => {
    // window/document don't exist during SSR, so this value can't be
    // computed in a useState initializer without crashing the server
    // render -- it can only be read once mounted on the client.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.dataset.theme === 'dark' || prefersDark ? 'dark' : 'light')
  }, [])

  if (!theme) return null

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    setTheme(next)
  }

  return (
    <button
      className="rounded-sm border border-text-secondary/40 px-3 py-1 font-mono text-xs text-text-secondary hover:text-text-primary"
      onClick={toggle}
      type="button"
    >
      Preview: {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}
