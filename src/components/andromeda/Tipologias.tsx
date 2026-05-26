import { useState, useEffect, useCallback } from 'react'
import { FLOOR_PLANS } from '@/lib/constants'
import { gtmEvent } from '@/lib/gtm'
import SectionHeader from './SectionHeader'

const ALL_VARIANTS = FLOOR_PLANS.flatMap((t) =>
  t.variants.map((v) => ({ ...v, tipoLabel: t.tab, tipoTitle: t.title, tipoArea: t.area }))
)

export default function Tipologias() {
  const [active, setActive] = useState(FLOOR_PLANS[0].id)
  const tipo = FLOOR_PLANS.find((t) => t.id === active)!
  const [activeVariant, setActiveVariant] = useState(tipo.variants[0].id)
  const [lightboxIdx, setLightboxIdx] = useState(-1)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [fading, setFading] = useState(false)

  const variant = tipo.variants.find((v) => v.id === activeVariant) || tipo.variants[0]
  const lightboxOpen = lightboxIdx >= 0
  const lightboxItem = lightboxOpen ? ALL_VARIANTS[lightboxIdx] : null

  const closeLightbox = useCallback(() => setLightboxIdx(-1), [])
  const goNext = useCallback(() => setLightboxIdx((i) => (i + 1) % ALL_VARIANTS.length), [])
  const goPrev = useCallback(() => setLightboxIdx((i) => (i - 1 + ALL_VARIANTS.length) % ALL_VARIANTS.length), [])

  const openLightbox = useCallback(() => {
    const idx = ALL_VARIANTS.findIndex((v) => v.id === activeVariant)
    setLightboxIdx(idx >= 0 ? idx : 0)
  }, [activeVariant])

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

  const handleTipoChange = (id: string) => {
    setFading(true)
    setTimeout(() => {
      setActive(id)
      const newTipo = FLOOR_PLANS.find((t) => t.id === id)!
      setActiveVariant(newTipo.variants[0].id)
      setFading(false)
    }, 200)
    gtmEvent('floor_plan_view', { plan_id: id })
  }

  const handleVariantChange = (variantId: string) => {
    setFading(true)
    setTimeout(() => {
      setActiveVariant(variantId)
      setFading(false)
    }, 200)
  }

  const onTouchStart2 = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd2 = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 60) { diff > 0 ? goNext() : goPrev() }
    setTouchStart(null)
  }

  const variantIdx = tipo.variants.findIndex(v => v.id === activeVariant)

  return (
    <section id="tipologias" className="bg-bg py-20 sm:py-28 px-[8vw]" aria-labelledby="tipologias-title">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader label="Plantas" id="tipologias-title" maxWidth="26ch">
          Escolha a planta que combina com o seu <em className="not-italic text-gold-dk">momento</em>
        </SectionHeader>

        <div className="flex overflow-x-auto border-b border-black/[.08] mb-14 -mx-[8vw] px-[8vw] sm:mx-0 sm:px-0 scrollbar-none" role="tablist" style={{ WebkitOverflowScrolling: 'touch' }}>
          {FLOOR_PLANS.map((t) => (
            <button
              key={t.id}
              className={[
                'px-6 py-4 sm:px-10 sm:py-5 font-label text-[.72rem] sm:text-[.78rem] tracking-[.2em] uppercase border-b-2 -mb-px bg-transparent transition-colors transition-border duration-200 whitespace-nowrap cursor-pointer shrink-0',
                active === t.id ? 'text-gold-dk border-gold font-medium' : 'text-text-2/60 border-transparent hover:text-cream',
              ].join(' ')}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => handleTipoChange(t.id)}
            >
              {t.tab}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center transition-opacity duration-200 ${fading ? 'opacity-0' : 'opacity-100'}`} role="tabpanel">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2" role="tablist">
              {tipo.variants.map((v) => (
                <button
                  key={v.id}
                  className={[
                    'px-5 py-2 font-label text-[.62rem] tracking-[.18em] uppercase border bg-transparent transition-colors duration-200 cursor-pointer rounded-lg',
                    activeVariant === v.id
                      ? 'text-gold border-gold bg-gold/[.06]'
                      : 'text-cream/30 border-charcoal/[.06] hover:text-cream/60 hover:border-charcoal/15',
                  ].join(' ')}
                  role="tab"
                  aria-selected={activeVariant === v.id}
                  onClick={() => handleVariantChange(v.id)}
                >
                  {v.label}
                </button>
              ))}
            </div>

            {tipo.livingImg && (
              <div className="relative overflow-hidden rounded-xl shadow-sm" style={{ height: '200px' }}>
                <img
                  src={tipo.livingImg}
                  alt={`Perspectiva do interior, ${tipo.title}`}
                  className="w-full h-full object-cover"
                  loading="lazy" decoding="async"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 55%)' }}
                />
                <span className="absolute bottom-3 left-4 font-label text-white/80 text-[.58rem] tracking-[.2em] uppercase">
                  Perspectiva do interior
                </span>
              </div>
            )}

            <div
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 flex items-center justify-center overflow-hidden p-4 cursor-zoom-in group relative"
              onClick={openLightbox}
              role="button"
              tabIndex={0}
              aria-label="Ampliar planta"
              onKeyDown={(e) => e.key === 'Enter' && openLightbox()}
            >
              {/* Setas sobre a imagem */}
              {tipo.variants.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleVariantChange(tipo.variants[(variantIdx - 1 + tipo.variants.length) % tipo.variants.length].id) }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm border-0 text-cream/50 hover:text-cream hover:bg-white transition-colors duration-200 cursor-pointer z-10 rounded-full shadow-sm"
                    aria-label="Planta anterior"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleVariantChange(tipo.variants[(variantIdx + 1) % tipo.variants.length].id) }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm border-0 text-cream/50 hover:text-cream hover:bg-white transition-colors duration-200 cursor-pointer z-10 rounded-full shadow-sm"
                    aria-label="Próxima planta"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </>
              )}
              <img
                src={variant.image}
                alt={variant.alt}
                className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                loading="lazy" decoding="async"
              />
              {/* Indicador de posição */}
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white/70 text-[.58rem] font-label tracking-[.15em] rounded-md">
                {variantIdx + 1} / {tipo.variants.length}
              </span>
              <span className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white/70 text-[.6rem] font-label tracking-[.15em] uppercase rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                Ampliar
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-cream mb-3 leading-[1.08]" style={{ fontSize: 'clamp(2.6rem, 5vw, 3.6rem)' }}>
              {tipo.title}
            </h3>
            <p className="text-[1.05rem] text-text-2 leading-relaxed mb-5">{tipo.description}</p>
            <div className="font-serif text-gold-dk flex items-baseline gap-1 mb-8">
              <span className="text-[3.6rem] leading-none">{tipo.area}</span>
              <span className="text-[1.1rem]">m²</span>
            </div>
            <ul className="list-none flex flex-col gap-3 mb-10">
              {tipo.features.map((f) => (
                <li key={f} className="flex items-center gap-4 text-[.95rem] text-text-2">
                  <span className="w-6 h-px bg-gold shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#unidades"
              className="inline-flex items-center gap-3 px-10 py-[1.15rem] font-label text-[.78rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
            >
              Simular unidade de {tipo.area} m²
            </a>
          </div>
        </div>
      </div>

      {lightboxOpen && lightboxItem && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', animation: 'fadeIn .2s ease', overscrollBehavior: 'contain' }}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <button
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border-0 text-white/60 hover:text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer z-10 backdrop-blur-sm rounded-full"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Planta anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-white/10 border-0 text-white/60 hover:text-white hover:bg-white/20 transition-colors duration-200 cursor-pointer z-10 backdrop-blur-sm rounded-full"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Próxima planta"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div className="flex flex-col items-center gap-6 px-6 sm:px-16 lg:px-24 max-w-full" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightboxItem.id}
              src={lightboxItem.image}
              alt={lightboxItem.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
              style={{ animation: 'scaleIn .25s ease' }}
            />
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-serif text-white text-lg sm:text-xl">
                {lightboxItem.tipoTitle} <span className="text-gold-lt">· {lightboxItem.label}</span>
              </p>
              <span className="font-label text-[.6rem] tracking-[.2em] uppercase text-white/40">
                {lightboxIdx + 1} / {ALL_VARIANTS.length}
              </span>
            </div>
            <div className="flex gap-2">
              {ALL_VARIANTS.map((v, i) => (
                <button
                  key={v.id}
                  className={[
                    'w-2 h-2 rounded-full border-none transition-colors duration-200 cursor-pointer',
                    i === lightboxIdx ? 'bg-gold scale-125' : 'bg-white/20 hover:bg-white/40',
                  ].join(' ')}
                  onClick={() => setLightboxIdx(i)}
                  aria-label={`Ver planta ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
