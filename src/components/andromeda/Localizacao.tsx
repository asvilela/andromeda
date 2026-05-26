import { DISTANCES, PROJECT } from '@/lib/constants'
import SectionHeader from './SectionHeader'

export default function Localizacao() {
  return (
    <section id="localizacao" className="bg-bg2 py-20 sm:py-28 px-[8vw]" aria-labelledby="localizacao-title">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <SectionHeader label="Localização" id="localizacao-title">
            No ponto mais estratégico da{' '}
            <em className="not-italic text-gold-dk">Avenida Andrômeda</em>
          </SectionHeader>
          <p className="reveal text-[1.05rem] text-text-2 leading-[1.8] mb-10">
            Próximo aos principais centros comerciais, escolas, restaurantes, serviços e acessos de Alphaville, o empreendimento combina conveniência, mobilidade e valorização.
          </p>

          <div className="bg-white rounded-2xl border border-charcoal/[.06] overflow-hidden" role="list" aria-label="Distâncias e tempos até pontos de interesse">
            {DISTANCES.map(({ place, time, unit }, i) => (
              <div
                key={place}
                role="listitem"
                className={`reveal reveal-delay-${i % 5} flex justify-between items-center px-7 py-[18px] ${
                  i < DISTANCES.length - 1 ? 'border-b border-bg2' : ''
                } hover:bg-bg3 transition-colors duration-150`}
              >
                <span className="text-cream text-[.95rem]">{place}</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="font-serif text-gold-dk text-[1.7rem] leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
                  <small className="font-sans text-text-2/70 text-[.75rem]">{unit}</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-2 relative aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden border border-charcoal/[.06]">
          <iframe
            title={`Localização ${PROJECT.name} no Google Maps`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(PROJECT.address.full)}&output=embed&z=16&hl=pt-BR`}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <address
            className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 px-4 py-3 sm:px-5 sm:py-4 not-italic bg-white/95 backdrop-blur-[10px] pointer-events-none rounded-xl border border-charcoal/[.06]"
          >
            <p className="text-[.9rem] text-text-2 leading-[1.6]">
              <strong className="text-cream font-medium">{PROJECT.name}</strong><br />
              {PROJECT.address.street} · {PROJECT.address.neighborhood}<br />
              {PROJECT.address.city} · {PROJECT.address.state}
            </p>
          </address>
        </div>
      </div>

      <div className="reveal mt-14 text-center max-w-[1200px] mx-auto">
        <a
          href="#unidades"
          className="inline-flex items-center gap-3 px-10 py-[1.15rem] font-label text-[.78rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
        >
          Consultar unidades disponíveis
        </a>
      </div>
    </section>
  )
}
