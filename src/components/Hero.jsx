import facadeImg from '../assets/apartamento-alphaville-andromeda-by-mpd-fachada.webp'

const WPP_MSG = encodeURIComponent('Olá! Tenho interesse no Andrômeda Home.')

export default function Hero() {
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
          className="w-full h-full object-cover opacity-60"
        />
        {/* Overlays for depth and readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, rgba(8,8,16,.4) 0%, rgba(8,8,16,.8) 70%, #080810 100%),
              radial-gradient(circle at 70% 30%, rgba(201,168,76,.1), transparent 50%)
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
          Alphaville · Barueri · São Paulo
        </p>
        <h1
          className="font-serif text-cream font-light leading-[1.05] mb-7 max-w-[14ch] animate-[fade-up_.9s_.5s_both]"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6rem)' }}
        >
          Sua vida merece uma nova <em className="not-italic text-gold-lt">altitude</em>
        </h1>
        <p
          className="text-cream/55 leading-[1.75] mb-11 max-w-[42ch] animate-[fade-up_.8s_.75s_both]"
          style={{ fontSize: 'clamp(.85rem, 1.4vw, 1rem)' }}
        >
          Torre única com 36 pavimentos no coração de Alphaville.
          Apartamentos de 90m² e 123m² com arquitetura assinada,
          lazer resort e vista permanente.
        </p>
        <div className="flex gap-5 flex-wrap animate-[fade-up_.8s_.95s_both]">
          <a
            href={`https://wa.me/551121490015?text=${WPP_MSG}`}
            className="inline-flex items-center gap-3 px-9 py-4 font-label text-[.7rem] tracking-[.2em] uppercase no-underline transition-all duration-250 hover:opacity-85 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8cc7e 100%)', color: '#0a0a10' }}
            target="_blank" rel="noopener"
            aria-label="Falar com consultor via WhatsApp"
          >
            <WppIcon />
            Falar com consultor
          </a>
          <a
            href="#tipologias"
            className="inline-flex items-center gap-3 px-9 py-4 font-label text-[.7rem] tracking-[.2em] uppercase no-underline border border-cream/25 text-cream hover:border-gold hover:text-gold transition-all duration-250"
          >
            Ver plantas e disponibilidade
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

function WppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
