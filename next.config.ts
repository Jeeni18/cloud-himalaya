import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

import { siteConfig } from './src/config/site'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // CLAUDE.md is our hand-written project-instructions file; Next.js's
  // agent-rules generator would otherwise try to manage/overwrite it.
  agentRules: false,
  // Short URL for emails and printed material: /client-login sends
  // visitors straight to the portal. `permanent: true` issues a 308.
  // Reads the same CLIENT_PORTAL_URL value as every link on the site --
  // Next.js loads .env before evaluating this config, so the shared
  // module works here too.
  async redirects() {
    return [
      {
        source: '/client-login',
        destination: siteConfig.clientPortalUrl,
        permanent: true,
      },
    ]
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      // Static brand assets (logos) served from public/brand/, not from
      // Payload uploads -- next/image refuses any local path not listed
      // here.
      {
        pathname: '/brand/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
