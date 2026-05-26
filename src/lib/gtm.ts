declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function gtmEvent(event: string, params?: Record<string, string>) {
  window.dataLayer?.push({ event, ...params })
}
