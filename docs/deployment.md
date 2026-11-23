# Deployment

Status: no production deployment exists yet. The company server, domain, DNS,
SSL and backup arrangements are still pending (see `docs/requirements.md`).
This document currently covers only the frontend preview deployment described
below.

## Frontend-only preview (Vercel, no database)

Purpose: publish a URL that shows the frontend design for review, before a
production database and Payload migrations exist.

### What works and what does not

Fully working, because their content comes from `src/content/*.ts` rather than
the CMS:

- `/` (home)
- `/about-us`
- `/services`
- `/contact-us` (the form validates, but does not store or send anything)

Rendered, but empty, because their content comes from Payload:

- `/insights` and `/insights/rss.xml` show the designed empty state
- `/about`, `/contact`, `/data-center`, `/legal/[slug]`, `/services/[slug]`
  show a "not published yet" placeholder (`ContentPending`)

Not usable in this mode:

- `/admin`, which needs a database

One pre-existing broken link is not related to the CMS: `/careers` is linked
from the footer, the homepage "We're hiring" button and a section link, but
that route has never been built, so it returns 404. Careers is still a pending
requirement (see `docs/requirements.md`).

### Environment variables

None are required. `PREVIEW_WITHOUT_CMS=true` is committed in
`.env.production`, which Next.js loads during `next build` and `next start`,
so the preview builds on any platform with nothing configured in a dashboard.

`PAYLOAD_SECRET` is optional in this mode: a random value is generated per
process, because nothing it signs outlives the request that created it and
`/admin` cannot be used without a database. Setting a real one is harmless.

### How the flag behaves

`src/lib/cmsAvailability.ts` exports `isCmsDisabled`, which is true only when
both conditions hold: `PREVIEW_WITHOUT_CMS` is set to a truthy value, and no
`DATABASE_URL` is configured.

A real `DATABASE_URL` always wins. That has two consequences worth knowing:

- Configuring a database switches the CMS back on with no code change. The
  committed flag becomes inert, so it cannot silently disable a working CMS.
- A genuine outage on a configured database still fails loudly, rather than
  quietly serving an empty site. Query errors are never caught; only the
  combination above skips a read.

If neither a `DATABASE_URL` nor the flag is present, startup validation fails
with a message naming both options and reporting the flag's current state, so
a failed deployment says which one is missing.

Delete `.env.production` once the database is permanent.

## Still required before a real deployment

These are outstanding and block a production or staging deployment:

1. A hosted PostgreSQL instance reachable from the deployment platform, using
   a pooled connection string.
2. Payload migrations. No `src/migrations/` directory exists yet, so a fresh
   database has no tables. Local development relies on Payload's automatic
   schema push, which is not appropriate beyond local use (CLAUDE.md
   section 4). The platform's build command then needs to run migrations
   before the build.
3. Media storage. Uploads currently go to the local filesystem, which is
   ephemeral on serverless platforms, so images would be lost. A storage
   adapter is needed.
4. Security headers, confirmed domain, DNS, SSL and backups.
