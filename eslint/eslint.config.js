import javascript from '@apeframework/eslint/javascript'
import typescript from '@apeframework/eslint/typescript'

const config = [
  {
    ignores: [
      'build',
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
]

export {
  config as default,
}
