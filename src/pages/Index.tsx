import { useState, lazy, Suspense } from 'react'
import { useReveal } from '@/hooks/useReveal'
import Navbar from '@/components/andromeda/Navbar'
import Hero from '@/components/andromeda/Hero'
import Numbers from '@/components/andromeda/Numbers'
import WhatsAppFloat from '@/components/andromeda/WhatsAppFloat'

const Projeto = lazy(() => import('@/components/andromeda/Projeto'))
const Amenidades = lazy(() => import('@/components/andromeda/Amenidades'))
const Tipologias = lazy(() => import('@/components/andromeda/Tipologias'))
const Localizacao = lazy(() => import('@/components/andromeda/Localizacao'))
const FAQ = lazy(() => import('@/components/andromeda/FAQ'))
const Contato = lazy(() => import('@/components/andromeda/Contato'))
const Footer = lazy(() => import('@/components/andromeda/Footer'))
const LeadPopup = lazy(() => import('@/components/andromeda/LeadPopup'))

interface PopupConfig {
  type: string
  title?: string
  subtitle?: string
  buttonText?: string
  initialInterest?: string
}

const Index = () => {
  useReveal()
  const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null)

  const openPopup = (config: PopupConfig = { type: 'general' }) => setPopupConfig(config)
  const closePopup = () => setPopupConfig(null)

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenPopup={() => openPopup({ type: 'general' })} />
        <Numbers />
        <Suspense fallback={null}>
          <Projeto />
          <Amenidades />
          <Tipologias onOpenPopup={openPopup} />
          <Localizacao />
          <FAQ />
          <Contato onOpenPopup={() => openPopup({ type: 'general' })} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppFloat onOpenPopup={() => openPopup({ type: 'general' })} />
      <Suspense fallback={null}>
        <LeadPopup config={popupConfig} onClose={closePopup} />
      </Suspense>
    </>
  )
}

export default Index
