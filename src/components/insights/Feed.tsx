import Link from 'next/link'

import { formatNptMonthYear, nptMonthKey } from '../../lib/formatNpt'
import type { CategoryCount } from '../../lib/insights'
import type { Post } from '../../payload-types'
import { FilterSidebar } from './FilterSidebar'
import { GetNoticesCard } from './GetNoticesCard'
import { PostCard } from './PostCard'

type FeedProps = {
  posts: Post[]
  counts: CategoryCount[]
  activeCategory: string
  page: number
  hasNextPage: boolean
}

type MonthGroup = {
  key: string
  label: string
  posts: Post[]
}

// Posts are already sorted newest-first; this only groups consecutive
// runs that share a Nepal-time month, it doesn't re-sort anything.
function groupByMonth(posts: Post[]): MonthGroup[] {
  const groups: MonthGroup[] = []
  for (const post of posts) {
    const key = nptMonthKey(post.publishedAt)
    const current = groups[groups.length - 1]
    if (current && current.key === key) {
      current.posts.push(post)
    } else {
      groups.push({ key, label: formatNptMonthYear(post.publishedAt), posts: [post] })
    }
  }
  return groups
}

function olderPostsHref(activeCategory: string, page: number) {
  const params = new URLSearchParams()
  if (activeCategory !== 'all') params.set('category', activeCategory)
  params.set('page', String(page + 1))
  return `/insights?${params.toString()}`
}

// "The feed", section 3 of /insights (docs/design/insights/). Filters
// are plain links to ?category=... (server-rendered, work with no JS,
// shareable); "Load older posts" is a plain link to ?page=N+1 for the
// same reason, rather than client-side-only pagination.
// bg-section-about is the homepage's existing token (pixel-identical to
// this section's background).
export function Feed({ posts, counts, activeCategory, page, hasNextPage }: FeedProps) {
  const groups = groupByMonth(posts)
  const activeLabel = counts.find((c) => c.value === activeCategory)?.label ?? 'All'

  return (
    <section className="bg-section-about py-[var(--section-y)]">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        {/* Phones: filter pills above the feed, sticky sidebar hidden. */}
        <div className="lg:hidden">
          <FilterSidebar activeCategory={activeCategory} counts={counts} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-12 lg:mt-0 lg:grid-cols-[280px_1fr] lg:items-start">
          <div className="hidden flex-col gap-[18px] lg:sticky lg:top-[calc(var(--sticky-offset)+20px)] lg:flex">
            <FilterSidebar activeCategory={activeCategory} counts={counts} />
            <GetNoticesCard />
          </div>

          <div>
            <p className="font-mono text-xs font-medium text-content-accent">THE FEED</p>
            <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.025em] text-content-head">
              Everything, newest first
            </h2>

            {posts.length === 0 ? (
              <p className="mt-9 rounded-2xl border border-content-card-border bg-section-insights-card p-7 text-content-secondary">
                No posts in {activeLabel} yet. Check back soon, or{' '}
                <Link
                  className="font-semibold text-content-accent hover:underline"
                  href="/insights"
                >
                  see everything
                </Link>
                .
              </p>
            ) : (
              <div className="mt-9 flex flex-col gap-10">
                {groups.map((group) => (
                  <div
                    className="grid grid-cols-1 gap-4 sm:grid-cols-[160px_1fr] sm:gap-8"
                    key={group.key}
                  >
                    <div className="relative font-mono text-[13px] text-content-label sm:pt-1.5">
                      <span
                        aria-hidden="true"
                        className="absolute top-2 -right-6 hidden h-3 w-3 rounded-full border-[3px] border-section-about bg-content-accent sm:block"
                      />
                      {group.label}
                    </div>
                    <div className="flex min-w-0 flex-col gap-4 sm:-ml-[26px] sm:border-l-2 sm:border-content-card-border sm:pl-8">
                      {group.posts.map((post) => (
                        <PostCard key={post.id} layout="row" post={post} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasNextPage && (
              <div className="mt-9 text-center">
                <Link
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-content-card-border px-5 text-[15px] font-semibold text-content-head hover:bg-content-icon-chip-bg"
                  href={olderPostsHref(activeCategory, page)}
                >
                  Load older posts
                </Link>
              </div>
            )}
          </div>

          {/* Phones: subscribe card moves below the feed instead of the
              (hidden) sticky sidebar. */}
          <div className="lg:hidden">
            <GetNoticesCard />
          </div>
        </div>
      </div>
    </section>
  )
}
