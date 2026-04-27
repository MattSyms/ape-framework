import stylisticPlugin from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import vuePlugin from 'eslint-plugin-vue'
import typescriptPlugin from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'
import { getGlobals } from '../getGlobals.js'
import { baseRules } from '../rules/base.js'
import { importRules } from '../rules/import.js'
import { stylisticRules } from '../rules/stylistic.js'
import { typescriptRules } from '../rules/typescript.js'
import { typescriptDisabledRules } from '../rules/typescriptDisabled.js'
import { typescriptGloballyDisabledRules } from '../rules/typescriptGloballyDisabled.js'
import { vueRules } from '../rules/vue.js'
import type { Config } from '../Config.js'

const vue = (): Config => {
  return {
    plugins: {
      'import': importPlugin,
      'stylistic': stylisticPlugin,
      'typescript': typescriptPlugin.plugin,
      'vue': vuePlugin,
    },
    processor: 'vue/vue',
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: getGlobals('browser'),
      parser: vueParser,
      parserOptions: {
        parser: typescriptPlugin.parser,
        projectService: true,
        ecmaFeatures: {
          impliedStrict: true,
        },
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      ...baseRules,
      ...importRules,
      ...stylisticRules,
      ...typescriptGloballyDisabledRules,
      ...typescriptDisabledRules,
      ...typescriptRules,
      ...vueRules,
    },
  }
}

export {
  vue,
}
