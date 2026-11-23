// Single source of truth for the external client-portal URL, so no
// component (or next.config.ts) ever hard-codes it.
//
// Server-side by design: CLIENT_PORTAL_URL deliberately has no
// NEXT_PUBLIC_ prefix, so Next.js does not inline it into the browser
// bundle. Import this module from server components and next.config.ts
// only, and pass the value down as a prop where a client component
// needs it (Header -> MobileMenu already does exactly that). Importing
// it directly into a client component would silently fall back to the
// placeholder below instead of using the real value.

// TODO: placeholder until the company confirms the real portal address
// (CLAUDE.md section 5 lists the portal URL as still pending). Set
// CLIENT_PORTAL_URL in .env to override; this fallback only exists so
// local development and the build keep working before then.
const FALLBACK_CLIENT_PORTAL_URL = 'https://portal.cloudhimalaya.com'

function readClientPortalUrl(): string {
  const value = process.env.CLIENT_PORTAL_URL?.trim()

  if (!value) return FALLBACK_CLIENT_PORTAL_URL

  // Fail loudly on a malformed value rather than rendering a broken
  // link and a broken /client-login redirect, matching how lib/env.ts
  // validates the other environment variables.
  if (!value.startsWith('https://') && !value.startsWith('http://')) {
    throw new Error(
      `Environment variable "CLIENT_PORTAL_URL" must be an absolute http(s) URL (got "${value}").`,
    )
  }

  return value
}

export const siteConfig = {
  clientPortalUrl: readClientPortalUrl(),
} as const
