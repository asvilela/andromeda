import { useState, useEffect } from 'react'
import { handlePhoneMask } from '@/utils/masks'

interface PopupConfig {
  type: string
  title?: string
  subtitle?: string
  buttonText?: string
  initialInterest?: string
}

export default function LeadPopup({ config, onClose }: { config: PopupConfig | null; onClose: () => void }) {
  const isOpen = !!config
  const type = config?.type || 'general'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneMobile: '',
    interest: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (config) {
      setFormData({
        fullName: '',
        email: '',
        phoneMobile: '',
        interest: config.initialInterest || (config.type === 'plantas' ? '90 m²' : 'Valores'),
      })
    }
  }, [config])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'phoneMobile') {
      setFormData(prev => ({ ...prev, [name]: handlePhoneMask(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let notes = ''
    if (type === 'plantas') {
      notes = `Olá, Sou *${formData.fullName}*. Tenho interesse em receber a tabela de preços do apartamento de *${formData.interest}* do *Andromeda By MPD*.`
    } else {
      notes = `Olá, Sou *${formData.fullName}*. Vim pelo site do *Andromeda by MPD* e tenho interesse em *${formData.interest}*. Pode me enviar as informações atualizadas?`
    }
    
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phoneMobile: formData.phoneMobile,
      origin: "Google Ads",
      product: "Andromeda by MPD",
      notes: notes,
      slug: "tainara-broker"
    }

    try {
      await fetch('https://habitus-lead.agreeablestone-fdee4559.brazilsouth.azurecontainerapps.io/api/leads/tainara-broker', {
        method: 'POST',
        headers: { 'accept': 'text/plain', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const wppUrl = `https://wa.me/5511964178766?text=${encodeURIComponent(notes)}`
      window.location.href = wppUrl
    } catch (error) {
      console.error('Lead submission error:', error)
      alert('Houve um erro ao enviar seus dados. Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const title = config?.title || (type === 'plantas' ? 'Receba a Tabela de Valores Atualizada' : 'Atendimento Exclusivo pelo WhatsApp')
  const subtitle = config?.subtitle || (type === 'plantas' ? 'Atendimento personalizado e envio imediato via WhatsApp.' : 'Receba valores atualizados, disponibilidade e condições especiais.')
  const buttonText = config?.buttonText || (type === 'plantas' ? 'Receber valores agora' : 'Receber Informações agora')

  const interests = type === 'plantas' ? ['90 m²', '123 m²'] : ['Valores', 'Disponibilidade', 'Agendar visita', 'Investimento']

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        style={{ animation: 'fadeIn .3s ease' }}
        onClick={onClose}
      />
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl p-8 sm:p-10 shadow-2xl" style={{ animation: 'scaleIn .3s cubic-bezier(0.16,1,0.3,1)' }}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-cream/40 hover:text-cream transition-colors bg-transparent border-0 cursor-pointer rounded-full hover:bg-black/[.04]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="mb-10 text-center">
          <span className="block font-label text-gold text-[.6rem] tracking-[.3em] uppercase mb-3">WhatsApp Premium</span>
          <h2 className="font-serif text-cream text-2xl sm:text-3xl leading-tight mb-3">{title}</h2>
          <p className="text-cream/45 text-[.85rem] leading-relaxed">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            required
            name="fullName"
            type="text"
            placeholder="Nome Completo"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full bg-bg2 border border-black/[.06] px-5 py-4 text-cream placeholder-cream/30 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all text-[.95rem] rounded-lg"
          />
          <input
            required
            name="phoneMobile"
            type="tel"
            placeholder="WhatsApp com DDD"
            value={formData.phoneMobile}
            onChange={handleChange}
            className="w-full bg-bg2 border border-black/[.06] px-5 py-4 text-cream placeholder-cream/30 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all text-[.95rem] rounded-lg"
          />
          <input
            name="email"
            type="email"
            placeholder="Seu e-mail (opcional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-bg2 border border-black/[.06] px-5 py-4 text-cream placeholder-cream/30 outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all text-[.95rem] rounded-lg"
          />

          <div className="space-y-4 pt-4 border-t border-black/[.06]">
            <span className="block font-label text-[.65rem] tracking-[.2em] uppercase text-gold text-center">
              {type === 'plantas' ? 'Qual metragem você procura?' : 'Interesse Principal:'}
            </span>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group p-3 border border-transparent hover:border-gold/10 transition-colors rounded-lg hover:bg-bg2">
                  <input
                    type="radio"
                    name="interest"
                    value={item}
                    checked={formData.interest === item}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${formData.interest === item ? 'border-gold bg-gold/15 scale-110' : 'border-black/[.15]'}`}>
                    {formData.interest === item && <div className="w-1.5 h-1.5 bg-gold rounded-full" />}
                  </div>
                  <span className={`text-[.8rem] tracking-wide transition-colors ${formData.interest === item ? 'text-cream' : 'text-cream/45 group-hover:text-cream/60'}`}>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gold text-white font-label text-[.75rem] tracking-[.25em] uppercase transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 border-0 cursor-pointer rounded-lg"
            >
              {loading ? 'Processando...' : buttonText}
            </button>
            <div className="mt-5 flex items-center justify-center gap-2 text-cream/30 text-[.6rem] tracking-[.1em] uppercase text-center">
              <span>🔒 Seus dados estão protegidos. Atendimento personalizado.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
