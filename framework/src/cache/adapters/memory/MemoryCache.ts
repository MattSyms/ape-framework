import { Cache } from '../../Cache.js'
import type { Entry } from './Entry.js'

class MemoryCache extends Cache {
  private readonly store: Map<string, Entry>

  private readonly maxEntries: number | undefined

  private readonly sweepInterval: number

  private lastSweepAt: number

  public constructor(params?: {
    maxEntries?: number,
    sweepInterval?: number,
  }) {
    super()

    this.store = new Map()
    this.maxEntries = params?.maxEntries
    this.sweepInterval = (params?.sweepInterval ?? 60) * 1000
    this.lastSweepAt = Date.now()
  }

  public async clear(): Promise<void> {
    this.store.clear()
  }

  public async close(): Promise<void> {
    this.store.clear()
  }

  protected async _getEntry(key: string): Promise<string | undefined> {
    return this.read(key, true, Date.now())
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
    return this.read(key, false, Date.now()) !== undefined
  }

  protected async _getEntries(keys: string[]): Promise<Map<string, string>> {
    const now = Date.now()

    const entries = new Map<string, string>()

    for (const key of keys) {
      const value = this.read(key, true, now)

      if (value !== undefined) {
        entries.set(key, value)
      }
    }

    return entries
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
    const now = Date.now()

    const result = new Set<string>()

    for (const key of keys) {
      if (this.read(key, false, now) !== undefined) {
        result.add(key)
      }
    }

    return result
  }

  private read(key: string, touch: boolean, now: number): string | undefined {
    const entry = this.store.get(key)

    if (entry === undefined) {
      return undefined
    }

    if (this.isExpired(entry, now)) {
      this.store.delete(key)

      return undefined
    }

    if (touch && this.maxEntries !== undefined) {
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

    if (this.maxEntries !== undefined && this.store.size > this.maxEntries) {
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

  private isExpired(entry: Entry, now: number): boolean {
    return entry.expiresAt !== undefined && entry.expiresAt <= now
  }

  private sweep(now: number): void {
    for (const [key, entry] of this.store) {
      if (this.isExpired(entry, now)) {
        this.store.delete(key)
      }
    }
  }
}

export {
  MemoryCache,
}
