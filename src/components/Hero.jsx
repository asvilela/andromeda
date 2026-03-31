import facadeImg from '../assets/apartamento-alphaville-andromeda-by-mpd-fachada.webp'
import { WhatsAppIcon } from './Icons'

const WPP_MSG = encodeURIComponent('Olá! Tenho interesse no Andrômeda by MPD e gostaria de receber a tabela de preços.')

export default function Hero({ onOpenPopup }) {
  return (
    <section
      id="hero"
      className="relative flex items-end h-[100svh] min-h-[600px] overflow-hidden bg-bg"
      aria-label="Apresentação do empreendimento"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={facadeImg}
          alt="Andrômeda Home Fachada"
          className="w-full h-full object-cover opacity-85"
          fetchpriority="high"
          loading="eager"
          decoding="async"
        />
        {/* Overlays for depth and readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, rgba(8,8,16,0.1) 0%, rgba(8,8,16,0.4) 40%, rgba(8,8,16,0.8) 80%, #080810 100%)
            `,
          }}
        />
      </div>

      {/* Stars */}
      <div
        className="absolute inset-0 z-1"
        aria-hidden="true"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 15% 25%, rgba(201,168,76,.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 75% 15%, rgba(245,240,232,.3) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 40% 60%, rgba(201,168,76,.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 85% 70%, rgba(245,240,232,.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 35%, rgba(201,168,76,.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 80%, rgba(245,240,232,.15) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 90% 45%, rgba(201,168,76,.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 65% 85%, rgba(245,240,232,.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 10% 55%, rgba(201,168,76,.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 50% 10%, rgba(245,240,232,.25) 0%, transparent 100%)
          `,
        }}
      />

      {/* Orbs */}
      <div
        aria-hidden="true"
        className="absolute rounded-full blur-[90px] opacity-[.12] animate-[pulse-orb_8s_ease-in-out_infinite] z-1"
        style={{
          width: 500, height: 500,
          top: '5%', right: '5%',
          background: 'radial-gradient(circle, #c9a84c 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute rounded-full blur-[90px] opacity-[.18] animate-[pulse-orb_8s_ease-in-out_-4s_infinite]"
        style={{
          width: 400, height: 400,
          bottom: '20%', left: '5%',
          background: 'radial-gradient(circle, #2030a0 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-[8vw] pb-[8vh] max-w-[1400px] w-full">
        <p className="font-label text-gold text-[.7rem] tracking-[.35em] uppercase mb-6 animate-[fade-up_.8s_.3s_both]">
          Andrômeda by MPD · Alphaville
        </p>
        <h1
          className="font-serif text-cream font-light leading-[1.05] mb-7 max-w-[14ch] animate-[fade-up_.9s_.5s_both]"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6rem)' }}
        >
          O último grande endereço da Av. <em className="not-italic text-gold-lt">Andrômeda</em>
        </h1>
        <p
          className="text-cream/55 leading-[1.75] mb-11 max-w-[42ch] animate-[fade-up_.8s_.75s_both]"
          style={{ fontSize: 'clamp(.85rem, 1.4vw, 1rem)' }}
        >
          Torre única de 36 pavimentos com 23 espaços de lazer no 2º pavimento —
          piscina raia 25m, beauty salon, sport bar e car wash. Apartamentos de
          90m² e 123m² entregues sem reforma, com vagas determinadas e depósito
          privativo em todos os andares.
        </p>
        <div className="flex gap-5 flex-wrap animate-[fade-up_.8s_.95s_both]">
          <button
            onClick={onOpenPopup}
            className="inline-flex items-center gap-3 px-9 py-4 font-label text-[.7rem] tracking-[.2em] uppercase no-underline transition-all duration-250 hover:opacity-85 hover:-translate-y-0.5 border-0 cursor-pointer"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8cc7e 100%)', color: '#0a0a10' }}
            aria-label="Falar com especialista via WhatsApp"
          >
            <WhatsAppIcon size={16} />
            Falar com Especialista
          </button>
          <a
            href="#tipologias"
            className="inline-flex items-center gap-3 px-9 py-4 font-label text-[.7rem] tracking-[.2em] uppercase no-underline border border-cream/25 text-cream hover:border-gold hover:text-gold transition-all duration-250"
          >
            Ver plantas e preços
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-[3vh] right-[8vw] flex flex-col items-center gap-2 animate-[fade-up_.6s_1.4s_both]"
        aria-hidden="true"
      >
        <span className="font-label text-[.58rem] tracking-[.25em] text-muted [writing-mode:vertical-rl]">Scroll</span>
        <div
          className="w-px h-[60px] animate-[scroll-line_2s_1.6s_infinite]"
          style={{ background: 'linear-gradient(to bottom, #c9a84c, transparent)' }}
        />
      </div>
    </section>
  )
}
