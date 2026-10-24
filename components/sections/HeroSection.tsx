'use client'

// ============================================================
// HeroSection — Sección principal de la página Home
// Diseño asimétrico editorial con EcoChip y CTA doble
// ============================================================

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'
import { EcoChip } from '@/components/ui/EcoChip'
import { Icon } from '@/components/ui/Icon'
import { buildWhatsAppUrl } from '@/lib/whatsapp'
import { analytics } from '@/lib/analytics'

export function HeroSection() {
  const t = useTranslations('hero')
  const tShared = useTranslations('shared')
  const WA_URL = buildWhatsAppUrl(tShared('whatsappMessage'))

  return (
    <section
      className="relative w-full overflow-hidden bg-(--color-surface) pt-20"
      aria-label={t('sectionAria')}
    >
      {/* Destellos decorativos */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-fixed opacity-15 blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary-container opacity-10 blur-[80px] -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[80vh] lg:min-h-[88vh] flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-14 lg:py-20">

          {/* Columna izquierda: Copy */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 z-10">
            <div className="flex flex-wrap items-center gap-3">
              <EcoChip stat={t('badge1Stat')} label={t('badge1Label')} icon="droplets" />
              <EcoChip stat={t('badge2Stat')} label={t('badge2Label')} icon="leaf" />
            </div>

            {/* El énfasis viene del color y el peso, no de un degradado sobre texto */}
            <h1 className="text-display-lg text-(--color-on-surface) max-w-[18ch]">
              {t('headline1')}{' '}
              <span className="text-primary">{t('headline2')}</span>
            </h1>

            <p className="text-body-lg text-on-surface-variant max-w-lg text-lg leading-relaxed">
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => {
                  analytics.whatsappClick({ source: 'hero' })
                  window.open(WA_URL, '_blank')
                }}
                aria-label={t('cta1Aria')}
              >
                <Icon name="calendar" size={18} />
                {t('cta1')}
              </Button>
              <Link
                href="/servicios"
                onClick={() => analytics.ctaClick({ cta_id: 'hero_services', page: 'home' })}
                className={[
                  'inline-flex items-center justify-center gap-2 rounded-full',
                  'bg-secondary-container text-on-secondary-container font-semibold text-lg',
                  'px-8 py-4 transition-[filter,transform] duration-200 ease-out',
                  'hover:brightness-95 active:scale-[0.98] motion-reduce:transition-none',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ].join(' ')}
              >
                {t('cta2')}
                <Icon name="arrow-right" size={18} />
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { value: t('stat1Value'), label: t('stat1Label') },
                { value: t('stat2Value'), label: t('stat2Label') },
                { value: t('stat3Value'), label: t('stat3Label') },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="font-display font-bold text-2xl text-primary">
                    {stat.value}
                  </span>
                  <span className="text-label-md text-on-surface-variant">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha: imagen editorial — el resultado real abre la
              página, no una foto de producto */}
          <div className="flex-1 relative z-10 w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[16/11] rounded-(--radius-xl) overflow-hidden shadow-float">
              <Image
                src="/images/trabajos/exterior/bmw-x3-perfil-lateral-despues.webp"
                alt={t('imageAlt')}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 45vw"
              />
              <div className="absolute bottom-4 left-4 right-4 glass border border-outline-variant/20 rounded-(--radius-md) p-4 flex items-center gap-3">
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-on-primary"
                  aria-hidden="true"
                >
                  <Icon name="sparkles" size={18} />
                </span>
                <div>
                  <p className="font-display font-semibold text-sm text-(--color-on-surface)">
                    {t('overlayTitle')}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {t('overlaySubtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
