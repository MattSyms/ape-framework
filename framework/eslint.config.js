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
    files: ['*.js', '**/*.js', '*.ts', '**/*.ts'],
    rules: {
      'import/no-deprecated': 'off',
      'no-underscore-dangle': 'off',
    },
  },
  {
    files: ['*.ts', '**/*.ts'],
    rules: {
      'no-undef': 'off',
    },
  },
]

export {
  config as default,
}
