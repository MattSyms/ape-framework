import { createHash } from 'node:crypto'
import { createReadStream, createWriteStream } from 'node:fs'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import fs from 'fs-extra'
import { Storage } from '../../Storage.js'
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

  public async close(): Promise<void> { }

  protected async _getObject(key: string): Promise<Object | undefined> {
    const info = await this.readInfo(key)

    if (!info) {
      return undefined
    }

    return {
      info,
      content: createReadStream(join(this.root, key)),
    }
  }

  protected async _getObjectInfo(key: string): Promise<Info | undefined> {
    return this.readInfo(key)
  }

  protected async* _getObjects(prefix: string): AsyncGenerator<Info> {
    for await (const key of this.getKeysByPrefix(prefix)) {
      const info = await this.readInfo(key)

      if (info) {
        yield info
      }
    }
  }

  protected async _setObject(params: {
    key: string,
    content: Readable | Buffer | Uint8Array,
    contentType: string,
    metadata: Metadata,
  }): Promise<void> {
    const contentFilePath = join(this.root, params.key)

    const tmpFilePath = this.tmpPath(contentFilePath)

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
      await fs.rename(tmpFilePath, contentFilePath)
    } catch (error) {
      await fs.remove(tmpFilePath)
      throw error
    }

    await this.writeInfo({
      key: params.key,
      contentType: params.contentType,
      size,
      lastModified: new Date(),
      eTag: hash.digest('hex'),
      metadata: params.metadata,
    })
  }

  protected async _deleteObject(key: string): Promise<void> {
    await fs.remove(this.infoPath(key))
    await fs.remove(join(this.root, key))
    await this.removeEmptyDirectories(key)
  }

  protected async _deleteObjects(prefix: string): Promise<void> {
    const batch: Promise<void>[] = []

    for await (const key of this.getKeysByPrefix(prefix)) {
      batch.push(this._deleteObject(key))

      if (batch.length >= this.concurrency) {
        await Promise.all(batch)
        batch.length = 0
      }
    }

    if (batch.length > 0) {
      await Promise.all(batch)
    }
  }

  private infoPath(key: string): string {
    return join(this.root, INFO_DIRECTORY, `${key}${INFO_EXTENSION}`)
  }

  private tmpPath(filePath: string): string {
    return join(dirname(filePath), `.${basename(filePath)}${TMP_EXTENSION}`)
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

    const tmpFilePath = this.tmpPath(infoFilePath)

    await fs.ensureDir(dirname(infoFilePath))

    try {
      await fs.writeJson(tmpFilePath, info)
      await fs.rename(tmpFilePath, infoFilePath)
    } catch (error) {
      await fs.remove(tmpFilePath)
      throw error
    }
  }

  private async* getKeysByPrefix(prefix: string): AsyncGenerator<string> {
    const infoRoot = join(this.root, INFO_DIRECTORY)

    const lastSlashIndex = prefix.lastIndexOf('/')

    const parentDir = lastSlashIndex >= 0
      ? join(infoRoot, prefix.substring(0, lastSlashIndex))
      : infoRoot

    try {
      if (!(await fs.stat(parentDir)).isDirectory()) {
        return
      }
    } catch {
      return
    }

    for await (const key of this.walkDirectory(parentDir)) {
      if (key.startsWith(prefix)) {
        yield key
      }
    }
  }

  private async* walkDirectory(dir: string): AsyncGenerator<string> {
    const infoRoot = join(this.root, INFO_DIRECTORY)

    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        yield* this.walkDirectory(join(dir, entry.name))
      } else if (entry.isFile()) {
        const path = join(dir, entry.name)

        yield relative(infoRoot, path).slice(0, -INFO_EXTENSION.length)
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
}

export {
  FsStorage,
}
