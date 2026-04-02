// ============================================================
// BeforeAfterCard — Comparación visual antes / después
// Layout estático: dos mitades con divisor central
// ============================================================

import Image from 'next/image'

interface BeforeAfterCardProps {
  before: { src: string; alt: string }
  after: { src: string; alt: string }
  label: string
  beforeLabel: string
  afterLabel: string
}

export function BeforeAfterCard({
  before,
  after,
  label,
  beforeLabel,
  afterLabel,
}: BeforeAfterCardProps) {
  return (
    <figure className="flex flex-col gap-4">
      <figcaption className="text-label-md text-primary font-semibold tracking-wide uppercase">
        {label}
      </figcaption>

      <div className="relative flex h-72 md:h-80 overflow-hidden rounded-(--radius-xl) shadow-ambient group">
        {/* Antes */}
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={before.src}
            alt={before.alt}
            fill
            className="object-cover object-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" aria-hidden="true" />
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/70 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            {beforeLabel}
          </span>
        </div>

        {/* Divisor central */}
        <div className="relative z-10 flex flex-col items-center justify-center shrink-0 w-px bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.6)]">
          <div className="absolute w-7 h-7 rounded-full bg-white shadow-float flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M4 7H10M4 7L2 5M4 7L2 9M10 7L12 5M10 7L12 9" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Después */}
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={after.src}
            alt={after.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-primary/85 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            {afterLabel}
          </span>
        </div>
      </div>
    </figure>
  )
}
