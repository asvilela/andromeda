import { useState } from 'react'
import { handlePhoneMask } from '@/utils/masks'
import { WhatsAppIcon } from './Icons'

export default function Contato({ onOpenPopup }: { onOpenPopup: () => void }) {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', interesse: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'whatsapp') {
      setForm({ ...form, [name]: handlePhoneMask(value) })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.whatsapp) {
      alert('Por favor, preencha nome e WhatsApp.')
      return
    }

    setLoading(true)

    let metragemText = form.interesse === '90' ? '90 m²' : form.interesse === '123' ? '123 m²' : 'especial'
    let notes = `Olá, Sou *${form.nome}*. Tenho interesse em receber a tabela de preços do apartamento de *${metragemText}* do *Andromeda By MPD*.`
    
    if (form.interesse === 'catalogo') notes = `Olá, Sou *${form.nome}*. Tenho interesse em *baixar o catálogo* do *Andromeda By MPD*.`
    if (form.interesse === 'visita') notes = `Olá, Sou *${form.nome}*. Tenho interesse em *agendar uma visita* ao *Andromeda By MPD*.`

    const payload = {
      fullName: form.nome,
      email: form.email,
      phoneMobile: form.whatsapp,
      origin: "Google Ads",
      product: "Andromeda by MPD",
      notes: notes,
      slug: "tainara-broker"
    }

    try {
      await fetch('https://habitus-lead.agreeablestone-fdee4559.brazilsouth.azurecontainerapps.io/api/leads/tainara-broker', {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Lead submission error:', error)
      alert('Houve um erro ao enviar seus dados. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'bg-bg2 border border-transparent text-cream placeholder-text-2/60 px-5 py-[1rem] font-sans text-[.95rem] outline-none focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15 transition-all duration-200 w-full appearance-none rounded-lg'
  const labelClass = 'font-label text-[.65rem] tracking-[.2em] uppercase text-text-2'

  return (
    <section id="contato" className="relative bg-white overflow-hidden py-32 lg:py-40 px-[8vw]" aria-labelledby="contato-title">
      <div className="relative max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-center">
        <div className="reveal">
          <span className="block font-label text-gold-dk text-[.72rem] tracking-[.25em] uppercase mb-5">Entre em contato</span>
          <h2
            id="contato-title"
            className="font-serif font-normal text-cream leading-[1.1] mb-7"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)' }}
          >
            Receba a tabela de preços e <em className="not-italic text-gold-dk">disponibilidade</em>
          </h2>
          <p className="text-[1rem] leading-[1.85] text-text-2 mb-10">
            O Andrômeda by MPD é a última torre de alto padrão da Av. Andrômeda.
            São 288 unidades — 90m² e 123m² — todas com depósito privativo,
            2 vagas determinadas e entrega sem necessidade de reforma.
            Fale com um consultor e receba plantas, disponibilidade e condições
            de financiamento sem compromisso.
          </p>
          <button
            onClick={onOpenPopup}
            className="inline-flex items-center gap-4 px-9 py-[1.05rem] bg-wpp-dk hover:bg-wpp text-white no-underline font-label text-[.72rem] tracking-[.18em] uppercase transition-all duration-200 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl shadow-md hover:shadow-lg"
            aria-label="Falar com consultor via WhatsApp"
          >
            <WhatsAppIcon size={18} />
            Chamar no WhatsApp
          </button>
        </div>

        {submitted ? (
          <div className="reveal flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl shadow-card-hover border border-black/[.04] min-h-[440px]" style={{ animation: 'fadeIn .5s ease' }}>
            <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#a88550" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="font-serif text-cream text-2xl mb-4">Enviado com sucesso!</h3>
            <p className="text-text-2 text-[.95rem] leading-relaxed max-w-[30ch]">
              Recebemos seus dados. Um consultor entrará em contato em breve via WhatsApp.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 font-label text-[.6rem] tracking-[.2em] uppercase text-gold-dk hover:text-cream transition-colors bg-transparent border-0 cursor-pointer"
            >
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form
            className="reveal reveal-delay-2 flex flex-col gap-5 bg-white p-10 rounded-3xl shadow-card-hover border border-black/[.04]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-2">
              <span className="font-label text-gold-dk text-[.6rem] tracking-[.25em] uppercase">Tabela de preços</span>
              <h3 className="font-serif text-cream text-[1.6rem] mt-1 leading-tight">Solicite seu atendimento</h3>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className={labelClass}>Nome completo</label>
              <input type="text" id="nome" name="nome" autoComplete="name" placeholder="Seu nome" value={form.nome} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClass}>E-mail</label>
              <input type="email" id="email" name="email" autoComplete="email" placeholder="seu@email.com" spellCheck={false} value={form.email} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="whatsapp" className={labelClass}>WhatsApp</label>
              <input type="tel" id="whatsapp" name="whatsapp" autoComplete="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={handleChange} required className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="interesse" className={labelClass}>Interesse</label>
              <select id="interesse" name="interesse" value={form.interesse} onChange={handleChange} className={inputClass}>
                <option value="">Selecione uma opção</option>
                <option value="90">Apartamento 90 m² · 2 Suítes</option>
                <option value="123">Apartamento 123 m² · 3 Suítes</option>
                <option value="catalogo">Baixar catálogo</option>
                <option value="visita">Agendar visita</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-3 py-[1.1rem] px-8 font-label text-[.72rem] tracking-[.2em] uppercase border-0 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
            >
              {loading ? 'Processando...' : 'Receber tabela de preços'}
            </button>
            <p className="text-[.75rem] text-text-2/80 leading-[1.6]">
              Ao enviar, você concorda com nossa política de privacidade. Seus dados são protegidos
              conforme a LGPD e não serão compartilhados com terceiros.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
