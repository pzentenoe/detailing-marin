// ============================================================
// EcoChip — Componente de firma del design system
// "Eco-Impact Chip": badge glassmorphic que muestra stats eco
// ============================================================

interface EcoChipProps {
  stat: string
  label: string
  icon?: string
}

export function EcoChip({ stat, label, icon = '🌿' }: EcoChipProps) {
  return (
    <div
      className={[
        'inline-flex items-center gap-2 px-4 py-2',
        'rounded-[var(--radius-full)]',
        'bg-[var(--color-tertiary-container)]',
        'backdrop-filter backdrop-blur-[10px]',
        'border border-[var(--color-on-tertiary-container)]/10',
        'text-[var(--color-on-tertiary-container)]',
        'text-sm font-medium',
      ].join(' ')}
      role="status"
      aria-label={`${stat} ${label}`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="font-bold">{stat}</span>
      <span className="opacity-80">{label}</span>
    </div>
  )
}
