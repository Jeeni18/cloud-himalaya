'use client'

import { useActionState } from 'react'

import { subscribeToNewsletter } from '../../actions/subscribeToNewsletter'

const TOPICS = [
  { value: 'maintenance', label: 'Maintenance notices' },
  { value: 'guides', label: 'Guides' },
  { value: 'company-news', label: 'Company news' },
]

// Newsletter band, section 4 of /insights (docs/design/insights/). Fixed
// #0954A6 in both themes (the task's own color table gives it the same
// value for light and dark), unlike most of this page's bands, which
// invert -- so it's written directly rather than through a --section-*
// token. The form posts to a server action that validates the email and
// is honest that sign-up isn't wired to a real list yet -- see that
// action's own comment for what's needed to finish it.
export function NewsletterBand() {
  const [result, formAction, isPending] = useActionState(
    async (
      _prevState: Awaited<ReturnType<typeof subscribeToNewsletter>> | null,
      formData: FormData,
    ) => subscribeToNewsletter(formData),
    null,
  )

  return (
    <section className="bg-[#0954A6] py-[var(--section-y)] text-white" id="subscribe">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-[var(--section-x)] lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-xs font-medium text-[#BCD2E4]">STAY IN THE LOOP</p>
          <h2 className="mt-3 text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] leading-[1.08] font-bold tracking-[-0.025em]">
            Maintenance notices and new guides, in your inbox
          </h2>
          <p className="mt-3 text-[#E4F0FA]">
            About once a month. No marketing spam. [Confirm frequency]
          </p>
        </div>

        <form action={formAction}>
          <div className="flex gap-2.5">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              className="min-h-11 min-w-0 flex-1 rounded-lg bg-section-insights-card px-4 text-content-head placeholder:text-content-label"
              id="newsletter-email"
              name="email"
              placeholder="you@company.com"
              required
              type="email"
            />
            <button
              className="min-h-11 shrink-0 rounded-lg bg-content-selected-bg px-5 text-[15px] font-semibold text-content-selected-text hover:opacity-90 disabled:opacity-60"
              disabled={isPending}
              type="submit"
            >
              Subscribe
            </button>
          </div>

          <div className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#E4F0FA]">
            {TOPICS.map((topic) => (
              <label className="flex min-h-11 items-center gap-2" key={topic.value}>
                <input defaultChecked name="topics" type="checkbox" value={topic.value} />
                {topic.label}
              </label>
            ))}
          </div>

          <p aria-live="polite" className="mt-2 min-h-5 text-sm text-[#FBE7B0]">
            {result && !result.ok ? result.error : null}
          </p>
        </form>
      </div>
    </section>
  )
}
