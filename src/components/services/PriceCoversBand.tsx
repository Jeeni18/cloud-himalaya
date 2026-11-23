import { priceCovers } from '../../content/services'

// "What every price already covers" band, section 4 of /services
// (docs/design/services/). bg-services-covers-bg is this page's own
// token -- doesn't match any existing section background exactly.
export function PriceCoversBand() {
  return (
    <section className="bg-services-covers-bg py-[var(--section-y)] text-white">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <p className="font-mono text-xs font-medium text-[#91ACC3]">
          {priceCovers.eyebrow.toUpperCase()}
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.025em]">
          {priceCovers.heading}
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {priceCovers.items.map((item) => (
            <div className="border-t border-white/25 pt-5" key={item.title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#78D0FA]">
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="22"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                  width="22"
                >
                  <path d={item.iconPath} />
                  {item.iconRect && (
                    <rect
                      height={item.iconRect.height}
                      rx={item.iconRect.rx}
                      width={item.iconRect.width}
                      x={item.iconRect.x}
                      y={item.iconRect.y}
                    />
                  )}
                </svg>
              </div>
              <h3 className="mt-3 font-semibold text-white">{item.title}</h3>
              <p className="mt-1.5 text-[#BCD2E4]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
