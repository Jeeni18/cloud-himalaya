import type { Metadata } from 'next'

import { Feed } from '../../../components/insights/Feed'
import { InsightsIntro } from '../../../components/insights/InsightsIntro'
import { NewsletterBand } from '../../../components/insights/NewsletterBand'
import { PinnedNoticeBar } from '../../../components/insights/PinnedNoticeBar'
import { seo } from '../../../content/insights'
import {
  getActivePinnedNotice,
  getCategoryCounts,
  getLatestPosts,
  getPosts,
} from '../../../lib/insights'
import type { CategoryFilter } from '../../../lib/insights'
import { POST_CATEGORIES } from '../../../collections/Posts'

const VALID_CATEGORIES = new Set(POST_CATEGORIES.map((c) => c.value))

function parseCategory(value: string | undefined): CategoryFilter | undefined {
  if (value && VALID_CATEGORIES.has(value as CategoryFilter)) return value as CategoryFilter
  return undefined
}

function parsePage(value: string | undefined): number {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: {
    types: { 'application/rss+xml': '/insights/rss.xml' },
  },
}

// Workaround for the same confirmed Next.js 16.3.3 + Payload 3.92.1
// caching issue noted on the other pages: forces fresh rendering on
// every request, which this page also needs since its content depends
// on ?category/?page search params.
export const dynamic = 'force-dynamic'

type InsightsPageProps = {
  searchParams: Promise<{ category?: string; page?: string }>
}

// /insights (docs/design/insights/). Header/TopBar/Footer render
// globally from layout.tsx, not from this file. Posts/[slug] isn't
// built yet -- PostCard's own "Read ->" links point at it anyway and
// will 404 until it exists.
export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const params = await searchParams
  const category = parseCategory(params.category)
  const page = parsePage(params.page)

  const [introPosts, feedPage, counts, pinnedNotice] = await Promise.all([
    getLatestPosts(3),
    getPosts({ category, page }),
    getCategoryCounts(),
    getActivePinnedNotice(),
  ])

  return (
    <>
      <InsightsIntro posts={introPosts} />
      {pinnedNotice && <PinnedNoticeBar notice={pinnedNotice} />}
      <Feed
        activeCategory={category ?? 'all'}
        counts={counts}
        hasNextPage={feedPage.hasNextPage}
        page={feedPage.page}
        posts={feedPage.docs}
      />
      <NewsletterBand />
    </>
  )
}
