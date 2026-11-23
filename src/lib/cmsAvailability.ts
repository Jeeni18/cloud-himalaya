// Supports a preview deployment built without a database, so the frontend
// design can be reviewed before the production Postgres instance and its
// migrations exist. In that mode, CMS-backed sections render the same empty
// state they already show when an editor has published nothing yet, rather
// than failing the request.
//
// Two conditions must both hold, so this cannot be switched on by accident:
// PREVIEW_WITHOUT_CMS must be set, and no DATABASE_URL may be configured.
// A real DATABASE_URL always wins, which means configuring a database turns
// the CMS back on with no code change, and a genuine outage on a configured
// database still surfaces as an error instead of silently serving an empty
// site. Only this combination suppresses a read; query errors are never
// swallowed.

const TRUTHY = ['true', '1', 'yes', 'on']

// Trimmed, lower-cased, and several spellings accepted, because this is
// typed by hand into a deployment platform's settings UI or an env file,
// where a stray capital or space is easy to introduce and hard to spot.
const rawPreviewFlag = process.env.PREVIEW_WITHOUT_CMS
const previewRequested = TRUTHY.includes((rawPreviewFlag ?? '').trim().toLowerCase())

const rawDatabaseUrl = (process.env.DATABASE_URL ?? '').trim()

export const hasDatabaseUrl = rawDatabaseUrl !== ''

export const isCmsDisabled = previewRequested && !hasDatabaseUrl

// Reported in the environment-validation error, so a failed deployment says
// whether the flag arrived at all instead of only that a variable is
// missing. The flag is a plain on/off switch, never a secret.
export function describePreviewFlag(): string {
  if (rawPreviewFlag === undefined) return 'PREVIEW_WITHOUT_CMS is not set'
  return `PREVIEW_WITHOUT_CMS is set to "${rawPreviewFlag}"`
}
