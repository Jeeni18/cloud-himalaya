import { ThemeProvider } from 'next-themes'
import React from 'react'

import { Footer } from '../../components/layout/Footer'
import { Header } from '../../components/layout/Header'
import { TopBar } from '../../components/layout/TopBar'
import { siteInfo } from '../../content/home'
import { fontMono, fontSans } from './fonts'
import './styles.css'

// Static, developer-authored data only -- no user input reaches this
// JSON, so JSON.stringify's own escaping is enough; this is the standard
// Next.js pattern for structured data (docs/LANDING_PAGE_SPEC.md section 7).
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteInfo.companyName,
  // Relative for now -- the production domain isn't confirmed yet
  // (CLAUDE.md section 5). Schema.org prefers an absolute URL here;
  // make it absolute once the domain is set.
  logo: '/brand/logo-full.png',
  email: siteInfo.email,
  telephone: siteInfo.phoneMain,
  address: [
    { '@type': 'PostalAddress', streetAddress: siteInfo.addressKathmandu, addressCountry: 'NP' },
    { '@type': 'PostalAddress', streetAddress: siteInfo.addressDr, addressCountry: 'NP' },
    { '@type': 'PostalAddress', streetAddress: siteInfo.addressUs, addressCountry: 'US' },
  ],
}

export const metadata = {
  description:
    'Cloud Himalaya -- data center, colocation and cloud hosting in Nepal, from a self-owned, seismic-safe facility in Kathmandu with a disaster recovery site in Itahari.',
  title: 'Cloud Himalaya — Data Center, Colocation & Cloud Hosting in Nepal',
  openGraph: {
    images: ['/brand/logo-full.png'],
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      className={`${fontSans.variable} ${fontMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          type="application/ld+json"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <TopBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
