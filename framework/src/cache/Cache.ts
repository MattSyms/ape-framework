import { validateKey } from './validateKey.js'
import type { Value } from './Value.js'

abstract class Cache {
  public async get<T extends Value>(
    key: string,
  ): Promise<T | undefined> {
    validateKey(key)

    const cached = await this._get(key)

    return cached === undefined ? undefined : this.deserialize<T>(cached)
  }

  public async set<T extends Value>(
    key: string,
    value: T,
    ttl?: number,
  ): Promise<void> {
    validateKey(key)

    return this._set(key, this.serialize(value), ttl)
  }

  public async delete(key: string): Promise<void> {
    validateKey(key)

    return this._delete(key)
  }

  public async has(key: string): Promise<boolean> {
    validateKey(key)

    return this._has(key)
  }

  public async getMany<T extends Value>(
    keys: string[],
  ): Promise<Map<string, T>> {
    keys.forEach(validateKey)

    const cached = await this._getMany(keys)

    const result = new Map<string, T>()

    for (const [key, value] of cached) {
      result.set(key, this.deserialize<T>(value))
    }

    return result
  }

  public async setMany<T extends Value>(
    entries: Map<string, T>,
    ttl?: number,
  ): Promise<void> {
    for (const key of entries.keys()) {
      validateKey(key)
    }

    const serialized = new Map<string, string>()

    for (const [key, value] of entries) {
      serialized.set(key, this.serialize(value))
    }

    return this._setMany(serialized, ttl)
  }

  public async deleteMany(keys: string[]): Promise<void> {
    keys.forEach(validateKey)

    return this._deleteMany(keys)
  }

  public async hasMany(keys: string[]): Promise<Set<string>> {
    keys.forEach(validateKey)

    return this._hasMany(keys)
  }

  public async getOrSet<T extends Value>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.get<T>(key)

    if (cached !== undefined) {
      return cached
    }

    const value = await fn()

    await this.set(key, value, ttl)

    return value
  }

  private serialize<T extends Value>(value: T): string {
    return JSON.stringify(value)
  }

  private deserialize<T extends Value>(value: string): T {
    return JSON.parse(value) as T
  }

  public abstract clear(): Promise<void>

  public abstract close(): Promise<void>

  protected abstract _get(key: string): Promise<string | undefined>

  protected abstract _set(
    key: string,
    value: string,
    ttl?: number
  ): Promise<void>

  protected abstract _delete(key: string): Promise<void>

  protected abstract _has(key: string): Promise<boolean>

  protected abstract _getMany(keys: string[]): Promise<Map<string, string>>

  protected abstract _setMany(
    entries: Map<string, string>,
    ttl?: number
  ): Promise<void>

  protected abstract _deleteMany(keys: string[]): Promise<void>

  protected abstract _hasMany(keys: string[]): Promise<Set<string>>
}

export {
  Cache,
}
