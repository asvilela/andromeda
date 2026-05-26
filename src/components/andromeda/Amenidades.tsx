import { useState, useEffect, useCallback } from 'react'
import { AMENIDADES_MAIN, AMENIDADES_STRIP, AMENIDADES_ALL, type AmenidadeItem } from '@/lib/constants'
import { gtmEvent } from '@/lib/gtm'

function PhotoCard({ img, alt, label, desc, onClick, className = '', style = {} }: AmenidadeItem & { onClick?: () => void; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden group cursor-zoom-in rounded-xl ${className}`}
      style={style}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Ampliar imagem: ${label}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <img
        src={img}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        loading="lazy" decoding="async"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.6) 0%, rgba(0,0,0,.08) 45%, transparent 100%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none"
        style={{ background: 'rgba(0,0,0,.15)' }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="font-label text-white text-[.68rem] tracking-[.18em] uppercase leading-tight drop-shadow-md">
          {label}
        </p>
        {desc && (
          <p className="font-sans text-white/70 text-[.62rem] leading-snug mt-[3px] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300 delay-75">
            {desc}
          </p>
        )}
      </div>
      <span
        className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/80 backdrop-blur-sm text-cream/70 text-[.55rem] font-label tracking-[.12em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-md"
        aria-hidden="true"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
        Ampliar
      </span>
    </div>
  )
}

export default function Amenidades() {
  const GAP = '6px'
  const [lightboxIdx, setLightboxIdx] = useState(-1)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const lightboxOpen = lightboxIdx >= 0

  const closeLightbox = useCallback(() => setLightboxIdx(-1), [])
  const goNext = useCallback(() => setLightboxIdx((i) => (i + 1) % AMENIDADES_ALL.length), [])
  const goPrev = useCallback(() => setLightboxIdx((i) => (i - 1 + AMENIDADES_ALL.length) % AMENIDADES_ALL.length), [])

  const handleOpen = (idx: number) => {
    setLightboxIdx(idx)
    gtmEvent('gallery_open', { section: AMENIDADES_ALL[idx]?.label || 'amenidade' })
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev() }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, closeLightbox, goNext, goPrev])

  const onTouchStart2 = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd2 = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) diff > 0 ? goNext() : goPrev()
    setTouchStart(null)
  }

  const item = lightboxOpen ? AMENIDADES_ALL[lightboxIdx] : null

  return (
    <section id="amenidades" className="bg-charcoal py-20 sm:py-28 px-[8vw]" aria-labelledby="amenidades-title">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-end">
          <div>
            <div className="mb-14 reveal">
              <span className="block font-label text-gold-lt text-[.76rem] tracking-[.25em] uppercase mb-4">Estilo de vida</span>
              <h2
                id="amenidades-title"
                className="font-serif font-normal text-white leading-[1.08]"
                style={{ fontSize: 'clamp(2.6rem, 4.5vw, 3.8rem)' }}
              >
                Lazer completo no 2&#186; pavimento para viver Alphaville <em className="not-italic text-gold-lt">todos os dias</em>
              </h2>
              <div className="gold-line mt-6" />
            </div>
            <p className="reveal reveal-delay-1 text-[1.05rem] leading-[1.85] text-white/60">
              Ambientes pensados para bem-estar, convivência, família, fitness e momentos de descanso sem sair de casa.
              Piscina raia 25m, coworking, sport bar, beach tennis, pickleball e muito mais, tudo a 30 segundos do seu elevador.
            </p>
          </div>
          <p
            className="reveal reveal-delay-2 font-serif text-gold-lt leading-[1.4] lg:text-right italic"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)' }}
          >
            "23 espaços projetados para que o lazer seja parte da sua rotina, não exceção."
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          <div
            className="hidden lg:grid"
            style={{ gridTemplateColumns: '1.35fr 1fr 1fr', gridTemplateRows: '290px 290px', gap: GAP }}
          >
            {AMENIDADES_MAIN.map((itm, i) => (
              <PhotoCard key={itm.label} {...itm} onClick={() => handleOpen(i)} style={i === 0 ? { gridRow: '1 / 3' } : {}} />
            ))}
          </div>

          <div
            className="grid lg:hidden"
            style={{ gridTemplateColumns: '1fr 1fr', gridAutoRows: '185px', gap: GAP }}
          >
            {AMENIDADES_MAIN.map((itm, i) => (
              <PhotoCard key={itm.label} {...itm} onClick={() => handleOpen(i)} style={i === 0 ? { gridColumn: '1 / 3', height: '240px' } : {}} />
            ))}
          </div>

          <div
            className="grid grid-cols-3 lg:grid-cols-5"
            style={{ gap: GAP, marginTop: GAP, gridAutoRows: '165px' }}
          >
            {AMENIDADES_STRIP.map((itm, i) => (
              <PhotoCard key={itm.label} {...itm} onClick={() => handleOpen(AMENIDADES_MAIN.length + i)} />
            ))}
          </div>
        </div>

        <div className="reveal mt-14 text-center">
          <a
            href="#book"
            className="inline-flex items-center gap-3 px-10 py-[1.15rem] font-label text-[.78rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
          >
            Receber book completo com lazer e plantas
          </a>
        </div>
      </div>

      {lightboxOpen && item && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(14px)', animation: 'fadeIn .2s ease', overscrollBehavior: 'contain' }}
          onClick={closeLightbox}
          onTouchStart={onTouchStart2}
          onTouchEnd={onTouchEnd2}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 border-0 text-white/70 hover:text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer z-10 rounded-full"
            onClick={closeLightbox}
            aria-label="Fechar galeria"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border-0 text-white/60 hover:text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer z-10 backdrop-blur-sm rounded-full"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Imagem anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border-0 text-white/60 hover:text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer z-10 backdrop-blur-sm rounded-full"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Próxima imagem"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="flex flex-col items-center gap-5 px-6 sm:px-16 lg:px-24 max-w-full" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightboxIdx}
              src={item.img}
              alt={item.alt}
              className="max-w-full max-h-[74vh] object-contain rounded-lg"
              style={{ animation: 'scaleIn .25s ease' }}
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-serif text-white text-lg sm:text-xl">{item.label}</p>
              {item.desc && <p className="font-sans text-white/50 text-[.8rem]">{item.desc}</p>}
              <span className="font-label text-[.58rem] tracking-[.2em] uppercase text-white/40 mt-1">
                {lightboxIdx + 1} / {AMENIDADES_ALL.length}
              </span>
            </div>
            <div className="flex gap-2">
              {AMENIDADES_ALL.map((_, i) => (
                <button
                  key={i}
                  className={[
                    'w-[7px] h-[7px] rounded-full border-none transition-colors duration-200 cursor-pointer',
                    i === lightboxIdx ? 'bg-gold scale-125' : 'bg-white/20 hover:bg-white/40',
                  ].join(' ')}
                  onClick={() => setLightboxIdx(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
