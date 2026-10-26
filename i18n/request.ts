import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'
import { getHomepageContent } from '@/lib/homepage-content'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  const messages = (await import(`../messages/${locale}.json`)).default
  const homepage = await getHomepageContent(locale === 'en' ? 'en' : 'es')

  return {
    locale,
    messages: { ...messages, ...homepage },
  }
})
