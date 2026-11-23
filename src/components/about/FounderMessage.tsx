import { fontSignature } from '../../app/(frontend)/fonts'
import { founderMessage } from '../../content/about'
import { PlaceholderBox } from '../ui/PlaceholderBox'

// Message from the founder, section 3 of /about-us (docs/design/about-us/).
// bg-section-trust is the homepage's existing token (pixel-identical to
// this section's background, --z1 in the reference). The signature uses
// Instrument Serif (fonts.ts) -- the only place on the site this font
// loads, so its variable is applied right here rather than on <html>.
export function FounderMessage() {
  return (
    <section className="bg-section-trust py-[var(--section-y)]">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-[var(--section-x)] lg:grid-cols-[320px_1fr] lg:gap-[4.5rem]">
        <div>
          <PlaceholderBox className="h-[380px]" label={founderMessage.photoCaption} />
          <h3 className="mt-4 text-xl font-semibold text-content-head">{founderMessage.name}</h3>
          <p className="text-content-secondary">{founderMessage.title}</p>
        </div>

        <div>
          <p className="font-mono text-[13px] tracking-[0.06em] text-content-accent uppercase">
            {founderMessage.eyebrow}
          </p>
          <p className="mt-3.5 text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] leading-[1.35] font-medium tracking-[-0.015em] text-content-head">
            &ldquo;{founderMessage.quote}&rdquo;
          </p>
          <p className="mt-5 text-lg leading-relaxed text-content-body">
            {founderMessage.paragraph}
          </p>
          <p
            className={`${fontSignature.variable} mt-[26px] text-[34px] text-content-accent italic font-[family-name:var(--font-instrument-serif)]`}
          >
            {founderMessage.signature}
          </p>
        </div>
      </div>
    </section>
  )
}
