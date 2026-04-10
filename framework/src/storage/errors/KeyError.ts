import { BaseError } from '../../error/BaseError.js'

class KeyError extends BaseError {
  public constructor(key: string, message: string) {
    super(`invalid key "${key}": ${message}`)
  }
}

export {
  KeyError,
}
