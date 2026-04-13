// ============================================================
// Analytics — Módulo centralizado de eventos GA4
// Nunca llamar window.gtag directamente — usar estos helpers.
// ============================================================

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || !GA_ID || typeof window.gtag === 'undefined') return
  window.gtag('event', name, params)
}

export const analytics = {
  formSubmit(params: { vehicle_type: string; services: string[]; services_count: number }) {
    trackEvent('form_submit', params)
  },

  formError(params: { error_type: 'validation' | 'api' }) {
    trackEvent('form_error', params)
  },

  whatsappClick(params: { source: 'fab' | 'contact_page' | 'cta' | 'hero' }) {
    trackEvent('whatsapp_click', params)
  },

  ctaClick(params: { cta_id: string; page: string }) {
    trackEvent('cta_click', params)
  },

  serviceView(params: { service_slug: string; service_name: string }) {
    trackEvent('service_view', params)
  },

  communeView(params: { commune_slug: string }) {
    trackEvent('commune_view', params)
  },

  languageSwitch(params: { from: string; to: string }) {
    trackEvent('language_switch', params)
  },
}
