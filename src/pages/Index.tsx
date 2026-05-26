import { useState, lazy, Suspense } from 'react'
import { useReveal } from '@/hooks/useReveal'
import Navbar from '@/components/andromeda/Navbar'
import Hero from '@/components/andromeda/Hero'
import Numbers from '@/components/andromeda/Numbers'
import WhatsAppFloat from '@/components/andromeda/WhatsAppFloat'
import WhatsAppModal from '@/components/andromeda/WhatsAppModal'
import BookModal from '@/components/andromeda/BookModal'
import UnitFinder from '@/components/andromeda/UnitFinder'

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

  const [waModalOpen, setWaModalOpen] = useState(false)
  const [bookModalOpen, setBookModalOpen] = useState(false)
  const [unitFinderOpen, setUnitFinderOpen] = useState(false)

  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href') ?? ''
    if (href === '#unidades') {
      e.preventDefault()
      setUnitFinderOpen(true)
    }
    if (href === '#book') {
      e.preventDefault()
      setBookModalOpen(true)
    }
    if (href.includes('wa.me') || anchor.hasAttribute('data-wa-modal')) {
      e.preventDefault()
      setWaModalOpen(true)
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleGlobalClick}>
      <Navbar onOpenWaModal={() => setWaModalOpen(true)} />
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

      <WhatsAppFloat onOpen={() => setWaModalOpen(true)} />

      <WhatsAppModal open={waModalOpen} onClose={() => setWaModalOpen(false)} />
      <BookModal open={bookModalOpen} onClose={() => setBookModalOpen(false)} onOpenUnitFinder={() => setUnitFinderOpen(true)} />
      <UnitFinder open={unitFinderOpen} onClose={() => setUnitFinderOpen(false)} />
    </div>
  )
}

export default Index
