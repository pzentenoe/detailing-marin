# Private Admin Login Implementation Plan

> **For agentic workers:** Use the plan as a checklist while implementing the approved design in this repository.

**Goal:** Add a private `/admin` login backed by two seeded administrator accounts and database sessions.

**Architecture:** Prisma connects server-side to Supabase PostgreSQL. A private `admin` schema stores users, sessions, and login throttles. Passwords use Argon2id; cookies contain random opaque tokens while PostgreSQL stores token digests. The route uses a separate Next.js root layout and bypasses locale middleware.

**Tech Stack:** pnpm 12.6.0, Next.js 16.3.6 App Router, TypeScript 5, Prisma 7.10.0, PostgreSQL, Argon2id, Zod 4, Tailwind CSS 4.

---

## Chunk 1: Database and administrator bootstrap

### Task 1: Add Prisma/PostgreSQL dependencies and configuration

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `prisma.config.ts`
- Create: `prisma/schema.prisma`
- Create: `prisma/migrations/<timestamp>_admin_auth/migration.sql`
- Create: `lib/prisma.ts`
- Create: `certs/supabase-root-ca.crt`
- Modify: `next.config.ts`

- [ ] Install pinned Prisma 7, PostgreSQL adapter/driver, dotenv, Argon2id, and TypeScript seed runner dependencies.
- [ ] Define `AdminUser`, `AdminSession`, and bounded login-throttle records in the private `admin` schema.
- [ ] Generate and inspect the initial SQL migration; enable RLS and revoke Supabase API-role access for the private tables.
- [ ] Create a server-only Prisma singleton using the Supabase transaction pooler via `DATABASE_URL`; configure Prisma CLI with direct `DIRECT_URL` and load local `.env.local` for seed/migration commands.
- [ ] Use the pinned Supabase root CA with full TLS verification; include the CA file in the `/admin` deployment trace.
- [ ] Validate Prisma schema and generated client.

### Task 2: Seed the two administrator accounts

**Files:**
- Create: `prisma/seed.ts`
- Modify: `prisma.config.ts`
- Modify: `.env.example`
- Modify: `.env.local` (ignored by Git; preserve existing Directus variables)

- [ ] Add the two approved emails as seed accounts; read the shared password only from `ADMIN_SEED_PASSWORD`.
- [ ] Hash passwords with Argon2id and upsert users; delete old sessions for those users whenever the seed runs.
- [ ] Add placeholder database and seed-secret entries to `.env.example`, without real credentials.
- [ ] Add actual local connection and seed values to `.env.local`, preserving mode `0600`; never print them.
- [ ] Apply the migration and run the seed against the supplied Supabase database; verify there are exactly two users and only password hashes are stored.

## Chunk 2: Session and login logic

### Task 3: Implement server-side authentication and actions

**Files:**
- Create: `lib/admin-auth.ts`
- Create: `app/admin/actions.ts`
- Modify: `prisma/schema.prisma`
- Modify: `prisma/migrations/<timestamp>_admin_auth/migration.sql`

- [ ] Validate login form input with Zod and normalize email.
- [ ] Verify Argon2id hashes and return one generic invalid-credentials result.
- [ ] Add a bounded database-backed throttle for failed attempts.
- [ ] Create a cryptographically random session token; persist only its SHA-256 digest and expiry; set secure `/admin` cookie attributes.
- [ ] Resolve session from the database in a server-only DAL; delete the DB session and cookie on logout.
- [ ] Recheck authorization inside every action; do not depend on route middleware alone.

## Chunk 3: `/admin` route and login UI

### Task 4: Add a standalone, private admin route

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/page.tsx`
- Create: `components/admin/AdminLoginForm.tsx`
- Modify: `proxy.ts`

- [ ] Exclude `/admin` and its descendants from the `next-intl` Proxy matcher while preserving all existing locale routing.
- [ ] Create a separate root layout without public-site analytics/navigation and set admin metadata to `noindex`.
- [ ] Render a responsive, accessible email/password form with pending/error states.
- [ ] Redirect authenticated users to the minimal private admin landing state; provide logout.
- [ ] Keep all Directus write operations and editor controls out of this slice.

## Chunk 4: Directus visual service editor

### Task 5: Add a least-privilege Directus writer and service data access

**Files:**
- Create: `lib/directus-admin.ts`
- Modify: `.env.example`
- Modify: `.env.local` (ignored by Git)
- Create: `app/admin/api/files/route.ts`
- Create: `app/admin/assets/[id]/route.ts`

- [ ] Provision a distinct Directus API identity with app/admin access disabled; grant CRUD only on `detailing_services` and `detailing_service_prices` and file create/read scoped to the Detailing Marin media folder.
- [ ] Add `DIRECTUS_ADMIN_TOKEN` and `DIRECTUS_MEDIA_FOLDER_ID` to local/example environment files; retain the read-only token for reads.
- [ ] Add server-only services/prices DTO queries with `no-store` and normalized file IDs.
- [ ] Add an authenticated image proxy restricted to assets referenced by services or contained in the private media folder.
- [ ] Add an authenticated upload Route Handler with same-origin validation, image MIME/extension/size checks, and forced folder assignment.

### Task 6: Add the service list, editor form, and Directus mutations

**Files:**
- Create: `app/admin/servicios/page.tsx`
- Create: `app/admin/servicios/nuevo/page.tsx`
- Create: `app/admin/servicios/[id]/page.tsx`
- Create: `app/admin/servicios/actions.ts`
- Create: `components/admin/AdminServiceForm.tsx`
- Modify: `app/admin/page.tsx`

- [ ] Redirect authenticated `/admin` sessions to the service list.
- [ ] Show all services, including non-published items, with preview, status, sort, and featured information.
- [ ] Provide bilingual fields, valid icon choices, status/featured/order controls, cover/before images, dynamic pricing rows, and a live site-style preview.
- [ ] Validate all mutations; create/update services and reconcile price rows using the writer token; delete price rows before deleting a service.
- [ ] Update the public `directus-services` cache tag immediately after successful saves/deletes.

## Chunk 5: Verification

### Task 7: Verify login and editor operations

**Files:**
- Test: focused checks for hash verification, session expiration, throttle, and proxy matching (use the repository's available runner or a minimal Node test).

- [ ] Verify seed idempotence and password changes by changing `ADMIN_SEED_PASSWORD` locally and rerunning seed; do not print either password.
- [ ] Verify both admin accounts, anonymous access, logout, and that session cookies are not readable by client JavaScript.
- [ ] Verify service create/update/delete, price reconciliation, image upload, folder scoping, and public cache refresh.
- [ ] Verify `/admin` remains unlocalized and is excluded from indexing/analytics.
- [ ] Run `pnpm lint` and `pnpm build`.
- [ ] Reindex changed source files in codebase-memory-mcp and confirm no secrets were staged.
