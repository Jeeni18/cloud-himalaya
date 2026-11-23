# Cloud Himalaya — Landing Page v2: Build Spec for Claude Code

> Put this file in the repo at `docs/LANDING_PAGE_SPEC.md` and the logo files in `public/brand/`.
> Then give Claude Code the short prompt at the bottom of this file.

---

## 0. Context

- Project: new public website + CMS for **Cloud Himalaya Pvt. Ltd.** (cloud hosting & data center, Kathmandu, Nepal).
- Stack (already set up — do not change it): **Next.js App Router + TypeScript (strict) + Tailwind CSS + Payload CMS 3** (installed inside the Next.js app, admin at `/admin`) + PostgreSQL. Package manager: **pnpm**. Dev OS: Windows.
- This task: build the **homepage (`/`)** exactly as described below, with **light and dark mode**.
- Work in **two phases** (see §9). Phase 1 = pixel-faithful UI with typed static content. Phase 2 = move editable content into Payload.
- Before writing code: read `CLAUDE.md`, check the installed Next.js, Tailwind and Payload versions in `package.json`, and tell me your plan. Don't change the database schema or install packages beyond those listed in §8 without asking.

---

## 1. Brand assets (in `public/brand/`)

| File | Use |
|---|---|
| `logo-nav.png` | Horizontal logo (mark + "CLOUD HIMALAYA") for **light** mode header |
| `logo-nav-white.png` | Same logo, wordmark in white, for **dark** mode header and the footer (both modes) |
| `logo-mark.png` | Round "CH" mark alone (favicon / app icon source) |
| `logo-full.png` | Full stacked logo with tagline (for OG image, About page later) |

Use `next/image`. Header logo height **36px**, footer logo width **210px**. Alt text: `"Cloud Himalaya"`.

---

## 2. Design tokens

### 2.1 Implementation
- Define every colour as a **CSS variable** in `app/(frontend)/globals.css` (or wherever the frontend global CSS lives): light values on `:root`, dark values on `.dark`.
- Expose them to Tailwind as colour names (e.g. `bg-bg`, `text-head`, `border-line`). 
  - **Tailwind v4:** use `@theme inline { --color-bg: var(--bg); ... }` and `@custom-variant dark (&:where(.dark, .dark *));`
  - **Tailwind v3:** `darkMode: 'class'` in `tailwind.config.ts` and map `colors: { bg: 'var(--bg)', ... }`.
- Components should use the semantic names only — **never hard-code hex values in components**, except the few "fixed in both modes" items marked below.

### 2.2 Colour table

| Token | Light (A) | Dark (B) | Used for |
|---|---|---|---|
| `bg` | `#FFFFFF` | `#050F1F` | page background |
| `alt` | `#F2F7FC` | `#081830` | alternating section background |
| `surface` | `#FFFFFF` | `#0A1E3B` | cards, inputs, chips |
| `nav-bg` | `rgba(255,255,255,0.96)` | `rgba(5,15,31,0.96)` | sticky header |
| `line` | `#E3EAF3` | `#1D3A63` | borders/dividers |
| `line-strong` | `#C4D4E6` | `#2A4A75` | outline buttons, dashed placeholders |
| `text` | `#1A2B44` | `#D5E2F2` | body text |
| `head` | `#0B1F3A` | `#FFFFFF` | headings, strong text |
| `muted` | `#3A4D66` | `#B4C6DD` | paragraphs, nav links |
| `subtle` | `#4A5D75` | `#8EA6C4` | small labels, captions |
| `primary` | `#0954A6` | `#29A3DC` | primary buttons, links, accents |
| `on-primary` | `#FFFFFF` | `#04121F` | text on primary buttons |
| `accent` | `#0954A6` | `#5CC2F0` | eyebrow labels, highlighted heading text, numbers |
| `soft` | `#E6F2FB` | `#0F2A4D` | tinted chips, image placeholders |
| `announce` | `#063A75` | `#0954A6` | announcement bar bg |
| `announce-text` | `#DCEBFA` | `#FFFFFF` | announcement bar text |
| `hero-bg` | `#F2F7FC` | `#050F1F` | hero background |
| `ridge-1` | `#DCEAF7` | `#0A1E3B` | back mountain layer |
| `ridge-2` | `#FFFFFF` | `#050F1F` | front mountain layer (matches next section) |
| `snow` | `#FFFFFF` | `#1D3A63` | snow caps on two peaks |
| `rack-bg` | `#0B1F3A` | `#020A16` | hero server rack |
| `rack-border` | `#0B1F3A` | `#1D3A63` | |
| `led` | `#1E9E5A` | `#3DD68C` | "online" dots |
| `feature` | `#0954A6` | `#0A2142` | Colocation card + testimonial card bg |
| `feature-text` | `#FFFFFF` | `#FFFFFF` | |
| `feature-muted` | `#DCEBFA` | `#B4C6DD` | |
| `feature-accent` | `#FFFFFF` | `#5CC2F0` | |
| `feature-border` | `#5E93CC` | `#29A3DC` | pills / round buttons in feature cards |
| `band` | `#0B1F3A` | `#081830` | data-center section (dark in BOTH modes) |
| `band-surface` | `#0F2747` | `#0A1E3B` | spec cards in band |
| `band-border` | `#24456F` | `#1D3A63` | |
| `band-text` | `#FFFFFF` | `#FFFFFF` | |
| `band-muted` | `#C4D3E6` | `#B4C6DD` | |
| `band-accent` | `#7CC7EE` | `#5CC2F0` | numbers, active tab bg |
| `p1` | `#B3261E` | `#FF8A80` | SLA priority 1 label |
| `p2` | `#A15C00` | `#FFC266` | SLA priority 2 label |
| `footer-bg` | `#063A75` | `#030B17` | |
| `footer-text` | `#DCEBFA` | `#B4C6DD` | |
| `footer-line` | `#1E5596` | `#13284A` | |

