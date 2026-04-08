// ============================================================
// CoberturaSection — Mapa editorial de cobertura por zonas
// Bento grid con 5 zonas geográficas + chips de comunas
// ============================================================

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SERVED_COMMUNES } from '@/lib/seo'

// ── Datos de zonas ────────────────────────────────────────────
interface Zone {
  id: string
  dir: string
  communes: readonly string[]
  colSpan: string
  cardClass: string
  dirClass: string
  labelClass: string
  nameClass: string
  chipClass: string
  btnClass: string
  countClass: string
  isWide?: boolean
}

const ZONES: Zone[] = [
  {
    id: 'poniente',
    dir: 'O',
    communes: ['Maipú', 'Pudahuel', 'Cerrillos', 'Cerro Navia', 'Lo Prado', 'Quinta Normal', 'Estación Central', 'Padre Hurtado'],
    colSpan: 'md:col-span-7',
    cardClass: 'gradient-primary text-white',
    dirClass: 'text-white/10',
    labelClass: 'text-white/70',
    nameClass: 'text-white',
    chipClass: 'bg-white/15 text-white border-white/20 hover:bg-white/25',
    btnClass: 'bg-white/15 text-white border border-white/30 hover:bg-white/25',
    countClass: 'text-white/60',
  },
  {
    id: 'norte',
    dir: 'N',
    communes: ['Conchalí', 'Quilicura', 'Renca', 'Huechuraba', 'Lo Barnechea'],
    colSpan: 'md:col-span-5',
    cardClass: 'bg-(--color-surface-container-lowest)',
    dirClass: 'text-primary/8',
    labelClass: 'text-on-surface-variant',
    nameClass: 'text-(--color-on-surface)',
    chipClass: 'bg-secondary-container/60 text-on-secondary-container border-secondary-container hover:bg-secondary-container',
    btnClass: 'gradient-primary text-white hover:opacity-90',
    countClass: 'text-on-surface-variant',
  },
  {
    id: 'centro',
    dir: 'C',
    communes: ['Santiago', 'Independencia', 'Recoleta', 'San Joaquín', 'Pedro Aguirre Cerda', 'Lo Espejo'],
    colSpan: 'md:col-span-5',
    cardClass: 'hydro-card',
    dirClass: 'text-primary/8',
    labelClass: 'text-on-surface-variant',
    nameClass: 'text-(--color-on-surface)',
    chipClass: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
    btnClass: 'gradient-primary text-white hover:opacity-90',
    countClass: 'text-on-surface-variant',
  },
  {
    id: 'oriente',
    dir: 'E',
    communes: ['Las Condes', 'Vitacura', 'Providencia', 'Ñuñoa', 'Macul', 'Peñalolén'],
    colSpan: 'md:col-span-7',
    cardClass: 'bg-primary-container',
    dirClass: 'text-white/10',
    labelClass: 'text-white/70',
    nameClass: 'text-white',
    chipClass: 'bg-white/15 text-white border-white/20 hover:bg-white/25',
    btnClass: 'bg-white/15 text-white border border-white/30 hover:bg-white/25',
    countClass: 'text-white/60',
  },
  {
    id: 'sur',
    dir: 'S',
    communes: ['La Florida', 'La Granja', 'La Pintana', 'San Ramón', 'La Cisterna', 'El Bosque', 'San Miguel', 'San Bernardo'],
    colSpan: 'md:col-span-12',
    cardClass: 'bg-(--color-surface-container-lowest)',
    dirClass: 'text-primary/8',
    labelClass: 'text-on-surface-variant',
    nameClass: 'text-(--color-on-surface)',
    chipClass: 'bg-secondary-container/60 text-on-secondary-container border-secondary-container hover:bg-secondary-container',
    btnClass: 'gradient-primary text-white hover:opacity-90',
    countClass: 'text-on-surface-variant',
    isWide: true,
  },
]

type ZoneId = (typeof ZONES)[number]['id']

