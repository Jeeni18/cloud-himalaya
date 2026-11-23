# Cloud Himalaya Website: Project Instructions

This file gives you the context, decisions, and rules for this project. Read it fully before doing any work, and follow it in every session.

## 1. The project

We are building a completely new public website with a content management system (CMS) for Cloud Himalaya Pvt. Ltd., a cloud hosting and data center company in Kathmandu, Nepal. This is a real production project for a real company. It will be handed over to the company and maintained by their staff after launch.

The goal is a maintainable, secure, accessible, performant, professional website, not just a visually attractive one.

## 2. Who you are working with, and how

I am a recent Computer Engineering graduate. I know programming fundamentals, React, Python, and databases, but this is my first production project. I need to understand and be able to maintain everything we build.

Work with me like a senior full-stack engineer mentoring a junior colleague:

- Work in small, logical phases. Never generate the whole application at once.
- Before each phase, explain briefly what we are about to do, why, and what result to expect. Then wait for my approval before writing code.
- After each phase, tell me how to verify it works (what command to run, what output or behaviour I should see), and stop. Do not continue to the next phase until I confirm.
- Explain unfamiliar concepts in plain language, briefly. No long textbook explanations.
- When giving commands, say where they run: Windows PowerShell, the VS Code terminal, or (later) an SSH session on the company's Ubuntu server.
- Before adding any dependency, tell me what it is and why we need it. Prefer fewer, well-maintained dependencies.
- If a requirement is unknown, say so and ask, or use a clearly marked placeholder. Never invent an answer.
- Distinguish clearly between confirmed requirements, your assumptions, and your recommendations.
- If you think a decision I made is wrong or risky, tell me directly and explain the trade-off. Do not just agree.
- If you are unsure about a library API or version, check the official documentation instead of guessing.

## 3. Development environment

- OS: Windows. Editor: VS Code. Browser: Chrome.
- PostgreSQL is installed locally; the port and configuration have not been verified yet.
- Production/staging: a company virtual machine, reached through the company VPN and SSH. Ubuntu Server is proposed but not confirmed. Do not run anything against company servers unless I explicitly ask, and never in the same step as local development.
- Repository: company Git hosting (GitHub or GitLab, to be confirmed). Private repository.

## 4. Technology stack

- **Next.js** (App Router) with **TypeScript** in strict mode
- **Payload CMS 3**, installed inside the Next.js app (one codebase: public site plus `/admin`)
- **PostgreSQL** via Payload's official Postgres adapter
- **Tailwind CSS** for styling

Rules:

- Use the current stable versions that are officially compatible with each other. Check Payload's official documentation for the supported Next.js and React versions before installing. Pin exact versions in `package.json`.
- Follow Payload's official project structure and setup (for example, its official templates or `create-payload-app`), and adapt it rather than inventing a custom structure.
- Use Payload's supported schema and migration workflow. Never create or modify Payload-managed tables manually. Use migrations for any non-local environment.
- Use one package manager consistently (recommend one at setup and explain why).

## 5. Requirements status

### Confirmed

- Completely new website and CMS; the old WordPress site must not dictate the design.
- Staff must be able to edit content through the CMS without code changes.
- Focus now: the public website and the CMS.
- WHMCS and OpenStack integration is **required before launch**, but work on it starts **after** the website and CMS are built. Its scope is not yet known.

### Pending (a requirements document has been sent to the company)

- Official service list, descriptions, plans, and pricing
- Brand assets (logo, colours, fonts), approved images
- Company profile, contact details, legal and policy texts
- Approved claims (certifications, uptime figures, client logos, statistics)
- Languages (English only, or English and Nepali)
- Which pages and CMS features are required (blog/news, case studies, careers)
- Server, domain, DNS, SSL, backup, and deployment arrangements
- Whether customer support tickets go through WHMCS

Until answers arrive, use clearly marked placeholder content. Never invent company facts, statistics, customer names or logos, testimonials, certifications, prices, or guarantees.

## 6. Integrations (WHMCS and OpenStack): not now

- Do not build any WHMCS or OpenStack integration until I say the scope is confirmed.
- Keep the architecture ready for it: any future integration code will live in its own server-side module behind a clear interface, never in UI components.
- Links such as "Client login" or "Order" must come from a CMS-editable setting (a global), so they can point to an external portal without code changes.
- Never expose integration credentials or admin APIs to the browser. Never connect directly to the WHMCS database; use its supported APIs only.

## 7. Design direction

