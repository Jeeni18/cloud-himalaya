// Load .env files -- this script runs standalone (not through Next.js
// dev, which does this automatically), same as vitest.setup.ts.
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../payload.config.js'
import { slugify } from '../lib/slugify.js'
import type { Post } from '../payload-types.js'

// Seeds sample Posts and Notices for /insights (docs/design/insights/),
// so the page has something real to show before the company's own
// content exists. Every title starts with "[Sample]" so nothing here is
// mistaken for real content; re-running this script clears its own
// previous sample data first rather than piling up duplicates.
//
// Run with: pnpm seed:insights

type SeedPost = {
  title: string
  excerpt: string
  category: 'announcement' | 'guide' | 'maintenance' | 'security' | 'company-news'
  publishedAt: string
  body: string
}

function richText(text: string): Post['content'] {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
          children: [
            { type: 'text', text, detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
          ],
        },
      ],
    },
  }
}

const now = Date.now()
const daysAgo = (n: number) => new Date(now - n * 24 * 60 * 60 * 1000).toISOString()

// Dates spread across 2 months so the feed's "NOVEMBER 2026" / "OCTOBER
// 2026" style month grouping has more than one group to show. The 3
// newest also naturally become the intro's "3 latest posts" -- same
// data, not a separate list, matching how the real feed will work even
// though the static mockup drew different examples in each spot.
const posts: SeedPost[] = [
  {
    title: '[Sample] Itahari DR site: what it means for your data',
    excerpt: 'How our second site keeps a copy of your systems outside Kathmandu.',
    category: 'announcement',
    publishedAt: daysAgo(1),
    body: 'How our second site keeps a copy of your systems outside Kathmandu. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] VPS or colocation? How to choose',
    excerpt: 'A plain-language guide to picking the right home for your servers.',
    category: 'guide',
    publishedAt: daysAgo(3),
    body: 'A plain-language guide to picking the right home for your servers. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] Scheduled network maintenance',
    excerpt: 'Planned work on core switches. Most customers need to do nothing.',
    category: 'maintenance',
    publishedAt: daysAgo(4),
    body: 'Planned work on core switches. Most customers need to do nothing. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] Five habits that keep your server safe',
    excerpt: 'Simple steps any team can take this week.',
    category: 'security',
    publishedAt: daysAgo(6),
    body: 'Simple steps any team can take this week. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] How long should you keep backups?',
    excerpt: '1, 3 or 7 years: what regulators and common sense say.',
    // "Backups" in the reference isn't one of the 5 approved categories
    // (see the task summary) -- seeded as a guide instead.
    category: 'guide',
    publishedAt: daysAgo(9),
    body: '1, 3 or 7 years: what regulators and common sense say. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] Why hosting in Nepal is faster for Nepali users',
    excerpt: 'What happens to your traffic when your server is abroad.',
    // "Networking" in the reference isn't one of the 5 approved
    // categories either -- seeded as a guide for the same reason.
    category: 'guide',
    publishedAt: daysAgo(12),
    body: 'What happens to your traffic when your server is abroad. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] We renewed our ISO 27001 certification',
    excerpt: 'What the audit looked at and what it means for customers.',
    category: 'company-news',
    publishedAt: daysAgo(34),
    body: 'What the audit looked at and what it means for customers. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] Moving your website to Cloud Himalaya',
    excerpt: 'A step-by-step checklist for a smooth move.',
    category: 'guide',
    publishedAt: daysAgo(37),
    body: 'A step-by-step checklist for a smooth move. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] Power system test at KTM-DC1',
    excerpt: 'A routine test of backup power. No downtime expected.',
    category: 'maintenance',
    publishedAt: daysAgo(40),
    body: 'A routine test of backup power. No downtime expected. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] What ISO 27001 actually covers',
    excerpt: 'A short explainer on the certification and what it checks every year.',
    category: 'security',
    publishedAt: daysAgo(44),
    body: 'A short explainer on the certification and what it checks every year. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] Choosing a backup retention policy',
    excerpt: 'How to decide what to keep, for how long, and where.',
    category: 'guide',
    publishedAt: daysAgo(48),
    body: 'How to decide what to keep, for how long, and where. [Sample content -- replace before publishing.]',
  },
  {
    title: '[Sample] New support hours over the Dashain holiday',
    excerpt: 'Our NOC stays staffed; sales and billing hours shift slightly.',
    category: 'announcement',
    publishedAt: daysAgo(52),
    body: 'Our NOC stays staffed; sales and billing hours shift slightly. [Sample content -- replace before publishing.]',
  },
]

async function run() {
  const payload = await getPayload({ config })

  const { docs: existing } = await payload.find({
    collection: 'posts',
    where: { title: { like: '[Sample]' } },
    limit: 200,
  })
  for (const doc of existing) {
    await payload.delete({ collection: 'posts', id: doc.id })
  }

  const { docs: existingNotices } = await payload.find({
    collection: 'notices',
    where: { title: { like: '[Sample]' } },
    limit: 200,
  })
  for (const doc of existingNotices) {
    await payload.delete({ collection: 'notices', id: doc.id })
  }

  const created: Record<string, number> = {}
  for (const post of posts) {
    const doc = await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: slugify(post.title),
        excerpt: post.excerpt,
        category: post.category,
        publishedAt: post.publishedAt,
        content: richText(post.body),
        _status: 'published',
      },
      draft: false,
    })
    created[post.title] = doc.id
  }

  const maintenancePostId = created['[Sample] Scheduled network maintenance']

  await payload.create({
    collection: 'notices',
    data: {
      title: '[Sample] Scheduled network maintenance',
      status: 'scheduled',
      affects: 'Core network switches',
      startsAt: new Date(now + 2 * 24 * 60 * 60 * 1000).toISOString(),
      endsAt: new Date(now + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
      whatYouDo: 'No action needed.',
      pinned: true,
      relatedPost: maintenancePostId,
    },
  })

  await payload.create({
    collection: 'notices',
    data: {
      title: '[Sample] Past completed maintenance (should not show)',
      status: 'completed',
      affects: 'Email gateways',
      startsAt: daysAgo(10),
      endsAt: daysAgo(9),
      whatYouDo: 'No action needed.',
      pinned: false,
    },
  })

  console.log(`Seeded ${posts.length} sample posts and 2 sample notices.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
