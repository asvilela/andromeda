import { useState } from 'react'

const ITEMS = [
  {
    q: 'Qual o método construtivo do Andrômeda Home?',
    a: 'Estrutura convencional com pilares e vigas de concreto armado. Alvenaria de vedação nas paredes externas, entre unidades e áreas comuns. Paredes internas em Drywall — sistema que oferece fácil manutenção, resistência, conforto térmico e acústico superior.',
  },
  {
    q: 'Os apartamentos vêm com previsão para ar-condicionado?',
    a: 'Sim. Todas as unidades são entregues com infraestrutura completa (carga elétrica e dreno) para ar-condicionado em todos os dormitórios e sala de estar. Nas unidades de 123m², o terraço gourmet também recebe a previsão.',
  },
  {
    q: 'Como funciona a segurança do condomínio?',
    a: 'O empreendimento conta com guarita blindada (porta, caixilho e alvenaria), câmeras de segurança perimetral e em áreas comuns, pulmão de segurança para pedestres e veículos, clausura de acesso para veículos e acessos de serviço separados.',
  },
  {
    q: 'A piscina é aquecida?',
    a: 'A piscina adulto (raia de 25m x 3,60m) e a piscina infantil (5,50m x 3,60m) são entregues com previsão para climatização, permitindo que o condomínio instale o sistema de aquecimento.',
  },
  {
    q: 'É possível instalar churrasqueira no apartamento?',
    a: 'Sim. Todas as unidades possuem previsão para bancada no terraço gourmet e previsão para futura instalação de churrasqueira a carvão.',
  },
  {
    q: 'As vagas de garagem são determinadas?',
    a: 'Sim. Todas as vagas são determinadas (não sorteadas), cobertas e distribuídas em 3 subsolos. O empreendimento conta com vagas P, M e G, além de 13 vagas de visitantes e 32 vagas de moto.',
  },
  {
    q: 'Quais são as condições de pagamento?',
    a: 'Trabalhamos com diferentes modalidades de financiamento, incluindo financiamento bancário direto. Entre em contato com nossos consultores para receber a tabela completa com preços e condições personalizadas.',
  },
  {
    q: 'O empreendimento aceita pets?',
    a: 'Sim. O Andrômeda Home é pet-friendly e conta com Pet Place no lazer elevado e Pet Care com banho no subsolo.',
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
