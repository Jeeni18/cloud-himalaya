// Mono numbered label above a section heading, e.g. "01 / SERVICES"
// (docs/LANDING_PAGE_SPEC.md section 2.3). 13px per the responsive-
// homepage spec's "small labels: 13px".
export function Eyebrow({ children }: { children: string }) {
  return <p className="font-mono text-[13px] font-medium text-accent">{children}</p>
}
