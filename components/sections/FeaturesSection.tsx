// ============================================================
// FeaturesSection — Los 3 pilares de Detailing Marin
// Banda editorial: cada pilar se sostiene con una fotografía real y un
// encuadre propio (no tres tarjetas idénticas). Sin numeración decorativa.
// El icono usa `bg-primary` + `on-primary` para garantizar contraste real.
// ============================================================

import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Icon } from '@/components/ui/Icon'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { featuresConfig } from '@/lib/services'

// Cada pilar prueba una afirmación distinta: el producto, el trabajo en el
// domicilio y el acabado. Los encuadres difieren a propósito.
const featureMedia = {
  eco: {
    src: '/images/lavado_ecologico/lavado_ecologico.webp',
    aspect: 'aspect-[4/5]',
    sizes: '(max-width: 640px) 100vw, 30vw',
  },
  domicilio: {
    src: '/images/trabajos/exterior/peugeot-landtrek-frontal-despues.webp',
    aspect: 'aspect-[3/4]',
    sizes: '(max-width: 640px) 100vw, 30vw',
  },
  premium: {
    src: '/images/trabajos/exterior/porsche-boxster-trasera-limpia-despues.webp',
    aspect: 'aspect-[16/11]',
    sizes: '(max-width: 640px) 100vw, 30vw',
  },
} as const

export async function FeaturesSection() {
  const t = await getTranslations('features')

  const items = featuresConfig.map((f) => ({
    ...f,
    ...featureMedia[f.id],
    title: t(`items.${f.id}.title`),
    description: t(`items.${f.id}.description`),
    imageAlt: t(`items.${f.id}.imageAlt`),
  }))

  return (
    <SectionWrapper surface="container" id="pilares">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
        <div>
          <p className="text-label-md text-primary mb-3">{t('label')}</p>
          <h2 className="text-display-md text-(--color-on-surface)">{t('heading')}</h2>
          <p className="text-body-lg text-on-surface-variant max-w-md mt-4">
            {t('description')}
          </p>
        </div>

        <ul className="grid gap-12 sm:grid-cols-3 sm:gap-6">
          {items.map(({ id, icon, src, aspect, sizes, title, description, imageAlt }) => (
            <li
              key={id}
              className="flex flex-col gap-4 sm:border-l sm:border-outline-variant/25 sm:pl-6 first:sm:border-l-0 first:sm:pl-0"
            >
              <div className={`relative w-full overflow-hidden rounded-(--radius-lg) ${aspect}`}>
                <Image
                  src={src}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes={sizes}
                />
              </div>
              <div className="flex items-center gap-3 pt-1">
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-(--radius-md) bg-primary text-on-primary"
                  aria-hidden="true"
                >
                  <Icon name={icon} size={20} />
                </span>
                <h3 className="text-headline-md text-(--color-on-surface)">{title}</h3>
              </div>
              <p className="text-body-lg text-sm leading-relaxed text-on-surface-variant">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  )
}
