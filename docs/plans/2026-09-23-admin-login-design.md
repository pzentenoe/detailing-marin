# Private Admin Login Design

## Goal

Provide a private `/admin` login for exactly two administrators as the secure foundation for a future Directus-backed visual CMS. This first slice authenticates administrators only; it does not add service or image editing controls.

## Approved Approach

- Use Prisma with the existing Supabase PostgreSQL database.
- Use Supabase's transaction pooler for `DATABASE_URL` at serverless runtime and the direct PostgreSQL endpoint for `DIRECT_URL` migrations/seeding.
- Pin pnpm to stable `12.6.0` and upgrade dependencies to stable releases within their current compatible major versions; keep Prisma on stable `7.10.0` rather than the available Prisma 8 RC.
- Keep administrator tables in a dedicated, non-Data-API `admin` schema and enable row-level security as defense in depth.
- Verify PostgreSQL TLS with Supabase's `Supabase Root 2021 CA`; the checked-in root certificate fingerprint was matched against the live database certificate chain. Keep it in the Next.js `/admin` deployment trace.
- Store password hashes generated with Argon2id, never plaintext passwords.
- Store server-side sessions in PostgreSQL. Send only a random opaque token in an `HttpOnly`, `SameSite=Lax` cookie scoped to `/admin`; store its SHA-256 digest in the database.
- Provision the two allowlisted email accounts with an idempotent Prisma seed. The seed reads the shared initial password from `ADMIN_SEED_PASSWORD`, hashes it, updates both users when rerun, and invalidates their existing sessions. The secret remains in `.env.local`/deployment secrets and is not committed.
- Protect `/admin` in its Server Component and every Server Action. Exclude the standalone route from `next-intl` Proxy so it remains `/admin`; give it a separate root layout without public-site analytics or navigation and mark it `noindex`.
- Keep `DIRECTUS_ADMIN_TOKEN` separate from the public catalog's read-only `DIRECTUS_TOKEN`. Its policy can write only the two Detailing Marin collections and create/read files only in the dedicated media folder; both Directus app/admin access flags remain disabled.

## Alternatives Considered

1. **Supabase Auth** — managed password and session handling with less custom code, but does not meet the requested Prisma seed workflow.
2. **Prisma with a custom authentication flow** — provides the requested seed and database sessions with a small, fixed account model; requires careful server-side validation, session handling, and login throttling. Selected for this narrow, two-account scope.
3. **A general authentication framework plus Prisma** — can provide more built-in features, but adds account/bootstrap complexity that is not needed for this login-only first slice.

## Request Flow

1. `GET /admin` shows the login form unless a valid database-backed session exists.
2. The Server Action validates email/password input, applies a database-backed failure throttle, verifies the Argon2id hash, creates a random session token, stores only its digest and expiry, and sets the cookie.
3. Each protected server render/action resolves the cookie digest against a non-expired database session; logout deletes that row and expires the cookie.
4. Public signup does not exist. Only the two seeded account emails can authenticate.

## Security and Failure Behavior

- Generic invalid-credentials messages; no user-existence disclosure.
- Cookies are `HttpOnly`, `SameSite=Lax`, `Secure` in production, scoped to `/admin`, and expire with the database session.
- All session checks happen near protected server data/actions; Proxy is used only to preserve the route and is not an authorization boundary.
- Missing database/password configuration fails closed for login and seed operations without returning secrets to the browser.
- The database password and initial administrator password were supplied in chat; rotate them after initial setup, before production use.

## Verification

- Prisma schema validates and migration applies to Supabase.
- Seed creates/updates exactly two users with Argon2id hashes and invalidates prior sessions.
- Valid credentials grant `/admin`; invalid credentials do not; logout revokes access; anonymous requests see the login page.
- `pnpm lint` and `pnpm build` pass; verify the browser path is exactly `/admin` and its HTML is noindex.

## CMS Editor Phase

- `/admin/servicios` lists all services, including drafts and archived items, with status, sort order, featured state, and image preview.
- Create/edit screens provide Spanish and English fields, status/featured/order controls, cover and before/after image uploads, editable vehicle-price rows, and a live page-style preview.
- Delete removes a service and its associated price rows; replace/remove images only changes service references. Uploaded files stay in the dedicated folder rather than deleting potentially shared assets.
- Server Actions perform validated item writes; an authenticated Route Handler performs validated multipart uploads. All Directus requests use server-only tokens.
- Successful writes call `updateTag('directus-services')` so public pages show the saved version immediately.
