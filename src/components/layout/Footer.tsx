import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '../../config/site'
import { footer, siteInfo } from '../../content/home'
import type { FooterLink } from '../../content/home'
import { ClientLoginLink } from '../ui/ClientLoginLink'

function FooterLinkList({ items }: { items: FooterLink[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <a
              className="hover:text-white"
              href={item.href}
              rel="noopener noreferrer"
              target={item.href.startsWith('http') ? '_blank' : undefined}
            >
              {item.label}
            </a>
          ) : (
            <Link className="hover:text-white" href={item.href}>
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}

// docs/LANDING_PAGE_SPEC.md section 4.14.
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-footer-bg text-[15px] text-footer-text">
      <div className="mx-auto grid max-w-[1280px] gap-9 px-6 py-16 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
        <div>
          <Image alt="Cloud Himalaya" height={40} src="/brand/logo-nav-white.png" width={210} />
          <p className="mt-4">{footer.tagline}</p>
          <p className="mt-3 font-mono text-xs">{footer.certLine}</p>
        </div>

        <div>
          <h2 className="font-semibold text-white">Services</h2>
          <div className="mt-4">
            <FooterLinkList items={footer.servicesLinks} />
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">Company</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            <FooterLinkList items={footer.companyLinks} />
            <ClientLoginLink className="hover:text-white" href={siteConfig.clientPortalUrl} />
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">{footer.kathmandu.heading}</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            <p>{footer.kathmandu.address}</p>
            <a className="hover:text-white" href={`tel:${footer.kathmandu.phone}`}>
              {footer.kathmandu.phone}
            </a>
            <a className="hover:text-white" href={`mailto:${footer.kathmandu.email}`}>
              {footer.kathmandu.email}
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-white">{footer.otherOffices.heading}</h2>
          <div className="mt-4 flex flex-col gap-2.5">
            <p>{footer.otherOffices.dr}</p>
            <p>{footer.otherOffices.us}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-footer-line px-6 py-7">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 text-sm">
          <p>
            © {year} {siteInfo.companyName}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legalLinks.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
