import { getAttachments } from 'mailer/adapters/smtp/getAttachments.js'

describe('getting attachments', () => {
  test('returns expected value', async () => {
    expect(
      getAttachments(),
    ).toStrictEqual([])

    expect(
      getAttachments([]),
    ).toStrictEqual([])

    expect(
      getAttachments([
        {
          fileName: 'foo.txt',
          content: 'Foo',
          contentType: 'text/plain',
        },
        {
          fileName: 'bar.txt',
          content: 'Bar',
          contentType: 'text/plain',
        },
      ]),
    ).toStrictEqual([
      {
        filename: 'foo.txt',
        cid: 'foo.txt',
        content: 'Foo',
        contentType: 'text/plain',
      },
      {
        filename: 'bar.txt',
        cid: 'bar.txt',
        content: 'Bar',
        contentType: 'text/plain',
      },
    ])
  })
})
