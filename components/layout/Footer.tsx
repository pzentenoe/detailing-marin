// ============================================================
// Footer — Links, copyright, eco branding
// ============================================================

import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { navHrefs, contactInfo } from '@/lib/services'
import { EcoChip } from '@/components/ui/EcoChip'

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/detailing_marin',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61586193856361',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

export async function Footer() {
  const t = await getTranslations('footer')
  const tn = await getTranslations('nav')
  const year = new Date().getFullYear()

  const legalLinks = [
    { key: 'privacy', href: '/privacidad' as const, label: t('privacy') },
    { key: 'terms',   href: '/terminos'   as const, label: t('terms')   },
  ]

  return (
    <footer
      className="bg-surface-container-low border-t border-outline-variant/20"
      role="contentinfo"
      aria-label={t('footerAria')}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Branding */}
          <div className="flex flex-col gap-5 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 w-fit" aria-label="Detailing Marin">
              <Image src="/icon/logo-removebg.png" alt="Nadia Marin Detailing" width={56} height={56} style={{ width: 56, height: 'auto' }} className="object-contain drop-shadow-md" />
              <span className="font-display font-bold text-lg text-(--color-on-surface) tracking-tight">Detailing Marin</span>
            </Link>
            <p className="text-body-lg text-on-surface-variant text-sm max-w-xs">{t('tagline')}</p>
            <div>
              <EcoChip stat="90%" label={t('ecoChipLabel')} />
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">{t('exploreTitle')}</h2>
            <nav aria-label={t('footerNavAria')}>
              <ul className="flex flex-col gap-3">
                {navHrefs.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-on-surface-variant hover:text-primary transition-colors text-sm">
                      {tn(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">{t('contactTitle')}</h2>
            <address className="not-italic flex flex-col gap-3">
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-on-surface-variant hover:text-primary transition-colors text-sm">
                📞 {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="text-on-surface-variant hover:text-primary transition-colors text-sm">
                ✉️ {contactInfo.email}
              </a>
              <p className="text-on-surface-variant text-sm">📍 {t('zone')}</p>
              <p className="text-on-surface-variant text-sm">🕐 {t('hours')}</p>
            </address>
          </div>

          {/* Redes sociales */}
          <div className="flex flex-col gap-4">
            <h2 className="text-label-md text-(--color-on-surface)">{t('followTitle')}</h2>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-on-surface-variant hover:text-primary transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-outline-variant/20 flex flex-col items-center gap-3 sm:grid sm:grid-cols-3 sm:items-center">
          <div className="hidden sm:block" />
          <p className="text-on-surface-variant text-xs text-center order-last sm:order-none">
            {t('copyright', { year })}
          </p>
          <nav aria-label={t('legalNavAria')} className="flex justify-center sm:justify-end">
            <ul className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-on-surface-variant hover:text-primary transition-colors text-xs">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
