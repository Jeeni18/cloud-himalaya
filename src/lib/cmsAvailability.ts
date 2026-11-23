// Supports a preview deployment built without a database, so the frontend
// design can be reviewed before the production Postgres instance and its
// migrations exist. In that mode, CMS-backed sections render the same empty
// state they already show when an editor has published nothing yet, rather
// than failing the request.
//
// This is opt-in through PREVIEW_WITHOUT_CMS and off everywhere else, so a
// genuine database outage in production still surfaces as an error instead
// of silently serving an empty site. Only this explicit flag suppresses a
// read; query errors are never swallowed.

const TRUTHY = ['true', '1', 'yes', 'on']

// Trimmed and lower-cased, and several spellings accepted, because this is
// typed by hand into a deployment platform's settings UI where a stray
// capital or space is easy to introduce and hard to spot.
const rawPreviewFlag = process.env.PREVIEW_WITHOUT_CMS

export const isCmsDisabled = TRUTHY.includes((rawPreviewFlag ?? '').trim().toLowerCase())

// Reported in the environment-validation error, so a failed deployment says
// whether the flag arrived at all instead of only that a variable is
// missing. The flag is a plain on/off switch, never a secret.
export function describePreviewFlag(): string {
  if (rawPreviewFlag === undefined) return 'PREVIEW_WITHOUT_CMS is not set'
  return `PREVIEW_WITHOUT_CMS is set to "${rawPreviewFlag}"`
}
