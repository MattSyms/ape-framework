import { randomUUID } from 'node:crypto'
import { Mailer } from '../../Mailer.js'
import type { Mail } from '../../Mail.js'

class NoopMailer extends Mailer {
  public async close(): Promise<void> { }

  protected async _sendMail(mail: Mail): Promise<string> {
    return `${randomUUID()}@${mail.from.email.split('@')[1]}`
  }
}

export {
  NoopMailer,
}
