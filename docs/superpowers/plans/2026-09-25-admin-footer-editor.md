# Admin Footer Editor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let administrators edit the bilingual footer in Directus, preview unsaved changes with the public footer component, and publish changes to the site immediately after saving.

**Architecture:** Add a validated footer content model and Directus read/write helpers around one `site_footer` configuration item. Keep public data loading in a server module and extract a reusable presentation component so the client editor can preview its current draft without duplicating the public markup. Protect the admin route with the existing session check and invalidate a dedicated Next.js cache tag after writes.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Zod 4, next-intl, Directus REST API, Tailwind CSS 4, pnpm.

---

## Chunk 1: Footer data contract and Directus access

### File Map

- Create `lib/footer-content.ts` — footer model, Zod validation, locale projection, and static fallback data.
- Create `lib/footer-data.ts` — public read using `DIRECTUS_TOKEN`, Next.js cache configuration, and fallback behavior.
- Modify `lib/directus-admin.ts` — add admin read/update functions beside the existing server-side Directus access helpers.
- Create `lib/footer-content.test.ts` — focused `node:assert` checks for valid payloads, invalid URLs/targets, locale selection, and fallback behavior.
- Modify `package.json` — add a narrow `test:footer` script using the already installed `tsx` runner only if needed to execute the focused check.

### Directus Item Contract

Create an ordinary `site_footer` collection with one item. Use Directus `String` fields for scalar content and `JSON` fields for ordered navigation/social arrays. Directus uses its default item ID as the primary key. The admin screen exposes friendly controls; administrators do not edit raw JSON.

Scalar content fields:

- `brand_name`, `eco_stat`, `phone_display`, `phone_href`, `email`
- `tagline_es`, `tagline_en`, `eco_label_es`, `eco_label_en`
- `navigation_title_es`, `navigation_title_en`
- `contact_title_es`, `contact_title_en`, `zone_es`, `zone_en`, `hours_es`, `hours_en`
- `social_title_es`, `social_title_en`
- `privacy_label_es`, `privacy_label_en`, `terms_label_es`, `terms_label_en`
- `copyright_es`, `copyright_en` (copy without the year; append the current year in the presentation)
- `navigation_links` JSON rows: `{ target, label_es, label_en }`, where target is one of `home`, `services`, `coverage`, `contact`
- `social_links` JSON rows: `{ platform, label_es, label_en, url }`, where platform is `instagram`, `facebook`, or `link`

Access setup: grant the role used by `DIRECTUS_TOKEN` read-only access to the `site_footer` item and grant the role used by `DIRECTUS_ADMIN_TOKEN` read/update access to the same collection and fields. Do not grant public create/update/delete. Seed exactly one item from the existing footer defaults. The implementation must verify the collection, field contract, permissions, and item in the intended Directus environment before claiming end-to-end completion.

The admin screen must show a setup error if the collection or initial item is missing. Do not create records on page load. Never send either token to a Client Component.

### Task 1: Define and verify the footer content contract

**Files:** Create `lib/footer-content.ts`, `lib/footer-content.test.ts`; modify `package.json` only if a focused script is necessary.

- [ ] **Step 1: Add contract checks for the fallback, localized copy, navigation targets, social URLs, and malformed payloads.**

  Use `node:assert/strict` and `tsx`; avoid adding a test framework.

- [ ] **Step 2: Run the focused checks and confirm they fail for the missing contract.**

  Run: `pnpm exec tsx --test lib/footer-content.test.ts`
  Expected: FAIL because the footer contract module does not yet exist.

- [ ] **Step 3: Add the typed model, Zod schema, locale projection, and current-content fallback.**

  Keep navigation targets constrained to the four existing routes from `navHrefs`; validate external social URLs as HTTP(S); validate phone/email before persistence. Preserve existing public strings and values as fallback data.

- [ ] **Step 4: Run the focused checks and type check.**

  Run: `pnpm exec tsx --test lib/footer-content.test.ts`
  Expected: PASS.

  Run: `pnpm exec tsc --noEmit`
  Expected: PASS.

### Task 2: Add public and authenticated Directus access

**Files:** Create `lib/footer-data.ts`; modify `lib/directus-admin.ts`.

