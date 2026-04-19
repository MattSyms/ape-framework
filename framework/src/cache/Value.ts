type Primitive = string | number | boolean | null

type Value = Primitive | Value[] | { [key: string]: Value }

export {
  type Value,
}
