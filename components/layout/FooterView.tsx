import Image from 'next/image'
import NextLink from 'next/link'
import { getPathname } from '@/i18n/navigation'
import { EcoChip } from '@/components/ui/EcoChip'
import type { Locale } from '@/i18n/routing'
import type { FooterViewContent } from '@/lib/footer-content'

const NAVIGATION_HREFS = {
  home: '/',
  services: '/servicios',
  coverage: '/cobertura',
  contact: '/contacto',
} as const

const LEGAL_HREFS = {
  privacy: '/privacidad',
  terms: '/terminos',
} as const

/**
 * Builds a locale-aware href without relying on the ambient next-intl context.
 *
 * `getPathname` is a pure helper, so it works in the admin route tree, where no
 * `NextIntlClientProvider` is mounted. The prefix rules stay owned by next-intl
 * through `i18n/routing.ts` (`localePrefix: 'as-needed'`), matching the links
 * rendered by the public footer.
 */
function localizedHref(href: string, locale: Locale): string {
  return getPathname({ href, locale })
}

function SocialIcon({ platform }: { platform: FooterViewContent['socialLinks'][number]['platform'] }) {
  if (platform === 'instagram') {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
  }
  if (platform === 'facebook') {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  }
  return <span aria-hidden="true" className="text-lg leading-none">↗</span>
}

export function FooterView({ content, locale }: { content: FooterViewContent; locale: Locale }) {
  const legalLabel = locale === 'es' ? 'Navegación legal' : 'Legal navigation'
  const footerNavLabel = locale === 'es' ? 'Enlaces del pie de página' : 'Footer links'

  return (
    <footer className="border-t border-outline-variant/20 bg-surface-container-low" role="contentinfo" aria-label={locale === 'es' ? 'Pie de página' : 'Footer'}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-5 md:col-span-1">
            <NextLink href={localizedHref('/', locale)} className="flex w-fit items-center gap-3" aria-label={content.brandName}>
              <Image src="/icon/logo-removebg.png" alt={content.brandName} width={56} height={40} className="object-contain drop-shadow-md" />
              <span className="font-display text-lg font-bold tracking-tight text-(--color-on-surface)">{content.brandName}</span>
            </NextLink>
            <p className="text-body-lg max-w-xs text-sm text-on-surface-variant">{content.tagline}</p>
            <div><EcoChip stat={content.ecoStat} label={content.ecoLabel} /></div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">{content.navigationTitle}</h2>
              <nav aria-label={footerNavLabel}>
              <ul className="flex flex-col gap-3">
                {content.navigationLinks.map((item, index) => <li key={`${item.target}-${index}`}>
                  <NextLink href={localizedHref(NAVIGATION_HREFS[item.target], locale)} className="text-sm text-on-surface-variant transition-colors hover:text-primary">{item.label}</NextLink>
                </li>)}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">{content.contactTitle}</h2>
            <address className="flex flex-col gap-3 not-italic">
                <a href={`tel:${content.phoneHref.replace(/[\s().-]/g, '')}`} className="text-sm text-on-surface-variant transition-colors hover:text-primary">📞 {content.phoneDisplay}</a>
              <a href={`mailto:${content.email}`} className="text-sm text-on-surface-variant transition-colors hover:text-primary">✉️ {content.email}</a>
              <p className="text-sm text-on-surface-variant">📍 {content.zone}</p>
              <p className="text-sm text-on-surface-variant">🕐 {content.hours}</p>
            </address>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">{content.socialTitle}</h2>
            <ul className="flex items-center gap-3">
              {content.socialLinks.map((social, index) => <li key={`${social.platform}-${index}`}>
                <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-on-surface-variant transition-colors duration-200 hover:text-primary"><SocialIcon platform={social.platform} /></a>
              </li>)}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-outline-variant/20 pt-6 sm:grid sm:grid-cols-3 sm:items-center">
          <div className="hidden sm:block" />
          <p className="order-last text-center text-xs text-on-surface-variant sm:order-none">© {new Date().getFullYear()} {content.copyright}</p>
          <nav aria-label={legalLabel} className="flex justify-center sm:justify-end">
            <ul className="flex items-center gap-4">
              <li><NextLink href={localizedHref(LEGAL_HREFS.privacy, locale)} className="text-xs text-on-surface-variant transition-colors hover:text-primary">{content.privacyLabel}</NextLink></li>
              <li><NextLink href={localizedHref(LEGAL_HREFS.terms, locale)} className="text-xs text-on-surface-variant transition-colors hover:text-primary">{content.termsLabel}</NextLink></li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
