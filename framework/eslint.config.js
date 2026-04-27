import javascript from '@apeframework/eslint/javascript'
import typescript from '@apeframework/eslint/typescript'

const config = [
  {
    ignores: [
      'build',
      'test',
    ],
  },
  {
    files: ['**/*.js'],
    ...javascript(),
  },
  {
    files: ['**/*.ts'],
    ...typescript(),
  },
  {
    rules: {
      'import/no-deprecated': 'off',
      'no-underscore-dangle': 'off',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
]

export {
  config as default,
}
