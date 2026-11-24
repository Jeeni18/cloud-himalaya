'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

import { AISLE_THEME, LED_BLUE, LED_GREEN, type AisleTheme } from './aisle-theme'

// Geometry, ported verbatim from the reference prototype
// (docs/design/hero-aisle/aisle-hero-reference.html).
const FOCAL = 420
const Z_NEAR = 40
const Z_FAR = 2400
const TILE_STEP = 120
const TILE_HALF_WIDTH = 170
const COLD_HALF_WIDTH = 40
const RACK_SPACING = 160
const RACK_DEPTH = 130
const RACK_X = 170
const LAMP_SPACING = 240
const LEDS_PER_RACK = 10

// 0.45 units per frame at 60fps in the reference. Expressed per
// millisecond here so the glide runs at the same real-world speed on a
// 120Hz screen as on a 60Hz one.
const GLIDE_PER_MS = 0.45 / (1000 / 60)
// A long first frame (tab wake, slow hydration) would otherwise jump the
// camera forward by a visible distance.
const MAX_FRAME_MS = 50

const MOBILE_BREAKPOINT = 1024

type AisleBackgroundProps = {
  /** Overhead row signs, cycled front to back. */
  signs: readonly string[]
}

function isDarkNow(): boolean {
  return document.documentElement.classList.contains('dark')
}

