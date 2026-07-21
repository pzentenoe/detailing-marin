# Napkin Runbook

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)
1. **[2026-07-21] Check local Next.js documentation before code changes.**
   Do instead: read the relevant guide in `node_modules/next/dist/docs/` and honor its deprecations.

## Project Conventions
1. **[2026-07-21] Preserve locale-aware routing.**
   Do instead: use `@/i18n/navigation` for new internal navigation under `app/[locale]`.
2. **[2026-07-21] Keep server boundaries explicit.**
   Do instead: default to Server Components and use `'use client'` only for browser APIs, state, or event handlers.
