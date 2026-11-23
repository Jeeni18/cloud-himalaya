type SectionRidgeProps = {
  fromVar: string
  toVar: string
}

// Decorative ridge transition between two homepage section bands, light
// mode only (docs/design/landing-preview.html, section 5: "Light mode
// only: the small mountain-ridge edge shapes... Hide them in dark
// mode"). `fromVar`/`toVar` are the two sections' own CSS variable names
// (e.g. "--color-section-services"), so this stays a plain color swap
// rather than a new pair of colors to keep in sync.
export function SectionRidge({ fromVar, toVar }: SectionRidgeProps) {
  return (
    <svg
      aria-hidden="true"
      className="block h-14 w-full dark:hidden"
      preserveAspectRatio="none"
      viewBox="0 0 1440 56"
    >
      <rect height="56" style={{ fill: `var(${fromVar})` }} width="1440" />
      <path
        d="M0 56 L0 30 L160 14 L330 34 L520 8 L700 30 L900 12 L1080 32 L1260 16 L1440 28 L1440 56 Z"
        style={{ fill: `var(${toVar})` }}
      />
    </svg>
  )
}
