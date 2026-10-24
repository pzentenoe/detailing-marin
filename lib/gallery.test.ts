import assert from 'node:assert/strict'
import { test } from 'node:test'
import { galleryCategories, galleryComparisons, galleryPhotos, galleryPreviewIds } from './gallery'

test('gallery seed keeps every home preview and comparison image in the migration manifest', () => {
  const photoIds = new Set(galleryPhotos.map(({ id }) => id))
  const imagePaths = new Set([
    ...galleryPhotos.map(({ src }) => src),
    ...galleryComparisons.flatMap(({ beforeSrc, afterSrc }) => [beforeSrc, afterSrc]),
  ])

  assert.equal(galleryPhotos.length, 29)
  assert.equal(galleryComparisons.length, 4)
  assert.equal(imagePaths.size, 33)
  assert.ok(galleryPreviewIds.every((id) => photoIds.has(id)))
  assert.ok(galleryPhotos.every(({ category }) => galleryCategories.includes(category)))
})
