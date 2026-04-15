import http from 'node:http'
import https from 'node:https'
import { Readable } from 'node:stream'
import { Client } from 'minio'
import { Storage } from '../../Storage.js'
import type { Info } from '../../Info.js'
import type { Metadata } from '../../Metadata.js'
import type { Object } from '../../Object.js'

const EXCLUDED_METADATA_KEYS = new Set([
  'content-type',
])

class MinioStorage extends Storage {
  private readonly client: Client

  private readonly agent: http.Agent

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

    this.agent = params.tls
      ? new https.Agent({ keepAlive: true })
      : new http.Agent({ keepAlive: true })

    this.client = new Client({
      endPoint: params.host,
      port: params.port ?? 9000,
      useSSL: params.tls ?? false,
      accessKey: params.accessKey,
      secretKey: params.secretKey,
      region: params.region,
      transportAgent: this.agent,
    })

    this.bucket = params.bucket
    this.concurrency = params.concurrency ?? 100
  }

  public async close(): Promise<void> {
    this.agent.destroy()
  }

  protected async _getObject(key: string): Promise<Object | undefined> {
    const info = await this._getObjectInfo(key)

    if (!info) {
      return undefined
    }

    const content = await this.client.getObject(this.bucket, key)

    return {
      info,
      content,
    }
  }

  protected async _getObjectInfo(key: string): Promise<Info | undefined> {
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

  protected async* _getObjects(prefix: string): AsyncGenerator<Info> {
    const stream = this.client.listObjects(this.bucket, prefix, true)

    for await (const item of stream) {
      if (item.name) {
        const info = await this._getObjectInfo(item.name)

        if (info) {
          yield info
        }
      }
    }
  }

  protected async _setObject(params: {
    key: string,
    content: Readable | Buffer | Uint8Array,
    contentType?: string,
    metadata?: Metadata,
  }): Promise<void> {
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

  protected async _deleteObject(key: string): Promise<void> {
    await this.client.removeObject(this.bucket, key)
  }

  protected async _deleteObjects(prefix: string): Promise<void> {
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

  private getMetadata(
    metaData: Record<string, string>,
  ): Metadata {
    const metadata: Metadata = {}

    for (const [key, value] of Object.entries(metaData)) {
      if (!EXCLUDED_METADATA_KEYS.has(key)) {
        metadata[key] = value
      }
    }

    return metadata
  }
}

export {
  MinioStorage,
}
