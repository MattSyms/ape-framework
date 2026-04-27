import type { Rules } from '../Rules.js'

const typescriptDisabledRules: Rules<''> = {
  'class-methods-use-this': 'off',
  'consistent-return': 'off',
  'default-param-last': 'off',
  'dot-notation': 'off',
  'init-declarations': 'off',
  'max-params': 'off',
  'no-array-constructor': 'off',
  'no-dupe-class-members': 'off',
  'no-empty-function': 'off',
  'no-implied-eval': 'off',
  'no-invalid-this': 'off',
  'no-loop-func': 'off',
  'no-magic-numbers': 'off',
  'no-redeclare': 'off',
  'no-restricted-imports': 'off',
  'no-shadow': 'off',
  'no-throw-literal': 'off',
  'no-unused-expressions': 'off',
  'no-unused-private-class-members': 'off',
  'no-unused-vars': 'off',
  'no-use-before-define': 'off',
  'no-useless-constructor': 'off',
  'prefer-destructuring': 'off',
  'prefer-promise-reject-errors': 'off',
  'require-await': 'off',
}

export {
  typescriptDisabledRules,
}
