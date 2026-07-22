import messages from '../messages/es.json'

function messageAt(path: string) {
  const value = path.split('.').reduce<unknown>((current, key) => {
    if (typeof current !== 'object' || current === null || !(key in current)) {
      throw new Error(`Missing Storybook translation: ${path}`)
    }

    return (current as Record<string, unknown>)[key]
  }, messages)

  if (typeof value !== 'string') {
    throw new Error(`Storybook translation is not a string: ${path}`)
  }

  return value
}

export async function getTranslations(namespace?: string) {
  return (key: string) => messageAt([namespace, key].filter(Boolean).join('.'))
}
