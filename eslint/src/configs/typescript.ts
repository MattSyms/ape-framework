import stylisticPlugin from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import typescriptPlugin from 'typescript-eslint'
import { getGlobals } from '../getGlobals.js'
import { baseRules } from '../rules/base.js'
import { importRules } from '../rules/import.js'
import { stylisticRules } from '../rules/stylistic.js'
import { typescriptRules } from '../rules/typescript.js'
import { typescriptDisabledRules } from '../rules/typescriptDisabled.js'
import { typescriptGloballyDisabledRules } from '../rules/typescriptGloballyDisabled.js'
import type { Config } from '../Config.js'
import type { Globals } from '../Globals.js'

const typescript = (globals: Globals | undefined): Config => {
  return {
    plugins: {
      'import': importPlugin,
      'stylistic': stylisticPlugin,
      'typescript': typescriptPlugin.plugin,
    },
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: getGlobals(globals),
      parser: typescriptPlugin.parser,
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    rules: {
      ...baseRules,
      ...importRules,
      ...stylisticRules,
      ...typescriptGloballyDisabledRules,
      ...typescriptDisabledRules,
      ...typescriptRules,
    },
  }
}

export {
  typescript,
}
