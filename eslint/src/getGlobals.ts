import globals from 'globals'
import type { Globals } from './Globals.js'

const getGlobals = (g?: Globals): any => {
  return g === 'browser' ? globals.browser : globals.node
}

export {
  getGlobals,
}
