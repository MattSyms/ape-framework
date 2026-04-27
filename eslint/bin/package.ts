/*
 * Usage: yarn package <version>
 */
import fs from 'fs-extra'

const [version] = process.argv.slice(2)

if (!version) {
  throw new Error('missing argument <version>')
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
  exports: {
    './*': {
      import: {
        types: './dist/*.d.ts',
        default: './dist/*.js',
      },
    },
  },
}, { spaces: 2 })

fs.copySync('src', 'build/src')
fs.copySync('../LICENSE', 'build/LICENSE')
fs.copySync('README.md', 'build/README.md')
