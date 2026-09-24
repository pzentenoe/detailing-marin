import 'server-only'

import { argon2id, hash, verify } from 'argon2'
import { createHash, randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const SESSION_COOKIE = 'dm_admin_session'
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000
const MAX_FAILED_ATTEMPTS = 5
const LOCK_DURATION_MS = 15 * 60 * 1000

let dummyPasswordHash: Promise<string> | undefined

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

async function getDummyPasswordHash() {
  dummyPasswordHash ??= hash(randomBytes(32).toString('hex'), { type: argon2id })
  return dummyPasswordHash
}

export async function authenticateAdmin(email: string, password: string) {
  const user = await prisma.adminUser.findUnique({ where: { email } })
  const now = new Date()

  if (user?.lockedUntil && user.lockedUntil > now) return null

  const validPassword = await verify(
    user?.passwordHash ?? await getDummyPasswordHash(),
    password,
  )

  if (!user || !validPassword) {
    if (user) {
      const updated = await prisma.adminUser.update({
        where: { id: user.id },
        data: { failedLoginAttempts: { increment: 1 } },
        select: { failedLoginAttempts: true },
      })

      if (updated.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lockedUntil: new Date(Date.now() + LOCK_DURATION_MS) },
        })
      }
    }

    return null
  }

  await prisma.adminUser.update({
    where: { id: user.id },
    data: { failedLoginAttempts: 0, lockedUntil: null },
  })

  return { id: user.id, email: user.email }
}

export async function createAdminSession(userId: string) {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)

  await prisma.adminSession.deleteMany({ where: { expiresAt: { lt: new Date() } } })
  await prisma.adminSession.create({
    data: { userId, tokenHash: hashToken(token), expiresAt },
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    expires: expiresAt,
  })
}

export async function getAdminSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null

  const session = await prisma.adminSession.findUnique({
    where: { tokenHash: hashToken(token) },
    select: {
      expiresAt: true,
      user: { select: { email: true } },
    },
  })

  if (!session || session.expiresAt <= new Date()) return null
  return { email: session.user.email }
}

export async function deleteAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (token && /^[A-Za-z0-9_-]{43}$/.test(token)) {
    await prisma.adminSession.deleteMany({ where: { tokenHash: hashToken(token) } })
  }

  cookieStore.delete(SESSION_COOKIE)
}