- [ ] **Step 1: Read the installed Next.js guides before writing route/cache code.**

  Read `node_modules/next/dist/docs/01-app/02-guides/server-actions.md`, `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/cacheTag.md`, `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidateTag.md`, and `node_modules/next/dist/docs/01-app/01-getting-started/09-revalidating.md`. Follow the installed Next.js 16.3.6 semantics, not remembered older APIs.

- [ ] **Step 2: Add the public reader in `lib/footer-data.ts` using the existing public read token and dedicated `directus-footer` cache tag.**

  Normalize/validate API data at the boundary. Return the static fallback when Directus is unavailable or the response is invalid. Do not use the admin token for public reads.

- [ ] **Step 3: Add admin read and update helpers beside the existing helpers in `lib/directus-admin.ts`.**

  Require the existing configuration item; return a distinct missing-item result rather than silently inserting another record.

- [ ] **Step 4: Verify token boundaries and endpoint behavior against the installed project patterns.**

  Run: `pnpm exec eslint lib/directus-admin.ts lib/footer-data.ts lib/footer-content.ts`
  Expected: PASS.

  Run: `pnpm exec tsc --noEmit`
  Expected: PASS; confirm `DIRECTUS_ADMIN_TOKEN` is only referenced in server-only modules.

## Chunk 2: Shared public footer and data-driven rendering

### File Map

- Create `components/layout/FooterView.tsx` — presentation-only footer shared by public rendering and the admin preview. It must be client-compatible (no server-only imports); keep it usable as a Server Component publicly and inside the client editor preview.
- Modify `components/layout/Footer.tsx` — load Directus data and locale, then render `FooterView`.
- Modify `messages/es.json` and `messages/en.json` only for non-editable accessibility copy still needed by the footer.
- Modify `lib/footer-content.ts` if view-projection types need to be separated from the Directus storage shape.

### Task 3: Extract the shared presentation and connect public pages

**Files:** Create `components/layout/FooterView.tsx`; modify `components/layout/Footer.tsx` and localized messages if required.

- [ ] **Step 1: Extract the current footer markup into `FooterView` with serializable `content` and `locale` props.**

  Preserve the existing responsive layout, logo, classes, accessible landmarks, internal localized links, social SVGs, and legal destinations. Resolve navigation route keys through the existing next-intl navigation component. Keep the presentation independent of Directus, `next/headers`, server actions, and server-only modules so it is safe to import from the Client Component editor.

- [ ] **Step 2: Replace static reads in the public `Footer` server component with the public reader.**

  Select the appropriate Spanish/English values and pass them into `FooterView`. Keep the current static content as a validated fallback when Directus is unavailable.

- [ ] **Step 3: Verify both locales and accessibility labels.**

  Run: `pnpm exec eslint components/layout/Footer.tsx components/layout/FooterView.tsx lib/footer-content.ts lib/footer-data.ts`
  Expected: PASS.

  Run: `pnpm exec tsc --noEmit`
  Expected: PASS.

  Manually verify `/es` and `/en` render the same footer content/layout as before when Directus has not yet been provisioned.

## Chunk 3: Admin editor, preview, and save flow

### File Map

- Create `app/admin/footer/page.tsx` — session gate, server-side load, setup/error state, and editor mount.
- Create `app/admin/footer/actions.ts` — authenticated, validated Server Action and cache invalidation.
- Create `components/admin/AdminFooterEditor.tsx` — bilingual fields, repeatable links, live preview, save/error feedback.
- Create `components/admin/AdminHeader.tsx` — shared authenticated navigation/logout header.
- Modify `app/admin/servicios/layout.tsx` — reuse the shared header and link to the footer editor.
- Create `app/admin/footer/layout.tsx` — reuse the shared header for the footer route.
- Modify `lib/directus-admin.ts` — write the validated contract to the existing item.

### Task 4: Implement the authenticated save action

**Files:** Create `app/admin/footer/actions.ts`; modify `lib/directus-admin.ts`.

- [ ] **Step 1: Add a Server Action that checks `getAdminSession()` before processing form data.**

  Parse all scalar and list fields with the shared Zod schema. Keep URL, email, and phone validation at this trust boundary. Return field/form errors without clearing the submitted draft.

- [ ] **Step 2: Update the existing `site_footer` item with the admin token.**

  Do not create a missing item implicitly. Convert Directus/API failure into a stable user-facing error.

