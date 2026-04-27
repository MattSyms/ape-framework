import { javascript } from '@apeframework/eslint/configs/javascript'
import { typescript } from '@apeframework/eslint/configs/typescript'

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
