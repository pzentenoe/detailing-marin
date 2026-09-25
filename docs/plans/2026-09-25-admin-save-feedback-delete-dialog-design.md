# Admin Save Feedback and Delete Confirmation

## Problem

Service updates succeed without visible success feedback. Deletion relies on the browser's plain `confirm()` dialog and an unstyled text button.

## Design

- Return a successful result from the existing Server Action instead of redirecting after save. Keep the form mounted, show an inline `role="status"` message, and clear it as soon as the user edits again.
- When a new service is created, return its ID, update the form draft with that ID, and replace the current URL with the edit route so later saves update the same service.
- Replace the plain delete control with a clearly destructive button that opens a native `<dialog>`. Explain that the service and its vehicle-price rows will be deleted; provide Cancel and Delete actions, close on Escape/backdrop, restore focus to the trigger, and show a pending label while deletion runs.
- Preserve server-side authorization, validation, Directus mutations, cache invalidation, and the post-delete redirect.

## Verification

- Run focused ESLint, TypeScript, and the production build.
- Check save success/error states, create-then-edit URL behavior, dialog cancellation by button/Escape/backdrop, pending delete state, and successful delete navigation.
