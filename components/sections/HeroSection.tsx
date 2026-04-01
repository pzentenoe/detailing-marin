'use client'

// ============================================================
// HeroSection — Sección principal de la página Home
// Diseño asimétrico editorial con EcoChip y CTA doble
// ============================================================

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { EcoChip } from '@/components/ui/EcoChip'

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56954451422'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, quiero agendar un servicio con Detailing Marin')}`

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-(--color-surface) pt-20"
      aria-label="Sección principal"
    >
      {/* Imagen de fondo a baja opacidad */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/hero-detailing.webp"
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          priority
          sizes="100vw"
        />
        {/* Gradiente encima de la imagen para mantener legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-tr from-(--color-surface) via-(--color-surface)/60 to-transparent" />
      </div>

      {/* Destellos decorativos encima */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-fixed opacity-15 blur-[100px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary-container opacity-10 blur-[80px] -translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[90vh] flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-16 lg:py-24">

          {/* Columna izquierda: Copy */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8 z-10">
            {/* EcoChip badge */}
            <div className="flex items-center gap-3">
              <EcoChip stat="90%" label="Ahorro de agua" />
              <EcoChip stat="100%" label="Biodegradable" icon="♻️" />
            </div>

            {/* Headline */}
            <h1 className="text-display-lg text-(--color-on-surface)">
              Tu vehículo,{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'var(--gradient-primary)' }}>
                como el primer día.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg text-on-surface-variant max-w-lg text-lg leading-relaxed">
              El mejor lavado detallado y pulido para tu auto, sin moverte de tu casa. 
              Cuidamos tu vehículo y el medio ambiente con tecnología hidrofóbica y 
              productos biodegradables.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  window.open(
                    WA_URL,
                    '_blank',
                  )
                }
                aria-label="Agendar servicio por WhatsApp"
              >
                🗓️ Agendar Servicio
              </Button>
              <Link href="/servicios" passHref>
                <Button variant="secondary" size="lg">
                  Ver todos los servicios →
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 pt-4">
              {[
                { value: '+500', label: 'Autos atendidos' },
                { value: '5⭐', label: 'Calificación promedio' },
                { value: '0km', label: 'Sin moverte de casa' },
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

          {/* Columna derecha: Imagen asimétrica editorial */}
          <div className="flex-1 relative z-10 w-full max-w-xl lg:max-w-none">
            <div
              className="relative rounded-(--radius-xl) overflow-hidden shadow-float"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src="/images/hero-detailing.webp"
                alt="Agua hidrofóbica sobre pintura recién detallada — resultado Detailing Marin"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 45vw"
              />
              {/* Overlay glassmorphic en la esquina */}
              <div className="absolute bottom-4 left-4 right-4 glass border border-outline-variant/20 rounded-md p-4 flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">✨</span>
                <div>
                  <p className="font-display font-semibold text-sm text-(--color-on-surface)">
                    Resultado showroom
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Protección de larga duración
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