- [ ] **Step 3: Invalidate `directus-footer` only after a successful Directus update and return success feedback.**

  Use the API supported by Next.js 16.3.6, as documented in Task 2; preserve the existing admin service feedback pattern.

- [ ] **Step 4: Run focused checks.**

  Run: `pnpm exec eslint app/admin/footer/actions.ts lib/directus-admin.ts lib/footer-content.ts`
  Expected: PASS.

  Run: `pnpm exec tsc --noEmit`
  Expected: PASS.

### Task 5: Build the editor with an exact live preview

**Files:** Create `components/admin/AdminFooterEditor.tsx` and `app/admin/footer/page.tsx`.

- [ ] **Step 1: Load the existing footer item on the server behind `getAdminSession()`.**

  Redirect unauthenticated users to `/admin`. Render an actionable setup message if the collection/item is missing; render a retryable error if Directus cannot be reached.

- [ ] **Step 2: Build grouped bilingual inputs and repeatable navigation/social rows.**

  Include all editable visible content. Navigation targets use the existing route choices; social URLs support HTTP(S). Legal labels are editable but privacy/terms hrefs stay internal and fixed. Phone/email are shared across locales.

- [ ] **Step 3: Render the shared `FooterView` from current form state.**

  Preview every field and list edit before saving. Keep the preview below the form on narrow screens and adjacent on wide screens. Preserve draft state during pending writes and errors.

- [ ] **Step 4: Connect the existing save-feedback pattern and prevent duplicate submits while pending.**

  Display an inline success message only for the submitted draft revision; show validation or Directus errors without discarding inputs.

- [ ] **Step 5: Verify form/preview interactions locally.**

  Verify changing localized copy, phone/email, navigation rows, and social rows updates the preview before submit; verify invalid external URLs prevent save; verify pending/error UI retains all draft values.

## Chunk 4: Admin navigation and end-to-end verification

### Task 6: Add the footer editor to authenticated admin navigation

**Files:** Create `components/admin/AdminHeader.tsx`; modify `app/admin/servicios/layout.tsx`; create `app/admin/footer/layout.tsx`.

- [ ] **Step 1: Extract the existing shared admin header/navigation/logout into `AdminHeader`.**

  Keep the current services link and logout behavior; add a `Pie de página` link to `/admin/footer`.

- [ ] **Step 2: Use `AdminHeader` in the service editor and new footer route without changing the login screen.**

- [ ] **Step 3: Verify navigation and authentication boundaries.**

  Verify both admin links are visible when authenticated, logout still works, `/admin/footer` redirects without a session, and the login route remains unchanged.

### Task 7: Provision Directus and run final checks

**Files:** No repository files; the exact collection field types and role permissions are specified in the Directus Item Contract above.

- [ ] **Step 1: Confirm the `site_footer` collection fields and one configuration item exist in the intended Directus environment.**

  Grant read access to the public token and read/update access to the admin token. Never print token values. If schema setup is not available to the implementation environment, stop and provide the exact collection/field setup required before claiming the feature is fully live.

- [ ] **Step 2: Verify the full bilingual public/admin path against a safe local or staging Directus instance.**

  Save a harmless staging edit in Spanish and English; verify public pages reflect it immediately after tag invalidation; restore the original staging values after the check.

- [ ] **Step 3: Run all final local checks.**

  Run: `pnpm exec tsx --test lib/footer-content.test.ts`
  Expected: PASS.

  Run: `pnpm exec eslint app/admin/footer/actions.ts app/admin/footer/page.tsx app/admin/footer/layout.tsx app/admin/servicios/layout.tsx components/admin/AdminFooterEditor.tsx components/admin/AdminHeader.tsx components/layout/Footer.tsx components/layout/FooterView.tsx lib/directus-admin.ts lib/footer-content.ts lib/footer-data.ts`
  Expected: PASS.

  Run: `pnpm exec tsc --noEmit`
  Expected: PASS.

  Run: `pnpm run build`
  Expected: PASS.

- [ ] **Step 4: Inspect the final diff and commit the completed implementation.**

  Run `git diff --check`; stage only implementation files and the plan progress; use the repository's conventional commit style and do not add AI attribution.
