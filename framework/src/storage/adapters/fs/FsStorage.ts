import { createHash } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import fs from 'fs-extra'
import { Storage } from '../../Storage.js'
import { validateKey } from '../../validateKey.js'
import type { Info } from '../../Info.js'
import type { Metadata } from '../../Metadata.js'
import type { Object } from '../../Object.js'

const INFO_DIRECTORY = '.info'

const INFO_EXTENSION = '.json'

const TMP_EXTENSION = '.tmp'

class FsStorage extends Storage {
  private readonly root: string

  private readonly concurrency: number

  public constructor(params: {
    root: string,
    concurrency?: number,
  }) {
    super()

    this.root = resolve(params.root)
    this.concurrency = params.concurrency ?? 100

    fs.ensureDirSync(this.root)
    fs.ensureDirSync(join(this.root, INFO_DIRECTORY))
  }

  public async getObject(key: string): Promise<Object | undefined> {
    validateKey(key)

    const info = await this.readInfo(key)

    if (!info) {
      return undefined
    }

    return {
      info,
      content: createReadStream(join(this.root, key)),
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

    const contentFilePath = join(this.root, params.key)

    const tmpFilePath = `${contentFilePath}${TMP_EXTENSION}`

    await fs.ensureDir(dirname(contentFilePath))

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
      contentType: params.contentType ?? 'binary/octet-stream',
      size,
      lastModified: new Date(),
      eTag: hash.digest('hex'),
      metadata: this.normalizeMetadata(params.metadata),
    })
  }

  public async deleteObject(key: string): Promise<void> {
    validateKey(key)

    await fs.remove(join(this.root, key))
    await fs.remove(this.infoPath(key))
    await this.removeEmptyDirectories(key)
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

  public async close(): Promise<void> { }

  private infoPath(key: string): string {
    return join(this.root, INFO_DIRECTORY, `${key}${INFO_EXTENSION}`)
  }

  private async readInfo(key: string): Promise<Info | undefined> {
    try {
      const info: Info = await fs.readJson(this.infoPath(key))

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
    const infoFilePath = this.infoPath(info.key)

    const tmpFilePath = `${infoFilePath}${TMP_EXTENSION}`

    await fs.ensureDir(dirname(infoFilePath))

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

    for await (const key of this.walkDirectory(parentDir)) {
      if (key.startsWith(prefix)) {
        yield key
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

  private async* walkDirectory(dir: string): AsyncGenerator<string> {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.name !== INFO_DIRECTORY && entry.isDirectory()) {
        yield* this.walkDirectory(join(dir, entry.name))
      } else if (entry.isFile()) {
        yield relative(this.root, join(dir, entry.name))
      }
    }
  }

  private async removeEmptyDirectories(key: string): Promise<void> {
    const segments = key.split('/')

    for (let i = segments.length - 1; i >= 1; i -= 1) {
      const path = segments.slice(0, i)
      const contentDir = join(this.root, ...path)
      const infoDir = join(this.root, INFO_DIRECTORY, ...path)

      try {
        await this.removeIfEmpty(contentDir)
        await this.removeIfEmpty(infoDir)
      } catch {
        break
      }
    }
  }

  private async removeIfEmpty(dir: string): Promise<void> {
    if (!await fs.pathExists(dir)) {
      return
    }

    const entries = await fs.readdir(dir)

    if (entries.length === 0) {
      await fs.remove(dir)
    }
  }

  private normalizeMetadata(metadata?: Metadata): Metadata {
    if (!metadata) {
      return {}
    }

    const normalized: Metadata = {}

    for (const [key, value] of Object.entries(metadata)) {
      normalized[key.toLowerCase()] = value
    }

    return normalized
  }
}

export {
  FsStorage,
}
