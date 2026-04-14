import { destination, pino } from 'pino'
import pretty from 'pino-pretty'
import { Level } from '../../Level.js'
import { Logger } from '../../Logger.js'
import type { Logger as PinoLogger } from 'pino'

class StdioLogger extends Logger {
  private readonly logger: PinoLogger

  private readonly context: object | undefined

  public constructor(params?: {
    pretty?: boolean,
    level?: Level,
    context?: object,
  }) {
    super()

    const stream = params?.pretty
      ? pretty()
      : destination(process.stdout.fd)

    this.logger = pino({
      enabled: params?.level !== Level.OFF,
      level: params?.level ?? Level.INFO,
      messageKey: 'message',
      formatters: {
        level: (label, number) => {
          return {
            level: label,
            ...params?.pretty
              ? {}
              : { severity: number },
          }
        },
        bindings: () => { return {} },
      },
    }, stream)

    this.context = params?.context
  }

  public trace(message: string, data?: unknown): void {
    this.logger.trace(this.getPayload(message, data))
  }

  public debug(message: string, data?: unknown): void {
    this.logger.debug(this.getPayload(message, data))
  }

  public info(message: string, data?: unknown): void {
    this.logger.info(this.getPayload(message, data))
  }

  public warn(message: string, data?: unknown): void {
    this.logger.warn(this.getPayload(message, data))
  }

  public error(message: string, data?: unknown): void {
    this.logger.error(this.getPayload(message, data))
  }

  public fatal(message: string, data?: unknown): void {
    this.logger.fatal(this.getPayload(message, data))
  }

  public async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.flush((error) => {
        if (error) {
          reject(error)
        }
        resolve()
      })
    })
  }

  private getPayload(message: string, data?: unknown): object {
    return {
      ...this.context,
      message,
      data,
    }
  }
}

export {
  StdioLogger,
}
