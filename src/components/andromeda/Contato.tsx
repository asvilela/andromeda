import { useState } from 'react'
import { PHONE_ERROR_MESSAGE, handlePhoneMask, isValidBrazilianMobilePhone } from '@/utils/masks'
import { createLead } from '@/lib/api'
import { useTrackingParams } from '@/hooks/useTrackingParams'
import { gtmEvent } from '@/lib/gtm'
import { PROJECT, TIPOLOGIA_OPTIONS, OBJETIVO_OPTIONS, HORARIO_OPTIONS } from '@/lib/constants'
import CustomSelect from './CustomSelect'
import SectionHeader from './SectionHeader'

export default function Contato() {
  const [form, setForm] = useState({
    nome: '', email: '', whatsapp: '', tipologia: '', objetivo: '', horario: '', mensagem: '', lgpd: false,
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const tracking = useTrackingParams()
  const isPhoneValid = isValidBrazilianMobilePhone(form.whatsapp)
  const showPhoneError = form.whatsapp.replace(/\D/g, '').length > 0 && !isPhoneValid
  const isFormValid = form.nome.trim().length >= 3 && isPhoneValid && form.lgpd

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (name === 'whatsapp') {
      setForm(prev => ({ ...prev, [name]: handlePhoneMask(value) }))
    } else if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return
    setLoading(true)
    setError(false)

    const notes = [
      `Tipologia: ${form.tipologia || 'não informada'}`,
      `Objetivo: ${form.objetivo || 'não informado'}`,
      `Horário preferido: ${form.horario || 'não informado'}`,
      form.mensagem ? `Mensagem: ${form.mensagem}` : '',
    ].filter(Boolean).join('\n')

    try {
      await createLead({
        fullName: form.nome,
        email: form.email,
        phoneMobile: form.whatsapp,
        notes,
      }, tracking)
      gtmEvent('lead_form_submit', { form_location: 'contact' })
      setSubmitted(true)
    } catch {
      setError(true)
    }

    setLoading(false)
  }

  const inputClass = 'bg-bg2 border border-charcoal/[.06] text-cream placeholder-text-2/50 px-5 py-[1.05rem] font-sans text-[1rem] outline-none focus-visible:ring-2 focus-visible:ring-gold/20 focus-visible:border-gold transition-colors transition-shadow duration-200 w-full appearance-none rounded-xl'

  return (
    <section id="contato" className="relative bg-white overflow-hidden py-20 sm:py-28 px-[8vw]" aria-labelledby="contato-title">
      <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-center">
        <div className="reveal">
          <SectionHeader label="Simulação personalizada" id="contato-title" maxWidth="20ch">
            Receba uma <em className="not-italic text-gold-dk">simulação personalizada</em>
          </SectionHeader>
          <p className="text-[1.05rem] leading-[1.85] text-text-2 mb-6">
            Informe seu perfil para avaliarmos disponibilidade, planta, andar, vista e fluxo de pagamento mais adequado ao seu momento.
          </p>
          <div className="bg-bg2 rounded-2xl p-7">
            <p className="text-[.95rem] leading-[1.8] text-text-2/90">
              Os valores variam por planta, andar, vista e disponibilidade. Solicite uma simulação para receber as melhores opções para o seu perfil.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="reveal flex flex-col items-center justify-center text-center p-10 sm:p-14 bg-white rounded-3xl shadow-card-hover border border-charcoal/[.04] min-h-[440px]" style={{ animation: 'fadeIn .5s ease' }}>
            <div className="w-18 h-18 bg-gold/15 rounded-full flex items-center justify-center text-gold mb-7" style={{ width: 72, height: 72 }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="font-serif text-cream text-[1.4rem] font-semibold mb-3">Solicitação enviada com sucesso</h3>
            <p className="text-[1rem] text-text-2 leading-relaxed max-w-[380px] mb-3">
              Recebemos seus dados e um especialista entrará em contato pelo WhatsApp em breve para apresentar as melhores opções para o seu perfil.
            </p>
            <p className="text-[.85rem] text-text-2/60">Fique atento ao seu WhatsApp.</p>
          </div>
        ) : (
          <form
            id="form-contact"
            className="reveal reveal-delay-2 flex flex-col gap-5 bg-white p-8 sm:p-12 rounded-3xl shadow-card-hover border border-charcoal/[.04]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-3">
              <span className="font-sans font-medium text-gold-dk text-[.72rem] tracking-[.25em] uppercase">Simulação personalizada</span>
              <h3 className="font-serif text-cream text-[1.7rem] sm:text-[1.9rem] mt-2 leading-tight">Encontre a melhor unidade para o seu perfil</h3>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="font-sans font-medium text-[.82rem] text-text-2">Nome completo</label>
              <input type="text" id="nome" name="nome" autoComplete="name" placeholder="Maria Silva" value={form.nome} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="whatsapp" className="font-sans font-medium text-[.82rem] text-text-2">WhatsApp</label>
                <input type="tel" id="whatsapp" name="whatsapp" autoComplete="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={handleChange} required className={inputClass} />
                {showPhoneError && <p className="mt-2 text-[.78rem] text-red-700">{PHONE_ERROR_MESSAGE}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans font-medium text-[.82rem] text-text-2">E-mail</label>
                <input type="email" id="email" name="email" autoComplete="email" placeholder="seu@email.com…" spellCheck={false} value={form.email} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <CustomSelect
                label="Tipologia"
                options={TIPOLOGIA_OPTIONS}
                value={form.tipologia}
                onChange={(v) => setForm(prev => ({ ...prev, tipologia: v }))}
                placeholder="Selecione"
              />
              <CustomSelect
                label="Objetivo"
                options={OBJETIVO_OPTIONS}
                value={form.objetivo}
                onChange={(v) => setForm(prev => ({ ...prev, objetivo: v }))}
                placeholder="Selecione"
              />
            </div>
            <CustomSelect
              label="Horário preferido para contato"
              options={HORARIO_OPTIONS}
              value={form.horario}
              onChange={(v) => setForm(prev => ({ ...prev, horario: v }))}
              placeholder="Selecione"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="mensagem" className="font-sans font-medium text-[.82rem] text-text-2">Mensagem (opcional)</label>
              <textarea
                id="mensagem"
                name="mensagem"
                placeholder="Conte-nos mais sobre o que procura…"
                value={form.mensagem}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="lgpd" checked={form.lgpd} onChange={handleChange} className="mt-1 accent-gold focus-visible:ring-2 focus-visible:ring-gold/20 focus-visible:outline-none" required />
              <span className="text-[.82rem] text-text-2/80 leading-[1.6]">
                Ao enviar, você concorda com nossa política de privacidade. Seus dados são protegidos
                conforme a LGPD e não serão compartilhados com terceiros.
              </span>
            </label>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-[.88rem] text-red-800 leading-relaxed">
                Não foi possível enviar sua solicitação. Verifique sua conexão e tente novamente.
              </div>
            )}

            <button
              id="submit-contact"
              type="submit"
              disabled={loading || !isFormValid}
              className="mt-3 py-[1.2rem] px-8 font-label text-[.82rem] tracking-[.18em] uppercase border-0 cursor-pointer transition-colors transition-transform transition-shadow duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
            >
              {loading ? 'Enviando solicitação…' : 'Receber minha simulação personalizada'}
            </button>
            <p className="text-[.78rem] text-text-2/50 text-center -mt-1">Seus dados estão protegidos conforme a LGPD. Atendimento consultivo, sem compromisso.</p>
          </form>
        )}
      </div>
    </section>
  )
}
