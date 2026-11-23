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

export const isCmsDisabled = process.env.PREVIEW_WITHOUT_CMS === 'true'
