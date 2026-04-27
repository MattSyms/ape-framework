import type { Rules } from '../Rules.js'

const typescriptRules: Rules<'typescript/'> = {
  'typescript/adjacent-overload-signatures': [
    'error',
  ],
  'typescript/array-type': [
    'error',
  ],
  'typescript/await-thenable': [
    'error',
  ],
  'typescript/ban-ts-comment': [
    'error',
  ],
  'typescript/ban-tslint-comment': [
    'error',
  ],
  'typescript/class-literal-property-style': [
    'error',
  ],
  'typescript/class-methods-use-this': 'off',
  'typescript/consistent-generic-constructors': [
    'error',
  ],
  'typescript/consistent-indexed-object-style': [
    'error',
  ],
  'typescript/consistent-return': [
    'error',
  ],
  'typescript/consistent-type-assertions': [
    'error',
  ],
  'typescript/consistent-type-definitions': [
    'error',
  ],
  'typescript/consistent-type-exports': [
    'error',
  ],
  'typescript/consistent-type-imports': [
    'error',
  ],
  'typescript/default-param-last': [
    'error',
  ],
  'typescript/dot-notation': 'off',
  'typescript/explicit-function-return-type': [
    'error',
  ],
  'typescript/explicit-member-accessibility': [
    'error',
  ],
  'typescript/explicit-module-boundary-types': [
    'error',
    {
      allowArgumentsExplicitlyTypedAsAny: true,
    },
  ],
  'typescript/init-declarations': 'off',
  'typescript/max-params': 'off',
  'typescript/member-ordering': [
    'error',
  ],
  'typescript/method-signature-style': [
    'error',
  ],
  'typescript/naming-convention': 'off',
  'typescript/no-array-constructor': [
    'error',
  ],
  'typescript/no-array-delete': [
    'error',
  ],
  'typescript/no-base-to-string': [
    'error',
  ],
  'typescript/no-confusing-non-null-assertion': [
    'error',
  ],
  'typescript/no-confusing-void-expression': [
    'error',
  ],
  'typescript/no-deprecated': [
    'error',
  ],
  'typescript/no-dupe-class-members': [
    'error',
  ],
  'typescript/no-duplicate-enum-values': [
    'error',
  ],
  'typescript/no-duplicate-type-constituents': [
    'error',
  ],
  'typescript/no-dynamic-delete': [
    'error',
  ],
  'typescript/no-empty-function': 'off',
  'typescript/no-empty-object-type': 'off',
  'typescript/no-explicit-any': 'off',
  'typescript/no-extra-non-null-assertion': [
    'error',
  ],
  'typescript/no-extraneous-class': [
    'error',
  ],
  'typescript/no-floating-promises': 'off',
  'typescript/no-for-in-array': [
    'error',
  ],
  'typescript/no-implied-eval': [
    'error',
  ],
  'typescript/no-import-type-side-effects': [
    'error',
  ],
  'typescript/no-inferrable-types': [
    'error',
  ],
  'typescript/no-invalid-this': [
    'error',
  ],
  'typescript/no-invalid-void-type': [
    'error',
  ],
  'typescript/no-loop-func': [
    'error',
  ],
  'typescript/no-magic-numbers': 'off',
  'typescript/no-meaningless-void-operator': [
    'error',
  ],
  'typescript/no-misused-new': [
    'error',
  ],
  'typescript/no-misused-promises': [
    'error',
  ],
  'typescript/no-misused-spread': [
    'error',
  ],
  'typescript/no-mixed-enums': [
    'error',
  ],
  'typescript/no-namespace': [
    'error',
  ],
  'typescript/no-non-null-asserted-nullish-coalescing': [
    'error',
  ],
  'typescript/no-non-null-asserted-optional-chain': [
    'error',
  ],
  'typescript/no-non-null-assertion': [
    'error',
  ],
  'typescript/no-redeclare': [
    'error',
  ],
  'typescript/no-redundant-type-constituents': [
    'error',
  ],
  'typescript/no-require-imports': [
    'error',
  ],
  'typescript/no-restricted-imports': [
    'error',
  ],
  'typescript/no-restricted-types': [
    'error',
  ],
  'typescript/no-shadow': [
    'error',
  ],
  'typescript/no-this-alias': [
    'error',
  ],
  'typescript/no-unnecessary-boolean-literal-compare': [
    'error',
  ],
  'typescript/no-unnecessary-condition': [
    'error',
  ],
  'typescript/no-unnecessary-parameter-property-assignment': [
    'error',
  ],
  'typescript/no-unnecessary-qualifier': [
    'error',
  ],
  'typescript/no-unnecessary-template-expression': [
    'error',
  ],
  'typescript/no-unnecessary-type-arguments': [
    'error',
  ],
  'typescript/no-unnecessary-type-assertion': [
    'error',
  ],
  'typescript/no-unnecessary-type-constraint': [
    'error',
  ],
  'typescript/no-unnecessary-type-conversion': [
    'error',
  ],
  'typescript/no-unnecessary-type-parameters': 'off',
  'typescript/no-unsafe-argument': 'off',
  'typescript/no-unsafe-assignment': 'off',
  'typescript/no-unsafe-call': 'off',
  'typescript/no-unsafe-declaration-merging': [
    'error',
  ],
  'typescript/no-unsafe-enum-comparison': [
    'error',
  ],
  'typescript/no-unsafe-function-type': [
    'error',
  ],
  'typescript/no-unsafe-member-access': 'off',
  'typescript/no-unsafe-return': 'off',
  'typescript/no-unsafe-type-assertion': 'off',
  'typescript/no-unsafe-unary-minus': [
    'error',
  ],
  'typescript/no-unused-expressions': [
    'error',
  ],
  'typescript/no-unused-private-class-members': [
    'error',
  ],
  'typescript/no-unused-vars': [
    'error',
    {
      caughtErrors: 'none',
    },
  ],
  'typescript/no-use-before-define': [
    'error',
  ],
  'typescript/no-useless-constructor': [
    'error',
  ],
  'typescript/no-useless-default-assignment': [
    'error',
  ],
  'typescript/no-useless-empty-export': [
    'error',
  ],
  'typescript/no-wrapper-object-types': [
    'error',
  ],
  'typescript/non-nullable-type-assertion-style': [
    'error',
  ],
  'typescript/only-throw-error': [
    'error',
  ],
  'typescript/parameter-properties': [
    'error',
  ],
  'typescript/prefer-as-const': [
    'error',
  ],
  'typescript/prefer-destructuring': 'off',
  'typescript/prefer-enum-initializers': [
    'error',
  ],
  'typescript/prefer-find': [
    'error',
  ],
  'typescript/prefer-for-of': [
    'error',
  ],
  'typescript/prefer-function-type': [
    'error',
  ],
  'typescript/prefer-includes': [
    'error',
  ],
  'typescript/prefer-literal-enum-member': [
    'error',
  ],
  'typescript/prefer-namespace-keyword': [
    'error',
  ],
  'typescript/prefer-nullish-coalescing': 'off',
  'typescript/prefer-optional-chain': [
    'error',
  ],
  'typescript/prefer-promise-reject-errors': [
    'error',
  ],
  'typescript/prefer-readonly': [
    'error',
  ],
  'typescript/prefer-readonly-parameter-types': 'off',
  'typescript/prefer-reduce-type-parameter': [
    'error',
  ],
  'typescript/prefer-regexp-exec': [
    'error',
  ],
  'typescript/prefer-return-this-type': [
    'error',
  ],
  'typescript/prefer-string-starts-ends-with': [
    'error',
  ],
  'typescript/promise-function-async': [
    'error',
  ],
  'typescript/related-getter-setter-pairs': [
    'error',
  ],
  'typescript/require-array-sort-compare': [
    'error',
  ],
  'typescript/require-await': 'off',
  'typescript/restrict-plus-operands': [
    'error',
  ],
  'typescript/restrict-template-expressions': [
    'error',
  ],
  'typescript/return-await': [
    'error',
  ],
  'typescript/strict-boolean-expressions': 'off',
  'typescript/strict-void-return': 'off',
  'typescript/switch-exhaustiveness-check': 'off',
  'typescript/triple-slash-reference': [
    'error',
  ],
  'typescript/unbound-method': [
    'error',
  ],
  'typescript/unified-signatures': [
    'error',
  ],
  'typescript/use-unknown-in-catch-callback-variable': [
    'error',
  ],
}

export {
  typescriptRules,
}
