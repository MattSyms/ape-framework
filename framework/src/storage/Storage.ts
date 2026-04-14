import type { Info } from './Info.js'
import type { Metadata } from './Metadata.js'
import type { Object } from './Object.js'
import type { Readable } from 'node:stream'

abstract class Storage {
  public abstract getObject(key: string): Promise<Object | undefined>

  public abstract getObjectInfo(key: string): Promise<Info | undefined>

  public abstract getObjects(prefix: string): AsyncGenerator<Info>

  public abstract setObject(params: {
    key: string,
    content: Readable | Buffer | Uint8Array,
    contentType?: string,
    metadata?: Metadata,
  }): Promise<void>

  public abstract deleteObject(key: string): Promise<void>

  public abstract deleteObjects(prefix: string): Promise<void>

  public abstract close(): Promise<void>
}

export {
  Storage,
}
