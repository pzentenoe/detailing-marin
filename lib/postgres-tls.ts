import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ConnectionOptions } from 'node:tls'

export function postgresTlsOptions(): Pick<ConnectionOptions, 'ca' | 'rejectUnauthorized'> {
  return {
    ca: readFileSync(join(process.cwd(), 'certs/postgres-root-ca.crt'), 'utf8'),
    rejectUnauthorized: true,
  }
}
