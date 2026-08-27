import { afterEach, describe, expect, it, vi } from 'vitest'

import { createLead } from './api'

describe('createLead', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('sends normalized Brazilian mobile phone digits', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(null, { status: 200 }))

    await createLead({ fullName: 'Maria Silva', phoneMobile: '+55 (11) 99999-9999' })

    const body = JSON.parse(fetchMock.mock.calls[0][1]?.body as string)
    expect(body.phoneMobile).toBe('11999999999')
  })

  it('blocks invalid mobile phone before posting the lead', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch')

    await expect(createLead({ fullName: 'Maria Silva', phoneMobile: '5500999999999' })).rejects.toThrow(
      'Invalid Brazilian mobile phone'
    )

    expect(fetchMock).not.toHaveBeenCalled()
  })
})
