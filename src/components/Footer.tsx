import Link from 'next/link'

import { getPayloadClient } from '../lib/getPayloadClient'
import { Container } from './ui/Container'

export async function Footer() {
  const payload = await getPayloadClient()
  const [footer, siteSettings, services, legalPages] = await Promise.all([
    payload.findGlobal({ slug: 'footer', overrideAccess: false }),
    payload.findGlobal({ slug: 'site-settings', overrideAccess: false }),
    payload.find({ collection: 'services', overrideAccess: false, sort: 'title', limit: 6 }),
    payload.find({ collection: 'legal', overrideAccess: false, sort: 'title', limit: 6 }),
  ])

  const year = new Date().getFullYear()
  const hasContactDetails = Boolean(
    siteSettings.contactPhone ||
    siteSettings.contactEmail ||
    siteSettings.address ||
    siteSettings.socialLinks?.length ||
    siteSettings.clientPortalUrl ||
    siteSettings.supportPortalUrl,
  )

  return (
    <footer className="border-t border-text-secondary/20 bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {(footer.navItems?.length ?? 0) > 0 && (
            <nav aria-label="Company">
              <h2 className="font-mono text-xs text-text-secondary">Company</h2>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {(footer.navItems ?? []).map((item) => (
                  <li key={item.id ?? item.label}>
                    <Link className="text-text-primary hover:text-accent" href={item.url}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {services.docs.length > 0 && (
            <nav aria-label="Services">
              <h2 className="font-mono text-xs text-text-secondary">Services</h2>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {services.docs.map((service) => (
                  <li key={service.id}>
                    <Link
                      className="text-text-primary hover:text-accent"
                      href={`/services/${service.slug}`}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className="text-text-primary hover:text-accent" href="/services">
                    All services
                  </Link>
                </li>
              </ul>
            </nav>
          )}

          {legalPages.docs.length > 0 && (
            <nav aria-label="Legal">
              <h2 className="font-mono text-xs text-text-secondary">Legal</h2>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {legalPages.docs.map((page) => (
                  <li key={page.id}>
                    <Link
                      className="text-text-primary hover:text-accent"
                      href={`/legal/${page.slug}`}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {hasContactDetails && (
            <div>
              <h2 className="font-mono text-xs text-text-secondary">Contact</h2>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {siteSettings.address && (
                  <li className="whitespace-pre-line text-text-primary">{siteSettings.address}</li>
                )}
                {siteSettings.contactPhone && (
                  <li>
                    <a
                      className="text-text-primary hover:text-accent"
                      href={`tel:${siteSettings.contactPhone}`}
                    >
                      {siteSettings.contactPhone}
                    </a>
                  </li>
                )}
                {siteSettings.contactEmail && (
                  <li>
                    <a
                      className="text-text-primary hover:text-accent"
                      href={`mailto:${siteSettings.contactEmail}`}
                    >
                      {siteSettings.contactEmail}
                    </a>
                  </li>
                )}
                {siteSettings.clientPortalUrl && (
                  <li>
                    <Link
                      className="text-text-primary hover:text-accent"
                      href={siteSettings.clientPortalUrl}
                    >
                      Client login
                    </Link>
                  </li>
                )}
                {siteSettings.supportPortalUrl && (
                  <li>
                    <Link
                      className="text-text-primary hover:text-accent"
                      href={siteSettings.supportPortalUrl}
                    >
                      Support
                    </Link>
                  </li>
                )}
                {siteSettings.socialLinks?.map((link) => (
                  <li key={link.id ?? link.platform}>
                    <a className="text-text-primary hover:text-accent" href={link.url}>
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="mt-10 border-t border-text-secondary/15 pt-6 text-sm text-text-secondary">
          &copy; {year} {siteSettings.companyName}
          {footer.copyrightText ? ` -- ${footer.copyrightText}` : ''}
        </p>
      </Container>
    </footer>
  )
}
