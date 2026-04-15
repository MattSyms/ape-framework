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
    files: ['*.js', '**/*.js'],
    ...javascript(),
  },
  {
    files: ['*.ts', '**/*.ts'],
    ...typescript(),
  },
  {
    rules: {
      'import/no-deprecated': 'off',
      'no-underscore-dangle': 'off',
    },
  },
]

export {
  config as default,
}
