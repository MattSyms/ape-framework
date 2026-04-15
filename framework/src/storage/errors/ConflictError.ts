import { BaseError } from '../../error/BaseError.js'

class ConflictError extends BaseError {
  public constructor(key: string, conflictingKey: string) {
    super(`key "${key}" conflicts with existing key "${conflictingKey}"`)
  }
}

export {
  ConflictError,
}