Shadows (also variables):
- `--shadow-lg`: light `0 30px 70px rgba(9,84,166,0.22)` / dark `0 30px 70px rgba(0,0,0,0.55)` (hero rack)
- `--shadow-sm`: light `0 12px 32px rgba(9,84,166,0.10)` / dark `0 12px 32px rgba(0,0,0,0.35)` (floating chips, proof bar, diagram card)

**Fixed in both modes:** final CTA block bg `#0954A6`, its mountain `#0B60B8`, its text `#FFFFFF`, sub-text `#DCEBFA`, its white button text `#063A75`, its outline button border `#9CC7EE`. Inside the hero rack: unit rows `#0E2546` with border `#1D3A63`, unit labels `#6F8BAE`, header text `#8EA6C4`, "● ONLINE" `#6EE7A8`, blue LED `#29A3DC`, off LED `#1D3A63`.

### 2.3 Typography
- Load with `next/font/google`: **IBM Plex Sans** (400, 500, 600, 700) as the default sans, and **IBM Plex Mono** (400, 500, 600) as `font-mono`.
- Base: 17px, line-height 1.55.
- H1: 66px / 1.02, weight 700, letter-spacing −0.03em. On mobile scale down (≈40px under 640px; use `clamp()`).
- Section H2: 46px / 1.08, weight 700, letter-spacing −0.025em (≈32px on mobile).
- Card H3: 26px (Colocation: 34px), weight 700.
- **Eyebrow labels:** IBM Plex Mono, 14px, `accent` colour, numbered format `01 / SERVICES`.
- Mono is also used for: chip labels, rack labels, table headers, post tags, ASN/ISO line in footer.

### 2.4 Layout
- Content container: `max-width: 1280px`, horizontal padding 24px, centred.
- Section vertical padding: 96px (≈64px on mobile).
- Radii: buttons 8px, small cards 12px, cards 16–18px, CTA block 24px, pills 999px.
- All buttons and links that act like buttons: **min height 44px** (primary hero buttons 54px).
- Grids use `repeat(auto-fit, minmax(Xpx, 1fr))` so they collapse naturally on phones.

---

## 3. Theme switching (light / dark)

- Install **`next-themes`**. Wrap the frontend layout in `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>`.
- Add `suppressHydrationWarning` on `<html>`.
- Header button: 44×44, 8px radius, `surface` bg, `line` border. Shows a **moon** icon in light mode, **sun** icon in dark mode. `aria-label` = "Switch to dark mode" / "Switch to light mode".
- Avoid hydration mismatch: render the icon only after mount (`useEffect` mounted flag), with a same-size placeholder before mount.
- Logo swaps between `logo-nav.png` and `logo-nav-white.png` by theme. Prefer rendering both and hiding one with `dark:hidden` / `hidden dark:block` to avoid flashing.

---

## 4. Page structure — sections in order

Every section's **copy is exact** — use it as written. Text in `[BRACKETS]` is a placeholder for content the client hasn't supplied yet; render it as-is for now.

