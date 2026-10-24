import assert from 'node:assert/strict'
import { test } from 'node:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { JsonLd } from '@/components/ui/JsonLd'
import {
  absoluteUrl,
  buildAlternates,
  buildLanguageAlternates,
  buildServiceDescription,
  SITE_URL,
} from '@/lib/seo'

test('absoluteUrl matches Next.js canonical normalization for the homepage', () => {
  assert.equal(absoluteUrl('/'), SITE_URL)
  assert.equal(absoluteUrl('/servicios'), `${SITE_URL}/servicios`)
})

test('localized alternates are reciprocal and use the Spanish page as x-default', () => {
  assert.deepEqual(buildLanguageAlternates('/servicios'), {
    es: `${SITE_URL}/servicios`,
    en: `${SITE_URL}/en/servicios`,
    'x-default': `${SITE_URL}/servicios`,
  })

  const english = buildAlternates('en', '/servicios')
  assert.equal(english?.canonical, `${SITE_URL}/en/servicios`)
  assert.deepEqual(english?.languages, buildLanguageAlternates('/servicios'))
})

test('Spanish-only routes do not advertise a nonexistent English alternate', () => {
  assert.deepEqual(buildLanguageAlternates('/comunas/las-condes', false), {
    es: `${SITE_URL}/comunas/las-condes`,
    'x-default': `${SITE_URL}/comunas/las-condes`,
  })
})

test('service description uses real service details and stays useful in English', () => {
  const description = buildServiceDescription(
    {
      title: 'Eco Diamond Pack',
      shortDescription: 'Full polish and interior cleaning.',
      price: 'From CLP $89,990',
      duration: '3–4 hrs',
    },
    'en'
  )

  assert.match(description, /Eco Diamond Pack at your location in Santiago/)
  assert.match(description, /Full polish and interior cleaning\./)
  assert.match(description, /From CLP \$89,990/)
  assert.match(description, /Duration: 3–4 hrs\./)
})

test('JSON-LD escapes script terminators in CMS-provided values', () => {
  const html = renderToStaticMarkup(JsonLd({ data: { name: '</script><script>alert(1)</script>' } }))

  assert.match(html, /\\u003c\/script>/)
  assert.doesNotMatch(html, /<\/script><script>alert/)
})
