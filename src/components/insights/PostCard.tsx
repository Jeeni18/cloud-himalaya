import Image from 'next/image'
import Link from 'next/link'

import { formatNptDate } from '../../lib/formatNpt'
import type { Post } from '../../payload-types'
import { CATEGORY_LABELS, PostCover } from './PostCover'

type PostCardProps = {
  post: Post
  // 'grid' backs the homepage preview and this page's intro (3-up grid,
  // cover on top, shows reading time). 'row' backs the feed (cover on
  // the left on tablet/desktop, stacked on phones, no reading time) --
  // one shared component, not two near-duplicates, per the task.
  layout?: 'grid' | 'row'
}

// Shared post card (docs/design/insights/ and the homepage's own
// Insights section, which this replaces). TODO: /insights/[slug] isn't
// built yet -- these links 404 until it exists.
export function PostCard({ post, layout = 'grid' }: PostCardProps) {
  const cover =
    post.coverImage && typeof post.coverImage === 'object' ? (
      <div className="relative aspect-[600/285] w-full">
        <Image
          alt={post.coverImage.alt}
          className="object-cover"
          fill
          sizes={
            layout === 'row' ? '(min-width: 640px) 280px, 100vw' : '(min-width: 1024px) 33vw, 100vw'
          }
          src={post.coverImage.url ?? ''}
        />
      </div>
    ) : (
      <PostCover category={post.category} />
    )

  if (layout === 'row') {
    return (
      <Link
        className="flex flex-col overflow-hidden rounded-2xl border border-content-card-border bg-section-insights-card sm:flex-row"
        href={`/insights/${post.slug}`}
      >
        <div className="sm:w-[280px] sm:shrink-0">{cover}</div>
        <div className="flex min-w-0 flex-1 flex-col p-[22px] sm:px-[26px]">
          <p className="font-mono text-xs text-content-label">
            {CATEGORY_LABELS[post.category]} · {formatNptDate(post.publishedAt)}
          </p>
          <h3 className="mt-1.5 text-[22px] leading-[1.3] font-bold text-content-head">
            {post.title}
          </h3>
          <p className="mt-2 text-content-secondary">{post.excerpt}</p>
          <span className="mt-3.5 font-semibold text-content-accent">Read →</span>
        </div>
      </Link>
    )
  }

  return (
    <Link
      className="flex flex-col overflow-hidden rounded-2xl border border-content-card-border bg-section-insights-card"
      href={`/insights/${post.slug}`}
    >
      {cover}
      <div className="flex flex-1 flex-col p-[22px]">
        <p className="font-mono text-xs text-content-label">
          {CATEGORY_LABELS[post.category]} · {formatNptDate(post.publishedAt)}
        </p>
        <h3 className="mt-2 text-xl leading-[1.3] font-bold text-content-head">{post.title}</h3>
        <p className="mt-2 text-[15px] text-content-secondary">{post.excerpt}</p>
        <div className="mt-auto flex justify-between pt-4 text-sm text-content-secondary">
          <span>{post.readingTime} min read</span>
          <span className="font-semibold text-content-accent">Read →</span>
        </div>
      </div>
    </Link>
  )
}
