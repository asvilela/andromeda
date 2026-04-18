import { useState, useEffect, useCallback } from 'react'

import piscinaImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-piscina-descoberta.webp'
import fitnessImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-fitness.webp'
import saunaImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-sauna.webp'
import coworkingImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-coworking.webp'
import gourmetImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-espaco-gourmet.webp'
import quadraBtImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-quadra-bt.webp'
import salaoImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-salao-festas.webp'
import petImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-espaco-pet.webp'
import brinqImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-brinquedoteca.webp'
import pickleballImg from '@/assets/apartamento-alphaville-andromeda-by-mpd-pickleball.webp'

interface AmenidadeItem {
  img: string
  alt: string
  label: string
  desc?: string
}

const MAIN_ITEMS: AmenidadeItem[] = [
  { img: piscinaImg, alt: 'Piscina adulto raia 25m', label: 'Piscina Raia 25m', desc: 'Semiolímpica com previsão para climatização' },
  { img: fitnessImg, alt: 'Fitness indoor', label: 'Fitness Indoor & Externo', desc: 'Aparelhos individuais e duais, sauna e espaço beauty' },
  { img: saunaImg, alt: 'Sauna e área de descanso', label: 'Sauna & Descanso', desc: 'Sauna, sala de massagem e área de relaxamento' },
  { img: coworkingImg, alt: 'Coworking', label: 'Coworking Profissional', desc: 'Sala de reunião privativa, web garden e lounge' },
  { img: gourmetImg, alt: 'Espaço gourmet', label: 'Gourmet & Sport Bar', desc: 'Espaço gourmet, sport bar e churrasqueiras ao ar livre' },
]

const STRIP_ITEMS: AmenidadeItem[] = [
  { img: quadraBtImg, alt: 'Quadra de beach tennis', label: 'Beach Tennis' },
  { img: salaoImg, alt: 'Salão de festas', label: 'Salão de Festas' },
  { img: petImg, alt: 'Pet place', label: 'Pet Place & Pet Care' },
  { img: brinqImg, alt: 'Brinquedoteca', label: 'Brinquedoteca' },
  { img: pickleballImg, alt: 'Pickleball', label: 'Pickleball' },
]

const ALL_ITEMS = [...MAIN_ITEMS, ...STRIP_ITEMS]

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
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, rgba(0,0,0,.05) 45%, transparent 100%)' }}
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
          <p className="font-sans text-white/70 text-[.62rem] leading-snug mt-[3px] max-h-0 overflow-hidden group-hover:max-h-[2rem] transition-all duration-300 delay-75">
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
  const goNext = useCallback(() => setLightboxIdx((i) => (i + 1) % ALL_ITEMS.length), [])
  const goPrev = useCallback(() => setLightboxIdx((i) => (i - 1 + ALL_ITEMS.length) % ALL_ITEMS.length), [])

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
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
    setTouchStart(null)
  }

  const item = lightboxOpen ? ALL_ITEMS[lightboxIdx] : null

  return (
    <section id="amenidades" className="bg-bg2 py-32 lg:py-40 px-[8vw]" aria-labelledby="amenidades-title">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-end">
          <div>
            <div className="mb-12 reveal">
              <span className="block font-label text-gold-dk text-[.72rem] tracking-[.25em] uppercase mb-5">Estilo de vida</span>
              <h2
                id="amenidades-title"
                className="font-serif font-normal text-cream leading-[1.1] max-w-[20ch]"
                style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
              >
                23 espaços de lazer. Todos no <em className="not-italic text-gold-dk">2º pavimento</em>
              </h2>
              <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c6a46c, transparent)' }} />
            </div>
            <p className="reveal reveal-delay-1 text-[1rem] leading-[1.85] text-text-2">
              Piscina semiolímpica raia 25m, beauty salon, sport bar com mesa de poker,
              coworking com sala de reunião privativa, beach tennis, pickleball,
              churrasqueiras, brinquedoteca e Pet Care. No subsolo: bicicletário,
              car wash e mini mercado previstos. Tudo a 30 segundos do seu elevador.
            </p>
          </div>
          <p
            className="reveal reveal-delay-2 font-serif text-gold-dk leading-[1.4] lg:text-right"
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontStyle: 'italic' }}
          >
            "No Andrômeda, o que era luxo passou a ser rotina."
          </p>
        </div>

        <div className="reveal reveal-delay-1">
          <div
            className="hidden lg:grid"
            style={{ gridTemplateColumns: '1.35fr 1fr 1fr', gridTemplateRows: '290px 290px', gap: GAP }}
          >
            <PhotoCard {...MAIN_ITEMS[0]} onClick={() => setLightboxIdx(0)} style={{ gridRow: '1 / 3' }} />
            <PhotoCard {...MAIN_ITEMS[1]} onClick={() => setLightboxIdx(1)} />
            <PhotoCard {...MAIN_ITEMS[2]} onClick={() => setLightboxIdx(2)} />
            <PhotoCard {...MAIN_ITEMS[3]} onClick={() => setLightboxIdx(3)} />
            <PhotoCard {...MAIN_ITEMS[4]} onClick={() => setLightboxIdx(4)} />
          </div>

          <div
            className="grid lg:hidden"
            style={{ gridTemplateColumns: '1fr 1fr', gridAutoRows: '185px', gap: GAP }}
          >
            <PhotoCard {...MAIN_ITEMS[0]} onClick={() => setLightboxIdx(0)} style={{ gridColumn: '1 / 3', height: '240px' }} />
            <PhotoCard {...MAIN_ITEMS[1]} onClick={() => setLightboxIdx(1)} />
            <PhotoCard {...MAIN_ITEMS[2]} onClick={() => setLightboxIdx(2)} />
            <PhotoCard {...MAIN_ITEMS[3]} onClick={() => setLightboxIdx(3)} />
            <PhotoCard {...MAIN_ITEMS[4]} onClick={() => setLightboxIdx(4)} />
          </div>

          <div
            className="grid grid-cols-3 lg:grid-cols-5"
            style={{ gap: GAP, marginTop: GAP, gridAutoRows: '165px' }}
          >
            {STRIP_ITEMS.map((itm, i) => (
              <PhotoCard key={itm.label} {...itm} onClick={() => setLightboxIdx(MAIN_ITEMS.length + i)} />
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && item && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(14px)', animation: 'fadeIn .2s ease' }}
          onClick={closeLightbox}
          onTouchStart={onTouchStart2}
          onTouchEnd={onTouchEnd2}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/10 border-0 text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer z-10 rounded-full"
            onClick={closeLightbox}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border-0 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer z-10 backdrop-blur-sm rounded-full"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border-0 text-white/60 hover:text-white hover:bg-white/20 transition-all duration-200 cursor-pointer z-10 backdrop-blur-sm rounded-full"
            onClick={(e) => { e.stopPropagation(); goNext() }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="flex flex-col items-center gap-5 px-16 sm:px-24 max-w-full" onClick={(e) => e.stopPropagation()}>
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
                {lightboxIdx + 1} / {ALL_ITEMS.length}
              </span>
            </div>
            <div className="flex gap-2">
              {ALL_ITEMS.map((_, i) => (
                <button
                  key={i}
                  className={[
                    'w-[7px] h-[7px] rounded-full border-none transition-all duration-200 cursor-pointer',
                    i === lightboxIdx ? 'bg-gold scale-125' : 'bg-white/20 hover:bg-white/40',
                  ].join(' ')}
                  onClick={() => setLightboxIdx(i)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
