import { useState, useEffect, useRef } from 'react'
import { handlePhoneMask } from '@/utils/masks'
import { createLead } from '@/lib/api'
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

const STEP_CONFIG = [
  {
    title: 'Seus dados',
    desc: 'Precisamos apenas do nome e WhatsApp para enviar sua análise.',
    fields: ['fullName', 'phoneMobile'] as const,
  },
  {
    title: 'Perfil de interesse',
    desc: 'Qual planta e objetivo mais combinam com o seu momento?',
    fields: ['tipologia', 'objetivo'] as const,
  },
  {
    title: 'Preferências',
    desc: 'Ajuda nossa equipe a selecionar as melhores opções para você.',
    fields: ['preferencia', 'faixa'] as const,
  },
]

const FIELD_META: Record<string, { label: string; placeholder: string; type: 'text' | 'tel' | 'select'; autoComplete?: string }> = {
  fullName: { label: 'Nome completo', placeholder: 'Maria Silva', type: 'text', autoComplete: 'name' },
  phoneMobile: { label: 'WhatsApp', placeholder: '(11) 99999-9999', type: 'tel', autoComplete: 'tel' },
  tipologia: { label: 'Qual metragem mais combina com você?', placeholder: 'Selecione a metragem', type: 'select' },
  objetivo: { label: 'Seu objetivo é moradia ou investimento?', placeholder: 'Selecione seu objetivo', type: 'select' },
  preferencia: { label: 'Qual andar você prefere?', placeholder: 'Selecione sua preferência', type: 'select' },
  faixa: { label: 'Qual faixa de investimento considera ideal?', placeholder: 'Selecione a faixa', type: 'select' },
}

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
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'form' | 'success'>('form')
  const [error, setError] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setForm({ fullName: '', phoneMobile: '', tipologia: '', objetivo: '', preferencia: '', faixa: '' })
      setStep(0)
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

  // Auto-focus first input when step changes
  useEffect(() => {
    if (open && status === 'form') {
      setTimeout(() => firstInputRef.current?.focus(), 100)
    }
  }, [step, open, status])

  if (!open) return null

  const currentStep = STEP_CONFIG[step]
  const isLastStep = step === STEP_CONFIG.length - 1

  const isStepValid = (): boolean => {
    return currentStep.fields.every(key => form[key].trim().length > 0)
  }

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

  const handleNext = () => {
    if (!isStepValid()) return
    if (isLastStep) return
    setStep(s => s + 1)
    gtmEvent('unit_finder_step', { step: step + 2 })
  }

  const handleBack = () => {
    if (step > 0) setStep(s => s - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isStepValid()) return
    setLoading(true)
    setError(false)

    const notes = `Olá, sou *${form.fullName}*. Vim pelo site do ${PROJECT.productName} e gostaria de descobrir qual unidade faz mais sentido para o meu perfil.\n\nTipologia de interesse: *${form.tipologia}*\nObjetivo: *${form.objetivo}*\nPreferência: *${form.preferencia}*\nFaixa de investimento: *${form.faixa}*\n\nPode me ajudar com uma análise personalizada?`

    try {
      await createLead({ fullName: form.fullName, phoneMobile: form.phoneMobile, notes })
    } catch {
      setError(true)
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
                <span className="inline-block font-sans font-medium text-gold text-[.62rem] tracking-[.3em] uppercase mb-4">
                  Simulação personalizada
                </span>
                <h2 id="uf-modal-title" className="font-serif text-cream text-[1.6rem] sm:text-[1.85rem] leading-[1.1] mb-3">
                  Descubra a unidade ideal para o seu perfil
                </h2>
                <p className="text-text-2 text-[.88rem] leading-relaxed max-w-[420px] mx-auto">
                  Informe seus dados para avaliarmos plantas, preferências e condições mais alinhadas ao seu planejamento.
                </p>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {STEP_CONFIG.map((_, i) => (
                  <div key={i} className="flex-1 flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[.72rem] font-sans font-medium shrink-0 transition-colors duration-300 ${
                        i < step
                          ? 'bg-gold text-white'
                          : i === step
                            ? 'bg-charcoal text-white'
                            : 'bg-charcoal/[.08] text-text-2/50'
                      }`}
                    >
                      {i < step ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    {i < STEP_CONFIG.length - 1 && (
                      <div className={`flex-1 h-px transition-colors duration-300 ${i < step ? 'bg-gold' : 'bg-charcoal/[.08]'}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step title */}
              <div className="mb-6">
                <h3 className="font-serif text-cream text-[1.15rem] leading-tight mb-1">
                  {currentStep.title}
                </h3>
                <p className="text-text-2/70 text-[.82rem]">{currentStep.desc}</p>
              </div>

              {/* Fields */}
              <form
                id="form-unit-finder"
                onSubmit={isLastStep ? handleSubmit : (e) => { e.preventDefault(); handleNext() }}
                className="flex flex-col gap-5"
              >
                {currentStep.fields.map((fieldKey, i) => {
                  const meta = FIELD_META[fieldKey]
                  return (
                    <div key={fieldKey}>
                      <label
                        htmlFor={`uf-${fieldKey}`}
                        className="block font-sans font-medium text-[.72rem] tracking-[.15em] uppercase text-text-2 mb-2.5"
                      >
                        {meta.label}
                      </label>
                      {meta.type === 'select' ? (
                        <CustomSelect
                          options={SELECT_OPTIONS[fieldKey] || []}
                          value={form[fieldKey]}
                          onChange={handleSelectChange(fieldKey)}
                          placeholder={meta.placeholder}
                        />
                      ) : (
                        <input
                          ref={i === 0 ? firstInputRef : undefined}
                          required
                          id={`uf-${fieldKey}`}
                          name={fieldKey}
                          type={meta.type}
                          autoComplete={meta.autoComplete}
                          placeholder={meta.placeholder}
                          value={form[fieldKey]}
                          onChange={handleInputChange}
                          className={inputClass}
                        />
                      )}
                    </div>
                  )
                })}

                {/* Value block — only on last step */}
                {isLastStep && (
                  <div className="bg-white rounded-2xl p-5 border border-charcoal/[.06] mt-1">
                    <p className="font-sans font-medium text-[.72rem] tracking-[.1em] uppercase text-text-2/60 mb-3">
                      Com base no seu perfil, analisamos:
                    </p>
                    <ul className="flex flex-col gap-2">
                      {[
                        'Metragens mais aderentes',
                        'Preferências de planta e andar',
                        'Faixa de investimento compatível',
                        'Disponibilidade atualizada',
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-[.85rem] text-text-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3 mt-2">
                  <button
                    id={isLastStep ? 'submit-unit-finder' : undefined}
                    type="submit"
                    disabled={loading || !isStepValid()}
                    className="w-full py-[16px] bg-gold text-white font-label text-[.8rem] tracking-[.2em] uppercase transition-colors transition-transform transition-shadow duration-200 hover:bg-gold-dk hover:-translate-y-0.5 disabled:opacity-40 disabled:translate-y-0 disabled:cursor-not-allowed border-0 cursor-pointer rounded-xl shadow-cta hover:shadow-cta-hover"
                  >
                    {loading
                      ? 'Abrindo WhatsApp…'
                      : isLastStep
                        ? 'Receber minha análise personalizada'
                        : 'Continuar'}
                  </button>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full py-3 bg-transparent text-text-2 font-sans text-[.78rem] tracking-[.1em] border-0 cursor-pointer hover:text-cream transition-colors duration-200"
                    >
                      Voltar
                    </button>
                  )}
                </div>

                {/* Trust copy */}
                <p className="text-[.75rem] text-text-2/50 text-center mt-1">
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
