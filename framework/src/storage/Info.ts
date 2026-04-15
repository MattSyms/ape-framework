import type { Metadata } from './Metadata.js'

interface Info {
  key: string,
  contentType?: string,
  size: number,
  lastModified: Date,
  eTag: string,
  metadata: Metadata,
}

export {
  type Info,
}
