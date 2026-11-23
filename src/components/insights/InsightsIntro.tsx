import { intro } from '../../content/insights'
import { PostCard } from './PostCard'
import { SectionHeading } from '../ui/SectionHeading'
import type { Post } from '../../payload-types'

type InsightsIntroProps = {
  posts: Post[]
}

// Intro, section 1 of /insights (docs/design/insights/). Same design as
// the homepage's Insights section (shared PostCard, grid layout), minus
// the "More" link -- this page is what that link points to.
// bg-section-trust is the homepage's existing token (pixel-identical to
// this section's background).
export function InsightsIntro({ posts }: InsightsIntroProps) {
  return (
    <section className="bg-section-trust pt-14 pb-20">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <SectionHeading level={1}>{intro.heading}</SectionHeading>
        <p className="mt-3.5 max-w-[640px] text-content-body">{intro.subtitle}</p>

        {posts.length > 0 && (
          <div className="mt-10 grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
