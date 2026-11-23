import Image from 'next/image'

type LogoProps = {
  size?: 40 | 96
  className?: string
}

// The Figma hero's circular "CH" badge (docs/figma-hero-notes.md) is the
// same image in both themes -- no light/dark swap needed, unlike the
// horizontal logo-nav.png/-white.png pair used elsewhere on the site.
// It's the round mark already supplied at public/brand/logo-mark.png.
export function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <Image
      alt="Cloud Himalaya"
      className={className}
      height={size}
      priority={size === 96}
      src="/brand/logo-mark.png"
      width={size}
    />
  )
}
