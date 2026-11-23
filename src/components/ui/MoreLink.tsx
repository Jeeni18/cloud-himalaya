import Link from 'next/link'

type MoreLinkProps = {
  href: string
  label: string
}

// The pill-style "More" button that sits beside each homepage section
// heading (docs/design/landing-preview.html). The visible text stays
// just "More" -- `label` carries the full meaning (e.g. "More about us")
// for screen reader users, so reading several of these in a row isn't a
// wall of repeated sentences.
export function MoreLink({ href, label }: MoreLinkProps) {
  return (
    <Link
      aria-label={label}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[15px] font-semibold text-head hover:bg-alt"
      href={href}
    >
      More <span aria-hidden="true">→</span>
    </Link>
  )
}
