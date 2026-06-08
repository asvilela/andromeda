import { useState, useEffect, useRef } from 'react'
import { handlePhoneMask } from '@/utils/masks'
import { createLead } from '@/lib/api'
import { useTrackingParams } from '@/hooks/useTrackingParams'
import { gtmEvent } from '@/lib/gtm'
import {
  WHATSAPP_NUMBER,
  PROJECT,
  TIPOLOGIA_OPTIONS,
  OBJETIVO_OPTIONS,
  PREFERENCIA_OPTIONS,
  FAIXA_INVESTIMENTO_OPTIONS,
} from '@/lib/constants'
import CustomSelect from './CustomSelect'

interface Props {
  open: boolean
  onClose: () => void
}

type FormData = {
  fullName: string
  phoneMobile: string
  tipologia: string
  objetivo: string
  preferencia: string
  faixa: string
}

const FIELDS: { key: keyof FormData; label: string; placeholder: string; type: 'text' | 'tel' | 'select'; autoComplete?: string }[] = [
  { key: 'fullName', label: 'Nome completo', placeholder: 'Maria Silva', type: 'text', autoComplete: 'name' },
  { key: 'phoneMobile', label: 'WhatsApp', placeholder: '(11) 99999-9999', type: 'tel', autoComplete: 'tel' },
  { key: 'tipologia', label: 'Qual metragem mais combina com você?', placeholder: 'Selecione a metragem', type: 'select' },
  { key: 'objetivo', label: 'Seu objetivo é moradia ou investimento?', placeholder: 'Selecione seu objetivo', type: 'select' },
  { key: 'preferencia', label: 'Qual andar você prefere?', placeholder: 'Selecione sua preferência', type: 'select' },
  { key: 'faixa', label: 'Qual faixa de investimento considera ideal?', placeholder: 'Selecione a faixa', type: 'select' },
]

const SELECT_OPTIONS: Record<string, { value: string; label: string }[]> = {
  tipologia: TIPOLOGIA_OPTIONS,
  objetivo: OBJETIVO_OPTIONS,
  preferencia: PREFERENCIA_OPTIONS,
  faixa: FAIXA_INVESTIMENTO_OPTIONS,
}

