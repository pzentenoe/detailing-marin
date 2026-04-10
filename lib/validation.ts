// ============================================================
// Validation schemas — Zod
// Fuente única de validación para formularios del cliente
// ============================================================

import { z } from 'zod'

export const contactFormSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  telefono: z
    .string()
    .regex(/^\+?[0-9]{9,15}$/, 'Teléfono inválido — ej: +56912345678 o 912345678'),
  direccion: z.string().min(5, 'Ingresa una dirección válida (mínimo 5 caracteres)'),
  tipoVehiculo: z.string().min(1, 'Selecciona un tipo de vehículo'),
  fechaPreferida: z.string().refine((val) => {
    if (!val) return false
    const selected = new Date(val)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selected >= today
  }, 'La fecha no puede ser anterior a hoy'),
  serviciosSeleccionados: z.array(z.string()),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
