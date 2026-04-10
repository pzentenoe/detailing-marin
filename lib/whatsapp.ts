// ============================================================
// WhatsApp — Utilidad centralizada
// Fuente única del número y construcción de URLs wa.me
// ============================================================

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '56954451422'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
