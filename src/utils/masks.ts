const VALID_BR_DDDS = new Set<number>([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
])

export const isValidBrazilianDdd = (ddd: string): boolean => {
  if (!/^\d{2}$/.test(ddd)) return false
  return VALID_BR_DDDS.has(Number(ddd))
}

export const stripBrazilianCountryCode = (digits: string): string => {
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    if (isValidBrazilianDdd(digits.slice(2, 4))) {
      return digits.slice(2)
    }
  }
  return digits
}

export const normalizeBrazilianPhoneDigits = (val: string): string => {
  const digits = val.replace(/\D/g, '')
  return stripBrazilianCountryCode(digits)
}

export const isValidBrazilianMobilePhone = (val: string): boolean => {
  const digits = normalizeBrazilianPhoneDigits(val)
  return digits.length === 11 && isValidBrazilianDdd(digits.slice(0, 2)) && digits[2] === '9'
}

export const PHONE_ERROR_MESSAGE = 'Informe um WhatsApp válido com DDD, ex: (11) 99999-9999.'

export const handlePhoneMask = (val: string): string => {
  if (!val) return ''
  const digits = normalizeBrazilianPhoneDigits(val).slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
}