The design is not yet approved by the company. Treat everything here as provisional, and build it so changes are cheap (design tokens and components, not hard-coded values).

### Overall feel

Premium, calm, technically credible, and distinctive. Bold but restrained. Strong typography, generous whitespace, intentional asymmetry. Every section should have its own composition rather than repeating one layout.

### Avoid (these make a site look generic or AI-generated)

- Gradients, glowing blobs, glassmorphism, floating 3D shapes, neon effects
- Rows of identical icon cards repeated section after section
- Badges or pill labels above headlines
- Stock photos of people pointing at screens
- Emoji anywhere in the interface
- Vague marketing copy ("empower your business with cutting-edge solutions")
- Everything centred, every section the same width

### Colour

One background, one text colour, one accent, used sparingly. Light and dark versions will both be shown to the company; implement colours as semantic tokens (CSS variables) so either can be chosen, or both supported, later.

| Token (semantic) | Light | Dark |
|---|---|---|
| Background | `#F4F7FC` | `#070B16` |
| Surface | `#FFFFFF` | `#0E1527` |
| Text primary | `#0B1530` | `#FFFFFF` |
| Text secondary | `#5A6683` | `#9AA6C4` |
| Accent (buttons, key highlights only) | `#2F6BFF` | `#2F6BFF` |

These values are provisional. Check all text and accent combinations for WCAG AA contrast.

### Typography

A distinctive display font for headlines (not Inter or a default system font), a clean body font, and a monospace font for small technical labels. Load fonts with `next/font`. Use a fixed type scale and a fixed spacing scale, defined once as tokens.

### Hero (homepage)

- Concept: "Infrastructure built at altitude."
- Layered Himalayan mountain ridgelines along the lower part of the hero: three layers, farther layers paler, each a flat colour with a hairline edge.
- Soft, slightly 3D-looking clouds (highlight on top, shadowed underside, rounded puffs with flatter bases) drifting very slowly between the mountain layers, with parallax (nearer clouds larger and slightly faster).
- Headline area on the left stays on clean, empty sky for readability.
- The final ridgeline will be traced from a real photo of the Himalayan skyline and supplied as an SVG. Until then, use a placeholder and make the ridgeline data easy to replace.
- Motion rules: very slow and calm; pause when the hero is off-screen or the tab is hidden; render a static version when `prefers-reduced-motion` is set; smooth on mid-range phones; no layout shift; must not block the main thread or hurt Largest Contentful Paint.

### Homepage scroll effect

- Full-screen stacked sections ("layered pinning"): each major homepage section pins, and the next one slides up over it.
- Homepage only. Inner pages stay calmer.
- Simplify on small screens if needed. Show a normal scrolling page with `prefers-reduced-motion`.
- Prefer CSS (`position: sticky`) where it achieves the effect; add a JavaScript animation library only if needed, and explain why first.

### Other ideas under consideration (not approved; do not build unless asked)

- A small live Kathmandu time label (UTC+05:45) as a design detail
- Monospace "spec-sheet" style labels for technical details
- The ridgeline returning faintly in the footer

## 8. Provisional sitemap

```
/                         Home
/services                 Services overview
/services/[slug]          Service detail pages (list pending from company)
/data-center              Data center
/about                    About
/contact                  Contact (enquiry form)
/legal/[slug]             Privacy, terms, and other policies (text from company)
Optional, pending:        FAQ, blog/news, careers
External links:           Client login, support portal (URLs pending)
Before launch:            Cloud servers / ordering (WHMCS/OpenStack, scope pending)
```

## 9. Proposed CMS content model

Build only what is needed; confirm with me before adding anything not listed.

- **Users**, with roles (at least Admin and Editor). Editors manage content; only Admins manage users and settings.
- **Media**, with restricted file types and sizes, and required alt text for images.
- **Fixed pages** (Home, About, Data Center, Contact): each is designed and built as its own Next.js route. Layout and design are not CMS-editable. Each page has a dedicated Global holding only its editable content (headlines, text, images, button labels and links, SEO fields). Editors (not only Admins) can edit this page content.
- **Services**, a collection. Each service uses one designed template at /services/[slug], so editors can add services without code changes.
- **Legal pages**, a collection. Each uses one designed template at /legal/[slug].
- **Globals:** Site settings (company name, contact details, social links, client portal and support URLs), Header navigation, Footer -- all three Admin-only -- plus the per-page content globals for Home, About, Data Center, and Contact, which Editors and Admins can both edit.
- **SEO fields** (title, description, social image) on every page-like document or global.
- Later, when confirmed: FAQs, Posts, contact-form submissions.

