/*
 * Usage: yarn package <version>
 *
 *   Package build:
 *     yarn package 0.0.0-dev.0
 */
import fs from 'fs-extra'

const [version] = process.argv.slice(2)

if (!version) {
  throw new Error('missing argument <version>')
}

const pkg = fs.readJsonSync('package.json')

fs.writeJsonSync('build/package.json', {
  name: 'apeframework',
  version,
  publishConfig: {
    access: 'public',
  },
  license: 'MIT',
  author: 'Matthieu Symoens',
  description: 'Node.js App Framework',
  keywords: ['ape', 'framework', 'nodejs'],
  repository: {
    type: 'git',
    url: 'git+https://github.com/MattSyms/ape-framework.git',
    directory: 'framework',
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
