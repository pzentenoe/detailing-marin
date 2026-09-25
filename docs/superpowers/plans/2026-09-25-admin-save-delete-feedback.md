# Admin Save and Delete Feedback Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give service-editor users clear inline save feedback and a styled, accessible delete confirmation dialog.

**Architecture:** Extend the existing `useActionState` response so successful saves return the saved service ID instead of redirecting. Keep the editor mounted, show a status message until the next edit, and update the new-service URL after its first save. Replace `window.confirm` with a native modal `<dialog>` and keep delete authorization/mutation in the existing Server Action.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, native HTML dialog, Server Actions.

---

## Files

- Modify `app/admin/servicios/actions.ts`: add success/service ID to `ServiceFormState`; return it after a successful create or update; redirect after deletion with a one-time toast marker.
- Modify `components/admin/AdminServiceForm.tsx`: show inline success feedback and hide it after a draft edit; adopt the returned ID and update the URL for newly created services; preview the selected icon; replace the delete prompt with a styled native dialog and pending button.
- Modify `app/admin/servicios/page.tsx`: mount the delete-status toast on the service list.
- Create `components/admin/AdminToast.tsx`: accessible dismissible status toast that removes the query marker on dismissal.

## Chunk 1: Save feedback

### Task 1: Return a successful save result

**Files:**
- Modify: `app/admin/servicios/actions.ts`

- [x] Add optional `success` and `serviceId` fields to `ServiceFormState`.
- [x] After Directus save, price synchronization, and `updateTag`, return `{ success: true, serviceId: savedId }` instead of redirecting.
- [x] Preserve every existing validation, authorization, and error return path.

### Task 2: Show and clear inline success feedback

**Files:**
- Modify: `components/admin/AdminServiceForm.tsx`

- [x] Track a draft revision and capture it on submit; increment it for text/select edits, price-row add/remove/edit, and image upload/removal.
- [x] On each successful action result, show success only if the submitted revision is still current; always set `draft.id` from `state.serviceId` without overwriting any newer edits.
- [x] For a newly created service, replace `/admin/servicios/nuevo` in browser history with `/admin/servicios/{id}` without remounting the form.
- [x] Render a Spanish inline `role="status"` success message only when the latest result succeeded and the draft has not changed since.
- [x] Render the chosen icon beside the icon selector with an accessible preview label.

## Chunk 2: Delete confirmation

### Task 3: Replace browser confirm with native modal

**Files:**
- Modify: `components/admin/AdminServiceForm.tsx`

- [x] Replace the plain delete text control with a prominent destructive button and trash icon.
- [x] Open a native `<dialog>` with an accessible title and description naming the service and warning that its vehicle-price rows will also be deleted.
- [x] Provide Cancel and Delete actions; support Escape and backdrop dismissal, restore focus to the trigger, and prevent dismissal while pending.
- [x] Use `useFormStatus` for a disabled `Eliminando…` submit state; keep the existing delete Server Action and post-delete redirect.

### Task 4: Show delete success toast

**Files:**
- Modify: `app/admin/servicios/actions.ts`
- Modify: `app/admin/servicios/page.tsx`
- Create: `components/admin/AdminToast.tsx`

- [x] Redirect to `/admin/servicios?deleted={serviceId}` only after all price rows and the service are deleted successfully.
- [x] Mount the toast client component on the services page; validate the positive deleted ID and pass it as a unique toast key.
- [x] Keep the toast visible until dismissed; remove the URL marker on dismissal so consumed notices do not repeat after refresh.

## Verification

- [x] `pnpm exec eslint app/admin/servicios/actions.ts app/admin/servicios/page.tsx components/admin/AdminServiceForm.tsx components/admin/AdminToast.tsx` passed (only the existing stale Browserslist data warning).
- [x] `pnpm exec tsc --noEmit` and `pnpm run build` passed.
- [x] Playwright verified selected-icon preview updates, dialog opening and Escape/focus restoration, toast appearance using a synthetic success URL, and toast dismissal/query cleanup.
- [ ] Do not run save/delete Server Actions against the configured live Directus data during this UI check; run these end-to-end against a disposable or staging Directus dataset.
