import { DEVELOPER } from '@/lib/constants'
import SectionHeader from './SectionHeader'

export default function IncorporadoraSection() {
  return (
    <section id="incorporadora" className="bg-white py-20 sm:py-28 px-[8vw]" aria-labelledby="incorporadora-title">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader label="Realização" id="incorporadora-title" maxWidth="26ch">
          Assinatura MPD: tradição, solidez e{' '}
          <em className="not-italic text-gold-dk">alto padrão</em> em Alphaville
        </SectionHeader>

        <div className="reveal grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-center">
          <div className="flex flex-col items-center justify-center bg-bg2 rounded-2xl p-10 sm:p-14 min-h-[300px] border border-charcoal/[.04]">
            {/* TODO: substituir por logo real da incorporadora */}
            <div className="font-serif text-cream text-[3rem] leading-none mb-4">{DEVELOPER.name.charAt(0)}</div>
            <span className="font-label text-gold-dk text-[.76rem] tracking-[.25em] uppercase">{DEVELOPER.name}</span>
          </div>

          <div>
            <p className="text-[1.1rem] leading-[1.85] text-text-2 mb-8">
              {DEVELOPER.description}
            </p>

            <ul className="list-none flex flex-col gap-4 mb-10">
              {DEVELOPER.highlights.map((h) => (
                <li key={h} className="flex items-center gap-4 text-[1rem] text-cream/80">
                  <span className="w-6 h-px bg-gold shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-black/[.06]">
              <div className="text-center">
                <div
                  className="font-serif text-gold-dk leading-none mb-2"
                  style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3rem)', fontVariantNumeric: 'tabular-nums' }}
                >
                  30+
                </div>
                <span className="font-sans text-text-2 text-[.72rem] sm:text-[.8rem]">Anos de mercado</span>
              </div>
              <div className="text-center">
                <div
                  className="font-serif text-gold-dk leading-none mb-2"
                  style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3rem)', fontVariantNumeric: 'tabular-nums' }}
                >
                  50+
                </div>
                <span className="font-sans text-text-2 text-[.72rem] sm:text-[.8rem]">Empreendimentos</span>
              </div>
              <div className="text-center">
                <div
                  className="font-serif text-gold-dk leading-none mb-2"
                  style={{ fontSize: 'clamp(2.4rem, 3.5vw, 3rem)', fontVariantNumeric: 'tabular-nums' }}
                >
                  10k+
                </div>
                <span className="font-sans text-text-2 text-[.72rem] sm:text-[.8rem]">Unidades entregues</span>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#unidades"
                className="inline-flex items-center gap-3 px-10 py-[1.15rem] font-label text-[.78rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
              >
                Consultar unidades disponíveis
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
