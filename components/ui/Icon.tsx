// ============================================================
// Icon — Wrapper de iconos con Lucide React
// Centraliza el uso de iconos del design system
// ============================================================

import {
  Droplets,
  Sparkles,
  Zap,
  Settings,
  Leaf,
  MapPin,
  Award,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Calendar,
  Car,
  Wrench,
  MessageCircle,
  type LucideProps,
} from 'lucide-react'

const icons = {
  droplets: Droplets,
  sparkles: Sparkles,
  zap: Zap,
  settings: Settings,
  leaf: Leaf,
  'map-pin': MapPin,
  award: Award,
  'arrow-right': ArrowRight,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  menu: Menu,
  x: X,
  sun: Sun,
  moon: Moon,
  calendar: Calendar,
  car: Car,
  wrench: Wrench,
  'message-circle': MessageCircle,
} as const

export type IconName = keyof typeof icons

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string
  size?: number
  color?: string
  className?: string
}

export function Icon({ name, size = 20, color, className = '' }: IconProps) {
  const LucideIcon = icons[name as IconName]

  if (!LucideIcon) {
    // Fallback: círculo genérico para iconos no registrados
    return (
      <span
        className={`inline-block w-5 h-5 rounded-full bg-current opacity-50 ${className}`}
        aria-hidden="true"
      />
    )
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      className={className}
      aria-hidden="true"
    />
  )
}
