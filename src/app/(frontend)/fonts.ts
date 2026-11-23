import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'

// Sitewide font pair: Geist for all text (headings and body), Geist Mono
// for small technical labels. Replaces the earlier Fraunces/Inter/IBM
// Plex Sans mix -- that combination was leaking a serif fallback into
// headings in some cases, and having one font system is simpler to
// reason about than two scoped ones. Each exposes a CSS variable
// consumed by styles.css, so swapping a font later is a one-line change
// here, not a design-wide edit.

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

// Used only for the handwritten-style "Signature" on /about-us's founder
// message (FounderMessage.tsx) -- deliberately not added to <html> like
// the two fonts above, since nothing else on the site uses it.
export const fontSignature = Instrument_Serif({
  subsets: ['latin'],
  style: ['italic'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
})
