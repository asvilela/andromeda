import { useState } from 'react'

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '', interesse: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nome || !form.whatsapp) {
      alert('Por favor, preencha nome e WhatsApp.')
      return
    }
    const msg = encodeURIComponent(
      `Olá! Me chamo ${form.nome} e tenho interesse no Andrômeda Home. Meu WhatsApp é ${form.whatsapp}.`
    )
    window.open(`https://wa.me/551121490015?text=${msg}`, '_blank', 'noopener')
  }

  const inputClass = 'bg-bg3 border border-border text-cream placeholder-muted px-5 py-[.9rem] font-sans text-[.9rem] outline-none focus:border-gold transition-colors duration-200 w-full appearance-none'
  const labelClass = 'font-label text-[.62rem] tracking-[.2em] uppercase text-muted'

  return (
    <section id="contato" className="relative bg-bg2 overflow-hidden py-32 px-[8vw]" aria-labelledby="contato-title">
      {/* Glow */}
      <div
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left */}
        <div className="reveal">
          <span className="block font-label text-gold text-[.7rem] tracking-[.25em] uppercase mb-4">Entre em contato</span>
          <h2
            id="contato-title"
            className="font-serif font-light text-cream leading-[1.2] mb-6"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            Reserve sua unidade com <em className="not-italic text-gold-lt">condições exclusivas</em>
          </h2>
          <p className="text-[.9rem] leading-[1.8] text-muted mb-10">
            As 288 unidades do Andrômeda Home representam a última oportunidade
            de morar em uma torre residencial premium na Av. Andrômeda, em Alphaville.
            Nossos consultores estão prontos para apresentar plantas, disponibilidade
            e condições de pagamento personalizadas.
          </p>
          <a
            href="https://wa.me/551121490015?text=Olá!%20Tenho%20interesse%20no%20Andrômeda%20Home%20e%20gostaria%20de%20mais%20informações."
            className="inline-flex items-center gap-4 px-8 py-[1.1rem] bg-wpp-dk text-white no-underline font-label text-[.7rem] tracking-[.18em] uppercase transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
            target="_blank" rel="noopener"
            aria-label="Falar com consultor via WhatsApp"
          >
            <WppIcon />
            Chamar no WhatsApp
          </a>
        </div>

        {/* Form */}
        <form
          className="reveal reveal-delay-2 flex flex-col gap-5"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulário de contato"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className={labelClass}>Nome completo</label>
            <input type="text" id="nome" name="nome" autoComplete="name" placeholder="Seu nome" value={form.nome} onChange={handleChange} required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>E-mail</label>
            <input type="email" id="email" name="email" autoComplete="email" placeholder="seu@email.com" spellCheck="false" value={form.email} onChange={handleChange} required className={inputClass} />
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
            className="mt-2 py-4 px-8 font-label text-[.7rem] tracking-[.2em] uppercase border-0 cursor-pointer transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8cc7e 100%)', color: '#0a0a10' }}
          >
            Receber proposta personalizada
          </button>
          <p className="text-[.72rem] text-muted leading-[1.6]">
            Ao enviar, você concorda com nossa política de privacidade. Seus dados são protegidos
            conforme a LGPD e não serão compartilhados com terceiros.
          </p>
        </form>
      </div>
    </section>
  )
}

function WppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
