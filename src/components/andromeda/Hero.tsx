import facadeImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-fachada.webp'
import { WhatsAppIcon } from './Icons'

export default function Hero({ onOpenPopup }: { onOpenPopup: () => void }) {
  return (
    <section
      id="hero"
      className="relative flex items-end h-[100svh] min-h-[640px] overflow-hidden"
      aria-label="Apresentação do empreendimento"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={facadeImg}
          alt="Andrômeda Home Fachada"
          className="w-full h-full object-cover"
          loading="eager" decoding="async" fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.65) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 px-[8vw] pb-[12vh] max-w-[1400px] w-full">
        <p className="font-label text-gold-lt text-[.72rem] tracking-[.35em] uppercase mb-7" style={{ animation: 'fade-up .8s .3s both' }}>
          Andrômeda by MPD · Alphaville
        </p>
        <h1
          className="font-serif text-white font-light leading-[1.02] mb-8 max-w-[16ch] drop-shadow-sm"
          style={{ fontSize: 'clamp(3rem, 7.5vw, 6.5rem)', animation: 'fade-up .9s .5s both' }}
        >
          O último grande endereço da Av. <em className="not-italic text-gold-lt">Andrômeda</em>
        </h1>
        <p
          className="text-white/85 leading-[1.8] mb-12 max-w-[44ch]"
          style={{ fontSize: 'clamp(.95rem, 1.4vw, 1.1rem)', animation: 'fade-up .8s .75s both' }}
        >
          Torre única de 36 pavimentos com 23 espaços de lazer no 2º pavimento —
          piscina raia 25m, beauty salon, sport bar e car wash. Apartamentos de
          90m² e 123m² entregues sem reforma, com vagas determinadas e depósito
          privativo em todos os andares.
        </p>
        <div className="flex gap-4 flex-wrap" style={{ animation: 'fade-up .8s .95s both' }}>
          <button
            onClick={onOpenPopup}
            className="inline-flex items-center gap-3 px-9 py-[1.05rem] font-label text-[.72rem] tracking-[.2em] uppercase no-underline transition-all duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
            aria-label="Falar com especialista via WhatsApp"
          >
            <WhatsAppIcon size={16} />
            Falar com Especialista
          </button>
          <a
            href="#tipologias"
            className="inline-flex items-center gap-3 px-9 py-[1.05rem] font-label text-[.72rem] tracking-[.2em] uppercase no-underline border border-white/30 text-white hover:bg-white/10 hover:border-white/60 transition-all duration-200 rounded-xl backdrop-blur-sm"
          >
            Ver plantas e preços
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-[3vh] right-[8vw] flex flex-col items-center gap-2"
        aria-hidden="true"
        style={{ animation: 'fade-up .6s 1.4s both' }}
      >
        <span className="font-label text-[.58rem] tracking-[.25em] text-white/50 [writing-mode:vertical-rl]">Scroll</span>
        <div
          className="w-px h-[60px]"
          style={{ background: 'linear-gradient(to bottom, #c6a46c, transparent)', animation: 'scroll-line 2s 1.6s infinite' }}
        />
      </div>
    </section>
  )
}