export async function CoberturaSection() {
  const t = await getTranslations('cobertura')

  const zoneNameMap: Record<ZoneId, string> = {
    poniente: t('zone_poniente'),
    norte:    t('zone_norte'),
    centro:   t('zone_centro'),
    oriente:  t('zone_oriente'),
    sur:      t('zone_sur'),
  }

  return (
    <SectionWrapper surface="base" id="comunas-cobertura">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="text-center mb-16 relative">
        {/* Decorative radial blur */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary opacity-5 blur-[80px]" />
        </div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
          {t('badge')}
        </span>

        <h1 className="text-display-md text-(--color-on-surface) max-w-3xl mx-auto">
          {t('heading')}
        </h1>

        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mt-4 text-lg leading-relaxed">
          {t('subheading')}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {[
            { value: t('stat1Value'), label: t('stat1Label') },
            { value: t('stat2Value'), label: t('stat2Label') },
            { value: t('stat3Value'), label: t('stat3Label') },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 px-6 py-4 rounded-(--radius-xl) bg-(--color-surface-container-lowest) shadow-ambient border border-outline-variant/20 min-w-[120px]"
            >
              <span className="font-display font-bold text-3xl text-primary">
                {stat.value}
              </span>
              <span className="text-label-md text-on-surface-variant text-xs text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </header>

      {/* ── Zones Bento Grid ─────────────────────────────────── */}
      <div className="mb-8">
        <h2 className="text-headline-md text-(--color-on-surface) mb-2">
          {t('zonesTitle')}
        </h2>
        <p className="text-on-surface-variant text-sm mb-8">
          {t('zonesDesc')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {ZONES.map((zone) => {
            const zoneName = zoneNameMap[zone.id]
            const count = zone.communes.length

            return (
              <div
                key={zone.id}
                className={[
                  zone.colSpan,
                  'group relative overflow-hidden rounded-(--radius-xl)',
                  'bg-surface-container-low p-px',
                ].join(' ')}
              >
                <div
                  className={[
                    'relative h-full rounded-[calc(var(--radius-xl)-1px)]',
                    zone.cardClass,
                    zone.isWide
                      ? 'p-8 md:p-10 flex flex-col md:flex-row gap-8'
                      : 'p-8 flex flex-col gap-5',
                  ].join(' ')}
                >
                  {/* Decorative direction letter */}
                  <span
                    className={[
                      'absolute right-4 bottom-4 font-display font-black select-none pointer-events-none',
                      'text-[8rem] leading-none transition-transform duration-500',
                      'group-hover:scale-110 group-hover:-rotate-3',
                      zone.dirClass,
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {zone.dir}
                  </span>

                  {/* Content */}
                  <div className={zone.isWide ? 'flex-1 relative z-10' : 'relative z-10'}>
                    {/* Zone header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex flex-col gap-0.5">
                        <span className={['text-xs font-bold tracking-widest uppercase', zone.labelClass].join(' ')}>
                          {t('communesCount', { count })}
                        </span>
                        <h3 className={['font-display font-bold text-xl tracking-tight', zone.nameClass].join(' ')}>
                          {zoneName}
                        </h3>
                      </div>
                    </div>

                    {/* Commune chips */}
                    <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label={zoneName}>
                      {zone.communes.map((commune) => (
                        <span
                          key={commune}
                          role="listitem"
                          className={[
                            'inline-flex items-center px-3 py-1.5',
                            'rounded-full border text-sm font-medium',
                            'transition-all duration-200 cursor-default',
                            zone.chipClass,
                          ].join(' ')}
                        >
                          {commune}
                        </span>
                      ))}
                    </div>

                    {/* Zone CTA */}
                    <Link
                      href="/contacto"
                      className={[
                        'inline-flex items-center gap-2 px-5 py-2.5 rounded-(--radius-md)',
                        'text-sm font-semibold transition-all duration-200',
                        'hover:scale-[1.02] active:scale-[0.98]',
                        zone.btnClass,
                      ].join(' ')}
                    >
                      {t('bookZone')}
                    </Link>
                  </div>

                  {/* Wide layout: second column placeholder for visual balance */}
                  {zone.isWide && (
                    <div className="hidden md:flex flex-1 items-center justify-end relative z-10" aria-hidden="true">
                      <div className="text-right">
                        <span className={['font-display font-black text-6xl block leading-none', zone.countClass].join(' ')}>
                          {count}
                        </span>
                        <span className={['text-sm', zone.countClass].join(' ')}>
                          {t('communesCount', { count })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── SEO prose section ────────────────────────────────── */}
      <section className="mb-12 rounded-(--radius-xl) bg-(--color-surface-container-lowest) border border-outline-variant/20 p-8 shadow-ambient">
        <h2 className="text-headline-md text-(--color-on-surface) mb-3">
          {t('seoTitle')}
        </h2>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          {t('seoText', { communes: SERVED_COMMUNES.join(', ') })}
        </p>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-(--radius-xl) bg-primary-container p-8 md:p-14 text-center shadow-float">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(45,90,39,0.5), transparent)' }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <span className="text-4xl mb-5 block" aria-hidden="true">📍</span>
          <h2 className="text-headline-md text-white mb-3 max-w-2xl mx-auto">
            {t('ctaBannerTitle')}
          </h2>
          <p className="text-white/80 text-base mb-8 max-w-lg mx-auto">
            {t('ctaBannerDesc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-secondary-container text-on-secondary-container font-bold rounded-(--radius-md) hover:scale-105 transition-transform active:scale-95 shadow-float"
            >
              {t('ctaWhatsApp')}
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-semibold rounded-(--radius-md) hover:bg-white/20 transition-colors border border-white/20"
            >
              {t('ctaContact')}
            </Link>
          </div>
        </div>
      </div>

    </SectionWrapper>
  )
}
