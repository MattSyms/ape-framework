import type { Metadata } from './Metadata.js'
import type { Stat } from './Stat.js'

interface Info extends Stat {
  contentType: string,
  metadata: Metadata,
}

export {
  type Info,
}
