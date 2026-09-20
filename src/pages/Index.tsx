import { useState, lazy, Suspense } from 'react'
import { useReveal } from '@/hooks/useReveal'
import Navbar from '@/components/andromeda/Navbar'
import Hero from '@/components/andromeda/Hero'
import Numbers from '@/components/andromeda/Numbers'
import WhatsAppFloat from '@/components/andromeda/WhatsAppFloat'
import WhatsAppModal from '@/components/andromeda/WhatsAppModal'
import BookModal from '@/components/andromeda/BookModal'
import UnitFinder from '@/components/andromeda/UnitFinder'
import VisitModal from '@/components/andromeda/VisitModal'

const ValueComparison = lazy(() => import('@/components/andromeda/ValueComparison'))
const VideoSection = lazy(() => import('@/components/andromeda/VideoSection'))
const Projeto = lazy(() => import('@/components/andromeda/Projeto'))
const Tipologias = lazy(() => import('@/components/andromeda/Tipologias'))
const Amenidades = lazy(() => import('@/components/andromeda/Amenidades'))
const CtaBanner = lazy(() => import('@/components/andromeda/CtaBanner'))
const Localizacao = lazy(() => import('@/components/andromeda/Localizacao'))
const IncorporadoraSection = lazy(() => import('@/components/andromeda/IncorporadoraSection'))
const FAQ = lazy(() => import('@/components/andromeda/FAQ'))
const Contato = lazy(() => import('@/components/andromeda/Contato'))
const Footer = lazy(() => import('@/components/andromeda/Footer'))

const Index = () => {
  useReveal()

  const [waModalOpen, setWaModalOpen] = useState<string | null>(null)
  const [bookModalOpen, setBookModalOpen] = useState<string | null>(null)
  const [unitFinderOpen, setUnitFinderOpen] = useState<string | null>(null)
  const [visitModalOpen, setVisitModalOpen] = useState<string | null>(null)

  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href') ?? ''
    const ctaId = anchor.dataset.ctaId ?? null
    if (href === '#unidades') {
      e.preventDefault()
      setUnitFinderOpen(ctaId ?? 'unidades_link')
    }
    if (href === '#book') {
      e.preventDefault()
      setBookModalOpen(ctaId ?? 'book_link')
    }
    if (href === '#visita') {
      e.preventDefault()
      setVisitModalOpen(ctaId ?? 'visita_link')
    }
    if (href.includes('wa.me') || anchor.hasAttribute('data-wa-modal')) {
      e.preventDefault()
      setWaModalOpen(ctaId ?? 'whatsapp_link')
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleGlobalClick}>
      <Navbar
        onOpenWaModal={() => setWaModalOpen('navbar_whatsapp')}
        onOpenVisitModal={() => setVisitModalOpen('navbar_agendar_visita')}
      />
      <main>
        <Hero />
        <Numbers />
        <Suspense fallback={null}>
          <ValueComparison />
          <VideoSection />
          <Projeto />
          <Tipologias />
          <Amenidades />
          <CtaBanner />
          <Localizacao />
          <IncorporadoraSection />
          <FAQ />
          <Contato />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <WhatsAppFloat onOpen={() => setWaModalOpen('whatsapp_float')} />

      <WhatsAppModal open={!!waModalOpen} ctaId={waModalOpen} onClose={() => setWaModalOpen(null)} />
      <BookModal
        open={!!bookModalOpen}
        ctaId={bookModalOpen}
        onClose={() => setBookModalOpen(null)}
        onOpenUnitFinder={() => setUnitFinderOpen('book_modal_unit_finder')}
      />
      <UnitFinder open={!!unitFinderOpen} ctaId={unitFinderOpen} onClose={() => setUnitFinderOpen(null)} />
      <VisitModal open={!!visitModalOpen} ctaId={visitModalOpen} onClose={() => setVisitModalOpen(null)} />
    </div>
  )
}

export default Index
