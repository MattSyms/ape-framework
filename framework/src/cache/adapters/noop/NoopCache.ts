import { Cache } from '../../Cache.js'

class NoopCache extends Cache {
  public async clear(): Promise<void> { }

  public async close(): Promise<void> { }

  protected async _getEntry(): Promise<string | undefined> {
    return undefined
  }

  protected async _setEntry(): Promise<void> { }

  protected async _deleteEntry(): Promise<void> { }

  protected async _hasKey(): Promise<boolean> {
    return false
  }

  protected async _getEntries(): Promise<Map<string, string>> {
    return new Map()
  }

  protected async _setEntries(): Promise<void> { }

  protected async _deleteEntries(): Promise<void> { }

  protected async _hasKeys(): Promise<Set<string>> {
    return new Set()
  }
}

export {
  NoopCache,
}
