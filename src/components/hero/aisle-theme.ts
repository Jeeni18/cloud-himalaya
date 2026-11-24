// Colour sets for the hero's "walk the aisle" canvas, ported from
// docs/design/hero-aisle/aisle-hero-reference.html's own `TH` object.
//
// These are canvas fill/stroke strings, not CSS, so they can't come from
// the --lp-* design tokens: the canvas 2D context needs concrete colour
// values at draw time, and reading a dozen custom properties every frame
// would be slower and no clearer. They are kept here, in one place, so
// the two themes stay side by side and easy to compare.

export type AisleTheme = {
  /** Flat background painted before anything else. */
  bg: string
  /** Floor grid lines. */
  tile: string
  /** Perforated cold-aisle tiles, drawn every other row. */
  cold: string
  /** Nearest rack face, as [r, g, b] -- lerped towards `fog` with depth. */
  r0: readonly [number, number, number]
  /** The colour distant racks fade into. */
  fog: readonly [number, number, number]
  /** Overhead sign plate. */
  sign: string
  /** Overhead sign text. */
  signText: string
  /** Ceiling lamp colour as "r,g,b" -- alpha is applied per lamp by depth. */
  lamp: string
  /** Centre and outer stops of the radial glow at the vanishing point. */
  glow: string
  glowTransparent: string
  /** Left-hand readability fade behind the hero copy. */
  fade: (alpha: number) => string
}

export const AISLE_THEME: Record<'light' | 'dark', AisleTheme> = {
  light: {
    bg: '#EEF5FB',
    tile: 'rgba(9,84,166,.14)',
    cold: 'rgba(41,163,220,.10)',
    r0: [15, 34, 56],
    fog: [225, 239, 246],
    sign: '#FFFFFF',
    signText: '#0954A6',
    lamp: '255,255,255',
    glow: 'rgba(255,255,255,.75)',
    glowTransparent: 'rgba(255,255,255,0)',
    fade: (alpha) => `rgba(246,250,254,${alpha})`,
  },
  dark: {
    bg: '#0A1C31',
    tile: 'rgba(85,164,224,.16)',
    cold: 'rgba(41,163,220,.14)',
    r0: [20, 43, 69],
    fog: [10, 28, 49],
    sign: '#142B45',
    signText: '#78D0FA',
    lamp: '120,208,250',
    glow: 'rgba(41,163,220,.35)',
    glowTransparent: 'rgba(41,163,220,0)',
    fade: (alpha) => `rgba(10,28,49,${alpha})`,
  },
}

// Rack-face LED colours. Fixed in both themes -- they are equipment
// status lights, not part of the room's palette.
export const LED_GREEN = '#2BB673'
export const LED_BLUE = '#29A3DC'
