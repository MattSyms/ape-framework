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
import { javascript } from '@apeframework/eslint/configs/javascript'
import { typescript } from '@apeframework/eslint/configs/typescript'

const config = [
  {
    ignores: [],
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
      // base rules override
    },
  },
  {
    files: ['**/*.ts'],
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
import { javascript } from '@apeframework/eslint/configs/javascript'
import { typescript } from '@apeframework/eslint/configs/typescript'
import { vue } from '@apeframework/eslint/configs/vue'

const config = [
  {
    ignores: [],
  },
  {
    files: ['**/*.js'],
    ...javascript(),
  },
  {
    files: ['**/*.ts'],
    ...typescript('browser'),
  },
  {
    files: ['**/*.vue'],
    ...vue(),
  },
  {
    rules: {
      // base rules override
    },
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      // typescript rules override
    },
  },
  {
    files: ['**/*.vue'],
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