### 4.1 Announcement bar
- Full-width link, `announce` bg, `announce-text`, 14px, centred, padding 10px 24px.
- Content: mono bold `NEW` + `[Latest announcement pulled from Insights]` + bold `Read more →`.
- Phase 2: shows the latest Insights post flagged as "announcement"; hidden if none.

### 4.2 Header (sticky)
- `position: sticky; top: 0; z-index: 10`, `nav-bg` background, bottom border `line`.
- Row, wraps on small screens, gap 14px 28px, padding 16px 24px:
  1. Logo (links to `/`).
  2. Nav links, 15px/500, `muted` (current page `head` + 600): **Home** `/`, **About Us** `/about`, **Services ▾** `/services`, **Insights** `/insights`, **Careers** `/careers`, **Contact Us** `/contact`.
  3. Actions: theme toggle · **Client Login ↗** (outline: `line-strong` border, `head` text, 600; **external link**, URL from site settings, opens in a new tab with `rel="noopener noreferrer"`) · **Get a quote** (filled `primary` / `on-primary`, 700) → `/contact?type=quote`.
- **Mobile (<1024px):** collapse nav links into a hamburger menu (accessible: `<button aria-expanded>`, focus trap optional, Esc closes). Keep logo, theme toggle and the menu button visible.
- "Services ▾" can be a simple link in Phase 1; a dropdown listing the 5 services is optional.

### 4.3 Hero
- Background `hero-bg`, `overflow: hidden`, `position: relative`.
- **Mountain SVG** absolutely positioned at the bottom, full width, height 360px, `preserveAspectRatio="none"`, `aria-hidden`. ViewBox `0 0 1440 360`. Paths:
  - back ridge (`ridge-1`): `M0 360 L0 210 L140 150 L250 196 L400 80 L520 170 L640 120 L780 30 L900 140 L1010 92 L1140 170 L1270 96 L1440 150 L1440 360 Z`
  - front ridge (`ridge-2`): `M0 360 L0 260 L170 214 L330 262 L500 180 L650 246 L820 170 L980 240 L1120 196 L1290 256 L1440 214 L1440 360 Z`
  - snow caps (`snow`): `M780 30 L740 74 L762 70 L780 52 L800 72 L822 76 Z` and `M400 80 L372 112 L390 108 L402 96 L416 110 L430 112 Z`
- Content row (wraps): padding 80px 24px 150px, gap 56px, centred vertically.
- **Left column** (flex 1.1, basis 520px):
  - Pill: `surface` bg, `line` border, 999px radius, 14px `muted`. Inside, a mono 12px chip `ISO 27001` (`soft` bg, `accent` text), then `Kathmandu's data center since 2013`.
  - H1, two lines: `You run the business.` / `We keep your data running.` (second line in `accent`).
  - Paragraph 20px `muted`, max-width 580px: `Colocation, VPS and managed infrastructure from a self-owned, seismic-safe data center in Kathmandu, backed up to a disaster recovery site in Itahari and watched by engineers 24×7.`
  - Buttons: **Find the right service →** (primary, 54px) → `/services`; **Book a data center tour** (outline, `surface` bg) → `/contact?type=tour`.
  - Small line 15px `subtle`: green `led` dot + `NOC on call now:` + bold `head` `+977-9801249898` (make it a `tel:` link).
