import { lazy, Suspense } from 'react'
import { useReveal } from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Numbers from './components/Numbers'
import WhatsAppFloat from './components/WhatsAppFloat'

const Projeto      = lazy(() => import('./components/Projeto'))
const Amenidades   = lazy(() => import('./components/Amenidades'))
const Tipologias   = lazy(() => import('./components/Tipologias'))
const Localizacao  = lazy(() => import('./components/Localizacao'))
const FAQ          = lazy(() => import('./components/FAQ'))
const Contato      = lazy(() => import('./components/Contato'))
const Footer       = lazy(() => import('./components/Footer'))

export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Numbers />
        <Suspense fallback={null}>
          <Projeto />
          <Amenidades />
          <Tipologias />
          <Localizacao />
          <FAQ />
          <Contato />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppFloat />
    </>
  )
}
