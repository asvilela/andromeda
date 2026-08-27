import { describe, expect, it } from 'vitest'

import {
  handlePhoneMask,
  isValidBrazilianMobilePhone,
  normalizeBrazilianPhoneDigits,
  stripBrazilianCountryCode,
} from './masks'

describe("handlePhoneMask", () => {
  it("formats Brazilian mobile numbers without country code", () => {
    expect(handlePhoneMask("11999999999")).toBe("(11) 99999-9999")
  })

  it("removes Brazilian country code from mobile numbers", () => {
    expect(handlePhoneMask("5511999999999")).toBe("(11) 99999-9999")
  })

  it("removes Brazilian country code from formatted mobile numbers", () => {
    expect(handlePhoneMask("+55 (11) 99999-9999")).toBe("(11) 99999-9999")
  })

  it("removes Brazilian country code from landline numbers", () => {
    expect(handlePhoneMask("551199999999")).toBe("(11) 9999-9999")
  })

  it("keeps partial input mask behavior", () => {
    expect(handlePhoneMask("11999")).toBe("(11) 999")
  })

  it("does not remove 55 when the following digits are not a valid Brazilian DDD", () => {
    expect(stripBrazilianCountryCode("5500999999999")).toBe("5500999999999")
    expect(handlePhoneMask("5500999999999")).toBe("(55) 00999-9999")
  })

  it('normalizes Brazilian mobile phone digits before submission', () => {
    expect(normalizeBrazilianPhoneDigits('+55 (11) 99999-9999')).toBe('11999999999')
  })

  it('validates only Brazilian mobile phones with valid DDD and ninth digit', () => {
    expect(isValidBrazilianMobilePhone('+55 (11) 99999-9999')).toBe(true)
    expect(isValidBrazilianMobilePhone('(20) 99999-9999')).toBe(false)
    expect(isValidBrazilianMobilePhone('(11) 3999-9999')).toBe(false)
    expect(isValidBrazilianMobilePhone('5500999999999')).toBe(false)
  })
})
