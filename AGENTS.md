<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project conventions

- Use pnpm. TypeScript is strict; use the `@/*` import alias.
- This is an App Router site. Keep components server-rendered unless browser APIs, state, or event handlers require `'use client'`.
- Locale routes live under `app/[locale]`. Preserve `next-intl` routing (`es` default, `en` prefixed); use `@/i18n/navigation` for locale-aware navigation.
- Keep shared layout, section, and UI components in `components/{layout,sections,ui}`; keep reusable site data and helpers in `lib/`.
- Use `next/image` for images. Preserve the configured remote-image allowlist in `next.config.ts`.
- Extend Tailwind 4 theme tokens and shared CSS utilities in `app/globals.css`; do not introduce a separate Tailwind config without a concrete need.
- Keep email/SMTP code server-only in route handlers. Never expose non-`NEXT_PUBLIC_` environment variables to client components.
