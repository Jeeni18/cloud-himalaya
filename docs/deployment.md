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

### Environment variables

Set these in Vercel under Settings, Environment Variables:

| Variable              | Value                                     |
| --------------------- | ----------------------------------------- |
| `PREVIEW_WITHOUT_CMS` | `true`                                    |
| `PAYLOAD_SECRET`      | a random string of at least 16 characters |

`DATABASE_URL` is not required while `PREVIEW_WITHOUT_CMS` is `true`.

Generate the secret locally and paste it into Vercel. Do not commit it:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### How the flag behaves

`src/lib/cmsAvailability.ts` exports `isCmsDisabled`, read from
`PREVIEW_WITHOUT_CMS`. It is opt-in and off by default, so a genuine database
outage in production still fails loudly rather than quietly serving an empty
site. Query errors are never caught; only the explicit flag skips a read.

Remove the variable from Vercel once a real database is connected.

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
