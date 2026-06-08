import { PROJECT } from '@/lib/constants'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-end h-[100svh] min-h-[580px] sm:min-h-[700px] overflow-hidden"
      aria-label="Apresentação do empreendimento"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={PROJECT.heroImage}
          alt={`${PROJECT.name}: fachada do empreendimento`}
          className="absolute inset-0 w-full h-full object-cover object-[center_65%] sm:object-[center_55%] lg:object-center"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.30) 25%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 px-[6vw] sm:px-[8vw] pb-[8vh] sm:pb-[10vh] max-w-[1400px] w-full">
        <p
          className="font-label text-gold-lt text-[.72rem] tracking-[.35em] uppercase mb-8 inline-block border border-gold-lt/20 px-5 py-2 rounded-full backdrop-blur-sm"
          style={{ animation: 'fade-up .8s .3s both' }}
        >
          Andrômeda by MPD · Alphaville
        </p>
        <h1
          className="font-serif text-white font-normal leading-[1.0] mb-6 max-w-[18ch]"
          style={{
            fontSize: 'clamp(3.4rem, 8vw, 7rem)',
            animation: 'fade-up .9s .5s both',
            textShadow: '0 2px 40px rgba(0,0,0,0.3)',
            textWrap: 'balance',
          }}
        >
          O último grande endereço residencial da Avenida{' '}
          <em className="not-italic text-gold-lt">Andrômeda</em>
        </h1>
        <div className="w-[80px] h-px bg-gold-lt mb-6" style={{ animation: 'fade-up .8s .65s both' }} />
        <p
          className="text-white/80 leading-[1.75] mb-10 max-w-[48ch] font-sans"
          style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', animation: 'fade-up .8s .75s both' }}
        >
          {PROJECT.subtitle}
        </p>
        <div className="flex gap-4 flex-wrap items-center" style={{ animation: 'fade-up .8s .95s both' }}>
          <a
            href="#unidades"
            className="inline-flex items-center gap-3 px-8 py-4 sm:px-12 sm:py-5 font-label text-[.78rem] sm:text-[.85rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
            aria-label="Descobrir minha unidade ideal"
          >
            Descobrir minha unidade ideal
          </a>
          <a
            href="#visita"
            className="inline-flex items-center gap-3 px-8 py-4 sm:px-12 sm:py-5 font-label text-[.78rem] sm:text-[.85rem] tracking-[.18em] uppercase no-underline border border-white/30 text-white hover:bg-white/10 hover:border-white/60 hover:-translate-y-0.5 transition-colors transition-transform duration-200 rounded-xl backdrop-blur-sm"
          >
            Agendar visita
          </a>
        </div>
      </div>
    </section>
  )
}
