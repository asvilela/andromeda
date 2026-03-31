import { useState, useEffect, useCallback } from 'react'

import living78Img   from '../assets/apartamento-alphaville-andromeda-by-mpd-living-78.webp'
import living120Img  from '../assets/apartamento-alphaville-andromeda-by-mpd-living-120.webp'
import suite120Img   from '../assets/apartamento-alphaville-andromeda-by-mpd-suite-120.webp'

import planta90_1suite from '../assets/apartamento-alphaville-andromeda-by-mpd-planta90m-1-suite.webp'
import planta90_2suites from '../assets/apartamento-alphaville-andromeda-by-mpd-planta90m-2-suites.webp'
import planta123_2suites from '../assets/apartamento-alphaville-andromeda-by-mpd-planta123m-2-suites.webp'
import planta123_3suites from '../assets/apartamento-alphaville-andromeda-by-mpd-planta123m-3-suites.webp'

const TIPOS = [
  {
    id: '90',
    label: '90 m²',
    title: 'Apartamento 90 m²',
    area: '90',
    features: [
      'Caixilhos ampliados com persiana de enrolar nos dormitórios',
      'Suíte master com closet e bancada em granito',
      'Terraço gourmet com previsão para churrasqueira à carvão',
      'Água quente na cozinha e em todos os banheiros',
      'Piso do terraço nivelado — sem desnível na entrega',
      '2 vagas cobertas determinadas (não sorteadas)',
      'Depósito privativo incluso no andar',
      'Infraestrutura completa para ar-condicionado',
    ],
    wppMsg: 'Quero%20receber%20a%20tabela%20de%20pre%C3%A7os%20do%20apartamento%20de%2090m%C2%B2',
    livingImg: living78Img,
    variants: [
      { id: '90-1', label: '1 Suíte', image: planta90_1suite, alt: 'Planta do apartamento de 90m² com 1 suíte' },
      { id: '90-2', label: '2 Suítes', image: planta90_2suites, alt: 'Planta do apartamento de 90m² com 2 suítes' },
    ],
  },
  {
    id: '123',
    label: '123 m²',
    title: 'Apartamento 123 m²',
    area: '123',
    features: [
      'Caixilhos ampliados com persiana de enrolar nos dormitórios',
      'Suíte master com closet, 2 cubas e bancada em granito',
      'Elevadores semi-privativos exclusivos para as unidades 123m²',
      'Lavabo com bancada em mármore',
      'Terraço gourmet com previsão para churrasqueira à carvão',
      'Água quente na cozinha e em todos os banheiros',
      'Piso do terraço nivelado — sem desnível na entrega',
      '2 vagas cobertas determinadas (não sorteadas)',
      'Depósito privativo no andar',
      'Infraestrutura de ar-condicionado em todos os ambientes, incluindo terraço',
    ],
    wppMsg: 'Quero%20receber%20a%20tabela%20de%20pre%C3%A7os%20do%20apartamento%20de%20123m%C2%B2',
    livingImg: living120Img,
    variants: [
      { id: '123-2', label: '2 Suítes', image: planta123_2suites, alt: 'Planta do apartamento de 123m² com 2 suítes' },
      { id: '123-3', label: '3 Suítes', image: planta123_3suites, alt: 'Planta do apartamento de 123m² com 3 suítes' },
    ],
  },
]

// Flat list of all variants for lightbox navigation
const ALL_VARIANTS = TIPOS.flatMap((t) =>
  t.variants.map((v) => ({ ...v, tipoLabel: t.label, tipoTitle: t.title, tipoArea: t.area }))
)

