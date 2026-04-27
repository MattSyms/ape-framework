import { Cache } from '../../Cache.js'

class NoopCache extends Cache {
  public async clear(): Promise<void> { }

  public async close(): Promise<void> { }

  protected async _get(): Promise<string | undefined> {
    return undefined
  }

  protected async _set(): Promise<void> { }

  protected async _delete(): Promise<void> { }

  protected async _has(): Promise<boolean> {
    return false
  }

  protected async _getMany(): Promise<Map<string, string>> {
    return new Map()
  }

  protected async _setMany(): Promise<void> { }

  protected async _deleteMany(): Promise<void> { }

  protected async _hasMany(): Promise<Set<string>> {
    return new Set()
  }
}

export {
  NoopCache,
}
