import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Enquiries } from './collections/Enquiries'
import { Legal } from './collections/Legal'
import { Notices } from './collections/Notices'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { About } from './globals/About'
import { Contact } from './globals/Contact'
import { DataCenter } from './globals/DataCenter'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Home } from './globals/Home'
import { SiteSettings } from './globals/SiteSettings'
import { env } from './lib/env'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Legal, Posts, Notices, Enquiries],
  globals: [SiteSettings, Header, Footer, Home, About, DataCenter, Contact],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [],
  upload: {
    // Placeholder cap until the company's real media needs are known.
    requestSizeLimit: 10 * 1024 * 1024,
  },
})
