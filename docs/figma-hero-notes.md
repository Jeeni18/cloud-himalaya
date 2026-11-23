# Figma hero notes — source of truth for the Hero rebuild

Source file: `HFo2zSbEWMIcXVEwDypHLK` ("ch (Copy)"). Read once each via the Figma MCP
on 2026-11-20 — do not re-read unless asked. Frames read:

- Desktop Light — node `25:357`
- Mobile Light — node `25:537`
- Desktop Dark — node `25:32`
- Mobile Dark — node `25:212`
- Components — node `17:32` (returned sparse section metadata only; button
  hover/focus detail came from the component _description_ text attached to
  node `5:51`, not from drilling into its 9 state variants individually —
  deliberately not done, to save MCP calls. See "Gap" note below.)
- Motion & interaction notes — node `17:33` (returned as metadata, but every
  note's full text was present in the XML as node names, so no follow-up
  call was needed)

## Layout (shared structure, both themes/breakpoints)

- Nav: full-width row, logo + wordmark left, links + CTA button right (desktop);
  logo + hamburger icon (mobile). Absolutely positioned over the scene, no
  background fill of its own (transparent over the sky/night scene).
- Hero content: centered column — Logo (96px) → H1 wordmark → tagline → body
  copy → button row. Desktop: single row of 2 buttons. Mobile: buttons stack
  full-width.
