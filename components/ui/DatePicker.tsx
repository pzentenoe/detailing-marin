'use client'

import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { es } from 'react-day-picker/locale'
import { Calendar } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  id?: string
  required?: boolean
  className?: string
}

function toDate(str: string): Date | undefined {
  if (!str) return undefined
  const d = new Date(str + 'T00:00:00')
  return isNaN(d.getTime()) ? undefined : d
}

function toISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

export function DatePicker({ value, onChange, id, required, className }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Sync external value
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setInputValue(raw)
    const date = toDate(raw)
    if (date && date >= today) {
      onChange(raw)
    } else if (!raw) {
      onChange('')
    }
  }

  const handleInputBlur = () => {
    const date = toDate(inputValue)
    if (!date || date < today) {
      setInputValue(value)
    }
  }

  const handleDaySelect = (date: Date | undefined) => {
    if (!date) return
    const iso = toISO(date)
    setInputValue(iso)
    onChange(iso)
    setOpen(false)
  }

  const selected = toDate(value)

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          id={id}
          type="date"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          min={toISO(today)}
          required={required}
          className={[className, '[&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'].join(' ')}
          aria-haspopup="dialog"
          aria-expanded={open}
        />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Abrir calendario"
          tabIndex={-1}
        >
          <Calendar size={18} />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-label="Calendario de selección de fecha"
          className={[
            'absolute z-50 top-[calc(100%+8px)] left-0',
            'bg-surface-container border border-outline-variant/30',
            'rounded-xl shadow-ambient p-3',
            'min-w-[280px]',
          ].join(' ')}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleDaySelect}
            locale={es}
            disabled={{ before: today }}
            defaultMonth={selected ?? today}
            classNames={{
              root: 'text-sm',
              months: 'flex flex-col gap-4',
              month: 'flex flex-col gap-3',
              month_caption: 'flex items-center justify-between px-1 mb-1',
              caption_label: 'font-bold text-(--color-on-surface) capitalize text-sm',
              nav: 'flex items-center gap-1',
              button_previous: [
                'p-1.5 rounded-md text-on-surface-variant',
                'hover:bg-surface-container-high hover:text-primary',
                'transition-colors duration-150',
              ].join(' '),
              button_next: [
                'p-1.5 rounded-md text-on-surface-variant',
                'hover:bg-surface-container-high hover:text-primary',
                'transition-colors duration-150',
              ].join(' '),
              weekdays: 'grid grid-cols-7 mb-1',
              weekday: 'text-center text-xs font-bold text-on-surface-variant/60 uppercase py-1',
              weeks: 'flex flex-col gap-1',
              week: 'grid grid-cols-7',
              day: 'flex items-center justify-center',
              day_button: [
                'w-9 h-9 rounded-lg text-sm font-medium',
                'text-(--color-on-surface)',
                'hover:bg-primary/15 hover:text-primary',
                'transition-colors duration-150',
                'focus:outline-none focus:ring-2 focus:ring-primary/40',
              ].join(' '),
              selected: '!bg-primary !text-white rounded-lg',
              today: 'font-bold text-primary',
              outside: 'opacity-30 pointer-events-none',
              disabled: 'opacity-25 pointer-events-none',
              hidden: 'invisible',
            }}
          />
        </div>
      )}
    </div>
  )
}
