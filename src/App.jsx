import { useState, lazy, Suspense } from 'react'
import { useReveal } from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Numbers from './components/Numbers'
import WhatsAppFloat from './components/WhatsAppFloat'
import LeadPopup from './components/LeadPopup'

const Projeto      = lazy(() => import('./components/Projeto'))
const Amenidades   = lazy(() => import('./components/Amenidades'))
const Tipologias   = lazy(() => import('./components/Tipologias'))
const Localizacao  = lazy(() => import('./components/Localizacao'))
const FAQ          = lazy(() => import('./components/FAQ'))
const Contato      = lazy(() => import('./components/Contato'))
const Footer       = lazy(() => import('./components/Footer'))

export default function App() {
  useReveal()
  const [popupConfig, setPopupConfig] = useState(null)

  const openPopup = (config = { type: 'general' }) => setPopupConfig(config)
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
