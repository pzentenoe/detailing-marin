import 'server-only'

import es from '@/messages/es.json'
import en from '@/messages/en.json'

const NAMESPACES = ['hero', 'features', 'servicesPreview', 'industrial', 'results', 'cta', 'coverageTeaser'] as const
type Locale = 'es' | 'en'
type HomeContent = Record<(typeof NAMESPACES)[number], unknown>

function defaults(locale: Locale): HomeContent {
  const messages = locale === 'en' ? en : es
  return Object.fromEntries(NAMESPACES.map((key) => [key, messages[key]])) as HomeContent
}

function mergeContent(base: unknown, incoming: unknown): unknown {
  if (typeof base === 'string') return typeof incoming === 'string' ? incoming : base
  if (Array.isArray(base)) {
    return Array.isArray(incoming) && incoming.length === base.length
      ? base.map((value, index) => mergeContent(value, incoming[index]))
      : base
  }
  if (base && typeof base === 'object') {
    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) return base
    return Object.fromEntries(Object.entries(base).map(([key, value]) => [
      key,
      mergeContent(value, (incoming as Record<string, unknown>)[key]),
    ]))
  }
  return base
}

export async function getHomepageContent(locale: Locale): Promise<HomeContent> {
  const fallback = defaults(locale)
  const baseUrl = process.env.DIRECTUS_URL
  const token = process.env.DIRECTUS_TOKEN
  if (!baseUrl || !token) return fallback

  try {
    const url = new URL('/items/detailing_homepage', baseUrl)
    url.search = new URLSearchParams({ fields: `content_${locale}`, limit: '1' }).toString()
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600, tags: ['directus-homepage'] },
      redirect: 'error',
    })
    if (!response.ok) return fallback
    const payload = await response.json() as { data?: Record<string, unknown>[] }
    const content = payload.data?.[0]?.[`content_${locale}`]
    if (!content || typeof content !== 'object' || Array.isArray(content)) return fallback
    return Object.fromEntries(NAMESPACES.map((key) => [key, mergeContent(fallback[key], (content as Record<string, unknown>)[key])])) as HomeContent
  } catch {
    return fallback
  }
}

export function getDefaultHomepageContent(locale: Locale): HomeContent {
  return defaults(locale)
}

export function isHomepageContent(value: unknown, locale: Locale): value is HomeContent {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const expected = defaults(locale)
  return matchesShape(expected, value)
}

function matchesShape(expected: unknown, candidate: unknown): boolean {
  if (typeof expected === 'string') return typeof candidate === 'string'
  if (Array.isArray(expected)) {
    return Array.isArray(candidate) && candidate.length === expected.length
      && expected.every((value, index) => matchesShape(value, candidate[index]))
  }
  if (expected && typeof expected === 'object') {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return false
    const expectedEntries = Object.entries(expected)
    const candidateEntries = Object.entries(candidate)
    return expectedEntries.length === candidateEntries.length
      && expectedEntries.every(([key, value]) => Object.hasOwn(candidate, key)
        && matchesShape(value, (candidate as Record<string, unknown>)[key]))
  }
  return Object.is(expected, candidate)
}
