'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

// Renders a same-size placeholder until mounted, since the actual theme
// is only known on the client -- rendering the real icon during SSR
// would mismatch whatever the browser resolves "system" to.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-head focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      type="button"
    >
      {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
    </button>
  )
}
