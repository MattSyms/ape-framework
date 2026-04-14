import type { Info } from './Info.js'
import type { Readable } from 'node:stream'

interface Object {
  info: Info,
  content: Readable,
}

export {
  type Object,
}
