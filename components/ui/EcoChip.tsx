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
        'inline-flex shrink-0 items-center gap-2 px-4 py-2',
        'rounded-full',
        'bg-tertiary-container',
        'backdrop-filter backdrop-blur-[10px]',
        'border border-on-tertiary-container/10',
        'text-on-tertiary-container',
        'text-sm font-medium',
      ].join(' ')}
      role="status"
      aria-label={`${stat} ${label}`}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="font-bold">{stat}</span>
      <span className="opacity-80 whitespace-nowrap">{label}</span>
    </div>
  )
}
