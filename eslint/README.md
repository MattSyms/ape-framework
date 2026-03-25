# Ape Framework ESLint Configuration

Ape Framework [ESLint](https://eslint.org) configuration.

NPM package: [@apeframework/eslint](https://www.npmjs.com/package/@apeframework/eslint).

GitHub repository: [MattSyms/ape-framework](https://github.com/MattSyms/ape-framework).

## Installation

```
yarn add @apeframework/eslint --dev
```

## Usage (`eslint.config.js`)

Node configuration:

```js
import javascript from '@apeframework/eslint/javascript'
import typescript from '@apeframework/eslint/typescript'

const config = [
  {
    ignores: [],
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
      // base rules override
    },
  },
  {
    files: ['*.ts', '**/*.ts'],
    rules: {
      // typescript rules override
    },
  },
]

export {
  config as default,
}
```

Browser configuration:

```js
import javascript from '@apeframework/eslint/javascript'
import typescript from '@apeframework/eslint/typescript'
import vue from '@apeframework/eslint/vue'

const config = [
  {
    ignores: [],
  },
  {
    files: ['*.js', '**/*.js'],
    ...javascript(),
  },
  {
    files: ['*.ts', '**/*.ts'],
    ...typescript('browser'),
  },
  {
    files: ['*.vue', '**/*.vue'],
    ...vue(),
  },
  {
    files: ['*.js', '**/*.js', '*.ts', '**/*.ts', '*.vue', '**/*.vue'],
    rules: {
      // base rules override
    },
  },
  {
    files: ['*.ts', '**/*.ts', '*.vue', '**/*.vue'],
    rules: {
      // typescript rules override
    },
  },
  {
    files: ['*.vue', '**/*.vue'],
    rules: {
      // vue rules override
    },
  },
]

export {
  config as default,
}
```

## Development

Install dependencies:

```
yarn
```

Update dependencies:

```
yarn update
```

Analyze rules:

```
yarn analyze
```

Compile:

```
yarn compile
```

Lint:

```
yarn lint
```

## Release:

Tag stable release:

```
git tag eslint@v<major>.<minor>.<patch>
```

Tag dev release:

```
git tag eslint@v0.0.0-dev.<number>
```

Push tags:

```
git push --tags
```

## TODO

- ESLint v10
