export interface TrackingParams {
  clickId: string | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  device: 'mobile' | 'desktop' | 'tablet'
}

export function useTrackingParams(): TrackingParams {
  const params = new URLSearchParams(window.location.search)

  const gclid = params.get('gclid')
  const fbclid = params.get('fbclid')

  const ua = navigator.userAgent
  const device: TrackingParams['device'] =
    /tablet|ipad|playbook|silk/i.test(ua)
      ? 'tablet'
      : /mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)
        ? 'mobile'
        : 'desktop'

  return {
    clickId: gclid ?? fbclid ?? null,
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    utmContent: params.get('utm_content'),
    utmTerm: params.get('utm_term'),
    device,
  }
}
