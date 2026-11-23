import { proofBar } from '../../content/home'

// Sits over the bottom of the hero (docs/LANDING_PAGE_SPEC.md section 4.4).
export function ProofBar() {
  return (
    <div className="relative z-[1] mx-auto -mt-16 max-w-[1280px] px-6">
      <div className="grid rounded-2xl border border-line bg-surface shadow-lp-sm [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        {proofBar.map((item, index) => (
          <div
            className={`px-7 py-[26px] ${index > 0 ? 'border-t border-line sm:border-l sm:border-t-0' : ''}`}
            key={item.label}
          >
            <p className="text-[34px] font-bold text-accent">{item.value}</p>
            <p className="mt-1 text-[15px] text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
