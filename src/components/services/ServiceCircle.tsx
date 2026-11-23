import type { ServicesBlueprintService } from '../../content/home'
import type { ServiceSlug } from '../../content/services'
import { BlueprintFigure } from './BlueprintFigure'

const KEY_BY_SLUG: Record<ServiceSlug, ServicesBlueprintService['key']> = {
  colocation: 'colo',
  vps: 'vps',
  'managed-services': 'managed',
  'web-hosting': 'web',
  'email-hosting': 'email',
}

type ServiceCircleProps = {
  service: ServiceSlug
  size: number
}

// The homepage blueprint's detail-bubble drawing, reused at any size --
// same BlueprintFigure, same "fixed in both modes" navy/white/blue
// palette, so it matches the homepage exactly rather than being redrawn
// or rasterised (the reference's own service-circle-*.png files are
// screenshots of this same drawing, not used here). Purely decorative;
// always paired with real adjacent text, so it's aria-hidden.
export function ServiceCircle({ service, size }: ServiceCircleProps) {
  return (
    <svg aria-hidden="true" height={size} viewBox="-170 -170 340 340" width={size}>
      <circle fill="#092B50" r="170" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle fill="none" r="162" stroke="#55A4E0" strokeDasharray="3 5" strokeWidth="0.8" />
      <BlueprintFigure selectedKey={KEY_BY_SLUG[service]} />
    </svg>
  )
}
