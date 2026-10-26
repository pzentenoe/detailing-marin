import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  DEFAULT_HOMEPAGE_MEDIA,
  homepageAssetUrl,
  homepageMediaFromContent,
  homepageMediaIds,
  isHomepageMedia,
  type HomepageMedia,
} from './homepage-media'

const FILES = [
  '123e4567-e89b-42d3-a456-426614174000',
  '223e4567-e89b-42d3-a456-426614174001',
  '323e4567-e89b-42d3-a456-426614174002',
  '423e4567-e89b-42d3-a456-426614174003',
  '523e4567-e89b-42d3-a456-426614174004',
  '623e4567-e89b-42d3-a456-426614174005',
  '723e4567-e89b-42d3-a456-426614174006',
  '823e4567-e89b-42d3-a456-426614174007',
  '923e4567-e89b-42d3-a456-426614174008',
  'a23e4567-e89b-42d3-a456-426614174009',
  'b23e4567-e89b-42d3-a456-426614174010',
  'c23e4567-e89b-42d3-a456-426614174011',
  'd23e4567-e89b-42d3-a456-426614174012',
] as const

const COMPLETE_MEDIA: HomepageMedia = {
  hero: FILES[0],
  features: [FILES[1], FILES[2], FILES[3]],
  industrial: FILES[4],
  results: {
    motor: { before: FILES[5], after: FILES[6] },
    tapiz: { before: FILES[7], after: FILES[8] },
    focos: { before: FILES[9], after: FILES[10] },
    exterior: { before: FILES[11], after: FILES[12] },
  },
}

test('homepage media contract accepts defaults and all managed photo slots', () => {
  assert.equal(isHomepageMedia(DEFAULT_HOMEPAGE_MEDIA), true)
  assert.equal(isHomepageMedia(COMPLETE_MEDIA), true)
  assert.equal(homepageMediaIds(COMPLETE_MEDIA).length, 13)
})

test('homepage media contract rejects invalid IDs, missing slots, and unknown fields', () => {
  assert.equal(isHomepageMedia({ ...COMPLETE_MEDIA, hero: 'not-a-file-id' }), false)
  assert.equal(isHomepageMedia({ ...COMPLETE_MEDIA, extra: FILES[0] }), false)
  assert.equal(isHomepageMedia({ ...COMPLETE_MEDIA, features: [FILES[0]] }), false)
})

test('homepage media is read from the reserved Directus JSON key with a safe fallback', () => {
  assert.deepEqual(homepageMediaFromContent({ _media: COMPLETE_MEDIA }), COMPLETE_MEDIA)
  assert.deepEqual(homepageMediaFromContent({ _media: { hero: '../../private' } }), DEFAULT_HOMEPAGE_MEDIA)
})

test('public asset URLs are generated only for a selected file ID', () => {
  assert.equal(homepageAssetUrl(FILES[0]), `/api/directus-assets/${FILES[0]}`)
  assert.equal(homepageAssetUrl(null), undefined)
})
