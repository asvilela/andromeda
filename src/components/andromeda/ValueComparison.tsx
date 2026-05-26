import { VALUE_COMPARISON } from '@/lib/constants'
import { getIcon } from '@/lib/icons'
import SectionHeader from './SectionHeader'

export default function ValueComparison() {
  return (
    <section id="empreendimento" className="bg-bg py-20 sm:py-28 px-[8vw]" aria-labelledby="value-title">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          label="Por que na planta"
          id="value-title"
          maxWidth="28ch"
          subtitle="Escolher no momento certo permite avaliar melhor planta, andar, vista, fluxo de pagamento e potencial de valorização."
        >
          Comprar na planta em Alphaville é uma decisão <em className="not-italic text-gold-dk">estratégica</em>
        </SectionHeader>

        <div className="flex flex-col gap-5 sm:gap-6">
          {VALUE_COMPARISON.map((item, i) => {
            const Icon = getIcon(item.icon)
            if (i === 0) {
              return (
                <div
                  key={item.title}
                  className="reveal reveal-delay-1 bg-white rounded-2xl p-7 sm:p-14 border border-charcoal/[.04] hover:shadow-card-hover hover:-translate-y-1 transition-shadow transition-transform duration-300 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 sm:gap-10 items-center"
                >
                  <div className="w-20 h-20 rounded-2xl bg-gold/[.08] flex items-center justify-center text-gold shrink-0">
                    {Icon && <Icon size={32} />}
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.6rem] text-cream leading-tight mb-3">{item.title}</h3>
                    <p className="text-[1rem] text-text-2 leading-relaxed max-w-[60ch]">{item.description}</p>
                  </div>
                </div>
              )
            }
            return (
              <div key={item.title} className={`${i === 1 ? 'grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6' : 'contents'}`}>
                {i === 1 && VALUE_COMPARISON.slice(1).map((sub, j) => {
                  const SubIcon = getIcon(sub.icon)
                  return (
                    <div
                      key={sub.title}
                      className={`reveal reveal-delay-${j + 2} bg-white rounded-2xl p-8 sm:p-10 border border-charcoal/[.04] hover:shadow-card-hover hover:-translate-y-1 transition-shadow transition-transform duration-300`}
                    >
                      <span className="font-serif text-gold/30 text-[2.4rem] leading-none block mb-4">{String(j + 1).padStart(2, '0')}</span>
                      <h3 className="font-serif text-[1.2rem] text-cream leading-tight mb-3">{sub.title}</h3>
                      <p className="text-[.9rem] text-text-2 leading-relaxed">{sub.description}</p>
                    </div>
                  )
                })}
              </div>
            )
          }).filter((_, i) => i <= 1)}
        </div>

        <div className="reveal mt-14 text-center">
          <a
            href="#unidades"
            className="inline-flex items-center gap-3 px-10 py-[1.15rem] font-label text-[.78rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
          >
            Simular a melhor unidade para meu perfil
          </a>
        </div>
      </div>
    </section>
  )
}
