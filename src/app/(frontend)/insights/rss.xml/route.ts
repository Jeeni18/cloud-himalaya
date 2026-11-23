import { NextResponse } from 'next/server'

import { getLatestPosts } from '../../../../lib/insights'

// Workaround for the same confirmed Next.js 16.3.3 + Payload 3.92.1
// caching issue noted on the page routes: forces a fresh feed on every
// request instead of a stale cached one.
export const dynamic = 'force-dynamic'

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// RSS feed of the latest 20 published posts (docs/design/insights/'s own
// task spec). Hand-written XML rather than a dependency -- RSS 2.0 is a
// simple enough format that a small template doesn't need a library.
// The site's production domain isn't confirmed yet (see CLAUDE.md's
// pending requirements), so link/guid URLs are built from the incoming
// request's own origin instead of a guessed hostname -- this works
// correctly in dev, staging and production without needing that domain
// decided first.
export async function GET(request: Request) {
  const origin = new URL(request.url).origin
  const posts = await getLatestPosts(20)

  const items = posts
    .map((post) => {
      const url = `${origin}/insights/${post.slug}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Cloud Himalaya Insights</title>
    <link>${origin}/insights</link>
    <description>News, guides and notices from Cloud Himalaya.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