export default function Tipologias({ onOpenPopup }) {
  const [active, setActive] = useState('90')
  const tipo = TIPOS.find((t) => t.id === active)
  const [activeVariant, setActiveVariant] = useState(tipo.variants[0].id)
  const [lightboxIdx, setLightboxIdx] = useState(-1) // -1 = closed
  const [touchStart, setTouchStart] = useState(null)

  const variant = tipo.variants.find((v) => v.id === activeVariant) || tipo.variants[0]
  const lightboxOpen = lightboxIdx >= 0
  const lightboxItem = lightboxOpen ? ALL_VARIANTS[lightboxIdx] : null

  const closeLightbox = useCallback(() => setLightboxIdx(-1), [])

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i + 1) % ALL_VARIANTS.length)
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i - 1 + ALL_VARIANTS.length) % ALL_VARIANTS.length)
  }, [])

  const openLightbox = useCallback(() => {
    const idx = ALL_VARIANTS.findIndex((v) => v.id === activeVariant)
    setLightboxIdx(idx >= 0 ? idx : 0)
  }, [activeVariant])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
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

  const handleTipoChange = (id) => {
    setActive(id)
    const newTipo = TIPOS.find((t) => t.id === id)
    setActiveVariant(newTipo.variants[0].id)
  }

  // Touch handlers for swipe
  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
    setTouchStart(null)
  }

  return (
    <section id="tipologias" className="bg-bg py-32 px-[8vw]" aria-labelledby="tipologias-title">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 reveal">
          <span className="block font-label text-gold text-[.7rem] tracking-[.25em] uppercase mb-4">Plantas</span>
          <h2
            id="tipologias-title"
            className="font-serif font-light text-cream leading-[1.2] max-w-[20ch]"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
          >
            Dois tamanhos. Quatro opções de <em className="not-italic text-gold-lt">planta</em>.
          </h2>
          <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-16 overflow-x-auto" role="tablist" aria-label="Tipologias de apartamentos">
          {TIPOS.map((t) => (
            <button
              key={t.id}
              className={[
                'px-10 py-4 font-label text-[.68rem] tracking-[.2em] uppercase border-b-2 -mb-px bg-transparent transition-all duration-200 whitespace-nowrap cursor-pointer',
                active === t.id
                  ? 'text-gold border-gold'
                  : 'text-muted border-transparent hover:text-cream',
              ].join(' ')}
              role="tab"
              aria-selected={active === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => handleTipoChange(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div id={`panel-${tipo.id}`} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center" role="tabpanel">
          <div className="flex flex-col gap-4">
            {/* Variant sub-tabs */}
            <div className="flex gap-2" role="tablist" aria-label="Variações de planta">
              {tipo.variants.map((v) => (
                <button
                  key={v.id}
                  className={[
                    'px-5 py-2 font-label text-[.62rem] tracking-[.18em] uppercase border bg-transparent transition-all duration-200 cursor-pointer',
                    activeVariant === v.id
                      ? 'text-gold border-gold'
                      : 'text-muted border-border hover:text-cream hover:border-cream/30',
                  ].join(' ')}
                  role="tab"
                  aria-selected={activeVariant === v.id}
                  onClick={() => setActiveVariant(v.id)}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {/* Living room image */}
            {tipo.livingImg && (
              <div className="relative overflow-hidden border border-border" style={{ height: '200px' }}>
                <img
                  src={tipo.livingImg}
                  alt={`Perspectiva do interior — ${tipo.title}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(5,5,12,.7) 0%, transparent 55%)' }}
                />
                <span className="absolute bottom-3 left-4 font-label text-cream/80 text-[.58rem] tracking-[.2em] uppercase">
                  Perspectiva do interior
                </span>
              </div>
            )}

            {/* Plant image */}
            <div
              className="bg-bg3 border border-border flex items-center justify-center overflow-hidden p-4 cursor-zoom-in group relative"
              onClick={openLightbox}
              role="button"
              tabIndex={0}
              aria-label="Ampliar planta"
              onKeyDown={(e) => e.key === 'Enter' && openLightbox()}
            >
              <img
                src={variant.image}
                alt={variant.alt}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
              {/* Zoom hint */}
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-cream/70 text-[.6rem] font-label tracking-[.15em] uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                Ampliar
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-cream mb-4" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
              {tipo.title}
            </h3>
            <div className="font-serif text-gold flex items-baseline gap-1 mb-8">
              <span className="text-[3rem] leading-none">{tipo.area}</span>m²
            </div>
            <ul className="list-none flex flex-col gap-3 mb-10" aria-label="Características">
              {tipo.features.map((f) => (
                <li key={f} className="flex items-center gap-4 text-[.9rem] text-cream/70">
                  <span className="w-5 h-px bg-gold shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => onOpenPopup({
                type: 'plantas',
                title: 'Receba a Tabela de Valores Atualizada',
                subtitle: 'Atendimento personalizado e envio imediato via WhatsApp.',
                initialInterest: `${tipo.area} m²`
              })}
              className="inline-flex items-center gap-3 px-9 py-4 font-label text-[.7rem] tracking-[.2em] uppercase no-underline transition-all duration-250 hover:opacity-85 hover:-translate-y-0.5 border-0 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #c9a84c 0%, #e8cc7e 100%)', color: '#0a0a10' }}
            >
              Receber tabela de preços — {tipo.area}m²
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center animate-[fadeIn_.2s_ease]"
          style={{ background: 'rgba(5,5,10,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Planta ampliada"
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-transparent border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/50 transition-all duration-200 cursor-pointer z-10"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          {/* Prev arrow */}
          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/40 border border-cream/15 text-cream/60 hover:text-cream hover:border-cream/40 hover:bg-black/60 transition-all duration-200 cursor-pointer z-10 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Planta anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>

          {/* Next arrow */}
          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-black/40 border border-cream/15 text-cream/60 hover:text-cream hover:border-cream/40 hover:bg-black/60 transition-all duration-200 cursor-pointer z-10 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Próxima planta"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>

          {/* Image + Caption */}
          <div className="flex flex-col items-center gap-6 px-16 sm:px-24 max-w-full" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightboxItem.id}
              src={lightboxItem.image}
              alt={lightboxItem.alt}
              className="max-w-full max-h-[75vh] object-contain animate-[scaleIn_.25s_ease]"
              decoding="async"
            />

            {/* Caption */}
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-serif text-cream text-lg sm:text-xl">
                {lightboxItem.tipoTitle} <span className="text-gold">· {lightboxItem.label}</span>
              </p>
              <span className="font-label text-[.6rem] tracking-[.2em] uppercase text-muted">
                {lightboxIdx + 1} / {ALL_VARIANTS.length}
              </span>
            </div>

            {/* Dots */}
            <div className="flex gap-2">
              {ALL_VARIANTS.map((v, i) => (
                <button
                  key={v.id}
                  className={[
                    'w-2 h-2 rounded-full border-none transition-all duration-200 cursor-pointer',
                    i === lightboxIdx
                      ? 'bg-gold scale-125'
                      : 'bg-cream/20 hover:bg-cream/40',
                  ].join(' ')}
                  onClick={() => setLightboxIdx(i)}
                  aria-label={`Ver ${v.tipoLabel} — ${v.label}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
