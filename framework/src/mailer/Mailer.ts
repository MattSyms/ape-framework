import { validateAddressEmail } from './validateAddressEmail.js'
import { validateEventAttachmentUrl } from './validateEventAttachmentUrl.js'
import { validateEventGeolocation } from './validateEventGeolocation.js'
import { validateEventUrl } from './validateEventUrl.js'
import { validateListUrl } from './validateListUrl.js'
import type { Mail } from './Mail.js'

abstract class Mailer {
  public async sendMail(mail: Mail): Promise<string> {
    validateAddressEmail(mail.from.email)

    if (mail.sender) {
      validateAddressEmail(mail.sender.email)
    }

    if (mail.replyTo) {
      validateAddressEmail(mail.replyTo.email)
    }

    mail.to.forEach((address) => {
      validateAddressEmail(address.email)
    })

    if (mail.cc) {
      mail.cc.forEach((address) => {
        validateAddressEmail(address.email)
      })
    }

    if (mail.bcc) {
      mail.bcc.forEach((address) => {
        validateAddressEmail(address.email)
      })
    }

    if (mail.event?.url) {
      validateEventUrl(mail.event.url)
    }

    if (mail.event?.location?.geo) {
      validateEventGeolocation(
        mail.event.location.geo.latitude,
        mail.event.location.geo.longitude,
      )
    }

    if (mail.event?.attachments) {
      mail.event.attachments.forEach((attachment) => {
        validateEventAttachmentUrl(attachment)
      })
    }

    if (mail.list) {
      Object.entries(mail.list).forEach(([property, url]: [string, string]) => {
        validateListUrl(property, url)
      })
    }

    return this._sendMail(mail)
  }

  public abstract close(): Promise<void>

  protected abstract _sendMail(mail: Mail): Promise<string>
}

export {
  Mailer,
}
