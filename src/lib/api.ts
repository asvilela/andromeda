import { BROKER, PROJECT } from './constants'

const API_URL = `https://habitus-lead.agreeablestone-fdee4559.brazilsouth.azurecontainerapps.io/api/leads/${BROKER.slug}`
const TIMEOUT_MS = 8000

interface CreateLeadPayload {
  fullName: string
  email?: string | null
  phoneMobile: string
  origin: string
  product: string
  notes?: string | null
  slug: string
}

export async function createLead(data: {
  fullName: string
  email?: string
  phoneMobile: string
  origin?: string
  notes?: string
}): Promise<void> {
  const payload: CreateLeadPayload = {
    fullName: data.fullName,
    email: data.email || null,
    phoneMobile: data.phoneMobile.replace(/\D/g, ''),
    origin: data.origin || 'Google Ads',
    product: PROJECT.productName,
    notes: data.notes || null,
    slug: BROKER.slug,
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'accept': 'text/plain', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  } finally {
    clearTimeout(timer)
  }
}