Access control: deny by default. Every collection and global must have explicit access rules. Public reads only return published content.

## 10. Code standards

Write code the way a senior engineer at a well-run company would, so that another developer can maintain it easily.

- **No emoji anywhere:** not in code, comments, log messages, commit messages, documentation, or UI text.
- TypeScript strict mode. No `any` unless unavoidable and explained. No `@ts-ignore`.
- Small, single-purpose, modular files and components. Clear names. No dead code, no commented-out code, no leftover debugging output.
- React Server Components by default. Use client components only where interactivity requires it, and keep them small.
- Semantic HTML and accessibility from the start: landmarks, heading order, labels, focus states, keyboard support, alt text.
- Styling through design tokens and Tailwind. No hard-coded colours, sizes, or spacing outside the token definitions.
- Comments explain *why*, not *what*. Keep them short and professional.
- Handle errors deliberately. Show safe, user-friendly messages; never leak stack traces or internal details.
- Configure ESLint, Prettier, and TypeScript checks, and keep them passing.
- Keep the folder structure consistent and explain it when we set it up.

## 11. Security requirements

- Never commit secrets. Secrets live only in `.env` files, which are git-ignored. Maintain `.env.example` with variable names and placeholder values only.
- Validate required environment variables at startup and fail clearly if they are missing.
- Never print secrets in logs, errors, or chat. Never ask me to paste real passwords, keys, or tokens into the conversation.
- Payload: strong secret, deny-by-default access control, restricted CORS/CSRF to known origins, protected admin, login rate limiting or lockout.
- Security headers: Content-Security-Policy, Strict-Transport-Security (in production), X-Content-Type-Options, Referrer-Policy, frame-ancestors / X-Frame-Options, Permissions-Policy.
- Validate all input on the server (forms, API routes). Rate-limit and spam-protect public forms.
- Never render unsanitised HTML. Avoid `dangerouslySetInnerHTML`; if ever unavoidable, sanitise and explain.
- Uploads: allow only approved file types and sizes.
- Database: least-privilege user, never exposed publicly.
- Keep dependencies updated; run an audit when adding packages and report any issues.
- Nothing from the old WordPress site (files, database, plugins) may be copied into this project. A suspicious hidden spam injection was found on the old site.

## 12. Performance and quality targets

- Lighthouse scores of 90 or above (performance, accessibility, best practices, SEO) on key pages.
- Core Web Vitals in the "good" range: LCP under 2.5 s, CLS under 0.1, INP under 200 ms.
- Responsive from 360 px wide phones to large desktops.
- WCAG 2.2 AA as the accessibility target.
- Images through `next/image`, correctly sized, with alt text.

## 13. Git workflow

- Never commit directly to `main`. Use a feature branch per piece of work.
- Small, focused commits with clear messages in Conventional Commits style (`feat: add hero section`, `fix: correct footer link`). No emoji.
- Never commit `.env` files, build output, or uploaded media.
- Do not push, force-push, rewrite history, or delete branches without asking me first.

## 14. Testing

- Type checking and linting on every change.
- Unit tests (Vitest) for logic such as utilities, validation, and access-control rules.
- End-to-end tests (Playwright) for key journeys once pages exist: navigation, contact form, CMS editing and publishing.
- Before saying a phase is done, run the checks and report the results honestly, including anything that failed.

## 15. Documentation

Keep documentation updated as we go, in a `docs/` folder plus `README.md`:

- `README.md`: overview, prerequisites, setup, commands
- `docs/requirements.md`, `docs/sitemap.md`, `docs/architecture.md`, `docs/cms.md`, `docs/integrations.md`, `docs/deployment.md`, `docs/testing.md`, `docs/handover.md`
- A decision log recording each confirmed decision with its date

Write documentation in plain, professional language. Update it when decisions change; never leave superseded assumptions presented as facts.

## 16. Things you must never do

- Invent company information, credentials, server addresses, DNS records, APIs, or requirements
- Build WHMCS/OpenStack features before the scope is confirmed
- Access or modify company servers or infrastructure without my explicit request
- Commit or display secrets
- Add emoji anywhere
- Skip ahead to the next phase without my confirmation
- Present untested code as working
- Drop tables, delete data, or run any other destructive database command without asking me first, even in local development
- Commit directly to `main`; always work on a feature branch
