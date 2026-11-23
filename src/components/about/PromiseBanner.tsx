import { promiseBanner } from '../../content/about'

// Promise banner, section 2 of /about-us (docs/design/about-us/).
// bg-section-dc is the homepage's existing token -- pixel-identical to
// this section's background (docs/design/about-us's --z4). The "since
// 2013." accent also reuses an existing token (text-section-dc-accent)
// for the same reason, since its dark value (#78D0FA) differs from this
// page's own general --content-accent (#55BDF0) -- they're genuinely
// different colors in the reference, not a typo. The column rules are
// full-opacity in light mode but only 55% in dark (dark:border-.../55),
// exactly as specified, rather than a second color token.
export function PromiseBanner() {
  return (
    <section className="bg-section-dc py-[var(--section-y)]">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <p className="max-w-[66rem] text-[clamp(2rem,1.3rem+2.8vw,3.25rem)] leading-[1.12] font-medium tracking-[-0.03em] text-content-head">
          {promiseBanner.statement}{' '}
          <span className="font-semibold text-section-dc-accent">
            {promiseBanner.statementAccent}
          </span>
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {promiseBanner.pillars.map((pillar) => (
            <div
              className="border-t-2 border-content-head pt-[18px] dark:border-content-head/55"
              key={pillar.number}
            >
              <p className="font-mono text-[13px] text-content-head">
                {pillar.number} · {pillar.label}
              </p>
              <p className="mt-2.5 text-[17px] text-content-head">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
