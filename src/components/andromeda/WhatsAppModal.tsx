import { useState, useEffect } from 'react'
import { PHONE_ERROR_MESSAGE, handlePhoneMask, isValidBrazilianMobilePhone } from '@/utils/masks'
import { createLead } from '@/lib/api'
import { useTrackingParams } from '@/hooks/useTrackingParams'
import { gtmEvent } from '@/lib/gtm'
import { WHATSAPP_NUMBER, PROJECT, INTERESSE_WA_OPTIONS } from '@/lib/constants'

interface Props {
  open: boolean
  onClose: () => void
}

export default function WhatsAppModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ fullName: '', phoneMobile: '', interest: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const tracking = useTrackingParams()

  useEffect(() => {
    if (open) {
      setForm({ fullName: '', phoneMobile: '', interest: '' })
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const isPhoneValid = isValidBrazilianMobilePhone(form.phoneMobile)
  const showPhoneError = form.phoneMobile.replace(/\D/g, '').length > 0 && !isPhoneValid
  const isFormValid = form.fullName.trim().length >= 3 && isPhoneValid

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phoneMobile') {
      setForm(prev => ({ ...prev, [name]: handlePhoneMask(value) }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setLoading(true)
    setError(false)

    const notes = `Olá, sou *${form.fullName}*. Vim pelo site do ${PROJECT.productName} e gostaria de falar sobre *${form.interest}*.\nGostaria de receber orientação sobre as opções disponíveis.`

    try {
      await createLead({ fullName: form.fullName, phoneMobile: form.phoneMobile, notes }, tracking)
    } catch {
      setError(true)
    }

    gtmEvent('lead_form_submit', { form_location: 'whatsapp_modal' })
    gtmEvent('whatsapp_click', { click_source: 'modal_qualified' })

    const wppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(notes)}`
    window.location.href = wppUrl
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-labelledby="wa-modal-title">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{ animation: 'fadeIn .3s ease' }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-bg rounded-2xl w-full max-w-[520px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
          style={{ animation: 'scaleIn .3s cubic-bezier(0.16,1,0.3,1)', overscrollBehavior: 'contain' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors duration-200 bg-transparent border-0 cursor-pointer rounded-full hover:bg-charcoal/[.04]"
            aria-label="Fechar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <div className="mb-8 text-center">
            <span className="block font-label text-gold text-[.6rem] tracking-[.3em] uppercase mb-3">Atendimento Premium</span>
            <h2 id="wa-modal-title" className="font-serif text-charcoal text-2xl sm:text-[1.7rem] leading-tight mb-3">
              Atendimento exclusivo pelo WhatsApp
            </h2>
            <p className="text-text-2 text-[.85rem] leading-relaxed">
              Receba atendimento personalizado sobre unidades, valores e disponibilidade conforme seu perfil.
            </p>
          </div>

          <form id="form-whatsapp" onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-[.88rem] text-red-800 leading-relaxed">
                Não foi possível registrar seus dados agora. Você ainda será direcionado para o atendimento.
              </div>
            )}
            <div>
              <label htmlFor="wa-fullName" className="font-sans font-medium text-[.82rem] text-text-2 mb-2 block">Nome completo</label>
              <input
                id="wa-fullName"
                required
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Maria Silva"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-white border border-charcoal/[.06] px-5 py-4 text-cream placeholder-cream/25 outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/20 transition-colors transition-shadow duration-200 text-[.95rem] rounded-xl"
              />
            </div>
            <div>
              <label htmlFor="wa-phoneMobile" className="font-sans font-medium text-[.82rem] text-text-2 mb-2 block">WhatsApp</label>
              <input
                id="wa-phoneMobile"
                required
                name="phoneMobile"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                value={form.phoneMobile}
                onChange={handleChange}
                className="w-full bg-white border border-charcoal/[.06] px-5 py-4 text-cream placeholder-cream/25 outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/20 transition-colors transition-shadow duration-200 text-[.95rem] rounded-xl"
              />
              {showPhoneError && <p className="mt-2 text-[.78rem] text-red-700">{PHONE_ERROR_MESSAGE}</p>}
            </div>

            <div className="space-y-3 pt-4 border-t border-charcoal/[.06]">
              <span className="block font-label text-[.65rem] tracking-[.2em] uppercase text-gold text-center">
                Interesse principal
              </span>
              <div className="flex flex-col gap-1">
                {INTERESSE_WA_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2.5 px-1 py-2 cursor-pointer text-[0.88rem]">
                    <span className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      form.interest === value ? 'border-gold bg-gold' : 'border-charcoal/15'
                    }`}>
                      {form.interest === value && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                    <input
                      type="radio"
                      name="interest"
                      value={value}
                      checked={form.interest === value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className={`transition-colors duration-200 ${form.interest === value ? 'text-charcoal' : 'text-charcoal/50'}`}>
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-2">
              <p className="text-[0.75rem] text-text-2/60 mb-3">
                Seus dados estão protegidos conforme a LGPD. Atendimento consultivo, sem compromisso.
              </p>
              <button
                id="submit-whatsapp"
                type="submit"
                disabled={loading || !isFormValid}
                className="w-full py-5 bg-gold text-white font-label text-[.75rem] tracking-[.25em] uppercase transition-colors transition-transform transition-shadow duration-200 hover:bg-gold-dk hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 border-0 cursor-pointer rounded-lg shadow-cta"
              >
                {loading ? 'Abrindo WhatsApp…' : 'Falar com especialista no WhatsApp'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
