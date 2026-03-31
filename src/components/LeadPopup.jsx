import { useState, useEffect } from 'react'
import { handlePhoneMask } from '../utils/masks'

export default function LeadPopup({ config, onClose }) {
  const isOpen = !!config
  const type = config?.type || 'general'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneMobile: '',
    interest: '',
  })
  const [loading, setLoading] = useState(false)

  // Reset form when config changes (e.g. user opens different modal)
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

  // Block scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phoneMobile') {
      setFormData(prev => ({ ...prev, [name]: handlePhoneMask(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
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
      // API call
      await fetch('https://habitus-lead.agreeablestone-fdee4559.brazilsouth.azurecontainerapps.io/api/leads/tainara-broker', {
        method: 'POST',
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      // Redirect to WhatsApp
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

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#05050a]/90 backdrop-blur-md animate-[fadeIn_.3s_ease]"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-[500px] bg-bg3 border border-border p-8 sm:p-10 shadow-2xl animate-[scaleIn_.3s_cubic-bezier(0.16,1,0.3,1)]">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-muted hover:text-cream transition-colors"
          aria-label="Fechar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Header */}
        <div className="mb-10 text-center">
          <span className="block font-label text-gold text-[.6rem] tracking-[.3em] uppercase mb-3">WhatsApp Premium</span>
          <h2 className="font-serif text-cream text-2xl sm:text-3xl leading-tight mb-3">{title}</h2>
          <p className="text-muted text-[.85rem] leading-relaxed">{subtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-1.5">
            <input
              required
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Nome Completo"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-[#1a1a2e] border border-border px-5 py-4 text-cream placeholder-muted/60 outline-none focus:border-gold transition-colors text-[.95rem]"
              aria-label="Nome Completo"
            />
          </div>

          <div className="space-y-1.5">
            <input
              required
              id="phoneMobile"
              name="phoneMobile"
              type="tel"
              placeholder="WhatsApp com DDD"
              value={formData.phoneMobile}
              onChange={handleChange}
              className="w-full bg-[#1a1a2e] border border-border px-5 py-4 text-cream placeholder-muted/60 outline-none focus:border-gold transition-colors text-[.95rem]"
              aria-label="WhatsApp com DDD"
            />
          </div>

          <div className="space-y-1.5">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Seu e-mail (opcional)"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1a1a2e] border border-border px-5 py-4 text-cream placeholder-muted/60 outline-none focus:border-gold transition-colors text-[.95rem]"
              aria-label="Seu e-mail (opcional)"
            />
          </div>

          {/* Interests / Size selection */}
          <div className="space-y-4 pt-4 border-t border-border">
            <span className="block font-label text-[.65rem] tracking-[.2em] uppercase text-gold/80 text-center">
              {type === 'plantas' ? 'Qual metragem você procura?' : 'Interesse Principal:'}
            </span>
            <div className={`grid grid-cols-2 gap-4`}>
              {(type === 'plantas' 
                ? ['90 m²', '123 m²'] 
                : ['Valores', 'Disponibilidade', 'Agendar visita', 'Investimento']
              ).map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group p-2 border border-transparent hover:border-gold/10 transition-colors">
                  <input
                    type="radio"
                    name="interest"
                    value={item}
                    checked={formData.interest === item}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${formData.interest === item ? 'border-gold bg-gold/20 scale-110 shadow-[0_0_10px_rgba(201,168,76,0.3)]' : 'border-border'}`}>
                    {formData.interest === item && <div className="w-1.5 h-1.5 bg-gold rounded-full" />}
                  </div>
                  <span className={`text-[.8rem] tracking-wide transition-colors ${formData.interest === item ? 'text-cream' : 'text-muted group-hover:text-cream/70'}`}>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submission */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gradient-to-r from-gold to-gold-lt text-[#0a0a10] font-label text-[.75rem] tracking-[.25em] uppercase transition-all hover:opacity-95 hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 shadow-lg"
            >
              {loading ? 'Processando...' : buttonText}
            </button>
            <div className="mt-5 flex items-center justify-center gap-2 text-muted/60 text-[.6rem] tracking-[.1em] uppercase text-center">
              <span>🔒 Seus dados estão protegidos. Atendimento personalizado.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
