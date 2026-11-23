import { socialLinks, topBar } from '../../content/home'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons'

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon,
} as const

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

// Thin contact bar above the header, on every page (replaces
// AnnouncementBar, which stays in the codebase unused). Sticky at the
// very top, with Header.tsx stuck directly below it -- --topbar-h/
// --header-h (styles.css) keep the two in sync, including this bar
// disappearing entirely below sm (640px): --topbar-h drops to 0 then, so
// the header slides up to the very top instead of leaving a gap.
// Below lg (1024px) only the main phone number and the social icons
// show; Sales, NOC and email reappear at lg and up.
export function TopBar() {
  return (
    <div className="sticky top-0 z-20 hidden h-9 bg-topbar-bg text-topbar-text sm:block">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-6 text-[13px]">
        <div className="flex min-w-0 items-center gap-5 overflow-hidden whitespace-nowrap">
          <a
            className="shrink-0 font-semibold hover:text-topbar-hover"
            href={telHref(topBar.mainPhone)}
          >
            {topBar.mainPhone}
          </a>
          <a
            className="hidden shrink-0 hover:text-topbar-hover lg:inline"
            href={telHref(topBar.salesPhone)}
          >
            {topBar.salesLabel} {topBar.salesPhone}
          </a>
          <a
            className="hidden shrink-0 hover:text-topbar-hover lg:inline"
            href={telHref(topBar.nocPhone)}
          >
            {topBar.nocLabel} {topBar.nocPhoneDisplay}
          </a>
          <a
            className="hidden shrink-0 truncate hover:text-topbar-hover lg:inline"
            href={`mailto:${topBar.email}`}
          >
            {topBar.email}
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-3.5">
          {socialLinks.map((social) => {
            const Icon = SOCIAL_ICONS[social.name]
            return (
              <a
                aria-label={`Cloud Himalaya on ${social.name}`}
                className="hover:text-topbar-hover"
                href={social.href}
                key={social.name}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon size={16} />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
