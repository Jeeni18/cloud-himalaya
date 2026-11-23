import { insightsPreview } from '../../content/home'
import { getLatestPosts } from '../../lib/insights'
import { PostCard } from '../insights/PostCard'
import { MoreLink } from '../ui/MoreLink'
import { SectionHeading } from '../ui/SectionHeading'

// Insights preview, section (e) of the new homepage
// (docs/design/landing-preview.html). Latest 3 published posts from
// Payload, via the shared PostCard also used by /insights -- hides the
// whole section if there are none yet, rather than showing empty cards.
// The band is bright cyan even in dark mode, so its heading/eyebrow use
// their own dark-text token instead of the usual light dark-mode text --
// see styles.css's section-insights-text comment. id="insights" is the
// scroll-spy target for the header's "Insights" link.
export async function InsightsPreview() {
  const posts = await getLatestPosts(3)
  if (posts.length === 0) return null

  return (
    <section className="bg-section-insights py-[var(--section-y)]" id="insights">
      <div className="mx-auto max-w-[1280px] px-[var(--section-x)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[13px] font-medium text-section-insights-text">
              {insightsPreview.eyebrow}
            </p>
            <SectionHeading className="mt-3 text-section-insights-text" tone="custom">
              {insightsPreview.heading}
            </SectionHeading>
          </div>
          <MoreLink href={insightsPreview.moreHref} label={insightsPreview.moreLabel} />
        </div>

        {/* min(300px, 100%) lets a column shrink below 300px on screens
            narrower than that, instead of forcing horizontal overflow. */}
        <div className="mt-9 grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(300px,100%),1fr))]">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
