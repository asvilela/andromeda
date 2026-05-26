import { useState } from 'react'
import { FAQ_ITEMS } from '@/lib/constants'
import SectionHeader from './SectionHeader'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-bg2 py-20 sm:py-28 px-[8vw]" aria-labelledby="faq-title">
      <div className="max-w-[900px] mx-auto">
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
