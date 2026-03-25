/*
 * Usage: yarn package <version>
 *
 *   Package build:
 *     yarn package 0.0.0-dev.0
 */
import { join } from 'node:path'
import fs from 'fs-extra'

const [version] = process.argv.slice(2)

if (!version) {
  throw new Error('missing argument <version>')
}

type Exports = Record<string, { import: { types: string, default: string } }>

const getExports = (dir: string): Exports => {
  let exp: Exports = {}
  fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
    const path = join(dir, file.name)
    if (file.isDirectory()) {
      exp = { ...exp, ...getExports(path) }
    } else {
      const module = path.replace(/^src\/|\.ts$/gu, '')
      exp[`./${module}`] = {
        import: {
          types: `./dist/${module}.d.ts`,
          default: `./dist/${module}.js`,
        },
      }
    }
  })
  return exp
}

const pkg = fs.readJsonSync('package.json')

fs.writeJsonSync('build/package.json', {
  name: '@apeframework/eslint',
  version,
  publishConfig: {
    access: 'public',
  },
  license: 'MIT',
  author: 'Matthieu Symoens',
  description: 'Ape Framework ESLint Configuration',
  keywords: ['ape', 'framework', 'eslint'],
  repository: {
    type: 'git',
    url: 'git+https://github.com/MattSyms/ape-framework.git',
    directory: 'eslint',
  },
  type: pkg.type,
  engines: pkg.engines,
  dependencies: pkg.dependencies,
  peerDependencies: pkg.peerDependencies,
  exports: getExports('src'),
}, { spaces: 2 })

fs.copySync('../LICENSE', 'build/LICENSE')
fs.copySync('README.md', 'build/README.md')