// Eased 0..1 ramp, used to fade signs in and out instead of switching
// them on and off at a threshold.
function smoothstep(edge0: number, edge1: number, value: number): number {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// Walk-the-aisle hero background: a perspective data hall drawn on a 2D
// canvas, gliding slowly forward. The vanishing point is fixed -- the
// camera does not react to the pointer.
//
// Purely decorative, so aria-hidden -- the hero's real content is the
// server-rendered text sitting above it, which never waits on this.
export function AisleBackground({ signs }: AisleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  // The draw loop reads these refs rather than closing over state, so a
  // theme change or a pointer move never has to tear down and restart
  // the animation -- the next frame simply picks up the new value.
  const darkRef = useRef(false)
  const signsRef = useRef(signs)
  // Set by the draw effect below; only repaints when no loop is running
  // (with the loop running, the next frame picks the theme up anyway).
  const redrawRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    signsRef.current = signs
  }, [signs])

  useEffect(() => {
    if (!resolvedTheme) return
    darkRef.current = resolvedTheme === 'dark'
    // Under prefers-reduced-motion there is no animation loop, so the
    // single still frame has to be repainted here or the canvas would
    // keep the old theme until the next resize.
    redrawRef.current?.()
  }, [resolvedTheme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // next-themes resolves after mount; until then trust the class its
    // own blocking script already put on <html>, so the first painted
    // frame is never the wrong theme.
    darkRef.current = isDarkNow()

    const hero = canvas.parentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const monoFamily =
      getComputedStyle(document.documentElement).getPropertyValue('--font-geist-mono').trim() ||
      'monospace'

    let width = 0
    let height = 0
    let camera = 0
    let rafId = 0
    let lastTime = 0
    let onScreen = true

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (time: number) => {
      const theme: AisleTheme = AISLE_THEME[darkRef.current ? 'dark' : 'light']
      const narrow = width < MOBILE_BREAKPOINT
      const still = reduceMotion.matches

      // Fixed vanishing point -- no pointer influence. On a phone the
      // copy spans the full width, so pulling it back towards the centre
      // keeps the aisle legible beside the text rather than pushed off
      // the right edge.
      const vanishX = width * (narrow ? 0.6 : 0.72)
      const vanishY = height * 0.48

      const project = (x: number, y: number, z: number): [number, number] => [
        vanishX + (x * FOCAL) / z,
        vanishY + (y * FOCAL) / z,
      ]

      ctx.fillStyle = theme.bg
      ctx.fillRect(0, 0, width, height)

      // Floor grid.
      const offset = camera % TILE_STEP
      ctx.strokeStyle = theme.tile
      ctx.lineWidth = 1
      for (let z = Z_NEAR + TILE_STEP - offset; z < Z_FAR; z += TILE_STEP) {
        const [ax, ay] = project(-TILE_HALF_WIDTH, 150, z)
        const [bx, by] = project(TILE_HALF_WIDTH, 150, z)
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.stroke()
      }
      for (let x = -TILE_HALF_WIDTH; x <= TILE_HALF_WIDTH; x += 56) {
        const [ax, ay] = project(x, 150, Z_NEAR)
        const [bx, by] = project(x, 150, Z_FAR)
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.stroke()
      }

      // Perforated cold-aisle tiles, every other row.
      ctx.fillStyle = theme.cold
      for (let z = Z_NEAR + TILE_STEP - offset; z < Z_FAR; z += TILE_STEP * 2) {
        const [ax, ay] = project(-COLD_HALF_WIDTH, 150, z)
        const [bx, by] = project(COLD_HALF_WIDTH, 150, z)
        const [cx, cy] = project(COLD_HALF_WIDTH, 150, z + TILE_STEP)
        const [dx, dy] = project(-COLD_HALF_WIDTH, 150, z + TILE_STEP)
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.lineTo(cx, cy)
        ctx.lineTo(dx, dy)
        ctx.fill()
      }

      // Racks, far to near so nearer ones paint over distant ones.
      //
      // Walking integer indices and deriving z from them -- rather than
      // stepping z and deriving the index with Math.floor -- is what
      // keeps the row signs stable. The old form computed
      // `floor((camera + z) / RACK_SPACING)` on a value that lands
      // exactly on an integer boundary, so ordinary floating-point noise
      // flipped it between n and n-1 from frame to frame: the sign's
      // text changed, and `rackId % 3 === 0` switched it on and off.
      // Here the index is exact by construction and a given rack keeps
      // the same identity for its whole journey down the aisle.
      const firstIndex = Math.ceil((camera + Z_NEAR) / RACK_SPACING)
      const lastIndex = Math.floor((camera + Z_FAR) / RACK_SPACING)

      // Signs are collected here and drawn after the racks and the
      // ceiling lamps, so nothing can paint over them for a frame.
      const pendingSigns: {
        x: number
        y: number
        w: number
        h: number
        alpha: number
        scale: number
        label: string
      }[] = []

      for (let index = lastIndex; index >= firstIndex; index--) {
        const z = index * RACK_SPACING - camera
        const rackId = index
        const fog = Math.min(1, (z / Z_FAR) * 1.3)

        for (const side of [-1, 1] as const) {
          const faceX = side * RACK_X
          const [tlx, tly] = project(faceX, -150, z)
          const [blx, bly] = project(faceX, 150, z)
          const [trx, try_] = project(faceX, -150, z + RACK_DEPTH)
          const [brx, bry] = project(faceX, 150, z + RACK_DEPTH)

          const r = Math.round(theme.r0[0] + (theme.fog[0] - theme.r0[0]) * fog)
          const g = Math.round(theme.r0[1] + (theme.fog[1] - theme.r0[1]) * fog)
          const b = Math.round(theme.r0[2] + (theme.fog[2] - theme.r0[2]) * fog)
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.beginPath()
          ctx.moveTo(tlx, tly)
          ctx.lineTo(trx, try_)
          ctx.lineTo(brx, bry)
          ctx.lineTo(blx, bly)
          ctx.closePath()
          ctx.fill()
          ctx.strokeStyle = `rgba(85,164,224,${0.5 * (1 - fog)})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Equipment LEDs -- skipped once a rack is deep enough that
          // they would be sub-pixel anyway.
          if (fog < 0.85) {
            for (let u = 0; u < LEDS_PER_RACK; u++) {
              const y = -130 + u * 27
              const [p1x, p1y] = project(faceX, y, z + 20)
              const [p2x, p2y] = project(faceX, y, z + 110)
              ctx.strokeStyle = `rgba(36,80,122,${1 - fog})`
              ctx.lineWidth = Math.max(0.5, 3 * (1 - fog))
              ctx.beginPath()
              ctx.moveTo(p1x, p1y)
              ctx.lineTo(p2x, p2y)
              ctx.stroke()

              const blinkPhase = still ? 0 : Math.floor(time / 350)
              if ((u * 7 + rackId * 3 + side + blinkPhase) % 6 < 3) {
                const [lx, ly] = project(faceX, y, z + 105 + (u % 2) * -8)
                ctx.fillStyle = (u + rackId) % 4 ? LED_GREEN : LED_BLUE
                ctx.globalAlpha = 1 - fog
                ctx.beginPath()
                ctx.arc(lx, ly, Math.max(1, 3.2 * (1 - fog)), 0, Math.PI * 2)
                ctx.fill()
                ctx.globalAlpha = 1
              }
            }
          }

          // Overhead cable tray and row sign, once every third rack.
          if (side === 1 && rackId % 3 === 0) {
            const scale = FOCAL / z
            const signWidth = 150 * scale * 1.6
            const signHeight = 24 * scale * 1.6

            // Smooth gates rather than hard thresholds: fade in once the
            // sign is wide enough to read, and back out before it grows
            // large enough to sweep across the viewer. Depth dimming
            // (1 - fog) is the same as before.
            const alpha =
              (1 - fog) * smoothstep(30, 80, signWidth) * (1 - smoothstep(300, 430, signWidth))

            if (alpha > 0.004) {
              const [s1x, s1y] = project(-TILE_HALF_WIDTH, -200, z)
              const [s2x, s2y] = project(TILE_HALF_WIDTH, -200, z)
              ctx.strokeStyle = `rgba(9,84,166,${0.6 * (1 - fog) * smoothstep(30, 80, signWidth)})`
              ctx.lineWidth = 2
              ctx.beginPath()
              ctx.moveTo(s1x, s1y)
              ctx.lineTo(s2x, s2y)
              ctx.stroke()

              // Index/3 floored (not Math.abs) so a negative index maps
              // the same way a positive one does, then wrapped into
              // range -- a sign can never land on an out-of-bounds slot.
              const count = signsRef.current.length
              const slot = ((Math.floor(rackId / 3) % count) + count) % count
              pendingSigns.push({
                x: (s1x + s2x) / 2 - signWidth / 2,
                y: s1y + 4 * scale,
                w: signWidth,
                h: signHeight,
                alpha,
                scale,
                label: signsRef.current[slot] ?? '',
              })
            }
          }
        }
      }

      // Ceiling lamps.
      for (let z = Z_NEAR + 80 - (camera % LAMP_SPACING); z < Z_FAR; z += LAMP_SPACING) {
        const [ax, ay] = project(-30, -230, z)
        const [bx, by] = project(30, -230, z)
        ctx.strokeStyle = `rgba(${theme.lamp},${1 - z / Z_FAR})`
        ctx.lineWidth = Math.max(1, (8 * FOCAL) / z)
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.stroke()
      }

      // Row signs last, so neither a nearer rack nor a ceiling lamp can
      // paint over one for a frame. Every text property is set here,
      // immediately before drawing, rather than inherited from whatever
      // the previous draw call happened to leave behind.
      for (const sign of pendingSigns) {
        ctx.globalAlpha = sign.alpha
        ctx.fillStyle = theme.sign
        ctx.beginPath()
        ctx.roundRect(sign.x, sign.y, sign.w, sign.h, 4 * sign.scale)
        ctx.fill()

        ctx.fillStyle = theme.signText
        ctx.font = `${Math.max(8, 11 * sign.scale * 1.6)}px ${monoFamily}, monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'alphabetic'
        // Whole pixels: sub-pixel text positions make the glyphs
        // shimmer as the sign drifts towards the camera.
        ctx.fillText(
          sign.label,
          Math.round(sign.x + sign.w / 2),
          Math.round(sign.y + sign.h * 0.68),
        )
        ctx.textAlign = 'left'
        ctx.globalAlpha = 1
      }

      // Glow at the vanishing point.
      const glow = ctx.createRadialGradient(vanishX, vanishY, 0, vanishX, vanishY, 240)
      glow.addColorStop(0, theme.glow)
      glow.addColorStop(1, theme.glowTransparent)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      // Readability fade behind the copy. On narrow screens the copy
      // spans the full width, so the fade has to reach further across
      // and stay stronger at the far edge.
      const fade = ctx.createLinearGradient(0, 0, width, 0)
      // Stops differ from the reference prototype, which was never
      // contrast-checked: there the fade had already thinned to ~0.49
      // behind the right-hand end of the copy, leaving the paragraph at
      // 2.4:1 over a dark rack face in light mode. These hold the fade
      // dense across the full width of the text column, then taper.
      if (narrow) {
        fade.addColorStop(0, theme.fade(0.97))
        fade.addColorStop(0.45, theme.fade(0.9))
        fade.addColorStop(0.8, theme.fade(0.8))
        fade.addColorStop(1, theme.fade(0.76))
      } else {
        fade.addColorStop(0, theme.fade(0.97))
        fade.addColorStop(0.42, theme.fade(0.9))
        fade.addColorStop(0.58, theme.fade(0.3))
        fade.addColorStop(0.72, theme.fade(0))
      }
      ctx.fillStyle = fade
      ctx.fillRect(0, 0, width, height)
    }

    const frame = (time: number) => {
      const delta = lastTime ? Math.min(MAX_FRAME_MS, time - lastTime) : 0
      lastTime = time
      if (!reduceMotion.matches) camera += delta * GLIDE_PER_MS
      draw(time)
      rafId = requestAnimationFrame(frame)
    }

    const start = () => {
      if (rafId || reduceMotion.matches) return
      lastTime = 0
      rafId = requestAnimationFrame(frame)
    }

    const stop = () => {
      if (!rafId) return
      cancelAnimationFrame(rafId)
      rafId = 0
    }

    const sync = () => {
      if (reduceMotion.matches) {
        stop()
        draw(0)
        return
      }
      if (onScreen && document.visibilityState === 'visible') start()
      else stop()
    }

    resize()
    sync()
    redrawRef.current = () => {
      if (!rafId) draw(performance.now())
    }

    // Resize via observer rather than per frame: reading
    // getBoundingClientRect() every frame forces layout 60 times a second.
    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduceMotion.matches || !rafId) draw(performance.now())
    })
    resizeObserver.observe(canvas)

    // Don't burn frames on a hero that has scrolled away.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true
        sync()
      },
      { threshold: 0 },
    )
    if (hero) intersectionObserver.observe(hero)

    document.addEventListener('visibilitychange', sync)
    reduceMotion.addEventListener('change', sync)

    // Cancelling here is what keeps a single loop running: React Strict
    // Mode mounts, unmounts and remounts this effect in development, and
    // without the cancel the first loop would keep drawing alongside the
    // second one.
    return () => {
      stop()
      redrawRef.current = null
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduceMotion.removeEventListener('change', sync)
    }
  }, [])

  return <canvas aria-hidden="true" className="absolute inset-0 h-full w-full" ref={canvasRef} />
}
