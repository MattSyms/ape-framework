import type { JsonPrimitive } from './JsonPrimitive.js'

type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue }

export {
  type JsonValue,
}
