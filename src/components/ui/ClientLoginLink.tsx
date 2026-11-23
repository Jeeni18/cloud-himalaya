type ClientLoginLinkProps = {
  href: string
  className?: string
  // Lets the mobile menu close itself on click; navigation still
  // happens through the anchor, not JavaScript.
  onClick?: () => void
}

// The one Client Login link, used by the header, the mobile menu and
// the footer so all three stay identical: a plain anchor (not a button,
// not a JS redirect) opening the external portal in a new tab, with the
// arrow marked decorative and the new-tab behaviour spelled out in the
// accessible name.
//
// `href` is a prop rather than read from siteConfig in here, so this is
// safe to render inside the client-side mobile menu -- CLIENT_PORTAL_URL
// is read on the server and passed down (see src/config/site.ts).
export function ClientLoginLink({ href, className = '', onClick }: ClientLoginLinkProps) {
  return (
    <a
      aria-label="Client Login (opens the client portal in a new tab)"
      className={className}
      href={href}
      onClick={onClick}
      rel="noopener noreferrer"
      target="_blank"
    >
      Client Login <span aria-hidden="true">↗</span>
    </a>
  )
}
