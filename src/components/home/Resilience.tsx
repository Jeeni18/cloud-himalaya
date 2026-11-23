import { resilience } from '../../content/home'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'

// docs/LANDING_PAGE_SPEC.md section 4.7. The diagram's path/shape data is
// fixed drawing geometry, not editable copy, so it stays as code; only
// its labels come from src/content/home.ts.
export function Resilience() {
  return (
    <section className="border-y border-line bg-alt">
      <div className="mx-auto flex max-w-[1280px] flex-wrap gap-14 px-6 py-24">
        <div className="basis-[400px]">
          <Eyebrow>{resilience.eyebrow}</Eyebrow>
          <SectionHeading className="mt-3">{resilience.heading}</SectionHeading>
          <p className="mt-5 text-muted">{resilience.paragraph}</p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {resilience.miniCards.map((card) => (
              <div className="rounded-xl border border-line bg-surface p-[18px]" key={card.title}>
                <p className="font-bold text-head">{card.title}</p>
                <p className="mt-1 text-[15px] text-muted">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-[1.1] basis-[460px]">
          <div className="rounded-2xl border border-line bg-surface p-7 shadow-lp-sm">
            <div className="flex items-center justify-between font-mono text-xs text-subtle">
              <span>{resilience.diagram.headerLeft}</span>
              <span>{resilience.diagram.headerRight}</span>
            </div>

            <svg
              aria-label={resilience.diagram.ariaLabel}
              className="mt-4 w-full"
              role="img"
              viewBox="0 0 520 300"
            >
              <path
                d="M0 250 L70 200 L120 226 L190 150 L240 196 L300 120 L360 182 L420 140 L520 210 L520 300 L0 300 Z"
                fill="var(--color-ridge-1)"
              />
              <path
                d="M150 150 C 260 90, 330 90, 420 150"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth={3}
              />
              <path
                d="M150 158 C 260 110, 330 110, 420 158"
                fill="none"
                stroke="var(--color-primary)"
                strokeDasharray="4 6"
                strokeWidth={1.5}
              />
              <path
                d="M150 150 L 60 60"
                fill="none"
                stroke="var(--color-subtle)"
                strokeDasharray="3 6"
                strokeWidth={1.5}
              />

              <circle cx={150} cy={154} fill="var(--color-soft)" r={26} />
              <circle cx={150} cy={154} fill="var(--color-primary)" r={11} />
              <circle cx={420} cy={154} fill="var(--color-soft)" r={22} />
              <circle cx={420} cy={154} fill="var(--color-accent)" r={9} />
              <circle cx={60} cy={60} fill="var(--color-subtle)" r={7} />

              <text
                fill="var(--color-head)"
                fontSize={16}
                fontWeight={700}
                textAnchor="middle"
                x={150}
                y={208}
              >
                {resilience.diagram.kathmandu.title}
              </text>
              <text
                fill="var(--color-muted)"
                fontFamily="var(--font-mono)"
                fontSize={12}
                textAnchor="middle"
                x={150}
                y={228}
              >
                {resilience.diagram.kathmandu.sub}
              </text>

              <text
                fill="var(--color-head)"
                fontSize={16}
                fontWeight={700}
                textAnchor="middle"
                x={420}
                y={208}
              >
                {resilience.diagram.itahari.title}
              </text>
              <text
                fill="var(--color-muted)"
                fontFamily="var(--font-mono)"
                fontSize={12}
                textAnchor="middle"
                x={420}
                y={228}
              >
                {resilience.diagram.itahari.sub}
              </text>

              <text
                fill="var(--color-muted)"
                fontFamily="var(--font-mono)"
                fontSize={12}
                textAnchor="middle"
                x={285}
                y={86}
              >
                {resilience.diagram.replicationLabel}
              </text>
              <text
                fill="var(--color-subtle)"
                fontFamily="var(--font-mono)"
                fontSize={12}
                x={76}
                y={44}
              >
                {resilience.diagram.newYorkLabel}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
