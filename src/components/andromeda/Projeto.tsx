import { SPECS, PROJECT_IMAGES } from '@/lib/constants'
import SectionHeader from './SectionHeader'

export default function Projeto() {
  return (
    <section id="projeto" className="relative overflow-hidden py-20 sm:py-28 px-[8vw] bg-white" aria-labelledby="projeto-title">
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif font-light leading-none whitespace-nowrap pointer-events-none select-none"
        style={{
          fontSize: 'clamp(6rem, 14vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(184,146,90,.04)',
        }}
        aria-hidden="true"
      >
        ANDRÔMEDA
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center max-w-[1200px] mx-auto">
        <div className="reveal relative aspect-[3/4] lg:aspect-[4/5] bg-bg2 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={PROJECT_IMAGES.facadeNight}
            alt="Fachada noturna do Andrômeda Home"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy" decoding="async"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.05) 0%, rgba(0,0,0,.35) 100%)' }}
          />
          <div
            className="absolute top-6 right-6 w-[80px] h-[80px] rounded-full border border-white/20 flex flex-col items-center justify-center backdrop-blur-[10px]"
            style={{ background: 'rgba(255,255,255,.7)' }}
            aria-hidden="true"
          >
            <span className="font-serif text-gold text-[1.3rem] leading-none">A</span>
            <span className="font-label text-cream/50 text-[.48rem] tracking-[.15em] text-center">Alphaville</span>
          </div>
          <div
            className="absolute bottom-16 right-5 w-[100px] rounded-lg overflow-hidden shadow-xl"
            aria-hidden="true"
          >
            <img src={PROJECT_IMAGES.lobby} alt="Lobby do Andrômeda Home com acabamento premium" className="w-full h-[70px] object-cover" loading="lazy" decoding="async" />
            <div className="py-[5px] px-2 font-label text-[.48rem] tracking-[.15em] text-cream/50 uppercase bg-white/90">
              Lobby
            </div>
          </div>
          <div
            className="absolute bottom-6 left-6 font-label text-white text-[.58rem] tracking-[.2em] px-4 py-2 backdrop-blur-[8px] rounded-md"
            style={{ background: 'rgba(0,0,0,.4)' }}
            aria-hidden="true"
          >
            Fachada noturna · Perspectiva artística
          </div>
        </div>

        <div>
          <SectionHeader label="O Empreendimento" id="projeto-title" maxWidth="20ch">
            Assinado por quem <em className="not-italic text-gold-dk">redefine</em> padrões
          </SectionHeader>

          <p className="reveal reveal-delay-1 text-[1.05rem] leading-[1.85] text-text-2 mb-5">
            O Andrômeda by MPD é a última torre de alto padrão a ser erguida na Av. Andrômeda,
            o endereço mais valorizado de Alphaville. Arquitetura assinada pelo escritório
            MCAA Arquitetos, paisagismo de Takeda Design e decoração de interiores por Paula Aveiro.
          </p>
          <p className="reveal reveal-delay-2 text-[1.05rem] leading-[1.85] text-text-2 mb-5">
            Caixilhos ampliados com persiana de enrolar, bancadas em granito e mármore com
            água quente, piso do terraço nivelado, tratamento acústico nas lajes e depósito
            privativo em todos os andares. Pronto para entrar e viver: sem sorteio, sem reforma, sem surpresas.
          </p>

          <div className="reveal reveal-delay-3 grid grid-cols-2 gap-3 sm:gap-4 mt-10 pt-10 border-t border-black/[.06]">
            {SPECS.map(({ value, desc }) => (
              <div key={desc} className="p-4 sm:p-6 bg-white rounded-2xl border border-charcoal/[.04] hover:shadow-card-hover hover:-translate-y-1 transition-shadow transition-transform duration-300 flex items-center gap-3 sm:gap-4">
                <div className="font-serif text-gold-dk leading-none shrink-0" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}>{value}</div>
                <div className="font-sans text-text-2 text-[.8rem] sm:text-[.85rem] leading-snug">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
