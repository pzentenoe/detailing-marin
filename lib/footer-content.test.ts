import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  fallbackFooterContent,
  footerContentSchema,
  projectFooterContent,
} from './footer-content'

test('fallback footer satisfies the Directus contract and projects both locales', () => {
  const parsed = footerContentSchema.parse(fallbackFooterContent)
  assert.equal(projectFooterContent(parsed, 'es').tagline, fallbackFooterContent.tagline_es)
  assert.equal(projectFooterContent(parsed, 'en').tagline, fallbackFooterContent.tagline_en)
  assert.deepEqual(projectFooterContent(parsed, 'es').navigationLinks.map(({ target }) => target), [
    'home', 'services', 'coverage', 'contact',
  ])
})

test('contract rejects unsupported navigation targets and non-HTTP social URLs', () => {
  assert.equal(footerContentSchema.safeParse({
    ...fallbackFooterContent,
    navigation_links: [{ target: '/unknown', label_es: 'Otro', label_en: 'Other' }],
  }).success, false)
  assert.equal(footerContentSchema.safeParse({
    ...fallbackFooterContent,
    social_links: [{ ...fallbackFooterContent.social_links[0], url: 'javascript:alert(1)' }],
  }).success, false)
})

test('contract rejects malformed email and phone values', () => {
  assert.equal(footerContentSchema.safeParse({ ...fallbackFooterContent, email: 'invalid' }).success, false)
  assert.equal(footerContentSchema.safeParse({ ...fallbackFooterContent, phone_href: 'call-now' }).success, false)
  assert.equal(footerContentSchema.safeParse({ ...fallbackFooterContent, brand_name: 'x'.repeat(256) }).success, false)
})
