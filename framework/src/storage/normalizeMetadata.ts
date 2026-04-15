import { MetadataError } from './errors/MetadataError.js'
import type { Metadata } from './Metadata.js'

const HTTP_TOKEN_REGEX = /^[!#$%&'*+\-.^_`|~0-9a-zA-Z]+$/u

const normalizeMetadata = (metadata?: Metadata): Metadata => {
  if (!metadata) {
    return {}
  }

  const normalized: Metadata = {}

  for (const [key, value] of Object.entries(metadata)) {
    if (!HTTP_TOKEN_REGEX.test(key)) {
      throw new MetadataError(`invalid key "${key}"`)
    }

    normalized[key.toLowerCase()] = value
  }

  return normalized
}

export {
  normalizeMetadata,
}
