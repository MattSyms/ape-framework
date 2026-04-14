import { KeyError } from './errors/KeyError.js'

const MAX_KEY_LENGTH = 1024

const MAX_SEGMENT_LENGTH = 255

const validateKey = (key: string, isPrefix = false): void => {
  if (key.length === 0 && !isPrefix) {
    throw new KeyError(key, 'key is empty')
  }

  if (key.length > MAX_KEY_LENGTH) {
    throw new KeyError(
      key,
      `key exceeds ${MAX_KEY_LENGTH} characters`,
    )
  }

  if (key.startsWith('/')) {
    throw new KeyError(key, 'key starts with "/"')
  }

  if (key.endsWith('/') && !isPrefix) {
    throw new KeyError(key, 'key ends with "/"')
  }

  if (key.includes('//')) {
    throw new KeyError(key, 'key contains "//"')
  }

  if (key.includes('\\')) {
    throw new KeyError(key, 'key contains "\\"')
  }

  if (key !== key.trim()) {
    throw new KeyError(key, 'key contains a leading or trailing whitespace')
  }

  for (let i = 0; i < key.length; i += 1) {
    const code = key.charCodeAt(i)

    if (code <= 31 || code === 127) {
      throw new KeyError(key, 'key contains a control character')
    }
  }

  const segments = key.split('/')

  for (const segment of segments) {
    if (segment.length > MAX_SEGMENT_LENGTH) {
      throw new KeyError(
        key,
        `key segment exceeds ${MAX_SEGMENT_LENGTH} characters`,
      )
    }

    if (segment.startsWith('.')) {
      throw new KeyError(key, 'key segment starts with "."')
    }
  }
}

export {
  validateKey,
}
