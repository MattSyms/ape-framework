import { ConflictError } from './errors/ConflictError.js'
import { normalizeMetadata } from './normalizeMetadata.js'
import { validateKey } from './validateKey.js'
import type { Info } from './Info.js'
import type { Metadata } from './Metadata.js'
import type { Object } from './Object.js'
import type { Readable } from 'node:stream'

const DEFAULT_CONTENT_TYPE = 'application/octet-stream'

abstract class Storage {
  public async getObject(key: string): Promise<Object | undefined> {
    validateKey(key)

    return this._getObject(key)
  }

  public async getObjectInfo(key: string): Promise<Info | undefined> {
    validateKey(key)

    return this._getObjectInfo(key)
  }

  public async* getObjects(prefix: string): AsyncGenerator<Info> {
    validateKey(prefix, true)

    yield* this._getObjects(prefix)
  }

  public async setObject(params: {
    key: string,
    content: Readable | Buffer | Uint8Array,
    contentType?: string,
    metadata?: Metadata,
  }): Promise<void> {
    validateKey(params.key)

    await this.validateNoConflict(params.key)

    return this._setObject({
      ...params,
      contentType: params.contentType ?? DEFAULT_CONTENT_TYPE,
      metadata: normalizeMetadata(params.metadata),
    })
  }

  public async deleteObject(key: string): Promise<void> {
    validateKey(key)

    return this._deleteObject(key)
  }

  public async deleteObjects(prefix: string): Promise<void> {
    validateKey(prefix, true)

    return this._deleteObjects(prefix)
  }

  private async validateNoConflict(key: string): Promise<void> {
    const segments = key.split('/')

    for (let i = 1; i < segments.length; i += 1) {
      const ancestor = segments.slice(0, i).join('/')

      const info = await this._getObjectInfo(ancestor)

      if (info) {
        throw new ConflictError(key, ancestor)
      }
    }

    const descendants = this._getObjects(`${key}/`)

    const first = await descendants.next()

    if (!first.done) {
      throw new ConflictError(key, first.value.key)
    }
  }

  public abstract close(): Promise<void>

  protected abstract _getObject(key: string): Promise<Object | undefined>

  protected abstract _getObjectInfo(key: string): Promise<Info | undefined>

  protected abstract _getObjects(prefix: string): AsyncGenerator<Info>

  protected abstract _setObject(params: {
    key: string,
    content: Readable | Buffer | Uint8Array,
    contentType: string,
    metadata: Metadata,
  }): Promise<void>

  protected abstract _deleteObject(key: string): Promise<void>

  protected abstract _deleteObjects(prefix: string): Promise<void>
}

export {
  Storage,
}
