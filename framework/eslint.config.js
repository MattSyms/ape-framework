import { javascript } from '@apeframework/eslint/configs/javascript'
import { typescript } from '@apeframework/eslint/configs/typescript'

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
    rules: {},
  },
  {
    files: ['**/*.ts'],
    rules: {},
  },
]

export {
  config as default,
}
