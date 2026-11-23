import Link from 'next/link'

import type { CategoryCount } from '../../lib/insights'

type FilterSidebarProps = {
  counts: CategoryCount[]
  activeCategory: string
}

// Left sidebar, part of the feed (docs/design/insights/): the FILTER
// card and the navy "Get notices first" card. Filters are plain links
// to ?category=..., not buttons with onClick -- they work without
// JavaScript, and the selected state is derived from the URL (the
// server already knows which one is active when it renders this).
// Sticky on desktop; becomes a horizontally scrollable pill row above
// the feed on phones, with the subscribe card moved below instead (see
// Feed.tsx, which renders this component twice for that reason).
export function FilterSidebar({ counts, activeCategory }: FilterSidebarProps) {
  return (
    <div className="rounded-2xl border border-content-card-border bg-section-insights-card p-[22px]">
      <p className="mb-3 font-mono text-xs text-content-label">FILTER</p>
      <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
        {counts.map((entry) => {
          const isActive = entry.value === activeCategory
          const href = entry.value === 'all' ? '/insights' : `/insights?category=${entry.value}`
          return (
            <li className="shrink-0" key={entry.value}>
              <Link
                className={`flex min-h-11 items-center justify-between gap-6 rounded-lg px-3 py-2 font-medium whitespace-nowrap ${
                  isActive ? 'bg-content-card-bg text-content-accent' : 'text-content-head'
                }`}
                href={href}
              >
                <span>{entry.label}</span>
                <span className="font-mono text-xs text-content-label">{entry.count}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
