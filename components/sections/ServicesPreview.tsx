// ============================================================
// ServicesPreview — Home page services con imagen
// Layout: 1 hydro-card grande + grid 3 tarjetas pequeñas
// ============================================================

import Link from 'next/link'
import Image from 'next/image'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { services } from '@/lib/services'

export function ServicesPreview() {
  const [featured, ...rest] = services

  return (
    <SectionWrapper surface="base" id="servicios-preview">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-label-md text-primary mb-3">Lo que hacemos</p>
          <h2 className="text-display-md text-(--color-on-surface)">
            Servicios Especializados
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-lg mt-3">
            Técnicas avanzadas y resultados impecables, con el menor impacto posible en el medio ambiente.
          </p>
        </div>
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 pb-2 border-b-2 border-primary-container text-primary font-bold text-sm hover:gap-4 transition-all whitespace-nowrap shrink-0"
          aria-label="Ver todos los servicios de Detailing Marin"
        >
          Ver todos los servicios →
        </Link>
      </div>

      {/* Grid principal: 2 columnas desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Tarjeta grande — hydro-card con imagen de fondo */}
        <Link
          href={`/servicios#${featured.slug}`}
          className="group relative rounded-(--radius-xl) overflow-hidden cursor-pointer block"
          aria-label={`Ver servicio: ${featured.title}`}
        >
          {/* Imagen de fondo */}
          <div className="relative w-full h-[420px]">
            <Image
              src="/images/hero-detailing.webp"
              alt={featured.title}
              fill
              className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Overlay hydro-card */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(198,233,232,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(1px)',
              }}
              aria-hidden="true"
            />
            {/* Gradiente bottom para legibilidad del texto */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Contenido sobre la imagen */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="font-display text-3xl font-bold mb-2">{featured.title}</h3>
            <p className="text-white/80 max-w-sm mb-6 text-sm leading-relaxed">
              {featured.shortDescription}
            </p>
            <span
              className={[
                'inline-flex items-center gap-2 px-6 py-3 rounded-full',
                'bg-white text-primary font-bold text-sm',
                'group-hover:bg-primary group-hover:text-white transition-colors duration-300',
              ].join(' ')}
            >
              {featured.price} ›
            </span>
          </div>
        </Link>

        {/* Grid 3 tarjetas + CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 content-start">
          {rest.map((service) => (
            <Link
              key={service.id}
              href={`/servicios#${service.slug}`}
              className="group relative rounded-(--radius-xl) overflow-hidden cursor-pointer block"
              aria-label={`Ver servicio: ${service.title}`}
            >
              {/* Imagen de fondo */}
              <div className="relative w-full h-52">
                <Image
                  src="/images/hero-detailing.webp"
                  alt={service.title}
                  fill
                  className="object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Contenido */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-display font-bold text-lg mb-1">{service.title}</h3>
                {service.price && (
                  <span className="text-white/80 text-xs font-medium">{service.price}</span>
                )}
              </div>
            </Link>
          ))}

          {/* Tarjeta CTA "Ver todos" */}
          <Link
            href="/servicios"
            className={[
              'group relative rounded-(--radius-xl) overflow-hidden h-52',
              'bg-surface-container-low hover:bg-surface-container',
              'flex flex-col items-center justify-center gap-3',
              'border border-outline-variant/20',
              'transition-all duration-300',
            ].join(' ')}
            aria-label="Ver todos los servicios"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
              ✨
            </span>
            <p className="font-display font-bold text-primary text-sm text-center px-4">
              Ver todos los servicios
            </p>
            <span className="text-xs text-on-surface-variant group-hover:text-primary transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
