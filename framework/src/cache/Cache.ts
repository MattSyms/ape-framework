import { validateKey } from './validateKey.js'
import type { JsonValue } from './JsonValue.js'

abstract class Cache {
  public async getEntry<T extends JsonValue>(
    key: string,
  ): Promise<T | undefined> {
    validateKey(key)

    const cached = await this._getEntry(key)

    return cached === undefined ? undefined : this.deserialize<T>(cached)
  }

  public async setEntry<T extends JsonValue>(
    key: string,
    value: T,
    ttl?: number,
  ): Promise<void> {
    validateKey(key)

    return this._setEntry(key, this.serialize(value), ttl)
  }

  public async deleteEntry(key: string): Promise<void> {
    validateKey(key)

    return this._deleteEntry(key)
  }

  public async hasEntry(key: string): Promise<boolean> {
    validateKey(key)

    return this._hasKey(key)
  }

  public async getEntries<T extends JsonValue>(
    keys: string[],
  ): Promise<Map<string, T>> {
    keys.forEach(validateKey)

    const cached = await this._getEntries(keys)

    const result = new Map<string, T>()

    for (const [key, value] of cached) {
      result.set(key, this.deserialize<T>(value))
    }

    return result
  }

  public async setEntries<T extends JsonValue>(
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

    return this._setEntries(serialized, ttl)
  }

  public async deleteEntries(keys: string[]): Promise<void> {
    keys.forEach(validateKey)

    return this._deleteEntries(keys)
  }

  public async hasEntries(keys: string[]): Promise<Set<string>> {
    keys.forEach(validateKey)

    return this._hasKeys(keys)
  }

  public async getOrSetEntry<T extends JsonValue>(
    key: string,
    fn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.getEntry<T>(key)

    if (cached !== undefined) {
      return cached
    }

    const value = await fn()

    await this.setEntry(key, value, ttl)

    return value
  }

  private serialize<T extends JsonValue>(value: T): string {
    return JSON.stringify(value)
  }

  private deserialize<T extends JsonValue>(value: string): T {
    return JSON.parse(value) as T
  }

  public abstract clear(): Promise<void>

  public abstract close(): Promise<void>

  protected abstract _getEntry(key: string): Promise<string | undefined>

  protected abstract _setEntry(
    key: string,
    value: string,
    ttl?: number
  ): Promise<void>

  protected abstract _deleteEntry(key: string): Promise<void>

  protected abstract _hasKey(key: string): Promise<boolean>

  protected abstract _getEntries(keys: string[]): Promise<Map<string, string>>

  protected abstract _setEntries(
    entries: Map<string, string>,
    ttl?: number
  ): Promise<void>

  protected abstract _deleteEntries(keys: string[]): Promise<void>

  protected abstract _hasKeys(keys: string[]): Promise<Set<string>>
}

export {
  Cache,
}
