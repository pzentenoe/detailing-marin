// ============================================================
// SectionWrapper — Container consistente para secciones
// Controla max-width, padding y background tipo surface
// ============================================================

import type { ReactNode } from 'react'

type SurfaceLevel = 'base' | 'low' | 'container' | 'high' | 'highest'

const surfaceStyles: Record<SurfaceLevel, string> = {
  base:      'bg-(--color-surface)',
  low:       'bg-surface-container-low',
  container: 'bg-surface-container',
  high:      'bg-surface-container-high',
  highest:   'bg-(--color-surface-container-highest)',
}

interface SectionWrapperProps {
  children: ReactNode
  surface?: SurfaceLevel
  className?: string
  innerClassName?: string
  id?: string
  as?: 'section' | 'div' | 'article' | 'aside'
}

export function SectionWrapper({
  children,
  surface = 'base',
  className = '',
  innerClassName = '',
  id,
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      className={[surfaceStyles[surface], 'w-full', className].filter(Boolean).join(' ')}
    >
      <div
        className={[
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          'py-16 sm:py-20 lg:py-24',
          innerClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </Tag>
  )
}
