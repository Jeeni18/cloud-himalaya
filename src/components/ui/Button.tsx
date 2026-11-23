import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'accent' | 'primary' | 'outline' | 'white' | 'ghost-outline'
type Size = 'default' | 'sm' | 'md' | 'lg' | 'hero'

type SharedProps = {
  children: ReactNode
  className?: string
  variant?: Variant
  size?: Size
}

type LinkButtonProps = SharedProps & {
  href: string
  // Optional: lets a link-button also close a menu/panel on click,
  // without turning it into a native button (navigation still happens).
  onClick?: () => void
  type?: never
}

type NativeButtonProps = SharedProps & {
  href?: never
  onClick?: () => void
  type?: 'button' | 'submit'
}

type ButtonProps = LinkButtonProps | NativeButtonProps

const base =
  'inline-flex items-center justify-center font-bold focus-visible:outline-none focus-visible:ring-2'

// `accent` is the original single variant (section 7: "accent used
// sparingly") and stays the default so every existing call site is
// unaffected. `primary`/`outline`/`white`/`ghost-outline` back the
// LANDING_PAGE_SPEC homepage.
const variantStyles: Record<Variant, string> = {
  accent:
    'rounded-md bg-accent text-white hover:opacity-90 focus-visible:ring-accent focus-visible:ring-offset-2',
  primary:
    'rounded-md bg-primary text-on-primary hover:opacity-90 focus-visible:ring-primary focus-visible:ring-offset-2',
  outline:
    'rounded-md border border-line-strong bg-surface text-head hover:bg-alt focus-visible:ring-primary focus-visible:ring-offset-2',
  // Fixed-in-both-modes colors per the spec's §2.2 exception -- not tokens.
  white:
    'rounded-md bg-white text-[#063A75] hover:opacity-90 focus-visible:ring-white focus-visible:ring-offset-2',
  'ghost-outline':
    'rounded-md border border-[#9CC7EE] text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-2',
}

const sizeStyles: Record<Size, string> = {
  default: 'px-6 py-3',
  // Header-only: the sticky header has less room than the touch-target
  // rule needs, so this is deliberately under 44px -- never use it for a
  // button a touch-screen user has to tap (the mobile menu's own "Get a
  // quote" stays on `md`, which does meet the 44px minimum).
  sm: 'min-h-10 px-4 py-2 text-[15px]',
  md: 'min-h-11 px-5 py-2',
  lg: 'min-h-[54px] px-7 py-3',
  // Hero-only (44-48px tall, 15px text, per the responsive-homepage spec)
  // -- `lg` stays untouched since ContactPreview/FinalCta share it.
  hero: 'min-h-12 px-7 py-3 text-[15px]',
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'accent'
  const size = props.size ?? 'default'
  const className = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${props.className ?? ''}`

  if (props.href) {
    const isExternal = props.href.startsWith('http')

    if (isExternal) {
      return (
        <a
          className={className}
          href={props.href}
          onClick={props.onClick}
          rel="noopener noreferrer"
          target="_blank"
        >
          {props.children}
        </a>
      )
    }

    return (
      <Link className={className} href={props.href} onClick={props.onClick}>
        {props.children}
      </Link>
    )
  }

  return (
    <button className={className} onClick={props.onClick} type={props.type ?? 'button'}>
      {props.children}
    </button>
  )
}
