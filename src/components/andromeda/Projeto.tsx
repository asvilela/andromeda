import facadeNightImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-fachada-noturna.webp'
import lobbyImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-lobby.webp'

const SPECS = [
  { value: '2–3', desc: 'Suítes por unidade' },
  { value: '2', desc: 'Vagas determinadas' },
  { value: '✓', desc: 'Depósito privativo em todos os andares' },
  { value: '23', desc: 'Espaços de lazer no 2º pavimento' },
]

export default function Projeto() {
  return (
    <section id="projeto" className="relative overflow-hidden py-32 lg:py-40 px-[8vw] bg-bg2" aria-labelledby="projeto-title">
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif font-light leading-none whitespace-nowrap pointer-events-none select-none"
        style={{
          fontSize: 'clamp(6rem, 14vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(0,0,0,.06)',
        }}
        aria-hidden="true"
      >
        ANDRÔMEDA
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1200px]">
        <div className="reveal relative aspect-[4/5] bg-bg2 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={facadeNightImg}
            alt="Fachada noturna do Andrômeda Home"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy" decoding="async"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.05) 0%, rgba(0,0,0,.3) 100%)' }}
          />
          <div
            className="absolute top-8 right-8 w-[90px] h-[90px] rounded-full border border-white/20 flex flex-col items-center justify-center backdrop-blur-[10px]"
            style={{ background: 'rgba(255,255,255,.7)' }}
            aria-hidden="true"
          >
            <span className="font-serif text-gold text-[1.4rem] leading-none">A</span>
            <span className="font-label text-cream/50 text-[.5rem] tracking-[.15em] text-center">Alphaville</span>
          </div>
          <div
            className="absolute bottom-20 right-6 w-[110px] rounded-lg overflow-hidden shadow-xl"
            aria-hidden="true"
          >
            <img src={lobbyImg} alt="Lobby" className="w-full h-[78px] object-cover" loading="lazy" decoding="async" />
            <div
              className="py-[6px] px-3 font-label text-[.5rem] tracking-[.15em] text-cream/50 uppercase bg-white/90"
            >
              Lobby
            </div>
          </div>
          <div
            className="absolute bottom-8 left-8 font-label text-white text-[.6rem] tracking-[.2em] px-4 py-2 backdrop-blur-[8px] rounded-md"
            style={{ background: 'rgba(0,0,0,.4)' }}
            aria-hidden="true"
          >
            Fachada noturna · Perspectiva artística
          </div>
        </div>

        <div>
          <div className="mb-16 reveal">
            <span className="block font-label text-gold-dk text-[.72rem] tracking-[.25em] uppercase mb-5">O Empreendimento</span>
            <h2
              id="projeto-title"
              className="font-serif font-normal text-cream leading-[1.1] max-w-[20ch]"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
            >
              Assinado por quem <em className="not-italic text-gold-dk">redefine</em> padrões
            </h2>
            <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c6a46c, transparent)' }} />
          </div>

          <p className="reveal reveal-delay-1 text-[1rem] leading-[1.85] text-text-2 mb-6">
            O Andrômeda by MPD é a última torre de alto padrão a ser erguida na Av. Andrômeda
            — o endereço mais valorizado de Alphaville. Arquitetura assinada pelo escritório
            MCAA Arquitetos, paisagismo de Takeda Design e decoração de interiores por Paula Aveiro:
            três referências nacionais reunidas em um único projeto.
          </p>
          <p className="reveal reveal-delay-2 text-[1rem] leading-[1.85] text-text-2 mb-6">
            Caixilhos ampliados com persiana de enrolar, bancadas em granito e mármore com
            água quente, piso do terraço nivelado, tratamento acústico nas lajes e depósito
            privativo em todos os andares. O Andrômeda chega às suas mãos pronto para entrar
            e viver — sem sorteio de vagas, sem reforma, sem surpresas.
          </p>

          <div className="reveal reveal-delay-3 grid grid-cols-2 gap-4 mt-12 pt-12 border-t border-black/[.06]">
            {SPECS.map(({ value, desc }) => (
              <div key={desc} className="p-6 bg-white rounded-xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex items-center gap-4">
                <div className="font-serif text-gold-dk leading-none shrink-0" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)' }}>{value}</div>
                <div className="font-label text-text-2 text-[.72rem] tracking-[.12em] uppercase leading-snug">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
