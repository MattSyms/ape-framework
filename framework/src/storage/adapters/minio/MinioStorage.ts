import { Readable } from 'node:stream'
import { Client } from 'minio'
import { Storage } from '../../Storage.js'
import { validateKey } from '../../validateKey.js'
import type { Info } from '../../Info.js'
import type { Metadata } from '../../Metadata.js'
import type { Object } from '../../Object.js'

const EXCLUDED_METADATA_KEYS = new Set([
  'content-type',
])

class MinioStorage extends Storage {
  private readonly client: Client

  private readonly bucket: string

  private readonly concurrency: number

  public constructor(params: {
    host: string,
    port?: number,
    tls?: boolean,
    accessKey: string,
    secretKey: string,
    bucket: string,
    region?: string,
    concurrency?: number,
  }) {
    super()

    this.client = new Client({
      endPoint: params.host,
      port: params.port ?? 9000,
      useSSL: params.tls ?? false,
      accessKey: params.accessKey,
      secretKey: params.secretKey,
      region: params.region,
    })

    this.bucket = params.bucket
    this.concurrency = params.concurrency ?? 100
  }

  public async getObject(key: string): Promise<Object | undefined> {
    validateKey(key)

    const info = await this.getObjectInfo(key)

    if (!info) {
      return undefined
    }

    const content = await this.client.getObject(this.bucket, key)

    return {
      info,
      content,
    }
  }

  public async getObjectInfo(key: string): Promise<Info | undefined> {
    validateKey(key)

    try {
      const stat = await this.client.statObject(this.bucket, key)

      return {
        key,
        contentType: stat.metaData['content-type'],
        size: stat.size,
        lastModified: stat.lastModified,
        eTag: stat.etag,
        metadata: this.getMetadata(stat.metaData),
      }
    } catch (error: any) {
      if (error?.statusCode === 404 || error?.code === 'NotFound') {
        return undefined
      }

      throw error
    }
  }

  public async* getObjects(prefix: string): AsyncGenerator<Info> {
    validateKey(prefix, true)

    const stream = this.client.listObjects(this.bucket, prefix, true)

    for await (const item of stream) {
      if (item.name) {
        const info = await this.getObjectInfo(item.name)

        if (info) {
          yield info
        }
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

    const headers: Record<string, string> = {
      ...params.metadata,
    }

    if (params.contentType) {
      headers['Content-Type'] = params.contentType
    }

    const stream = params.content instanceof Uint8Array
      ? Readable.from(Buffer.from(params.content))
      : params.content

    await this.client.putObject(
      this.bucket,
      params.key,
      stream,
      undefined,
      headers,
    )
  }

  public async deleteObject(key: string): Promise<void> {
    validateKey(key)

    await this.client.removeObject(this.bucket, key)
  }

  public async deleteObjects(prefix: string): Promise<void> {
    validateKey(prefix, true)

    const stream = this.client.listObjects(this.bucket, prefix, true)

    const batch: string[] = []

    for await (const item of stream) {
      if (item.name) {
        batch.push(item.name)

        if (batch.length >= this.concurrency) {
          await this.client.removeObjects(this.bucket, batch)
          batch.length = 0
        }
      }
    }

    if (batch.length > 0) {
      await this.client.removeObjects(this.bucket, batch)
    }
  }

  public async close(): Promise<void> { }

  private getMetadata(
    metaData: Record<string, string>,
  ): Metadata {
    const metadata: Metadata = {}

    for (const [key, value] of globalThis.Object.entries(metaData)) {
      const lower = key.toLowerCase()

      if (!EXCLUDED_METADATA_KEYS.has(lower)) {
        metadata[lower] = value
      }
    }

    return metadata
  }
}

export {
  MinioStorage,
}
