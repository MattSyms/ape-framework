import type { Rules } from '../Rules.js'

const importRules: Rules<'import/'> = {
  'import/consistent-type-specifier-style': [
    'error',
    'prefer-top-level',
  ],
  'import/default': [
    'error',
  ],
  'import/dynamic-import-chunkname': 'off',
  'import/enforce-node-protocol-usage': [
    'error',
    'always',
  ],
  'import/export': [
    'error',
  ],
  'import/exports-last': [
    'error',
  ],
  'import/extensions': 'off',
  'import/first': [
    'error',
  ],
  'import/group-exports': [
    'error',
  ],
  'import/max-dependencies': 'off',
  'import/named': [
    'error',
  ],
  'import/namespace': [
    'error',
  ],
  'import/newline-after-import': [
    'error',
  ],
  'import/no-absolute-path': [
    'error',
  ],
  'import/no-amd': [
    'error',
  ],
  'import/no-anonymous-default-export': [
    'error',
  ],
  'import/no-commonjs': [
    'error',
  ],
  'import/no-cycle': [
    'error',
  ],
  'import/no-default-export': 'off',
  'import/no-deprecated': [
    'error',
  ],
  'import/no-duplicates': [
    'error',
  ],
  'import/no-dynamic-require': [
    'error',
  ],
  'import/no-empty-named-blocks': [
    'error',
  ],
  'import/no-extraneous-dependencies': [
    'error',
  ],
  'import/no-import-module-exports': [
    'error',
  ],
  'import/no-internal-modules': 'off',
  'import/no-mutable-exports': [
    'error',
  ],
  'import/no-named-as-default': [
    'error',
  ],
  'import/no-named-as-default-member': [
    'error',
  ],
  'import/no-named-default': [
    'error',
  ],
  'import/no-named-export': 'off',
  'import/no-namespace': [
    'error',
  ],
  'import/no-nodejs-modules': 'off',
  'import/no-relative-packages': 'off',
  'import/no-relative-parent-imports': 'off',
  'import/no-restricted-paths': 'off',
  'import/no-self-import': [
    'error',
  ],
  'import/no-unassigned-import': 'off',
  'import/no-unresolved': 'off',
  'import/no-unused-modules': 'off',
  'import/no-useless-path-segments': [
    'error',
  ],
  'import/no-webpack-loader-syntax': [
    'error',
  ],
  'import/order': [
    'error',
    {
      'groups': [
        'builtin',
        'external',
        'unknown',
        'internal',
        'parent',
        'index',
        'sibling',
        'object',
        'type',
      ],
      'alphabetize': {
        order: 'asc',
        caseInsensitive: true,
      },
      'named': {
        enabled: true,
        import: false,
        export: true,
        types: 'types-last',
      },
      'newlines-between': 'never',
    },
  ],
  'import/prefer-default-export': 'off',
  'import/unambiguous': 'off',
}

export {
  importRules,
}
