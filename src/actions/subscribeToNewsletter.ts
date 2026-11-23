'use server'

type SubscribeResult = { ok: true } | { ok: false; error: string }

// Newsletter band, /insights (docs/design/insights/). Validates the
// input and stops there -- there is no email service wired up yet, so
// this never claims success. See docs/requirements.md (or ask the user)
// before building this further; what's actually needed:
//   - A choice of newsletter/ESP tool (e.g. Mailchimp, Brevo, Resend
//     Broadcasts, Listmonk if self-hosted) -- not decided yet.
//   - An API key for that tool, in .env (never exposed to the browser).
//   - A double opt-in flow (send a confirmation email, only subscribe
//     once clicked) -- expected by most ESPs and by anti-spam law.
//   - Somewhere to record topic preferences (maintenance/guides/company
//     news) against the subscriber, in whatever shape that ESP expects.
// TODO: once a tool is chosen, replace the body of this action with a
// real API call to it, and have the form show its real success/error
// state instead of nothing.
export async function subscribeToNewsletter(formData: FormData): Promise<SubscribeResult> {
  const email = String(formData.get('email') ?? '').trim()
  const topics = formData.getAll('topics').map(String)

  if (!email || !email.includes('@')) {
    return { ok: false, error: 'Enter a valid email address.' }
  }

  // TODO: send `email` and `topics` to the chosen newsletter tool here.
  console.log('[newsletter] subscribe requested (not yet wired to a real list):', {
    email,
    topics,
  })

  return { ok: false, error: 'Sign-up isn’t connected yet — check back soon.' }
}
