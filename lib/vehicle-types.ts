const VEHICLE_TYPE_LABELS: Record<string, { es: string; en: string }> = {
  citycar: { es: 'Automóvil urbano', en: 'City car' },
  'city car': { es: 'Automóvil urbano', en: 'City car' },
  'automóvil urbano': { es: 'Automóvil urbano', en: 'City car' },
  'sedán / hatchback': { es: 'Sedán / hatchback', en: 'Sedan / hatchback' },
  'sedan / hatchback': { es: 'Sedán / hatchback', en: 'Sedan / hatchback' },
  suv: { es: 'SUV', en: 'SUV' },
  '3 corridas': { es: 'Vehículo de tres filas de asientos', en: 'Three-row vehicle' },
  'vehículo de tres filas de asientos': { es: 'Vehículo de tres filas de asientos', en: 'Three-row vehicle' },
  'three-row vehicle': { es: 'Vehículo de tres filas de asientos', en: 'Three-row vehicle' },
}

export function localizeVehicleType(value: string | null | undefined, locale: 'es' | 'en') {
  const label = value?.trim() ?? ''
  return VEHICLE_TYPE_LABELS[label.toLowerCase()]?.[locale] ?? label
}
