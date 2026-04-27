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
    },
  },
  {
    files: ['**/*.ts'],
    rules: {},
  },
]

export {
  config as default,
}