export default function UnitFinder({ open, onClose }: Props) {
  const [form, setForm] = useState<FormData>({
    fullName: '', phoneMobile: '', tipologia: '', objetivo: '', preferencia: '', faixa: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'form' | 'success'>('form')
  const firstInputRef = useRef<HTMLInputElement>(null)
  const tracking = useTrackingParams()

  useEffect(() => {
    if (open) {
      setForm({ fullName: '', phoneMobile: '', tipologia: '', objetivo: '', preferencia: '', faixa: '' })
      setStatus('form')
      document.body.style.overflow = 'hidden'
      gtmEvent('unit_finder_open')
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

  useEffect(() => {
    if (open && status === 'form') {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [open, status])

  if (!open) return null

  const isFieldFilled = (key: keyof FormData) => form[key].trim().length > 0
  const isFormValid = form.fullName.trim().length >= 3 && form.phoneMobile.replace(/\D/g, '').length >= 10

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phoneMobile') {
      setForm(prev => ({ ...prev, [name]: handlePhoneMask(value) }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSelectChange = (key: keyof FormData) => (value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setLoading(true)

    const notes = `Olá, sou *${form.fullName}*. Vim pelo site do ${PROJECT.productName} e gostaria de descobrir qual unidade faz mais sentido para o meu perfil.\n\nTipologia de interesse: *${form.tipologia || 'não informada'}*\nObjetivo: *${form.objetivo || 'não informado'}*\nPreferência: *${form.preferencia || 'não informada'}*\nFaixa de investimento: *${form.faixa || 'não informada'}*\n\nPode me ajudar com uma análise personalizada?`

    try {
      await createLead({ fullName: form.fullName, phoneMobile: form.phoneMobile, notes }, tracking)
    } catch {
      // falha silenciosa
    }

    gtmEvent('lead_form_submit', { form_location: 'unit_finder' })
    gtmEvent('whatsapp_click', { click_source: 'unit_finder' })

    const wppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(notes)}`
    window.location.href = wppUrl
    setLoading(false)
    setStatus('success')
  }

  const inputClass = 'w-full bg-white border border-charcoal/[.08] px-5 py-[14px] text-cream placeholder-text-2/50 outline-none focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/15 transition-colors transition-shadow duration-200 text-[.95rem] rounded-xl font-sans'

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-labelledby="uf-modal-title">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        style={{ animation: 'fadeIn .3s ease' }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-bg rounded-3xl w-full max-w-[540px] relative max-h-[92vh] overflow-y-auto"
          style={{ animation: 'scaleIn .3s cubic-bezier(0.16,1,0.3,1)', overscrollBehavior: 'contain' }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-charcoal/30 hover:text-charcoal transition-colors duration-200 bg-transparent border-0 cursor-pointer rounded-full hover:bg-charcoal/[.04] z-10"
            aria-label="Fechar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {status === 'success' ? (
            <div className="flex flex-col items-center text-center px-8 py-14 sm:px-12" style={{ animation: 'fadeIn .4s ease' }}>
              <div className="w-[72px] h-[72px] rounded-full bg-gold/15 flex items-center justify-center text-gold mb-8">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 className="font-serif text-cream text-[1.5rem] sm:text-[1.7rem] leading-tight mb-4">
                Análise solicitada com sucesso
              </h3>
              <p className="text-text-2 text-[.95rem] leading-relaxed max-w-[380px] mb-3">
                Em instantes, entraremos em contato pelo WhatsApp com opções compatíveis com o seu perfil.
              </p>
              <p className="text-text-2/50 text-[.82rem]">Fique atento ao seu WhatsApp.</p>
            </div>
          ) : (
            <div className="px-7 py-8 sm:px-10 sm:py-10">
              {/* Header */}
              <div className="mb-8 text-center">
                <h2 id="uf-modal-title" className="font-serif text-cream text-[1.6rem] sm:text-[1.85rem] leading-[1.1] mb-3 pr-10">
                  Descubra a unidade ideal para o seu perfil
                </h2>
                <p className="text-text-2 text-[.88rem] leading-relaxed max-w-[420px] mx-auto">
                  Informe seu perfil para avaliarmos plantas, vistas e condições compatíveis com seu planejamento.
                </p>
              </div>

              {/* Timeline vertical com todos os campos */}
              <form
                id="form-unit-finder"
                onSubmit={handleSubmit}
                className="flex flex-col"
              >
                {FIELDS.map((field, i) => {
                  const filled = isFieldFilled(field.key)
                  const isLast = i === FIELDS.length - 1

                  return (
                    <div key={field.key} className="flex gap-4">
                      {/* Timeline indicator */}
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[.65rem] font-sans font-medium transition-colors duration-300 ${
                            filled
                              ? 'bg-gold text-white'
                              : 'bg-charcoal/[.08] text-text-2/50'
                          }`}
                        >
                          {filled ? (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : (
                            i + 1
                          )}
                        </div>
                        {!isLast && (
                          <div className={`w-px flex-1 min-h-[16px] transition-colors duration-300 ${filled ? 'bg-gold' : 'bg-charcoal/[.08]'}`} />
                        )}
                      </div>

                      {/* Field */}
                      <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-5'}`}>
                        <label
                          htmlFor={`uf-${field.key}`}
                          className="block font-sans font-medium text-[.82rem] text-text-2 mb-2"
                        >
                          {field.label}
                        </label>
                        {field.type === 'select' ? (
                          <CustomSelect
                            options={SELECT_OPTIONS[field.key] || []}
                            value={form[field.key]}
                            onChange={handleSelectChange(field.key)}
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            ref={i === 0 ? firstInputRef : undefined}
                            required={field.key === 'fullName' || field.key === 'phoneMobile'}
                            id={`uf-${field.key}`}
                            name={field.key}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            placeholder={field.placeholder}
                            value={form[field.key]}
                            onChange={handleInputChange}
                            className={inputClass}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-6">
                  <button
                    id="submit-unit-finder"
                    type="submit"
                    disabled={loading || !isFormValid}
                    className="w-full py-[16px] bg-gold text-white font-label text-[.8rem] tracking-[.2em] uppercase transition-colors transition-transform transition-shadow duration-200 hover:bg-gold-dk hover:-translate-y-0.5 disabled:opacity-40 disabled:translate-y-0 disabled:cursor-not-allowed border-0 cursor-pointer rounded-xl shadow-cta hover:shadow-cta-hover"
                  >
                    {loading ? 'Abrindo WhatsApp…' : 'Receber análise personalizada'}
                  </button>
                </div>

                {/* Trust copy */}
                <p className="text-[.75rem] text-text-2/50 text-center mt-4">
                  Seus dados estão protegidos conforme a LGPD. Atendimento consultivo, sem compromisso.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
