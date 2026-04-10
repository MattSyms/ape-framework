import type { Info } from './Info.js'
import type { Object } from './Object.js'
import type { Stream } from './Stream.js'

abstract class Storage {
  public abstract getObject(key: string): Promise<Object | undefined>

  public abstract getObjectInfo(key: string): Promise<Info | undefined>

  public abstract getObjects(prefix: string): Promise<Info[]>

  public abstract setObject(params: {
    key: string,
    contentType?: string,
    stream: Stream,
  }): Promise<void>

  public abstract deleteObject(key: string): Promise<void>

  public abstract deleteObjects(prefix: string): Promise<void>

  public abstract close(): Promise<void>
}

export {
  Storage,
}