- Scene: a background image filling the frame behind everything, bleeding
  past the frame edges (desktop: 2016px wide image in a 1440px frame, offset
  -288px left — i.e. it's wider than the viewport and centered).

## Copy (identical across all 4 frames)

- Wordmark: "CLOUD HIMALAYA" (uppercase, two-tone: "CLOUD" in brand/sky,
  " HIMALAYA" in brand/deep-light)
- Tagline: "Data Management Above & Beyond"
- Body: "Secure, scalable data management, built at the roof of the world."
- Buttons: "Explore Solutions" (primary), "Talk to an Expert" (ghost/outline)
- Nav links (as drawn in Figma — see "Nav links" open point below for what
  we actually use): Services, Solutions, About, Contact
- Nav CTA (as drawn in Figma): "Get Started"

## Typography

- Display H1: Montserrat Light 300, 96px desktop / 44px mobile, line-height 1,
  letter-spacing 4px desktop / ~1.76px mobile (scales with size), uppercase.
  Text-shadow: light `0 0 30px rgba(11,92,171,0.18)`, dark `0 0 36px
rgba(11,92,171,0.6)` desktop / `0 0 24px rgba(11,92,171,0.6)` mobile.
- Tagline: Open Sans Regular 400, 26px desktop / 18px mobile, line-height 1.3.
- Body: Open Sans Regular 400, 18px desktop / 15px mobile, line-height 1.6.
- Button label: Open Sans SemiBold 600, 16px.
- Wordmark (nav, small): Montserrat Regular 400, 17px, letter-spacing 8px (per
  the "Wordmark" style entry — the returned code shows 1.36px but the named
  style says letter-spacing 8; using the named style as source of truth).
- Nav link: Open Sans Regular 400, 15px.

This is Montserrat + Open Sans, not the IBM Plex pairing in
`docs/LANDING_PAGE_SPEC.md`. Per this task's own instruction ("unless the
Figma design uses different fonts"), the Hero uses Montserrat + Open Sans.

## Colors (resolved from the design, as light/dark pairs)

| Token              | Light                        | Dark                    | Used for                                                                                |
| ------------------ | ---------------------------- | ----------------------- | --------------------------------------------------------------------------------------- |
| `bg/night`         | `#e4f0fa`                    | `#05070d`               | Hero section background (behind the scene)                                              |
| `brand/sky`        | `#1478b0`                    | `#2ea3db`               | "CLOUD" in wordmark, tagline, primary button gradient start, outline button border/text |
| `brand/deep`       | `#0b5cab` _(rgb(11,92,171))_ | same                    | Primary button gradient end                                                             |
| `brand/deep-light` | `#1a6fc4`                    | `#1a6fc4`               | " HIMALAYA" in wordmark (same both modes)                                               |
| `text/primary`     | `#0a1a33`                    | `#ffffff`               | Nav links, ghost button border/text, body nav wordmark                                  |
| `text/muted`       | `rgba(10,26,51,0.72)`        | `rgba(255,255,255,0.7)` | Body paragraph                                                                          |
| `text/on-brand`    | `#ffffff`                    | `#ffffff`               | Text on the primary (gradient) button                                                   |

Primary button gradient: `linear-gradient(165deg, brand/sky 0%, brand/deep 70%)`
(angle varies slightly per frame, 155–171°; using ~160° as a single value).

## Components (node `5:29` Logo, `5:51` Button, `5:56` Nav Link, `5:57` Icon/Menu)

- **Logo**: cropped badge from the supplied logo image. Two sizes only: 40px
  (nav) and 96px (hero). Separate light/dark image assets (see Assets below).
- **Button** — pill (`rounded-full`), from the component's own description:
  - Primary: 135° brand/sky→brand/deep gradient, sky 35% glow (`box-shadow:
0 8px 15px rgba(46,163,219,0.35)` in the dark/mobile frames). Hover:
    `translateY(-2px)` + stronger glow (sky 55%, y10 blur40, 200ms ease-out).
  - Ghost: 1px white 35%-opacity stroke, background blur 6px (`backdrop-blur`).
    Hover: +8% white fill.
  - Outline: 1px brand/sky stroke + brand/sky text, padding 10px/20px (used
    only for the small nav "Get Started" pill, not the hero buttons).
  - Focus (all variants): 2px brand/sky outline, 3px offset.
- **Nav Link**: plain text, `text/primary`, 15px. Only a "Hover" state symbol
  exists in Figma with no color spec returned — treating as a reasonable
  default (color shifts toward brand/sky on hover/focus), not a value read
  from Figma.
- **Icon/Menu**: a 24px hamburger glyph, exported as SVG (mobile nav only).

## Motion & interaction notes (node `17:33`, full text)

- **Cloud drift**: clouds move left→right in continuous seamless loops
  (duplicate each layer off-screen). Clouds/Back: 120–140s per cycle.
  Clouds/Front: 60–80s. Linear easing.
- **Mouse parallax**: layers translate opposite to the pointer. Depth factor
  per layer — Stars 0.1, Horizon Glow 0.2, Mountains/Far 0.35, Data Network
  0.4, Clouds/Back 0.5, Mountains/Mid 0.65, Clouds/Front 0.8, Mountains/Near
  1.0 (max ~20px). Smoothed with lerp ~0.08/frame.
- **Load sequence**: Hero Content children fade in (0→1) and slide up 24px,
  staggered 150ms, in order: Logo → H1 → Tagline → Body → Buttons. 600ms,
  `cubic-bezier(0.22, 1, 0.36, 1)`. Nav fades in together with the Logo.
- **Ambient**: Data Network nodes pulse (scale 1→1.6, glow opacity 0.8→0.3,
  2.4s, staggered per node). Links shimmer between 0.25↔0.4 opacity. Stars
  twinkle: random opacity 0.25↔0.9, 2–6s cycle, random per-star delay.
- **Buttons**: Primary hover `translateY(-2px)` + stronger glow (sky 55%,
  y10 blur40), 200ms ease-out. Ghost hover: white 8% fill. Focus-visible:
  2px brand/sky outline, 3px offset.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` disables
  drift, parallax, twinkle, pulse and the load slide entirely — render the
  final state immediately (opacity 1, no transform).

## Gap found — needs a decision before building (see chat)

The "Scene" node in all 4 frames came back from Figma as **one already-
flattened image asset** (a single exported SVG/PNG), not as the 8 separate
layers (Sky, Stars, Horizon Glow, Mountains Far/Mid/Near, Clouds Back/Front,
Data Network) that the motion notes describe parallaxing independently.
Figma's MCP server auto-flattens complex nested vector art like this into
one export rather than itemizing every sub-layer as code. To build true
per-layer parallax I need that sub-layer structure, which means at least one
more MCP read into the Scene group specifically — which was not part of the
6 reads you asked for and would use part of your remaining monthly budget.

## Assets to download (asset URLs expire in 7 days — must download before building)

| Asset                        | Frame                | Figma temp URL (download immediately, don't keep) |
| ---------------------------- | -------------------- | ------------------------------------------------- |
| Logo 96px, light             | Desktop/Mobile Light | `imgLogo` / `imgSize96` (light)                   |
| Logo 40px, light             | Desktop/Mobile Light | `imgLogo1` / `imgSize40` (light)                  |
| Logo 96px, dark              | Desktop/Mobile Dark  | `imgSize96` (dark)                                |
| Logo 40px, dark              | Desktop/Mobile Dark  | `imgSize40` (dark)                                |
| Scene, Desktop Light         | `25:357`             | `imgScene` (desktop light)                        |
| Scene, Mobile Light          | `25:537`             | `imgScene` (mobile light)                         |
| Scene, Desktop Dark          | `25:32`              | `imgScene` (desktop dark)                         |
| Scene, Mobile Dark           | `25:212`             | `imgScene` (mobile dark)                          |
| Menu glyph (mobile nav icon) | `25:537` / `25:212`  | `imgGlyph`                                        |

Exact expiring URLs are in this conversation's tool output, not repeated here
since they expire in 7 days anyway — download them in the build step, not
from this file.
