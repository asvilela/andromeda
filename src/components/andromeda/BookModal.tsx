import { useState, useEffect } from 'react'
import { handlePhoneMask } from '@/utils/masks'
import { createLead } from '@/lib/api'
import { gtmEvent } from '@/lib/gtm'
import { PROJECT } from '@/lib/constants'

interface Props {
  open: boolean
  onClose: () => void
  onOpenUnitFinder: () => void
}

export default function BookModal({ open, onClose, onOpenUnitFinder }: Props) {
  const [form, setForm] = useState({ fullName: '', phoneMobile: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'form' | 'success'>('form')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (open) {
      setForm({ fullName: '', phoneMobile: '' })
      setStatus('form')
      document.body.style.overflow = 'hidden'
      gtmEvent('book_modal_open')
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  const handleClose = () => {
    setTimeout(() => {
      setForm({ fullName: '', phoneMobile: '' })
      setStatus('form')
    }, 300)
    onClose()
  }

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
    setLoading(true)
    setError(false)

    const notes = `Solicitou download do book completo do ${PROJECT.productName}.`

    try {
      await createLead({ fullName: form.fullName, phoneMobile: form.phoneMobile, notes })
      gtmEvent('lead_form_submit', { form_location: 'book_modal' })
      setStatus('success')
    } catch {
      setError(true)
    }

    setLoading(false)
  }

  const handleDownload = () => {
    gtmEvent('book_download', { click_source: 'book_modal' })
    const link = document.createElement('a')
    link.href = '/book-andromeda.pdf'
    link.download = 'book-andromeda.pdf'
    link.click()
  }

  const handleSimular = () => {
    handleClose()
    setTimeout(() => onOpenUnitFinder(), 350)
  }

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-labelledby="book-modal-title">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{ animation: 'fadeIn .3s ease' }}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-bg rounded-2xl w-full max-w-[520px] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
          style={{ animation: 'scaleIn .3s cubic-bezier(0.16,1,0.3,1)', overscrollBehavior: 'contain' }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors duration-200 bg-transparent border-0 cursor-pointer rounded-full hover:bg-charcoal/[.04]"
            aria-label="Fechar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
              <h3 className="font-serif text-charcoal text-xl font-semibold mb-3">Seu book está disponível</h3>
              <p className="text-[0.92rem] text-text-2 leading-relaxed max-w-[380px] mb-6">
                Clique abaixo para baixar o material completo com plantas, perspectivas, diferenciais e localização do {PROJECT.name}.
              </p>
              <button
                onClick={handleDownload}
                className="w-full py-4 bg-gold text-white font-label text-[.75rem] tracking-[.25em] uppercase transition-colors transition-transform transition-shadow duration-200 hover:bg-gold-dk hover:shadow-lg hover:-translate-y-0.5 border-0 cursor-pointer rounded-lg shadow-cta mb-3"
              >
                Baixar book em PDF
              </button>
              <button
                onClick={handleSimular}
                className="w-full py-4 bg-transparent border border-gold/30 text-gold-dk font-label text-[.72rem] tracking-[.2em] uppercase transition-colors transition-shadow duration-200 hover:bg-gold/5 hover:border-gold/50 cursor-pointer rounded-lg"
              >
                Simular minha unidade ideal
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <span className="block font-label text-gold text-[.6rem] tracking-[.3em] uppercase mb-3">Material completo</span>
                <h2 id="book-modal-title" className="font-serif text-charcoal text-2xl sm:text-[1.7rem] leading-tight mb-3">
                  Baixe o book completo do {PROJECT.name}
                </h2>
                <p className="text-text-2 text-[.85rem] leading-relaxed">
                  Acesse o material com plantas, perspectivas, diferenciais, localização e detalhes do empreendimento.
                </p>
              </div>

              <form id="form-book" onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 text-[.88rem] text-red-800 leading-relaxed">
                    Não foi possível processar sua solicitação. Verifique sua conexão e tente novamente.
                  </div>
                )}
                <div>
                  <label htmlFor="book-fullName" className="font-sans font-medium text-[.72rem] tracking-[.18em] uppercase text-text-2 mb-2 block">Nome completo</label>
                  <input
                    id="book-fullName"
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
                  <label htmlFor="book-phoneMobile" className="font-sans font-medium text-[.72rem] tracking-[.18em] uppercase text-text-2 mb-2 block">WhatsApp</label>
                  <input
                    id="book-phoneMobile"
                    required
                    name="phoneMobile"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(11) 99999-9999"
                    value={form.phoneMobile}
                    onChange={handleChange}
                    className="w-full bg-white border border-charcoal/[.06] px-5 py-4 text-cream placeholder-cream/25 outline-none focus-visible:border-gold focus-visible:ring-1 focus-visible:ring-gold/20 transition-colors transition-shadow duration-200 text-[.95rem] rounded-xl"
                  />
                </div>

                <div className="mt-2">
                  <p className="text-[0.75rem] text-text-2/60 mb-3">
                    Seus dados estão protegidos conforme a LGPD. Atendimento consultivo, sem compromisso.
                  </p>
                  <button
                    id="submit-book"
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gold text-white font-label text-[.75rem] tracking-[.25em] uppercase transition-colors transition-transform transition-shadow duration-200 hover:bg-gold-dk hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0 border-0 cursor-pointer rounded-lg shadow-cta"
                  >
                    {loading ? 'Liberando acesso…' : 'Liberar acesso ao book'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
