import { createHash } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import fs from 'fs-extra'
import { Storage } from '../../Storage.js'
import { validateKey } from '../../validateKey.js'
import type { Info } from '../../Info.js'
import type { Metadata } from '../../Metadata.js'
import type { Object } from '../../Object.js'

class FsStorage extends Storage {
  private readonly root: string

  private readonly concurrency: number

  public constructor(params: {
    root: string,
    concurrency?: number,
  }) {
    super()

    this.root = resolve(params.root)
    this.concurrency = params.concurrency ?? 10

    fs.ensureDirSync(this.root)
  }

  public async getObject(key: string): Promise<Object | undefined> {
    validateKey(key)

    const info = await this.readInfo(key)

    if (!info) {
      return undefined
    }

    return {
      info,
      content: createReadStream(join(this.root, key, '.content')),
    }
  }

  public async getObjectInfo(key: string): Promise<Info | undefined> {
    validateKey(key)

    return this.readInfo(key)
  }

  public async* getObjects(prefix: string): AsyncGenerator<Info> {
    validateKey(prefix, true)

    for await (const key of this.getKeysByPrefix(prefix)) {
      const info = await this.readInfo(key)

      if (info) {
        yield info
      }
    }
  }

  public async setObject(params: {
    key: string,
    content: Readable | Buffer | Uint8Array,
    contentType?: string,
    metadata?: Metadata,
  }): Promise<void> {
    validateKey(params.key)

    const contentFilePath = join(this.root, params.key, '.content')
    const tmpFilePath = `${contentFilePath}.tmp`

    await fs.ensureDir(join(this.root, params.key))

    const stream = params.content instanceof Uint8Array
      ? Readable.from(Buffer.from(params.content))
      : params.content

    const hash = createHash('md5')

    let size = 0

    const meter = new Transform({
      transform: (chunk, encoding, callback): void => {
        hash.update(chunk)
        size += chunk.length
        callback(null, chunk)
      },
    })

    try {
      await pipeline(stream, meter, createWriteStream(tmpFilePath))
    } catch (error) {
      await fs.remove(tmpFilePath)
      throw error
    }

    await fs.rename(tmpFilePath, contentFilePath)

    await this.writeInfo({
      key: params.key,
      contentType: params.contentType,
      size,
      lastModified: new Date(),
      eTag: hash.digest('hex'),
      metadata: params.metadata,
    })
  }

  public async deleteObject(key: string): Promise<void> {
    validateKey(key)

    await fs.remove(join(this.root, key))
    await this.pruneEmptyDirs(key)
  }

  public async deleteObjects(prefix: string): Promise<void> {
    validateKey(prefix, true)

    const batch: Promise<void>[] = []

    for await (const key of this.getKeysByPrefix(prefix)) {
      batch.push(this.deleteObject(key))

      if (batch.length >= this.concurrency) {
        await Promise.all(batch)
        batch.length = 0
      }
    }

    if (batch.length > 0) {
      await Promise.all(batch)
    }
  }

  public async close(): Promise<void> {}

  private async readInfo(key: string): Promise<Info | undefined> {
    try {
      const info: Info = await fs.readJson(join(this.root, key, '.info.json'))

      return {
        key: info.key,
        contentType: info.contentType,
        size: info.size,
        lastModified: new Date(info.lastModified),
        eTag: info.eTag,
        metadata: info.metadata,
      }
    } catch {
      return undefined
    }
  }

  private async writeInfo(info: Info): Promise<void> {
    const infoFilePath = join(this.root, info.key, '.info.json')
    const tmpFilePath = `${infoFilePath}.tmp`

    try {
      await fs.writeJson(tmpFilePath, info)
    } catch (error) {
      await fs.remove(tmpFilePath)
      throw error
    }

    await fs.rename(tmpFilePath, infoFilePath)
  }

  private async* getKeysByPrefix(prefix: string): AsyncGenerator<string> {
    const lastSlashIndex = prefix.lastIndexOf('/')

    const parentDir = lastSlashIndex >= 0
      ? join(this.root, prefix.substring(0, lastSlashIndex))
      : this.root

    if (!await this.isDirectory(parentDir)) {
      return
    }

    for await (const key of this.walkDir(parentDir)) {
      if (key.startsWith(prefix)) {
        yield key
      }
    }
  }

  private async* walkDir(dir: string): AsyncGenerator<string> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = join(dir, entry.name)

      if (entry.name.startsWith('.')) {
        if (entry.name === '.info.json') {
          yield relative(this.root, dir)
        }
      } else if (entry.isDirectory()) {
        yield* this.walkDir(entryPath)
      }
    }
  }

  private async isDirectory(path: string): Promise<boolean> {
    try {
      return (await fs.stat(path)).isDirectory()
    } catch {
      return false
    }
  }

  private async pruneEmptyDirs(key: string): Promise<void> {
    const segments = key.split('/')

    for (let i = segments.length - 1; i >= 1; i -= 1) {
      const dir = join(this.root, ...segments.slice(0, i))

      try {
        const entries = await fs.readdir(dir)

        if (entries.length === 0) {
          await fs.remove(dir)
        } else {
          break
        }
      } catch {
        break
      }
    }
  }
}

export {
  FsStorage,
}
