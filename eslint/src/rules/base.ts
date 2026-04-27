import type { Rules } from '../Rules.js'

const baseRules: Rules<''> = {
  'accessor-pairs': [
    'error',
  ],
  'array-callback-return': [
    'error',
  ],
  'arrow-body-style': [
    'error',
    'always',
  ],
  'block-scoped-var': [
    'error',
  ],
  'camelcase': 'off',
  'capitalized-comments': 'off',
  'class-methods-use-this': 'off',
  'complexity': 'off',
  'consistent-return': [
    'error',
  ],
  'consistent-this': [
    'error',
  ],
  'constructor-super': [
    'error',
  ],
  'curly': [
    'error',
  ],
  'default-case': 'off',
  'default-case-last': [
    'error',
  ],
  'default-param-last': [
    'error',
  ],
  'dot-notation': 'off',
  'eqeqeq': [
    'error',
  ],
  'for-direction': [
    'error',
  ],
  'func-name-matching': [
    'error',
  ],
  'func-names': [
    'error',
  ],
  'func-style': [
    'error',
  ],
  'getter-return': [
    'error',
  ],
  'grouped-accessor-pairs': [
    'error',
  ],
  'guard-for-in': 'off',
  'id-denylist': [
    'error',
  ],
  'id-length': 'off',
  'id-match': [
    'error',
  ],
  'init-declarations': 'off',
  'logical-assignment-operators': [
    'error',
  ],
  'max-classes-per-file': [
    'error',
  ],
  'max-depth': [
    'error',
  ],
  'max-lines': 'off',
  'max-lines-per-function': 'off',
  'max-nested-callbacks': [
    'error',
  ],
  'max-params': 'off',
  'max-statements': 'off',
  'new-cap': [
    'error',
    {
      newIsCap: true,
      capIsNew: false,
      properties: false,
    },
  ],
  'no-alert': [
    'error',
  ],
  'no-array-constructor': [
    'error',
  ],
  'no-async-promise-executor': [
    'error',
  ],
  'no-await-in-loop': 'off',
  'no-bitwise': 'off',
  'no-caller': [
    'error',
  ],
  'no-case-declarations': [
    'error',
  ],
  'no-class-assign': [
    'error',
  ],
  'no-compare-neg-zero': [
    'error',
  ],
  'no-cond-assign': [
    'error',
  ],
  'no-console': [
    'error',
  ],
  'no-const-assign': [
    'error',
  ],
  'no-constant-binary-expression': [
    'error',
  ],
  'no-constant-condition': [
    'error',
  ],
  'no-constructor-return': [
    'error',
  ],
  'no-continue': [
    'error',
  ],
  'no-control-regex': [
    'error',
  ],
  'no-debugger': [
    'error',
  ],
  'no-delete-var': [
    'error',
  ],
  'no-div-regex': [
    'error',
  ],
  'no-dupe-args': [
    'error',
  ],
  'no-dupe-class-members': [
    'error',
  ],
  'no-dupe-else-if': [
    'error',
  ],
  'no-dupe-keys': [
    'error',
  ],
  'no-duplicate-case': [
    'error',
  ],
  'no-duplicate-imports': 'off',
  'no-else-return': [
    'error',
  ],
  'no-empty': [
    'error',
  ],
  'no-empty-character-class': [
    'error',
  ],
  'no-empty-function': 'off',
  'no-empty-pattern': [
    'error',
  ],
  'no-empty-static-block': [
    'error',
  ],
  'no-eq-null': [
    'error',
  ],
  'no-eval': [
    'error',
  ],
  'no-ex-assign': [
    'error',
  ],
  'no-extend-native': [
    'error',
  ],
  'no-extra-bind': [
    'error',
  ],
  'no-extra-boolean-cast': [
    'error',
  ],
  'no-extra-label': [
    'error',
  ],
  'no-fallthrough': [
    'error',
  ],
  'no-func-assign': [
    'error',
  ],
  'no-global-assign': [
    'error',
  ],
  'no-implicit-coercion': [
    'error',
  ],
  'no-implicit-globals': [
    'error',
  ],
  'no-implied-eval': [
    'error',
  ],
  'no-import-assign': [
    'error',
  ],
  'no-inline-comments': [
    'error',
  ],
  'no-inner-declarations': [
    'error',
  ],
  'no-invalid-regexp': [
    'error',
  ],
  'no-invalid-this': [
    'error',
  ],
  'no-irregular-whitespace': [
    'error',
  ],
  'no-iterator': [
    'error',
  ],
  'no-label-var': [
    'error',
  ],
  'no-labels': [
    'error',
  ],
  'no-lone-blocks': [
    'error',
  ],
  'no-lonely-if': [
    'error',
  ],
  'no-loop-func': [
    'error',
  ],
  'no-loss-of-precision': [
    'error',
  ],
  'no-magic-numbers': 'off',
  'no-misleading-character-class': [
    'error',
  ],
  'no-multi-assign': [
    'error',
  ],
  'no-multi-str': 'off',
  'no-negated-condition': [
    'error',
  ],
  'no-nested-ternary': [
    'error',
  ],
  'no-new': [
    'error',
  ],
  'no-new-func': [
    'error',
  ],
  'no-new-native-nonconstructor': [
    'error',
  ],
  'no-new-wrappers': [
    'error',
  ],
  'no-nonoctal-decimal-escape': [
    'error',
  ],
  'no-obj-calls': [
    'error',
  ],
  'no-object-constructor': [
    'error',
  ],
  'no-octal': [
    'error',
  ],
  'no-octal-escape': [
    'error',
  ],
  'no-param-reassign': [
    'error',
  ],
  'no-plusplus': [
    'error',
  ],
  'no-promise-executor-return': [
    'error',
  ],
  'no-proto': [
    'error',
  ],
  'no-prototype-builtins': [
    'error',
  ],
  'no-redeclare': [
    'error',
  ],
  'no-regex-spaces': [
    'error',
  ],
  'no-restricted-exports': [
    'error',
    {
      restrictDefaultExports: {
        direct: true,
        defaultFrom: true,
        namedFrom: true,
        namespaceFrom: true,
      },
    },
  ],
  'no-restricted-globals': [
    'error',
  ],
  'no-restricted-imports': [
    'error',
  ],
  'no-restricted-properties': [
    'error',
  ],
  'no-restricted-syntax': [
    'error',
  ],
  'no-return-assign': [
    'error',
  ],
  'no-script-url': [
    'error',
  ],
  'no-self-assign': [
    'error',
  ],
  'no-self-compare': [
    'error',
  ],
  'no-sequences': [
    'error',
  ],
  'no-setter-return': [
    'error',
  ],
  'no-shadow': [
    'error',
  ],
  'no-shadow-restricted-names': [
    'error',
  ],
  'no-sparse-arrays': [
    'error',
  ],
  'no-template-curly-in-string': [
    'error',
  ],
  'no-ternary': 'off',
  'no-this-before-super': [
    'error',
  ],
  'no-throw-literal': [
    'error',
  ],
  'no-unassigned-vars': [
    'error',
  ],
  'no-undef': [
    'error',
  ],
  'no-undef-init': 'off',
  'no-undefined': 'off',
  'no-underscore-dangle': 'off',
  'no-unexpected-multiline': [
    'error',
  ],
  'no-unmodified-loop-condition': [
    'error',
  ],
  'no-unneeded-ternary': [
    'error',
  ],
  'no-unreachable': [
    'error',
  ],
  'no-unreachable-loop': [
    'error',
  ],
  'no-unsafe-finally': [
    'error',
  ],
  'no-unsafe-negation': [
    'error',
  ],
  'no-unsafe-optional-chaining': [
    'error',
  ],
  'no-unused-expressions': [
    'error',
  ],
  'no-unused-labels': [
    'error',
  ],
  'no-unused-private-class-members': [
    'error',
  ],
  'no-unused-vars': [
    'error',
    {
      caughtErrors: 'none',
    },
  ],
  'no-use-before-define': [
    'error',
  ],
  'no-useless-assignment': [
    'error',
  ],
  'no-useless-backreference': [
    'error',
  ],
  'no-useless-call': [
    'error',
  ],
  'no-useless-catch': [
    'error',
  ],
  'no-useless-computed-key': [
    'error',
  ],
  'no-useless-concat': [
    'error',
  ],
  'no-useless-constructor': [
    'error',
  ],
  'no-useless-escape': [
    'error',
  ],
  'no-useless-rename': [
    'error',
  ],
  'no-useless-return': [
    'error',
  ],
  'no-var': [
    'error',
  ],
  'no-void': [
    'error',
  ],
  'no-warning-comments': 'off',
  'no-with': [
    'error',
  ],
  'object-shorthand': [
    'error',
  ],
  'one-var': [
    'error',
    'never',
  ],
  'operator-assignment': [
    'error',
  ],
  'prefer-arrow-callback': [
    'error',
  ],
  'prefer-const': [
    'error',
  ],
  'prefer-destructuring': 'off',
  'prefer-exponentiation-operator': [
    'error',
  ],
  'prefer-named-capture-group': [
    'error',
  ],
  'prefer-numeric-literals': [
    'error',
  ],
  'prefer-object-has-own': [
    'error',
  ],
  'prefer-object-spread': [
    'error',
  ],
  'prefer-promise-reject-errors': [
    'error',
  ],
  'prefer-regex-literals': [
    'error',
  ],
  'prefer-rest-params': [
    'error',
  ],
  'prefer-spread': [
    'error',
  ],
  'prefer-template': [
    'error',
  ],
  'preserve-caught-error': 'off',
  'radix': [
    'error',
  ],
  'require-atomic-updates': [
    'error',
  ],
  'require-await': [
    'error',
  ],
  'require-unicode-regexp': [
    'error',
  ],
  'require-yield': [
    'error',
  ],
  'sort-imports': [
    'error',
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
    },
  ],
  'sort-keys': 'off',
  'sort-vars': [
    'error',
  ],
  'strict': [
    'error',
  ],
  'symbol-description': [
    'error',
  ],
  'unicode-bom': [
    'error',
  ],
  'use-isnan': [
    'error',
  ],
  'valid-typeof': [
    'error',
  ],
  'vars-on-top': [
    'error',
  ],
  'yoda': [
    'error',
  ],
}

export {
  baseRules,
}
