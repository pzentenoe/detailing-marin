'use client'

import { useRef, useState } from 'react'
import { DayPicker, UI } from 'react-day-picker'
import { enUS, es } from 'react-day-picker/locale'
import { CalendarDays, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  id?: string
  required?: boolean
  className?: string
  ariaDescribedBy?: string
  ariaInvalid?: boolean
}

function toDate(value: string): Date | undefined {
  if (!value) return undefined

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return Number.isNaN(date.getTime()) ? undefined : date
}

function toISO(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function DatePicker({
  value,
  onChange,
  id,
  required,
  className,
  ariaDescribedBy,
  ariaInvalid,
}: DatePickerProps) {
  const locale = useLocale()
  const t = useTranslations('contact.form.datePicker')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selectedDate = toDate(value)
  const dateLocale = locale === 'en' ? enUS : es
  const displayValue = selectedDate
    ? new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-CL', { dateStyle: 'long' }).format(selectedDate)
    : t('placeholder')

  const handleClose = () => {
    setIsOpen(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }

  const close = () => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (typeof dialog.close === 'function') {
      dialog.close()
      return
    }

    dialog.removeAttribute('open')
    handleClose()
  }

  const handleOpen = () => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (typeof dialog.showModal === 'function') dialog.showModal()
    else dialog.setAttribute('open', '')

    setIsOpen(true)
  }

  const handleSelect = (date: Date | undefined) => {
    if (!date) return

    onChange(toISO(date))
    close()
  }

  return (
    <>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={handleOpen}
        className={[className, 'relative flex items-center text-left', value ? 'text-on-surface' : ''].filter(Boolean).join(' ')}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={`${id}-dialog`}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        aria-required={required}
      >
        <span className="min-w-0 truncate">{displayValue}</span>
        <CalendarDays className="absolute right-4 shrink-0 text-primary" size={20} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id={`${id}-dialog`}
        aria-labelledby={`${id}-dialog-title`}
        onCancel={(event) => {
          event.preventDefault()
          close()
        }}
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) close()
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && typeof dialogRef.current?.close !== 'function') {
            event.preventDefault()
            close()
          }
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-(--radius-xl) border border-outline-variant/30 bg-surface-container-lowest p-0 text-on-surface shadow-ambient backdrop:bg-on-surface/40"
      >
        {isOpen && (
          <div className="p-4 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{t('eyebrow')}</p>
                <h2 id={`${id}-dialog-title`} className="mt-1 font-display text-xl font-bold text-on-surface">
                  {t('title')}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="grid size-10 shrink-0 place-items-center rounded-(--radius-md) text-on-surface-variant transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={t('close')}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              disabled={{ before: today }}
              defaultMonth={selectedDate ?? today}
              startMonth={today}
              locale={dateLocale}
              navLayout="after"
              autoFocus
              aria-label={t('calendarLabel')}
              labels={{
                labelNav: () => t('navigationLabel'),
                labelNext: () => t('nextMonth'),
                labelPrevious: () => t('previousMonth'),
              }}
              footer={selectedDate ? t('selected', { date: displayValue }) : t('selectionPrompt')}
              classNames={{
                [UI.Root]: 'w-full min-w-0',
                [UI.Months]: 'w-full',
                [UI.Month]: 'relative w-full',
                [UI.MonthCaption]: 'mb-3 text-center',
                [UI.CaptionLabel]: 'font-display text-base font-bold text-on-surface',
                [UI.Nav]: 'absolute right-0 top-0 flex items-center gap-1',
                [UI.PreviousMonthButton]: 'grid size-10 place-items-center rounded-(--radius-md) text-primary transition-colors hover:bg-secondary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-disabled:cursor-not-allowed aria-disabled:[&>svg]:fill-on-surface-variant/40',
                [UI.NextMonthButton]: 'grid size-10 place-items-center rounded-(--radius-md) text-primary transition-colors hover:bg-secondary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-disabled:cursor-not-allowed aria-disabled:[&>svg]:fill-on-surface-variant/40',
                [UI.Chevron]: 'fill-primary',
                [UI.MonthGrid]: 'w-full table-fixed border-collapse',
                [UI.Weekdays]: 'border-b border-outline-variant/20',
                [UI.Weekday]: 'h-9 text-center text-[0.65rem] font-semibold uppercase tracking-wider text-on-surface-variant',
                [UI.Day]: 'p-0 text-center [&[data-selected=true]_button]:bg-primary [&[data-selected=true]_button]:text-on-primary [&[data-selected=true]_button:hover]:bg-primary',
                [UI.DayButton]: 'mx-auto grid min-w-6 min-h-6 w-full max-w-11 aspect-square place-items-center rounded-full text-sm font-medium text-on-surface transition-colors hover:bg-secondary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-surface',
                disabled: 'cursor-not-allowed text-on-surface-variant/35 line-through hover:bg-transparent',
                outside: 'text-on-surface-variant/35',
                today: 'font-bold text-primary',
                [UI.Footer]: 'mt-4 border-t border-outline-variant/20 pt-4 text-center text-sm text-on-surface-variant',
              }}
            />
          </div>
        )}
      </dialog>
    </>
  )
}
