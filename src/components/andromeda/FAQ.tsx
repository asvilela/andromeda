import { useState } from 'react'

const ITEMS = [
  { q: 'As vagas de garagem são sorteadas ou determinadas?', a: 'Determinadas — não há sorteio. Todas as 288 unidades possuem 2 vagas cobertas alocadas desde a aquisição, distribuídas nos 3 subsolos. O empreendimento conta ainda com 13 vagas de visitantes e 32 vagas de moto.' },
  { q: 'O que está incluído em cada apartamento na entrega?', a: 'Todos os apartamentos são entregues com: depósito privativo no andar, 2 vagas determinadas, caixilhos ampliados com persiana de enrolar, bancadas em granito (e mármore no lavabo das unidades de 123m²), água quente na cozinha e em todos os banheiros, piso do terraço nivelado e infraestrutura completa (carga e dreno) para ar-condicionado.' },
  { q: 'Os apartamentos vêm com ar-condicionado instalado?', a: 'A infraestrutura (carga elétrica e dreno) para instalação de ar-condicionado é entregue em todos os dormitórios e sala de estar. Nas unidades de 123m², o terraço gourmet também recebe a previsão. Os equipamentos e a rede frigorígena ficam a cargo do proprietário.' },
  { q: 'Como funciona a segurança do condomínio?', a: 'O empreendimento conta com guarita blindada (porta, caixilho e alvenaria), sala de segurança, câmeras de segurança perimetral e em todas as áreas comuns, pulmão de segurança para pedestres e veículos e acessos de serviço independentes do acesso social.' },
  { q: 'A piscina tem aquecimento?', a: 'A piscina adulto (raia 25m x 3,60m) e a piscina infantil são entregues com previsão para climatização, permitindo que o condomínio instale o sistema de aquecimento após a entrega.' },
  { q: 'É possível instalar churrasqueira no terraço?', a: 'Sim. Todas as unidades possuem terraço gourmet com previsão para bancada e para futura instalação de churrasqueira à carvão.' },
  { q: 'Qual o método construtivo do Andrômeda?', a: 'Estrutura convencional com pilares e vigas de concreto armado. Alvenaria de vedação nas paredes externas, entre unidades e áreas comuns. Paredes internas em drywall, com tratamento acústico nas lajes para maior conforto entre andares.' },
  { q: 'Quais são as condições de pagamento?', a: 'O Andrômeda by MPD opera com diferentes modalidades, incluindo financiamento bancário direto. Fale com um de nossos consultores para receber a tabela de preços atualizada e condições de pagamento personalizadas para o seu perfil.' },
  { q: 'O empreendimento é pet-friendly?', a: 'Sim. O Andrômeda conta com Pet Place no 2º pavimento (lazer elevado) e Pet Care com serviço de banho no subsolo — ambos projetados para garantir conforto ao seu animal e praticidade para você.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-white py-32 lg:py-40 px-[8vw]" aria-labelledby="faq-title">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-16 reveal">
          <span className="block font-label text-gold-dk text-[.72rem] tracking-[.25em] uppercase mb-5">Dúvidas Frequentes</span>
          <h2
            id="faq-title"
            className="font-serif font-normal text-cream leading-[1.1] max-w-[20ch]"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
          >
            Perguntas <em className="not-italic text-gold-dk">frequentes</em>
          </h2>
          <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c6a46c, transparent)' }} />
        </div>

        {ITEMS.map((item, i) => {
          const isOpen = open === i
          return (
            <div key={i} className={`reveal reveal-delay-${i % 3} border-b border-black/[.06]`}>
              <button
                className="w-full bg-transparent border-0 py-7 flex justify-between items-center cursor-pointer text-left gap-8"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-serif text-cream text-[1.15rem] font-normal">{item.q}</span>
                <div
                  className={[
                    'w-8 h-8 rounded-full border flex items-center justify-center text-[.95rem] shrink-0 transition-all duration-300',
                    isOpen ? 'rotate-45 bg-gold border-gold text-white' : 'border-black/[.12] text-gold-dk',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  +
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-[400ms] ease-in-out"
                style={{ maxHeight: isOpen ? '320px' : '0' }}
              >
                <p className="text-[.95rem] leading-[1.85] text-text-2 pb-7">{item.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
