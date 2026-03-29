import { useReveal } from './hooks/useReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Numbers from './components/Numbers'
import Projeto from './components/Projeto'
import Amenidades from './components/Amenidades'
import Tipologias from './components/Tipologias'
import Localizacao from './components/Localizacao'
import FAQ from './components/FAQ'
import Contato from './components/Contato'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Numbers />
        <Projeto />
        <Amenidades />
        <Tipologias />
        <Localizacao />
        <FAQ />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
