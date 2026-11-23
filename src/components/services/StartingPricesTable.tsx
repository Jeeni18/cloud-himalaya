import type { ServiceSlug } from '../../content/services'
import { step3 } from '../../content/services'
import { formatPlanPrice, servicePricing } from '../../content/pricing'
import { ServiceCircle } from './ServiceCircle'

type StartingPricesTableProps = {
  onSeePlans: (slug: ServiceSlug) => void
}

// "All services at a glance" starting-prices table, part of Step 3
// (docs/design/services/). A real table on desktop; the same rows
// become stacked cards below sm, via the same data mapped twice rather
// than an overflow-x scroller (per "becomes stacked cards on phones (no
// horizontal scroll)").
export function StartingPricesTable({ onSeePlans }: StartingPricesTableProps) {
  return (
    <div className="mt-14">
      <p className="font-mono text-xs font-medium text-content-accent">
        {step3.tableEyebrow.toUpperCase()}
      </p>
      <h3 className="mt-2 text-[26px] font-bold text-content-head">{step3.tableHeading}</h3>

      <div className="mt-5 overflow-hidden rounded-2xl border border-content-card-border bg-content-card-bg">
        <table className="hidden w-full sm:table">
          <caption className="sr-only">{step3.tableHeading}</caption>
          <tbody>
            {servicePricing.map((service) => (
              <tr className="border-b border-content-card-border last:border-0" key={service.slug}>
                <td className="p-4 pl-5">
                  <ServiceCircle service={service.slug} size={40} />
                </td>
                <td className="p-4 font-semibold text-content-head">{service.name}</td>
                <td className="p-4 text-content-secondary">{service.optionsLabel}</td>
                <td className="p-4 text-right whitespace-nowrap">
                  <span className="text-sm text-content-secondary">from </span>
                  <span className="text-xl font-bold text-content-head">
                    {formatPlanPrice(service.startingPrice)}
                  </span>
                  {service.startingPrice !== null && (
                    <span className="text-sm text-content-secondary"> {service.startingUnit}</span>
                  )}
                </td>
                <td className="p-4 pr-5 text-right">
                  <button
                    className="inline-flex min-h-11 items-center gap-1 font-semibold text-content-accent hover:underline"
                    onClick={() => onSeePlans(service.slug)}
                    type="button"
                  >
                    {step3.seePlansLabel} <span aria-hidden="true">→</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="flex flex-col divide-y divide-content-card-border sm:hidden">
          {servicePricing.map((service) => (
            <li className="flex flex-col gap-3 p-5" key={service.slug}>
              <div className="flex items-center gap-4">
                <ServiceCircle service={service.slug} size={40} />
                <div>
                  <p className="font-semibold text-content-head">{service.name}</p>
                  <p className="text-sm text-content-secondary">{service.optionsLabel}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>
                  <span className="text-sm text-content-secondary">from </span>
                  <span className="text-xl font-bold text-content-head">
                    {formatPlanPrice(service.startingPrice)}
                  </span>
                  {service.startingPrice !== null && (
                    <span className="text-sm text-content-secondary"> {service.startingUnit}</span>
                  )}
                </p>
                <button
                  className="inline-flex min-h-11 items-center gap-1 font-semibold text-content-accent hover:underline"
                  onClick={() => onSeePlans(service.slug)}
                  type="button"
                >
                  {step3.seePlansLabel} <span aria-hidden="true">→</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-sm text-content-secondary">{step3.priceFootnote}</p>
    </div>
  )
}
