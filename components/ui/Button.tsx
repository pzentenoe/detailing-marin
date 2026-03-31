// ============================================================
// Button — Átomo reutilizable
// Variantes: primary | secondary | ghost
// ============================================================

import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ButtonVariant, ButtonSize } from '@/types'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'gradient-primary text-white font-semibold shadow-ambient hover:opacity-90 hover:shadow-float active:scale-[0.98]',
  secondary:
    'bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] font-semibold hover:brightness-95 active:scale-[0.98]',
  ghost:
    'text-[var(--color-primary)] font-medium underline-offset-4 hover:underline hover:text-[var(--color-primary-container)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-[var(--radius-full)]',
  md: 'px-6 py-3 text-base rounded-[var(--radius-full)]',
  lg: 'px-8 py-4 text-lg rounded-[var(--radius-full)]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-fixed)] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
