import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed', // /es routes are hidden; /en prefix is shown
})

export type Locale = (typeof routing.locales)[number]
