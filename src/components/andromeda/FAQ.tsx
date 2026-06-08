import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/constants'
import SectionHeader from './SectionHeader'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-bg2 py-20 sm:py-28 px-[8vw]" aria-labelledby="faq-title">
      <div className="max-w-[900px] mx-auto">
        {/* Book CTA — "Ainda avaliando?" */}
        <div className="reveal bg-charcoal rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden mb-16">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 50%, white 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <h3
              className="font-serif text-white font-normal leading-tight mb-4"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}
            >
              Ainda avaliando o empreendimento?
            </h3>
            <p className="text-white/70 text-[.92rem] leading-relaxed max-w-[44ch] mx-auto mb-6">
              Receba o material completo no WhatsApp com plantas, perspectivas e todos os diferenciais.
            </p>
            <a
              href="#book"
              className="inline-flex items-center gap-3 px-8 py-4 font-label text-[.78rem] tracking-[.18em] uppercase no-underline bg-gold hover:bg-gold-dk text-white transition-colors duration-200 rounded-xl shadow-cta"
            >
              Receber book no WhatsApp
            </a>
          </div>
        </div>

        <SectionHeader
          label="Dúvidas Frequentes"
          id="faq-title"
        >
          Perguntas <em className="not-italic text-gold-dk">frequentes</em>
        </SectionHeader>

        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={`reveal reveal-delay-${i % 3} border-b border-charcoal/[.06]`}>
              <button
                className="w-full bg-transparent border-0 py-8 flex justify-between items-center cursor-pointer text-left gap-6"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-serif text-cream text-[1.25rem] sm:text-[1.35rem] font-normal leading-snug">{item.q}</span>
                <div
                  className={[
                    'w-10 h-10 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center text-[1rem] shrink-0 transition-colors transition-transform duration-300',
                    isOpen ? 'rotate-45 bg-gold border-gold text-white' : 'border-charcoal/[.12] text-gold-dk',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  +
                </div>
              </button>
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-[400ms] ease-in-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="text-[1rem] leading-[1.9] text-text-2 pb-7">{item.a}</p>
                </div>
              </div>
            </div>
          )
        })}

        <div className="reveal mt-14 text-center">
          <a
            href="#unidades"
            className="inline-flex items-center gap-3 px-10 py-[1.15rem] font-label text-[.78rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-200 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
          >
            Simular valores e disponibilidade
          </a>
        </div>
      </div>
    </section>
  )
}
