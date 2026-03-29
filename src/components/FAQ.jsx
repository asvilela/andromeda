import { useState } from 'react'

const ITEMS = [
  {
    q: 'Qual é a previsão de entrega do empreendimento?',
    a: 'A previsão de entrega do Andrômeda Home é janeiro de 2026. O acompanhamento da obra é disponibilizado periodicamente para os compradores, garantindo total transparência em cada etapa da construção.',
  },
  {
    q: 'Como funciona a segurança do condomínio?',
    a: 'O empreendimento conta com portaria 24 horas, câmeras de monitoramento em toda a área comum, acesso por reconhecimento facial e segurança perimetral. A localização em Alphaville também agrega o benefício da segurança do condomínio-bairro.',
  },
  {
    q: 'Quais são as condições de pagamento?',
    a: 'Trabalhamos com diferentes modalidades de financiamento, incluindo FGTS e financiamento bancário. Para obter a tabela completa com preços e condições personalizadas, entre em contato com nossos consultores — as informações são disponibilizadas mediante cadastro.',
  },
  {
    q: 'As unidades já vêm com acabamento completo?',
    a: 'Sim. Todas as unidades são entregues com acabamento de alto padrão, incluindo piso porcelanato, forro de gesso, armários embutidos nas suítes e área de serviço equipada.',
  },
  {
    q: 'O empreendimento aceita pets?',
    a: 'Sim. O Andrômeda Home é pet-friendly e conta com uma área dedicada exclusivamente para animais de estimação (Pet Place), com espaço de banho, recreação e convivência.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="bg-bg py-32 px-[8vw]" aria-labelledby="faq-title">
      <div className="max-w-[800px] mx-auto">
        <div className="mb-16 reveal">
          <span className="block font-label text-gold text-[.7rem] tracking-[.25em] uppercase mb-4">Dúvidas Frequentes</span>
          <h2
            id="faq-title"
            className="font-serif font-light text-cream leading-[1.2] max-w-[20ch]"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
          >
            Tudo o que você precisa <em className="not-italic text-gold-lt">saber</em>
          </h2>
          <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
        </div>

        {ITEMS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={`reveal reveal-delay-${i % 3} border-b border-border`}>
              <button
                className="w-full bg-transparent border-0 py-7 flex justify-between items-center cursor-pointer text-left gap-8"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-serif text-cream text-[1.05rem] font-normal">{item.q}</span>
                <div
                  className={[
                    'w-7 h-7 rounded-full border flex items-center justify-center text-[.9rem] shrink-0 transition-all duration-300',
                    isOpen ? 'rotate-45 bg-gold border-gold text-bg' : 'border-border text-gold',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  +
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{ maxHeight: isOpen ? '300px' : '0' }}
                role="region"
              >
                <p className="text-[.9rem] leading-[1.8] text-cream/60 pb-7">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
