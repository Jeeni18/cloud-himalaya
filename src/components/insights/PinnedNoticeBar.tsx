import Link from 'next/link'

import { formatNptDate, formatNptTime } from '../../lib/formatNpt'
import type { Notice } from '../../payload-types'

type PinnedNoticeBarProps = {
  notice: Notice
}

// Pinned notice bar, section 2 of /insights (docs/design/insights/).
// Only rendered by the page when an active pinned notice exists (see
// getActivePinnedNotice) -- this component never decides that itself,
// and renders nothing extra when there isn't one (the page just omits
// it). role="status": informational, not an interruption, so it's
// announced politely rather than as an alert.
export function PinnedNoticeBar({ notice }: PinnedNoticeBarProps) {
  const href =
    notice.relatedPost && typeof notice.relatedPost === 'object'
      ? `/insights/${notice.relatedPost.slug}`
      : '/insights'

  return (
    <div
      className="border-y border-insights-pinned-border bg-insights-pinned-bg py-5"
      role="status"
    >
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-[18px] px-[var(--section-x)]">
        <span className="rounded-md bg-insights-pinned-badge-bg px-2.5 py-1.5 font-mono text-[11px] text-insights-pinned-badge-text">
          PINNED NOTICE
        </span>
        <span className="font-semibold text-insights-pinned-text">
          {notice.title.replace(/^\[Sample\]\s*/, '')} · {formatNptDate(notice.startsAt)},{' '}
          {formatNptTime(notice.startsAt)}–{formatNptTime(notice.endsAt)}
        </span>
        <span className="text-insights-pinned-text-secondary">{notice.whatYouDo}</span>
        <Link className="ml-auto font-semibold text-insights-pinned-text" href={href}>
          Details →
        </Link>
      </div>
    </div>
  )
}
