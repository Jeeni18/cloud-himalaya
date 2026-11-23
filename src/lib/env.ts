// Validates required environment variables once, at module load time, so a
// missing or malformed value fails immediately with a clear message instead
// of surfacing later as a confusing runtime error deep in Payload or the DB
// driver.

import { randomBytes } from 'crypto'

import { describePreviewFlag, isCmsDisabled } from './cmsAvailability'

function requireEnv(name: string, hint?: string): string {
  const value = process.env[name]

  if (!value || value.trim() === '') {
    const base = `Missing required environment variable "${name}". Copy .env.example to .env and fill in a real value.`
    throw new Error(hint ? `${base} ${hint}` : base)
  }

  return value
}

function requirePostgresUrl(name: string, hint?: string): string {
  const value = requireEnv(name, hint)

  if (!value.startsWith('postgres://') && !value.startsWith('postgresql://')) {
    throw new Error(
      `Environment variable "${name}" does not look like a PostgreSQL connection string (expected it to start with "postgres://" or "postgresql://").`,
    )
  }

  return value
}

function requireSecret(name: string, minLength: number): string {
  const value = requireEnv(name)

  if (value.length < minLength) {
    throw new Error(
      `Environment variable "${name}" is shorter than ${minLength} characters, which is too weak for a production secret.`,
    )
  }

  return value
}

// A preview deployment has no database (see cmsAvailability.ts), so there is
// no real connection string to require. Payload still needs a syntactically
// valid one to build its config, and this address is deliberately
// unroutable, so any query not guarded by an isCmsDisabled check fails fast
// rather than reaching a real server.
const PREVIEW_DATABASE_URL = 'postgresql://preview:preview@127.0.0.1:1/preview-no-database'

// Likewise, nothing Payload signs in preview mode outlives the request that
// created it, and /admin cannot be used at all. Generated per process rather
// than committed, so there is no shared default secret in version control
// that could be reused somewhere it would matter.
function previewSecret(): string {
  const provided = process.env.PAYLOAD_SECRET
  if (provided && provided.trim() !== '') return provided
  return randomBytes(32).toString('hex')
}

export const env = {
  DATABASE_URL: isCmsDisabled
    ? PREVIEW_DATABASE_URL
    : requirePostgresUrl(
        'DATABASE_URL',
        `To deploy the frontend without a database instead, set PREVIEW_WITHOUT_CMS=true (${describePreviewFlag()}).`,
      ),
  PAYLOAD_SECRET: isCmsDisabled ? previewSecret() : requireSecret('PAYLOAD_SECRET', 16),
} as const
