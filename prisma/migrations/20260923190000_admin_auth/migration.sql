-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "admin";

REVOKE ALL ON SCHEMA "admin" FROM PUBLIC, anon, authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA "admin"
  REVOKE ALL ON TABLES FROM PUBLIC, anon, authenticated;

-- CreateTable
CREATE TABLE "admin"."admin_user" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin"."admin_session" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" CHAR(64) NOT NULL,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_email_key" ON "admin"."admin_user"("email");
CREATE UNIQUE INDEX "admin_session_tokenHash_key" ON "admin"."admin_session"("tokenHash");
CREATE INDEX "admin_session_userId_idx" ON "admin"."admin_session"("userId");
CREATE INDEX "admin_session_expiresAt_idx" ON "admin"."admin_session"("expiresAt");

-- AddForeignKey
ALTER TABLE "admin"."admin_session"
  ADD CONSTRAINT "admin_session_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "admin"."admin_user"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "admin"."admin_user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "admin"."admin_session" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA "admin" FROM PUBLIC, anon, authenticated;
