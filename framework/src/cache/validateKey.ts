import { KeyError } from './errors/KeyError.js'

const MAX_KEY_LENGTH = 512

const validateKey = (key: string): void => {
  if (key.length === 0) {
    throw new KeyError(key, 'key is empty')
  }

  if (key.length > MAX_KEY_LENGTH) {
    throw new KeyError(key, `key exceeds ${MAX_KEY_LENGTH} characters`)
  }

  if (key !== key.trim()) {
    throw new KeyError(key, 'key contains a leading or trailing whitespace')
  }

  for (let i = 0; i < key.length; i += 1) {
    const code = key.charCodeAt(i)

    if (code === 32) {
      throw new KeyError(key, 'key contains a space character')
    } else if (code <= 31 || code === 127) {
      throw new KeyError(key, 'key contains a control character')
    } else if (code > 127) {
      throw new KeyError(key, 'key contains a non-ASCII character')
    }
  }
}

export {
  validateKey,
}