- **Right column — server rack illustration** (flex 1, basis 440px, `position: relative`, padding 24px 0). Build it in HTML/CSS (not an image):
  - Rack card: max-width 400px, centred, `rack-bg`, 1px `rack-border`, 16px radius, padding 18px, `--shadow-lg`.
  - Header row, mono 12px: `KTM-DC1 · RACK A07` (left, `#8EA6C4`) and `● ONLINE` (right, `#6EE7A8`).
  - 9 unit rows `U01`–`U09`: each 38px tall, 6px gap, 6px radius, `#0E2546` bg, `#1D3A63` border, padding 0 12px. Contents: mono 11px label (`#6F8BAE`, width 26px) · a 6px-tall "vent" bar filling the space (`repeating-linear-gradient(90deg, #1D3A63 0 6px, transparent 6px 10px)`) · two 7px round LEDs. LED 1 is always `led`; LED 2 is `#29A3DC` except U03, U06 and U09, which are `#1D3A63`.
  - Optional nice touch: a slow random "blink" on a few blue LEDs (CSS animation), disabled under `prefers-reduced-motion`.
  - **Three floating chips** (absolute, `surface` bg, `line` border, 12px radius, `--shadow-sm`, padding 14px 18px):
    1. top-left (left 0, top 64px): mono 12px `subtle` `UPTIME COMMITMENT` + 28px/700 `head` `99.995%`
    2. right (right 0, top 46%): `REPLICATED TO` + 20px/700 `Itahari DR site`
    3. bottom-left (left 6%, bottom 0): filled `primary` / `on-primary`, 15px/600 `40 Gbps redundant fiber`
  - On phones, keep the chips inside the column (they may overlap the rack edges — that's intended); hide chip 2 below 400px if it collides.

### 4.4 Proof bar (overlaps hero)
- Container with `margin-top: -64px`, `position: relative` (sits over the bottom of the hero).
- One card: `surface`, `line` border, 16px radius, `--shadow-sm`, grid `auto-fit minmax(220px,1fr)`, cells separated by right borders.
- 4 cells, padding 26px 28px. Number 34px/700 `accent`, label 15px `muted`:
  - `2013` — `in operation since`
  - `500+` — `clients served`
  - `1.5 MW` — `backup power, 25–30 days fuel`
  - `24×7` — `dedicated NOC team`

### 4.5 Client logos
- Padding 56px 24px 24px. Centred mono 13px `subtle`, letter-spacing 0.08em: `TRUSTED BY BANKS, FINTECH, MEDIA, SCHOOLS AND SOFTWARE TEAMS`.
- Grid `auto-fit minmax(140px,1fr)`, gap 14px: 6 boxes, 60px tall, 1px dashed `line-strong`, 8px radius, text `Client logo` in `subtle`. (Phase 2: real logos from Payload, shown greyscale and turning colour on hover.)

### 4.6 Services — "01 / SERVICES" (bento grid)
- Header row (wraps, space-between, align end): eyebrow `01 / SERVICES`, H2 `Pick your layer of the stack`; on the right a paragraph (max 440px, `muted`): `Bring your own hardware, rent ours, or hand us the whole thing. Every service runs on the same redundant facility.`
- Grid `auto-fit minmax(230px,1fr)`, gap 18px. Every card is a link to `/services/[slug]`.
- **Card 1: Colocation** — spans the **full row** (`grid-column: 1 / -1`), `feature` bg, `feature-text`, 18px radius, padding 34px.
  - Top row: mono 13px `MOST REQUESTED` (`feature-accent`) · mono 13px `quote-based` (`feature-muted`).
  - H3 34px `Colocation`.
  - `feature-muted`, max 560px: `House your servers in our Kathmandu facility with redundant power, cooling and connectivity. Lower CAPEX, and OPEX that scales with your projects.`
  - 4 pills (1px `feature-border`, 999px, 6px 14px, 14px): `A few units` · `Half rack` · `Full / multiple racks` · `Private cage`.
  - Bottom link 700 `feature-accent`: `Request a colocation quote →`.
- **Cards 2–5** — `surface`, 1px `line`, 18px radius, padding 30px, column flex with gap 12px:
  - Mono 13px `accent` label, H3 26px `head`, `muted` description, and a footer pushed to the bottom (`margin-top: auto`).
  - **VPS** / `Virtual Private Servers` / `Dedicated resources that scale up or down, with on-demand backups to our DR site.` / footer: top border `line`, `from` (14px `subtle`) … `[PRICE]` 24px/700 `head` + ` /mo` 14px `subtle`.
  - **MANAGED** / `Managed Services` / `Value Host hardware, data protection with 1, 3 or 7-year retention, and expert database management.` / footer: mono 12px chips (`soft` bg, `accent` text, 6px radius, 4px 8px): `MySQL` `MSSQL` `Oracle` `PostgreSQL` `DB2` `Sybase`.
  - **WEB** / `Web Hosting` / `Reliable hosting for sites and apps, from basic plans to larger deployments, hosted in Nepal.` / price footer `[PRICE] /mo`.
  - **EMAIL** / `Email Hosting` / `Professional, secure email on your own domain.` / price footer `[PRICE] /user/mo`.
- **Card 6: help card** — `alt` bg, 1px **dashed** `line-strong`, links to `/contact`: H3 24px `Not sure what you need?` / `Describe your workload and an engineer will recommend a setup within one business day.` / 700 `accent` `Talk to an engineer →`. *(The "one business day" promise is unconfirmed — keep it, but list it in the open-questions file.)*

### 4.7 Resilience — "02 / RESILIENCE"
- Section bg `alt`, top and bottom border `line`. Row wraps, gap 56px, centred.
- **Left** (basis 400px): eyebrow; H2 `Two sites. One promise: your data survives the worst day.`; paragraph `muted`: `Our primary site is self-owned, so there's no lease to expire and no forced move. The building came through the 7.8 Mw earthquake of 2015. A second site in Itahari covers point, rolling, site and geo-level disasters.`
  - 2×2 grid of mini cards (`surface`, `line`, 12px radius, padding 18px; title 700 `head`, sub 15px `muted`): `Self-owned site` / `No lease or relocation risk` · `Seismic-safe` / `Proven in 2015` · `Geo-separated DR` / `Itahari, Sunsari` · `ISO 27001` / `Certified security`.
- **Right** (flex 1.1, basis 460px): diagram card (`surface`, `line`, 18px radius, padding 28px, `--shadow-sm`).
  - Header row mono 12px `subtle`: `NETWORK · SCHEMATIC` … `not to scale`.
  - Inline SVG, viewBox `0 0 520 300`, width 100%, `role="img"` with `aria-label="Diagram: Kathmandu primary data center replicating to Itahari disaster recovery site, with a corporate office in New York"`. Use `currentColor`/CSS variables for fills so it themes:
    - ground: `M0 250 L70 200 L120 226 L190 150 L240 196 L300 120 L360 182 L420 140 L520 210 L520 300 L0 300 Z` fill `ridge-1`
    - main link: `M150 150 C 260 90, 330 90, 420 150` stroke `primary` 3px; second dashed link `M150 158 C 260 110, 330 110, 420 158` stroke `primary` 1.5px dash `4 6`
    - NY link: `M150 150 L 60 60` stroke `subtle` 1.5px dash `3 6`
    - Kathmandu node: circle r26 `soft` + r11 `primary` at (150,154); Itahari node: r22 `soft` + r9 `accent` at (420,154); NY: r7 `subtle` at (60,60)
    - Labels: `Kathmandu` (16px 700 `head`, centred at 150,208) + mono 12px `PRIMARY · THAPATHALI` (150,228); `Itahari` (420,208) + `DISASTER RECOVERY` (420,228); mono 12px `muted` `replication + backups` centred at (285,86); mono 12px `subtle` `NEW YORK OFFICE` at (76,44).
    - Optional: animate a small dot travelling along the main link (respect `prefers-reduced-motion`).

### 4.8 Inside the data center — "03 / INSIDE THE DATA CENTER" (interactive tabs)
- Section bg `band`, text `band-text` (dark in both modes).
- Header row: eyebrow (`band-accent`) `03 / INSIDE THE DATA CENTER`, H2 `Every critical system has a twin`; right: link 700 `band-accent` `Full facility specifications →` → `/services/data-center`.
- **Tabs** (client component, accessible tablist: `role="tablist"` / `role="tab"` with `aria-selected` / `role="tabpanel"`, arrow-key navigation): pills 44px tall, padding 0 20px, 999px radius, 15px/600. Active = `band-accent` bg + `#04121F` text; inactive = transparent, `band-text`, 1px `band-border`. Default tab: **Power**.
- Below: row (wraps, gap 20px):
  - Left (basis 380px, min-height 300px): photo placeholder, 1px dashed `band-border`, 16px radius, mono 14px `band-muted`: `[ photo: <tab photo> — client to supply ]`. Phase 2: real image per tab from Payload.
  - Right (flex 1.4, basis 520px): grid `auto-fit minmax(220px,1fr)` gap 14px of 3 spec cards (`band-surface`, 1px `band-border`, 14px radius, padding 26px): big value 34px/700 `band-accent`, label `band-muted`.
- Tab data:

| Tab | Photo | Spec 1 | Spec 2 | Spec 3 |
|---|---|---|---|---|
| Power | generator room | **1.5 MW** — diesel generators running in sync mode | **30 min** — redundant UPS battery backup | **25–30 days** — fuel stored for a complete outage |
| Network | meet-me room / fiber | **40 Gbps** — redundant fiber, internet and intranet | **Ring** — fiber ring across Kathmandu | **Tagged** — color-coded cabling, patch panels in a database |
| Cooling | hot / cold aisle | **Hot / cold** — aisle containment design | **PAC** — redundant precision air conditioning | **5 kW** — power per rack, customizable |
| Security | entrance and CCTV | **24×7** — guards, perimeter wall and surveillance | **360°** — CCTV, recordings kept 3 months | **FM-200** — fire suppression on smoke threshold |
| Building | building exterior | **Owned** — self-owned site, no lease risk | **2015** — came through the 7.8 Mw earthquake | **DR** — second site in Itahari, Sunsari |

### 4.9 Getting started — "04 / GETTING STARTED"
- H2 `Live in three steps`. Grid `auto-fit minmax(280px,1fr)` gap 18px. Each step: 3px top border `primary`, padding-top 22px, mono 600 `accent` label, H3 24px `head`, `muted` text.
  - `STEP 1` · `Tell us your workload` · `Share what you run, how much it needs and your compliance needs, by form, phone or a visit.`
  - `STEP 2` · `Get a design and quote` · `Our engineers size the setup, from rack space to backups, and send a clear quote.`
  - `STEP 3` · `Go live, monitored 24×7` · `We provision, migrate with you, and our NOC watches it from day one.`
- *(This process is a proposal — add it to the open-questions list.)*

### 4.10 SLA + testimonial (side by side)
- Row (wraps, gap 20px), padding-bottom 96px.
- **SLA card** (flex 1.3, basis 540px): `surface`, `line`, 18px radius, padding 32px. Title row: H2 28px `Response times we commit to` … link `accent` 600 15px `Read the SLA →` → `/legal/sla`. Table inside an `overflow-x: auto` wrapper (min-width 440px), header mono 12px `subtle` (`PRIORITY`, `RESPONSE`, `RESOLUTION`), rows separated by `line` top borders, cells padding 14px 0, response column `head` 600:

| Priority | Response | Resolution |
|---|---|---|
| **P1** (`p1`) Service down | 1 hr | 1 hr |
| **P2** (`p2`) Degraded | 2 hr | 4 hr |
| **P3** (`accent`) Maintenance | 4 hr | 12–48 hr |
| **P4** (`subtle`) Service change | 12–24 hr | 7 days |

- **Testimonial card** (flex 1, basis 380px): `feature` bg, `feature-text`, 18px radius, padding 36px, column with gap 18px. A quote-mark SVG (36×28, fill `feature-accent`, path `M0 28V16C0 7 5 1 14 0v6c-4 1-6 4-6 8h6v14zm20 0V16c0-9 5-15 14-16v6c-4 1-6 4-6 8h6v14z`); quote 28px/600: `Everything is good and the team is amazing.`; author pushed to bottom: `Shree Niraula` (700) / `Sizyo Solutions` (`feature-muted`). Two round 44px prev/next buttons (1px `feature-border`, transparent) with `aria-label`s. Make it a working carousel (client component) over the testimonials list; respect reduced motion; no auto-advance.

### 4.11 FAQ — "05 / FAQ" (accordion)
- Section bg `alt`, top/bottom border `line`. Row wraps, gap 48px.
- Left (basis 320px): eyebrow, H2 `Questions, answered`, `muted`: `Can't find yours? Email info@cloudhimalaya.com or call +977-01-5351669.` (email/phone in `head` bold, as `mailto:` / `tel:` links).
- Right (flex 1.6, basis 560px): items with a 10px gap; each is a `surface` card, 1px `line`, 12px radius. Use a `<button aria-expanded aria-controls>` (min-height 60px, padding 16px 22px, 600 `head`, left-aligned) with a mono 20px `accent` `+` / `−` on the right. The answer is a `muted` paragraph, padding 0 22px 20px. **One open at a time**; the first is open by default.

| Question | Answer |
|---|---|
| What sets your colocation apart? | Your servers sit in a self-owned, seismic-safe facility with end-to-end redundancy in power, cooling and connectivity, backed by SLAs and a 24×7 NOC. |
| How do you keep services available 24×7? | Redundant generators, UPS, precision cooling and a 40 Gbps fiber ring, plus a dedicated NOC team and an incident process with root-cause analysis. |
| How is bandwidth priced? | We offer flexible pricing for both internet and intranet bandwidth. Tell us your needs and we will quote. |
| Can I scale my VPS up or down? | Yes. VPS resources can be scaled as your needs change. |
| How do you handle backup and disaster recovery? | On-demand backups, copies kept at multiple sites, and a disaster recovery site in Itahari. Retention options of 1, 3 or 7 years are available. |

- Also output **FAQPage JSON-LD** for these.

### 4.12 Insights — "06 / INSIGHTS"
- Header row: eyebrow + H2 `News, guides & notices` … link 700 `accent` `All insights →` → `/insights`.
- Grid `auto-fit minmax(300px,1fr)` gap 22px, 3 cards. Each: link to `/insights/[slug]`, `surface`, `line`, 16px radius, overflow hidden. Image area 180px (`soft` bg placeholder, mono 13px `subtle` `[ cover image ]`), body padding 22px: mono 12px `accent` `ANNOUNCEMENT · [DATE]` / `GUIDE · [DATE]` / `MAINTENANCE · [DATE]`, H3 21px `[Post title from the CMS]`, 15px `subtle` `[Excerpt, about two lines, from the post's summary field]`.
- Phase 2: latest 3 published posts from Payload; hide the section if there are none.

### 4.13 Final CTA
- Container padding 0 24px 96px. Block: `#0954A6`, white, 24px radius, padding 64px 56px, overflow hidden, relative.
- Mountain SVG at the bottom (height 140px, `preserveAspectRatio="none"`, viewBox `0 0 1200 200`, fill `#0B60B8`): `M0 200 L0 130 L150 80 L260 120 L420 30 L560 110 L700 60 L860 130 L1000 70 L1200 120 L1200 200 Z`.
- Content row (wraps, space-between): H2 44px `Talk to an engineer, not a call center.` + 18px `#DCEBFA` `Sales +977-9802300610 · NOC +977-9801249898`; buttons **Request a quote** (white bg, `#063A75` text) → `/contact?type=quote` and **We're hiring →** (outline `#9CC7EE`) → `/careers`.

### 4.14 Footer
- `footer-bg`, `footer-text`, 15px. Grid `auto-fit minmax(200px,1fr)`, gap 36px, padding 64px 24px 28px:
  1. White logo (210px) / `Data Management Above & Beyond` / mono 12px `ISO 27001 · ASN 135337`
  2. **Services**: Colocation, VPS, Managed Services, Web Hosting, Email Hosting
  3. **Company**: About Us, Insights, Careers, Contact Us, Client Login ↗ (external)
  4. **Kathmandu**: `4th Floor, Central Business Park, Thapathali` / `+977-01-5351669` / `info@cloudhimalaya.com`
  5. **Other offices**: `DR: Rai Shopping Complex, Itahari, Sunsari` / `US: 11 Broadway 454, New York, NY 10004`
  - Column headings in `#FFFFFF`, 600.
- Bottom bar: top border `footer-line`, padding 20px 24px 32px, 14px, wraps: `© {current year} Cloud Himalaya Pvt. Ltd.` … links `Privacy Policy` `/legal/privacy`, `Terms of Service` `/legal/terms`, `SLA` `/legal/sla`, `Acceptable Use` `/legal/aup`.

---

## 5. Components and files (suggested)

```
src/app/(frontend)/page.tsx                 ← homepage, server component, composes sections
src/app/(frontend)/layout.tsx               ← fonts, ThemeProvider, Header, Footer
src/components/layout/Header.tsx            ← server; MobileMenu + ThemeToggle are client
src/components/layout/MobileMenu.tsx        'use client'
src/components/layout/ThemeToggle.tsx       'use client'
src/components/layout/Footer.tsx
src/components/layout/AnnouncementBar.tsx
src/components/home/Hero.tsx
src/components/home/ServerRack.tsx
src/components/home/ProofBar.tsx
src/components/home/ClientLogos.tsx
src/components/home/ServicesBento.tsx
src/components/home/Resilience.tsx          ← includes NetworkDiagram
src/components/home/FacilityTabs.tsx        'use client'
src/components/home/GettingStarted.tsx
src/components/home/SlaTable.tsx
src/components/home/TestimonialCarousel.tsx 'use client'
src/components/home/Faq.tsx                 'use client'
src/components/home/InsightsPreview.tsx
src/components/home/FinalCta.tsx
src/components/ui/Button.tsx                ← variants: primary | outline | white | ghost-outline; sizes md (44) | lg (54)
src/components/ui/Eyebrow.tsx               ← "01 / SERVICES"
src/components/ui/SectionHeading.tsx
src/content/home.ts                         ← Phase 1 typed static content (all copy above)
```

Keep the existing Payload folder structure; if `src/app/(frontend)` is named differently in this project, follow the project's convention.

Rules:
- Server components by default; `'use client'` only where listed.
- All copy lives in `src/content/home.ts` with TypeScript types that mirror the future Payload fields, so Phase 2 only changes where the data comes from.
- No `any`. Strict TypeScript must pass.

---

## 6. Responsive behaviour

Check at **375, 768, 1024, 1280, 1440px**:
- Everything stacks to one column on phones; no horizontal scrolling (except the SLA table's own scroll box).
- Header: hamburger below 1024px.
- H1/H2 use `clamp()` so they scale down smoothly.
- Hero: text column first, rack below; reduce bottom padding so the proof bar overlap still looks right.
- Proof bar: 2×2 on tablet, 1 column on small phones; remove right borders that end a row (or use `gap` with a `line`-coloured background instead of borders).
- Bento: Colocation always full width; the other 5 cards flow 5 → 3 → 2 → 1 columns.

---

## 7. Accessibility and quality

- Real `<a href>` for navigation and `<button>` for actions; visible focus ring (2px `primary`, 2px offset) on everything focusable.
- Colour contrast ≥ 4.5:1 for body text in both themes (the token pairs above were chosen to pass — don't swap them).
- Decorative SVGs `aria-hidden="true"`; the network diagram has `role="img"` + `aria-label`.
- Tabs, accordion and carousel follow WAI-ARIA patterns with keyboard support.
- Respect `prefers-reduced-motion` for all animation.
- Metadata: title `Cloud Himalaya — Data Center, Colocation & Cloud Hosting in Nepal`, a matching description, Open Graph image from `logo-full.png` for now, plus `Organization` JSON-LD (name, logo, phones, email, addresses).
- Lighthouse target: ≥ 90 for Performance, Accessibility, Best Practices and SEO on desktop.

---

## 8. Allowed new packages

- `next-themes` (theme switching)
- `lucide-react` (optional, for icons: Sun, Moon, Menu, X, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight)

Ask before adding anything else.

---

## 9. Phases

### Phase 1 — UI (do this first, then stop and show me)
1. Tokens + fonts + ThemeProvider + ThemeToggle.
2. Header (with mobile menu) and Footer.
3. Homepage sections in order, using `src/content/home.ts`.
4. Responsive + accessibility pass.
5. Run `pnpm lint`, `pnpm tsc --noEmit` (or the project's typecheck script) and `pnpm build`; fix all errors.
6. Give me a summary and a checklist of what to look at in the browser in both themes.

### Phase 2 — CMS (only after I approve Phase 1)
Propose the Payload schema first and wait for approval. Expected shape:
- **Global `site-settings`:** phones (main, sales, NOC), email, addresses (Kathmandu, corporate, Itahari DR, US), client-login URL, social links, ASN, ISO line.
- **Global `homepage`:** hero copy and buttons, proof-bar stats, services-section intro, resilience copy and mini-cards, facility tabs (label, image, 3 specs each), getting-started steps, final-CTA copy. Use Payload `blocks` only if it's clearly worth it; otherwise plain fields/arrays.
- **Collection `services`:** title, slug, label, short description, starting price (optional), price unit, featured flag, pills/chips, order.
- **Collection `testimonials`:** quote, name, company, title, permission-confirmed checkbox (only show if checked), order.
- **Collection `faqs`:** question, answer, order, show on homepage.
- **Collection `client-logos`:** name, logo (upload), permission-confirmed, order.
- **Insights** posts: title, slug, category (Announcement / Guide / News / Maintenance), excerpt, cover, published date, `isAnnouncement` flag.
- Seed script that loads the Phase 1 content into Payload so the page looks identical after switching.

---

## 10. Open questions — also create `docs/OPEN_QUESTIONS.md` with these

1. Prices for VPS, Web Hosting and Email Hosting (currently `[PRICE]`).
2. Is "an engineer will recommend a setup within one business day" a promise they can keep?
3. Do they offer data-center tours ("Book a data center tour")?
4. Is the three-step "getting started" process accurate?
5. Is 99.995% measured uptime or a target? 500+ or 2000+ clients?
6. ISO 27001 version (2013 or 2022); Tier-4 certification body (do not use "Tier-4" anywhere until confirmed).
7. Permission for the Shree Niraula testimonial and for client logos.
8. Approved photos for the facility tabs (generator room, fiber room, aisles, entrance/CCTV, building).
9. Client Login portal URL.

---

## Prompt to give Claude Code

Paste this into Claude Code after adding this file and the logos to the repo:

```
Read docs/LANDING_PAGE_SPEC.md and CLAUDE.md fully before doing anything.

Build Phase 1 of the spec: the Cloud Himalaya homepage with light and dark mode, matching the spec exactly — same tokens, fonts, copy, section order, layout and interactions. Logo files are in public/brand/.

First, check the installed Next.js, Tailwind and Payload versions and the existing folder structure, then give me a short plan (files you will create or change, packages you will add) and wait for my OK.

After I approve: build it step by step in the order in §9, run lint, typecheck and build, and fix every error. Don't start Phase 2 (Payload schema) until I ask. If anything in the spec conflicts with the existing code or is unclear, ask me instead of guessing. Explain what you did in plain language, because this is my first professional project.
```
