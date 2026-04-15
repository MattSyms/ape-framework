import { basename, extname } from 'node:path'
import { SequelizeStorage, Umzug } from 'umzug'
import { MigrationStatus } from './MigrationStatus.js'
import type { Db } from './Db.js'
import type { Migration } from './Migration.js'
import type { QueryInterface } from 'sequelize'
import type { MigrationFn, Resolver } from 'umzug'

class Migrator {
  private readonly umzug: Umzug<QueryInterface>

  public constructor(params: {
    db: Db,
    modelName: string,
    directory: string,
    extension: string,
    load: (path: string) => Promise<Migration>,
    onApply?: (name: string) => void,
    onRevert?: (name: string) => void,
  }) {
    const glob = `${params.directory}/*.${params.extension}`

    const resolve: Resolver<QueryInterface> = ({ name: fileName, context }) => {
      const name = basename(fileName, extname(fileName))

      const up: MigrationFn<QueryInterface> = async ({ path }) => {
        const migration = await params.load(String(path))
        await migration.up(context)
      }

      const down: MigrationFn<QueryInterface> = async ({ path }) => {
        const migration = await params.load(String(path))
        await migration.down(context)
      }

      return { name, up, down }
    }

    this.umzug = new Umzug({
      storage: new SequelizeStorage({
        sequelize: params.db,
        modelName: params.modelName,
      }),
      migrations: { glob, resolve },
      context: params.db.getQueryInterface(),
      logger: undefined,
    })

    this.umzug.on('migrating', (e) => {
      params.onApply?.(e.name)
    })

    this.umzug.on('reverting', (e) => {
      params.onRevert?.(e.name)
    })
  }

  public async list(
    status?: MigrationStatus,
  ): Promise<{ name: string, status: MigrationStatus }[]> {
    return [
      ...status === MigrationStatus.PENDING
        ? []
        : (await this.umzug.executed()).map((migration) => {
          return {
            name: migration.name,
            status: MigrationStatus.APPLIED,
          }
        }),
      ...status === MigrationStatus.APPLIED
        ? []
        : (await this.umzug.pending()).map((migration) => {
          return {
            name: migration.name,
            status: MigrationStatus.PENDING,
          }
        }),
    ]
  }

  public async apply(count?: number): Promise<string[]> {
    return (await this.umzug.up(count ? { step: count } : undefined))
      .map((migration) => {
        return migration.name
      })
  }

  public async revert(count?: number): Promise<string[]> {
    return (await this.umzug.down(count ? { step: count } : { to: 0 }))
      .map((migration) => {
        return migration.name
      })
  }
}

export {
  Migrator,
}
