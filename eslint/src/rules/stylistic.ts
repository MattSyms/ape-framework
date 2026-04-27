import type { Rules } from '../Rules.js'

const stylisticRules: Rules<'stylistic/'> = {
  'stylistic/array-bracket-newline': [
    'error',
    'consistent',
  ],
  'stylistic/array-bracket-spacing': [
    'error',
    'never',
  ],
  'stylistic/array-element-newline': [
    'error',
    {
      consistent: true,
      multiline: true,
    },
  ],
  'stylistic/arrow-parens': [
    'error',
    'always',
  ],
  'stylistic/arrow-spacing': [
    'error',
    {
      before: true,
      after: true,
    },
  ],
  'stylistic/block-spacing': [
    'error',
    'always',
  ],
  'stylistic/brace-style': [
    'error',
    '1tbs',
    {
      allowSingleLine: true,
    },
  ],
  'stylistic/comma-dangle': [
    'error',
    'always-multiline',
  ],
  'stylistic/comma-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
  'stylistic/comma-style': [
    'error',
    'last',
  ],
  'stylistic/computed-property-spacing': [
    'error',
    'never',
    {
      enforceForClassMembers: true,
    },
  ],
  'stylistic/curly-newline': [
    'error',
  ],
  'stylistic/dot-location': [
    'error',
    'property',
  ],
  'stylistic/eol-last': [
    'error',
    'always',
  ],
  'stylistic/function-call-argument-newline': [
    'error',
    'consistent',
  ],
  'stylistic/function-call-spacing': [
    'error',
    'never',
  ],
  'stylistic/function-paren-newline': [
    'error',
    'multiline-arguments',
  ],
  'stylistic/generator-star-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
  'stylistic/implicit-arrow-linebreak': [
    'error',
    'beside',
  ],
  'stylistic/indent': [
    'error',
    2,
  ],
  'stylistic/indent-binary-ops': [
    'error',
    2,
  ],
  'stylistic/jsx-child-element-spacing': 'off',
  'stylistic/jsx-closing-bracket-location': 'off',
  'stylistic/jsx-closing-tag-location': 'off',
  'stylistic/jsx-curly-brace-presence': 'off',
  'stylistic/jsx-curly-newline': 'off',
  'stylistic/jsx-curly-spacing': 'off',
  'stylistic/jsx-equals-spacing': 'off',
  'stylistic/jsx-first-prop-new-line': 'off',
  'stylistic/jsx-function-call-newline': 'off',
  'stylistic/jsx-indent-props': 'off',
  'stylistic/jsx-max-props-per-line': 'off',
  'stylistic/jsx-newline': 'off',
  'stylistic/jsx-one-expression-per-line': 'off',
  'stylistic/jsx-pascal-case': 'off',
  'stylistic/jsx-props-style': 'off',
  'stylistic/jsx-quotes': 'off',
  'stylistic/jsx-self-closing-comp': 'off',
  'stylistic/jsx-tag-spacing': 'off',
  'stylistic/jsx-wrap-multilines': 'off',
  'stylistic/key-spacing': [
    'error',
    {
      beforeColon: false,
      afterColon: true,
      mode: 'strict',
    },
  ],
  'stylistic/keyword-spacing': [
    'error',
    {
      before: true,
      after: true,
    },
  ],
  'stylistic/line-comment-position': [
    'error',
  ],
  'stylistic/linebreak-style': [
    'error',
    'unix',
  ],
  'stylistic/lines-around-comment': 'off',
  'stylistic/lines-between-class-members': [
    'error',
    'always',
  ],
  'stylistic/max-len': [
    'error',
    {
      code: 80,
      ignorePattern: '^import',
    },
  ],
  'stylistic/max-statements-per-line': [
    'error',
    {
      max: 1,
    },
  ],
  'stylistic/member-delimiter-style': [
    'error',
    {
      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
      multiline: {
        delimiter: 'comma',
        requireLast: true,
      },
    },
  ],
  'stylistic/multiline-comment-style': [
    'error',
  ],
  'stylistic/multiline-ternary': [
    'error',
    'always-multiline',
  ],
  'stylistic/new-parens': [
    'error',
    'always',
  ],
  'stylistic/newline-per-chained-call': 'off',
  'stylistic/no-confusing-arrow': 'off',
  'stylistic/no-extra-parens': [
    'error',
    'all',
  ],
  'stylistic/no-extra-semi': [
    'error',
  ],
  'stylistic/no-floating-decimal': [
    'error',
  ],
  'stylistic/no-mixed-operators': 'off',
  'stylistic/no-mixed-spaces-and-tabs': [
    'error',
  ],
  'stylistic/no-multi-spaces': [
    'error',
  ],
  'stylistic/no-multiple-empty-lines': [
    'error',
    {
      max: 1,
      maxBOF: 0,
      maxEOF: 0,
    },
  ],
  'stylistic/no-tabs': [
    'error',
  ],
  'stylistic/no-trailing-spaces': [
    'error',
  ],
  'stylistic/no-whitespace-before-property': [
    'error',
  ],
  'stylistic/nonblock-statement-body-position': [
    'error',
    'beside',
  ],
  'stylistic/object-curly-newline': [
    'error',
    {
      consistent: true,
      multiline: true,
    },
  ],
  'stylistic/object-curly-spacing': [
    'error',
    'always',
  ],
  'stylistic/object-property-newline': [
    'error',
    {
      allowAllPropertiesOnSameLine: true,
    },
  ],
  'stylistic/one-var-declaration-per-line': [
    'error',
    'always',
  ],
  'stylistic/operator-linebreak': [
    'error',
    'before',
  ],
  'stylistic/padded-blocks': [
    'error',
    'never',
  ],
  'stylistic/padding-line-between-statements': 'off',
  'stylistic/quote-props': [
    'error',
    'consistent',
  ],
  'stylistic/quotes': [
    'error',
    'single',
  ],
  'stylistic/rest-spread-spacing': [
    'error',
    'never',
  ],
  'stylistic/semi': [
    'error',
    'never',
  ],
  'stylistic/semi-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
  'stylistic/semi-style': [
    'error',
    'last',
  ],
  'stylistic/space-before-blocks': [
    'error',
    'always',
  ],
  'stylistic/space-before-function-paren': [
    'error',
    {
      named: 'never',
      anonymous: 'always',
      asyncArrow: 'always',
    },
  ],
  'stylistic/space-in-parens': [
    'error',
    'never',
  ],
  'stylistic/space-infix-ops': [
    'error',
  ],
  'stylistic/space-unary-ops': [
    'error',
    {
      words: true,
      nonwords: false,
    },
  ],
  'stylistic/spaced-comment': [
    'error',
    'always',
    {
      block: {
        balanced: true,
      },
    },
  ],
  'stylistic/switch-colon-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
  'stylistic/template-curly-spacing': [
    'error',
    'never',
  ],
  'stylistic/template-tag-spacing': [
    'error',
    'never',
  ],
  'stylistic/type-annotation-spacing': [
    'error',
  ],
  'stylistic/type-generic-spacing': [
    'error',
  ],
  'stylistic/type-named-tuple-spacing': [
    'error',
  ],
  'stylistic/wrap-iife': [
    'error',
    'inside',
  ],
  'stylistic/wrap-regex': 'off',
  'stylistic/yield-star-spacing': [
    'error',
    {
      before: false,
      after: true,
    },
  ],
}

export {
  stylisticRules,
}
