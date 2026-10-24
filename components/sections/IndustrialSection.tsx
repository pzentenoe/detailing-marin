import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Icon } from '@/components/ui/Icon'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

export async function IndustrialSection() {
  const t = await getTranslations('industrial')

  return (
    <SectionWrapper surface="container" id="empresas-maquinaria">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="relative overflow-hidden rounded-(--radius-xl) shadow-float">
          <Image
            src="/images/trabajos/maquinaria/motor-industrial-cat-en-limpieza.webp"
            alt={t('imageAlt')}
            width={1280}
            height={576}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full object-cover"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            {t('label')}
          </span>
        </div>
        <div>
          <p className="mb-3 text-label-md text-primary">{t('label')}</p>
          <h2 className="text-display-md text-(--color-on-surface)">{t('heading')}</h2>
          <p className="mt-4 max-w-[65ch] text-body-lg leading-relaxed text-on-surface-variant">{t('description')}</p>
          <ul className="mt-6 space-y-3">
            {(t.raw('bullets') as string[]).map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-on-surface-variant">
                <Icon name="check-circle" size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-on-primary transition-[filter,transform] hover:brightness-95 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t('cta')}
              <Icon name="arrow-right" size={18} />
            </Link>
            <Link href="/galeria" className="inline-flex items-center gap-2 rounded-full border border-outline-variant/50 px-6 py-3 font-semibold text-primary hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {t('galleryCta')}
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
