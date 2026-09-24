import 'server-only'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is not configured')

  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      max: 1,
      ssl: {
        ca: readFileSync(join(process.cwd(), 'certs/supabase-root-ca.crt'), 'utf8'),
        rejectUnauthorized: true,
      },
    }),
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
