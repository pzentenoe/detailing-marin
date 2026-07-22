interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  id?: string
  required?: boolean
  className?: string
  ariaDescribedBy?: string
  ariaInvalid?: boolean
}

function toDate(str: string): Date | undefined {
  if (!str) return undefined
  const d = new Date(str + 'T00:00:00')
  return isNaN(d.getTime()) ? undefined : d
}

function toISO(date: Date): string {
  return date.toISOString().split('T')[0]
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
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const date = toDate(raw)
    if (date && date >= today) {
      onChange(raw)
    } else if (!raw) {
      onChange('')
    }
  }

  return (
    <input
      id={id}
      type="date"
      value={value}
      onChange={handleInputChange}
      min={toISO(today)}
      required={required}
      className={className}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
    />
  )
}
