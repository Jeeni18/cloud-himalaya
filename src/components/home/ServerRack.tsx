import { serverRack } from '../../content/home'
import { RackMotionController } from './RackMotionController'

// Built in HTML/CSS, not an image (docs/LANDING_PAGE_SPEC.md section 4.3).
// Card/unit/chip colors now come from the rack-* tokens (styles.css) so
// dark mode can use its own palette (docs/design/landing-preview.html) --
// only the status-LED on-color and vent-bar gradient stay literal hex,
// since those weren't given dark-mode values. Decorative throughout --
// aria-hidden -- the hover labels are a sighted-mouse-user nicety, not a
// required accessible name for anything.
//
// Responsive: all 9 units always render -- hiding the last few to save
// height (an earlier version of this) shortened the card without
// narrowing it, leaving it looking squashed/too-wide rather than like a
// rack. Instead, under short-laptop: (styles.css's custom variant) and
// below lg (stacked mobile/tablet), every structural dimension that
// defines the rack's silhouette -- row height, row gap, card padding and
// width -- shrinks together by the same ~20%, so the whole illustration
// gets smaller without changing its proportions. The max-height is a
// safety net under that, not the primary mechanism. The three floating
// chips shrink to match under the same conditions, and hide below sm
// (640px) entirely rather than being squeezed illegibly small.
export function ServerRack() {
  return (
    <RackMotionController>
      <div aria-hidden="true" className="relative px-0 py-6">
        <div className="relative mx-auto max-h-[calc(100svh-var(--sticky-offset)-4rem)] w-full max-w-[clamp(22rem,34vw,32rem)] overflow-hidden rounded-2xl border border-rack-border bg-rack-bg p-[18px] shadow-lp-lg short-laptop:max-w-[clamp(17rem,27vw,25rem)] short-laptop:p-[14px] max-lg:max-w-[clamp(17rem,27vw,25rem)] max-lg:p-[14px]">
          <div className="flex items-center justify-between font-mono text-xs">
            <span style={{ color: '#8EA6C4' }}>{serverRack.header.left}</span>
            <span style={{ color: '#6EE7A8' }}>{serverRack.header.right}</span>
          </div>

          <div className="mt-4 flex flex-col gap-1.5 short-laptop:gap-[5px] max-lg:gap-[5px]">
            {serverRack.units.map((unit, index) => (
              <div
                className="rack-unit rack-slide-in relative flex h-[38px] items-center gap-3 rounded-md border border-rack-unit-border bg-rack-unit-bg px-3 transition-colors duration-200 short-laptop:h-[30px] max-lg:h-[30px]"
                key={unit.id}
                style={{ ['--rack-slide-delay' as string]: `${index * 70}ms` }}
              >
                <span className="w-[26px] font-mono text-[11px]" style={{ color: '#6F8BAE' }}>
                  {unit.id}
                </span>

                <span className="relative h-1.5 flex-1 overflow-hidden">
                  <span
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(90deg, #1D3A63 0 6px, transparent 6px 10px)',
                    }}
                  />
                  <span
                    className="rack-traffic absolute inset-y-0 w-1/4"
                    style={{
                      backgroundImage:
                        'linear-gradient(90deg, transparent, rgba(125, 211, 252, 0.8), transparent)',
                      ['--rack-traffic-delay' as string]: `${unit.trafficDelay}s`,
                    }}
                  />
                </span>

                <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-led" />
                <span
                  className={`h-[7px] w-[7px] shrink-0 rounded-full ${unit.blink ? 'rack-blink' : ''} ${unit.led2On ? '' : 'bg-rack-unit-border'}`}
                  style={{
                    backgroundColor: unit.led2On ? '#29A3DC' : undefined,
                    ['--rack-blink-delay' as string]: `${unit.blinkDelay}s`,
                    ['--rack-blink-duration' as string]: `${unit.blinkDuration}s`,
                  }}
                />

                <span
                  className="rack-tooltip pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-10 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 font-mono text-[11px] opacity-0 transition-opacity duration-150"
                  style={{ backgroundColor: '#0B1F3A', color: '#CFE6F7' }}
                >
                  {unit.role}
                </span>
              </div>
            ))}
          </div>

          <span
            aria-hidden="true"
            className="rack-replicate absolute right-[14px] top-[46%] h-[6px] w-[6px] rounded-full"
            style={{ backgroundColor: '#7DD3FC', ['--rack-replicate-delay' as string]: '0s' }}
          />
          <span
            aria-hidden="true"
            className="rack-replicate absolute right-[14px] top-[46%] h-[6px] w-[6px] rounded-full"
            style={{ backgroundColor: '#7DD3FC', ['--rack-replicate-delay' as string]: '1.25s' }}
          />
        </div>

        <div className="absolute left-0 top-16 max-sm:hidden rounded-xl border border-rack-unit-border bg-rack-chip-bg p-3.5 shadow-lp-sm short-laptop:p-2.5 max-lg:p-2.5">
          <p className="font-mono text-xs text-subtle">{serverRack.chips.uptime.label}</p>
          <p className="mt-1 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-bold text-rack-chip-text short-laptop:text-[clamp(1.1rem,0.9rem+1vw,1.4rem)] max-lg:text-[clamp(1.1rem,0.9rem+1vw,1.4rem)]">
            {serverRack.chips.uptime.value}
          </p>
        </div>

        <div className="absolute right-0 top-[46%] max-sm:hidden rounded-xl border border-rack-unit-border bg-rack-chip-bg p-3.5 shadow-lp-sm short-laptop:p-2.5 max-lg:p-2.5">
          <p className="font-mono text-xs text-subtle">{serverRack.chips.replication.label}</p>
          <p className="mt-1 text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-bold text-rack-chip-text short-laptop:text-[clamp(1.1rem,0.9rem+1vw,1.4rem)] max-lg:text-[clamp(1.1rem,0.9rem+1vw,1.4rem)]">
            {serverRack.chips.replication.value}
          </p>
        </div>

        <div className="absolute bottom-0 left-[6%] max-sm:hidden rounded-xl bg-rack-accent-bg p-3.5 text-[15px] font-semibold text-rack-accent-text shadow-lp-sm short-laptop:p-2.5 short-laptop:text-[13px] max-lg:p-2.5 max-lg:text-[13px]">
          {serverRack.chips.bandwidth.value}
        </div>
      </div>
    </RackMotionController>
  )
}
