import { Cache } from '../../Cache.js'

interface Entry {
  value: string,
  expiresAt: number | undefined,
}

class MemoryCache extends Cache {
  private readonly store: Map<string, Entry>

  private readonly maxSize: number | undefined

  private readonly sweepInterval: number

  private lastSweepAt: number

  public constructor(params?: {
    maxSize?: number,
    sweepInterval?: number,
  }) {
    super()

    this.store = new Map()
    this.maxSize = params?.maxSize
    this.sweepInterval = (params?.sweepInterval ?? 60) * 1000
    this.lastSweepAt = Date.now()
  }

  public async clear(): Promise<void> {
    this.store.clear()
    this.lastSweepAt = Date.now()
  }

  public async close(): Promise<void> {
    this.store.clear()
    this.lastSweepAt = Date.now()
  }

  protected async _getEntry(key: string): Promise<string | undefined> {
    return this.read(key)
  }

  protected async _setEntry(
    key: string,
    value: string,
    ttl?: number,
  ): Promise<void> {
    this.write(key, value, ttl)
  }

  protected async _deleteEntry(key: string): Promise<void> {
    this.store.delete(key)
  }

  protected async _hasKey(key: string): Promise<boolean> {
    return this.read(key) !== undefined
  }

  protected async _getEntries(
    keys: string[],
  ): Promise<Map<string, string>> {
    const result = new Map<string, string>()

    for (const key of keys) {
      const value = this.read(key)

      if (value !== undefined) {
        result.set(key, value)
      }
    }

    return result
  }

  protected async _setEntries(
    entries: Map<string, string>,
    ttl?: number,
  ): Promise<void> {
    for (const [key, value] of entries) {
      this.write(key, value, ttl)
    }
  }

  protected async _deleteEntries(keys: string[]): Promise<void> {
    for (const key of keys) {
      this.store.delete(key)
    }
  }

  protected async _hasKeys(keys: string[]): Promise<Set<string>> {
    const result = new Set<string>()

    for (const key of keys) {
      if (this.read(key) !== undefined) {
        result.add(key)
      }
    }

    return result
  }

  private read(key: string): string | undefined {
    const entry = this.store.get(key)

    if (entry === undefined) {
      return undefined
    }

    if (this.isExpired(entry)) {
      this.store.delete(key)

      return undefined
    }

    if (this.maxSize !== undefined) {
      this.store.delete(key)
      this.store.set(key, entry)
    }

    return entry.value
  }

  private write(key: string, value: string, ttl?: number): void {
    const now = Date.now()

    this.store.delete(key)

    this.store.set(key, {
      value,
      expiresAt: ttl === undefined ? undefined : now + ttl * 1000,
    })

    if (this.maxSize !== undefined && this.store.size > this.maxSize) {
      const oldest = this.store.keys().next().value

      if (oldest !== undefined) {
        this.store.delete(oldest)
      }
    }

    if (now - this.lastSweepAt >= this.sweepInterval) {
      this.sweep(now)
      this.lastSweepAt = now
    }
  }

  private isExpired(entry: Entry): boolean {
    return entry.expiresAt !== undefined && entry.expiresAt <= Date.now()
  }

  private sweep(now: number): void {
    for (const [key, entry] of this.store) {
      if (entry.expiresAt !== undefined && entry.expiresAt <= now) {
        this.store.delete(key)
      }
    }
  }
}

export {
  MemoryCache,
}
