import type { Attachment } from '../../Attachment.js'
import type { Readable } from 'node:stream'

interface NodemailerAttachment {
  filename: string,
  cid: string,
  content: Readable | Buffer | string,
  contentType?: string,
}

const getAttachments = (attachments?: Attachment[]): NodemailerAttachment[] => {
  return attachments
    ? attachments
      .map((attachment) => {
        return {
          filename: attachment.fileName,
          cid: attachment.fileName,
          content: attachment.content,
          contentType: attachment.contentType,
        }
      })
    : []
}

export {
  getAttachments,
}
