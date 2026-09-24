import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Keep the standalone admin route outside locale negotiation.
    '/((?!admin(?:/|$)|api|_next|_vercel|.*\\..*).*)',
  ],
}
