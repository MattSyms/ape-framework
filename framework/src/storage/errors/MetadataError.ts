import { BaseError } from '../../error/BaseError.js'

class MetadataError extends BaseError {
  public constructor(message: string) {
    super(`invalid metadata: ${message}`)
  }
}

export {
  MetadataError,
}
