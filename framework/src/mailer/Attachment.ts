import type { Readable } from 'node:stream'

interface Attachment {
  fileName: string,
  content: Readable | Buffer | string,
  contentType?: string,
}

export {
  type Attachment,
}
