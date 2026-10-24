// ============================================================
// EcoChip — Componente de firma del design system
// "Eco-Impact Chip": badge que muestra stats eco
// ============================================================

import { Icon, type IconName } from '@/components/ui/Icon'

interface EcoChipProps {
  stat: string
  label: string
  icon?: IconName
}

export function EcoChip({ stat, label, icon = 'leaf' }: EcoChipProps) {
  return (
    <div
      className={[
        'inline-flex shrink-0 items-center gap-2 px-4 py-2',
        'rounded-full',
        'bg-tertiary-container',
        'border border-on-tertiary-container/15',
        'text-on-tertiary-container',
        'text-sm font-medium',
      ].join(' ')}
    >
      <Icon name={icon} size={16} />
      <span className="font-bold">{stat}</span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  )
}
