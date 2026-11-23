// "Get notices first" card, part of the feed sidebar (docs/design/
// insights/). Fixed #092B50 navy in both themes, same "fixed in both
// modes" exception as the homepage blueprint/rack and the visitor pass.
// A real subscribe link to the newsletter band further down the page,
// not its own form -- the task only asks for one subscribe form on this
// page, and this card's own copy ("maintenance notices only") describes
// a narrower scope than the newsletter band's, so it's presented as a
// shortcut into that form rather than a second, separate subscription.
export function GetNoticesCard() {
  return (
    <div className="rounded-2xl border border-[#092B50] bg-[#092B50] p-[22px]">
      <p className="font-mono text-xs text-[#55A4E0]">RSS · EMAIL</p>
      <h3 className="mt-2 font-bold text-white">Get notices first</h3>
      <p className="mt-1.5 text-sm text-[#D8EAF8]">Subscribe to maintenance notices only.</p>
      <a
        className="mt-3.5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#55A4E0] px-4 text-[15px] font-semibold text-[#092B50] hover:opacity-90"
        href="#subscribe"
      >
        Subscribe
      </a>
    </div>
  )
}
