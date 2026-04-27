import { Redis } from 'ioredis'
import { getTls } from '../../../tls/getTls.js'
import { Cache } from '../../Cache.js'
import { validateKey } from '../../validateKey.js'
import type { Tls } from '../../../tls/Tls.js'

class RedisCache extends Cache {
  private readonly client: Redis

  private readonly keyPrefix: string

  private readonly batchSize: number

  public constructor(params: {
    host: string,
    port?: number,
    tls?: Tls,
    user?: string,
    password?: string,
    database?: number,
    keyPrefix?: string,
    batchSize?: number,
    connectionTimeout?: number,
    connectionKeepAlive?: number,
    commandTimeout?: number,
    commandMaxRetries?: number,
  }) {
    super()

    if (params.keyPrefix !== undefined) {
      validateKey(params.keyPrefix)
    }

    this.client = new Redis({
      host: params.host,
      port: params.port ?? 6379,
      tls: getTls(params.tls),
      username: params.user,
      password: params.password,
      db: params.database ?? 0,
      lazyConnect: true,
      connectTimeout: params.connectionTimeout ?? 10000,
      keepAlive: params.connectionKeepAlive ?? 30000,
      commandTimeout: params.commandTimeout ?? 5000,
      maxRetriesPerRequest: params.commandMaxRetries ?? 3,
    })

    this.keyPrefix = params.keyPrefix === undefined
      ? ''
      : `${params.keyPrefix}:`

    this.batchSize = params.batchSize ?? 100
  }

  public async clear(): Promise<void> {
    if (this.keyPrefix === '') {
      await this.client.flushdb()

      return
    }

    const match = `${this.keyPrefix}*`

    let cursor = '0'

    do {
      const [next, keys] = await this.client.scan(
        cursor,
        'MATCH',
        match,
        'COUNT',
        this.batchSize,
      )

      if (keys.length > 0) {
        await this.client.unlink(...keys)
      }

      cursor = next
    } while (cursor !== '0')
  }

  public async close(): Promise<void> {
    await this.client.quit()
  }

  protected async _get(key: string): Promise<string | undefined> {
    const value = await this.client.get(this.prefixKey(key))

    return value === null ? undefined : value
  }

  protected async _set(
    key: string,
    value: string,
    ttl?: number,
  ): Promise<void> {
    if (ttl === undefined) {
      await this.client.set(this.prefixKey(key), value)
    } else {
      await this.client.set(this.prefixKey(key), value, 'EX', ttl)
    }
  }

  protected async _delete(key: string): Promise<void> {
    await this.client.del(this.prefixKey(key))
  }

  protected async _has(key: string): Promise<boolean> {
    const count = await this.client.exists(this.prefixKey(key))

    return count === 1
  }

  protected async _getMany(
    keys: string[],
  ): Promise<Map<string, string>> {
    const result = new Map<string, string>()

    if (keys.length === 0) {
      return result
    }

    const prefixed = keys.map((k) => {
      return this.prefixKey(k)
    })

    const values = await this.client.mget(...prefixed)

    for (let i = 0; i < keys.length; i += 1) {
      const value = values[i]

      if (value !== null) {
        result.set(keys[i], value)
      }
    }

    return result
  }

  protected async _setMany(
    entries: Map<string, string>,
    ttl?: number,
  ): Promise<void> {
    if (entries.size === 0) {
      return
    }

    const pipeline = this.client.pipeline()

    for (const [key, value] of entries) {
      if (ttl === undefined) {
        pipeline.set(this.prefixKey(key), value)
      } else {
        pipeline.set(this.prefixKey(key), value, 'EX', ttl)
      }
    }

    await pipeline.exec()
  }

  protected async _deleteMany(keys: string[]): Promise<void> {
    if (keys.length === 0) {
      return
    }

    const prefixed = keys.map((k) => {
      return this.prefixKey(k)
    })

    await this.client.del(...prefixed)
  }

  protected async _hasMany(keys: string[]): Promise<Set<string>> {
    const result = new Set<string>()

    if (keys.length === 0) {
      return result
    }

    const pipeline = this.client.pipeline()

    for (const key of keys) {
      pipeline.exists(this.prefixKey(key))
    }

    const replies = await pipeline.exec() ?? []

    for (let i = 0; i < keys.length; i += 1) {
      const reply = replies[i]

      if (reply[0] === null && reply[1] === 1) {
        result.add(keys[i])
      }
    }

    return result
  }

  private prefixKey(key: string): string {
    return this.keyPrefix + key
  }
}

export {
  RedisCache,
}
