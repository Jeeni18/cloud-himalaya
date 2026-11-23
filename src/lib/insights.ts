import { getPayloadClient } from './getPayloadClient'
import type { Notice, Post } from '../payload-types'
import { POST_CATEGORIES } from '../collections/Posts'

export const POSTS_PER_PAGE = 9

export type CategoryFilter = (typeof POST_CATEGORIES)[number]['value']

export type CategoryCount = {
  value: CategoryFilter | 'all'
  label: string
  count: number
}

// The reference's filter row labels (docs/design/insights/) -- plural
// for the countable categories, as-is for the other two -- not a
// general pluralisation rule, just these 5 exact labels.
const FILTER_LABELS: Record<CategoryFilter, string> = {
  announcement: 'Announcements',
  guide: 'Guides',
  maintenance: 'Maintenance',
  security: 'Security',
  'company-news': 'Company news',
}

// Sidebar FILTER card counts (docs/design/insights/) -- one query per
// category plus the total, all from the database, not guessed from
// whatever happens to be on the current page.
export async function getCategoryCounts(): Promise<CategoryCount[]> {
  const payload = await getPayloadClient()

  const [total, ...perCategory] = await Promise.all([
    payload.count({ collection: 'posts', overrideAccess: false }),
    ...POST_CATEGORIES.map((category) =>
      payload.count({
        collection: 'posts',
        overrideAccess: false,
        where: { category: { equals: category.value } },
      }),
    ),
  ])

  return [
    { value: 'all', label: 'All', count: total.totalDocs },
    ...POST_CATEGORIES.map((category, index) => ({
      value: category.value,
      label: FILTER_LABELS[category.value],
      count: perCategory[index].totalDocs,
    })),
  ]
}

export type PostsPage = {
  docs: Post[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
}

export async function getPosts({
  category,
  page = 1,
  limit = POSTS_PER_PAGE,
}: {
  category?: CategoryFilter
  page?: number
  limit?: number
}): Promise<PostsPage> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'posts',
    overrideAccess: false,
    sort: '-publishedAt',
    page,
    limit,
    where: category ? { category: { equals: category } } : undefined,
  })

  return {
    docs: result.docs,
    totalDocs: result.totalDocs,
    totalPages: result.totalPages,
    page: result.page ?? 1,
    hasNextPage: result.hasNextPage ?? false,
  }
}

export async function getLatestPosts(limit: number): Promise<Post[]> {
  const result = await getPosts({ page: 1, limit })
  return result.docs
}

// The amber pinned-notice bar: only a pinned notice that hasn't ended
// yet, soonest first. role="status" (not alert) in the component, since
// this is informational, not an urgent interruption.
export async function getActivePinnedNotice(): Promise<Notice | null> {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'notices',
    overrideAccess: false,
    where: {
      and: [{ pinned: { equals: true } }, { endsAt: { greater_than: new Date().toISOString() } }],
    },
    sort: 'startsAt',
    limit: 1,
  })

  return result.docs[0] ?? null
}
