# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # start dev server (Turbopack)
pnpm build        # production build — do NOT run after changes per project rules
pnpm lint         # ESLint (eslint.config.mjs, Next.js preset)
npx tsc --noEmit  # typecheck — no typecheck script in package.json, use this directly
```

> **Pre-existing lint errors exist** in files outside the SEO/contact scope. Validate only the files you touch — `eslint path/to/file.tsx` — rather than running a global lint.

Icon scripts (rarely needed):
```bash
pnpm icons:generate   # regenerates PWA icons from source SVG
pnpm favicon:generate # regenerates favicon
```

## i18n

**Library**: `next-intl` 4.9.0 — `localePrefix: 'as-needed'` (Spanish at `/`, English at `/en/...`).

Key files:
- `i18n/routing.ts` — `defineRouting({ locales: ['es','en'], defaultLocale: 'es' })`
- `i18n/request.ts` — `getRequestConfig` loading `messages/{locale}.json`
- `i18n/navigation.ts` — locale-aware `Link`, `useRouter`, `usePathname` (use these instead of `next/link`)
- `middleware.ts` — next-intl middleware
- `messages/es.json` + `messages/en.json` — all UI strings
- `components/layout/LanguageSelector.tsx` — 🇨🇱/🇺🇸 flag dropdown

Pattern in server components: `const t = await getTranslations('namespace')`
Pattern in client components: `const t = useTranslations('namespace')`
`NextIntlClientProvider` in `app/[locale]/layout.tsx` feeds messages to client components.

`lib/services.ts` exports `servicesConfig` (non-translatable service metadata: id, slug, icon, price) and `featuresConfig` (non-translatable pillars) for use in i18n-aware components. The original `services` and `features` arrays remain for JSON-LD.

## Architecture

**Stack**: Next.js 16.2.1 App Router · React 19 · TypeScript 5 · Tailwind CSS 4 · TanStack Query 5 · Nodemailer

### Route structure

```
app/
  layout.tsx              # root layout: fonts (Manrope + Inter), ThemeProvider, QueryProvider, global JSON-LD
  globals.css             # design system tokens + dark mode overrides
  (marketing)/
    layout.tsx            # Navbar + Footer + WhatsAppFAB wrapping all marketing pages
    page.tsx              # /
    servicios/page.tsx    # /servicios
    contacto/page.tsx     # /contacto
    privacidad/page.tsx   # /privacidad
    terminos/page.tsx     # /terminos
  api/contact/route.ts    # POST handler — validates, rate-limits, sends SMTP email
  robots.ts               # Next.js robots metadata
  sitemap.ts              # Next.js sitemap metadata
  manifest.ts             # PWA manifest
```

### Data layer — single source of truth

`lib/services.ts` is the **only place** to edit service catalog, nav links, contact info, and features. All pages and components read from here. Do not hardcode business data elsewhere.

`lib/seo.ts` exports `SITE_URL`, `SITE_NAME`, `buildLocalBusinessJsonLd()`, and `buildServicesJsonLd()`. Page-level metadata must use these helpers for consistency.

`types/index.ts` — all shared TypeScript interfaces (`Service`, `NavLink`, `ContactInfo`, `ButtonVariant`, etc.).

### Component layout

```
components/
  layout/    # Navbar, Footer, WhatsAppFAB, ThemeProvider, QueryProvider
  sections/  # Page-level sections (HeroSection, ServicesGrid, ContactForm, …)
  ui/        # Primitives: Button, ServiceCard, Icon, DatePicker, SectionWrapper, EcoChip
```

### Design system

Tailwind CSS 4 `@theme` tokens live in `app/globals.css`. Dark mode is **class-based** — toggling `.dark` on `<html>` overrides the same CSS variables. Never use `dark:` Tailwind variants for colors that already have `.dark {}` overrides in globals.css.

Custom CSS utilities defined in globals.css (use these, don't recreate):
- `.glass` — glassmorphism with `--glass-bg` + `backdrop-filter`
- `.gradient-primary` / `.gradient-primary:hover`
- `.hydro-card` — glassmorphic mint tint for highlighted service cards
- `.shadow-ambient`, `.shadow-float`
- `.text-display-lg`, `.text-display-md`, `.text-headline-md`, `.text-label-md`, `.text-body-lg`

### Contact API

`app/api/contact/route.ts` — POST endpoint with in-memory rate limiting (3 req / 10 min per IP). Reads from environment variables:

| Var | Purpose |
|-----|---------|
| `SMTP_HOST` | SMTP server (default: `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_USER` | Auth user / sender address |
| `SMTP_PASS` | Auth password |
| `CONTACT_EMAIL` | Recipient (falls back to `SMTP_USER`) |

### SEO

Every page exports a `generateMetadata()` using `lib/seo.ts` helpers. The root layout injects `AutomotiveBusiness` JSON-LD; `/servicios` injects `ItemList` JSON-LD via `buildServicesJsonLd()`.
