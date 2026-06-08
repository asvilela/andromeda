import { useState, useEffect } from 'react'
import { handlePhoneMask } from '@/utils/masks'
import { createLead } from '@/lib/api'
import { useTrackingParams } from '@/hooks/useTrackingParams'
import { gtmEvent } from '@/lib/gtm'
import { WHATSAPP_NUMBER, PROJECT, VISITA_METRAGEM_OPTIONS, VISITA_DIA_OPTIONS } from '@/lib/constants'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  open: boolean
  onClose: () => void
}

export default function VisitModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ fullName: '', phoneMobile: '', metragem: '', dia: '' })
  const [loading, setLoading] = useState(false)
  const tracking = useTrackingParams()

  useEffect(() => {
    if (open) {
      setForm({ fullName: '', phoneMobile: '', metragem: '', dia: '' })
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
    if (!form.fullName || !form.phoneMobile) return
    setLoading(true)

    const notes = `Olá, sou *${form.fullName}*. Vim pelo site do ${PROJECT.productName} e gostaria de *agendar uma visita* ao Espaço ${PROJECT.name}.\n\nMetragem de interesse: *${form.metragem || 'não informada'}*\nMelhor dia: *${form.dia || 'não informado'}*\n\nAguardo confirmação!`

    try {
      await createLead({ fullName: form.fullName, phoneMobile: form.phoneMobile, notes }, tracking)
    } catch {
      // falha silenciosa
    }

    gtmEvent('lead_form_submit', { form_location: 'visit_modal' })
    gtmEvent('whatsapp_click', { click_source: 'visit_modal' })

    const wppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(notes)}`
    window.location.href = wppUrl
    setLoading(false)
  }

  const inputClass = 'w-full bg-white border border-charcoal/[.06] px-5 py-4 text-cream placeholder-cream/25 outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/20 transition-colors transition-shadow duration-200 text-[.95rem] rounded-xl'

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-labelledby="visit-modal-title">
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
            <span className="block font-label text-gold text-[.6rem] tracking-[.3em] uppercase mb-3">Visita exclusiva</span>
            <h2 id="visit-modal-title" className="font-serif text-charcoal text-2xl sm:text-[1.7rem] leading-tight mb-3 pr-10">
              Agende sua Visita Exclusiva ao Espaço {PROJECT.name}
            </h2>
            <p className="text-text-2 text-[.85rem] leading-relaxed">
              Conheça o projeto, maquete e condições especiais com atendimento personalizado.
            </p>
          </div>

          <form id="form-visit" onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="visit-fullName" className="font-sans font-medium text-[.82rem] text-text-2 mb-2 block">Nome completo</label>
              <input
                id="visit-fullName"
                required
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Maria Silva"
                value={form.fullName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="visit-phoneMobile" className="font-sans font-medium text-[.82rem] text-text-2 mb-2 block">WhatsApp</label>
              <input
                id="visit-phoneMobile"
                required
                name="phoneMobile"
                type="tel"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                value={form.phoneMobile}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="font-sans font-medium text-[.82rem] text-text-2 mb-2 block">Metragem de interesse</label>
              <Select value={form.metragem} onValueChange={(v) => setForm(prev => ({ ...prev, metragem: v }))}>
                <SelectTrigger className="w-full bg-white border border-charcoal/[.06] rounded-xl px-5 py-4 h-auto font-sans text-[.95rem] focus:border-gold focus:ring-1 focus:ring-gold/20">
                  <SelectValue placeholder="Selecione a metragem" />
                </SelectTrigger>
                <SelectContent className="z-[10000]">
                  {VISITA_METRAGEM_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-sans font-medium text-[.82rem] text-text-2 mb-2 block">Melhor dia para visita</label>
              <Select value={form.dia} onValueChange={(v) => setForm(prev => ({ ...prev, dia: v }))}>
                <SelectTrigger className="w-full bg-white border border-charcoal/[.06] rounded-xl px-5 py-4 h-auto font-sans text-[.95rem] focus:border-gold focus:ring-1 focus:ring-gold/20">
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent className="z-[10000]">
                  {VISITA_DIA_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-2">
              <p className="text-[0.75rem] text-text-2/60 mb-3">
                Seus dados estão protegidos conforme a LGPD. Atendimento consultivo, sem compromisso.
              </p>
              <button
                id="submit-visit"
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gold text-white font-label text-[.75rem] tracking-[.25em] uppercase transition-colors transition-transform transition-shadow duration-200 hover:bg-gold-dk hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 border-0 cursor-pointer rounded-lg shadow-cta"
              >
                {loading ? 'Abrindo WhatsApp...' : 'Confirmar visita pelo WhatsApp'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
