# Admin Footer Editor Design

## Goal

Add a private admin screen for editing the complete visible footer content, persist it in Directus, render the public footer from Directus by locale, and preview unsaved edits using the same presentation as the public site.

## Scope

Editable content includes branding, bilingual copy and section headings, eco badge text/value, contact details, navigation labels and destinations, social links, and legal link labels. The footer layout and the internal privacy/terms destinations remain code-defined. Spanish public copy remains neutral Spanish.

Out of scope: changing footer layout or theme, editing legal-page content, and building a general-purpose page builder.

## Recommended Approach

Use one ordinary Directus collection, `detailing_footer`, with one configuration item, following the existing `detailing_` collection prefix. Keep scalar content in explicit fields and navigation/social links in structured JSON fields. This matches the footer's fixed sections and avoids introducing multiple relational collections. The custom admin editor provides friendly repeatable controls for the structured lists; administrators do not edit raw JSON.

Alternatives considered:

- Separate related collections for each link/block: more flexible, but adds relation, ordering, and synchronization complexity without a current need.
- Keep content in translation files and expose only selected fields in the admin: simpler initially, but does not meet the requirement that all visible content come from Directus.

## Data Flow

1. `/admin/footer` requires the existing admin session and loads the single `detailing_footer` item through the server-only Directus admin integration.
2. The editor shows grouped bilingual fields and editable navigation/social rows. A live preview renders the shared footer presentation from current form state, including unsaved changes.
3. A validated Server Action writes the configuration item to Directus. On success it invalidates the `directus-footer` cache tag and returns clear save feedback; on failure it leaves the draft intact and shows an actionable error.
4. The public footer fetches the item using the existing public Directus read configuration and selects Spanish or English content from the active locale. The shared presentation component renders both the public footer and admin preview.
5. If public Directus data is unavailable or invalid, the site falls back to the existing footer content. The admin editor reports load/save failures rather than silently editing fallback data.

Directus credentials remain server-only. The public read token must have read access to `detailing_footer`; the admin token must have access to read and update the configuration item.

## Admin Experience

- Add a `Pie de página` entry to the existing admin navigation.
- Group fields by Branding, Navigation, Contact, Social, and Legal.
- Show paired Spanish/English fields where content is localized; phone, email, destinations, and social URLs are shared.
- Use add/remove row controls for navigation and social links, with order preserved.
- Keep the preview adjacent to the form on wide screens and below it on small screens. It uses the actual public footer component, not a second hand-built mock.
- Reuse the existing save-feedback pattern and preserve unsaved values when validation or Directus writes fail.

## Validation and Failure Handling

- Validate required text and locale fields, phone/email values, and HTTP(S) destinations for external links before writing.
- Keep privacy and terms hrefs fixed to their locale-aware internal routes; allow their visible labels to be edited.
- Validate and normalize Directus payloads at the public read boundary. Invalid/missing content uses the existing static footer as fallback.
- Handle missing configuration distinctly in admin so an administrator knows the Directus item must be initialized; do not create a second item implicitly on every load.

## Verification

- Verify Directus read/write helpers, authorization gates, schema/payload validation, and cache-tag invalidation.
- Verify Spanish and English public rendering from Directus data and fallback behavior when data is absent/unavailable.
- Verify preview updates as fields and repeatable rows change, without saving.
- Verify save success, invalid input feedback, and retention of the draft after a failed write.
- Run the focused lint/type checks and production build; verify the admin flow locally without modifying live content.
