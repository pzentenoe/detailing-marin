import { argon2id, hash } from 'argon2'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const adminEmails = ['pzentenoe@gmail.com', 'marin.mac.lean@gmail.com']

async function main() {
  const connectionString = process.env.DATABASE_URL
  const password = process.env.ADMIN_SEED_PASSWORD
  if (!connectionString || !password) {
    throw new Error('DATABASE_URL and ADMIN_SEED_PASSWORD must be configured')
  }

  const accounts = await Promise.all(
    adminEmails.map(async (email) => ({
      email,
      passwordHash: await hash(password, { type: argon2id }),
    })),
  )
  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      max: 1,
      ssl: {
        ca: readFileSync(join(process.cwd(), 'certs/supabase-root-ca.crt'), 'utf8'),
        rejectUnauthorized: true,
      },
    }),
  })

  try {
    await prisma.$transaction(async (transaction) => {
      const userIds: string[] = []
      for (const account of accounts) {
        const user = await transaction.adminUser.upsert({
          where: { email: account.email },
          create: account,
          update: {
            passwordHash: account.passwordHash,
            failedLoginAttempts: 0,
            lockedUntil: null,
          },
          select: { id: true },
        })
        userIds.push(user.id)
      }

      await transaction.adminSession.deleteMany({
        where: { userId: { in: userIds } },
      })
    })
    console.log(`Seeded ${adminEmails.length} administrator accounts.`)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((error: unknown) => {
  console.error('Administrator seed failed')
  if (process.env.NODE_ENV !== 'production') console.error(error)
  process.exitCode = 1
})
