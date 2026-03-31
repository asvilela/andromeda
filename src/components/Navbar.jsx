import { useState, useEffect } from 'react'

const WPP_URL = 'https://wa.me/551121490015'

const NAV_LINKS = [
  ['#projeto', 'O Projeto'],
  ['#amenidades', 'Amenidades'],
  ['#tipologias', 'Planta'],
  ['#localizacao', 'Localização'],
  ['#faq', 'FAQ'],
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[4vw] transition-all duration-400',
          scrolled
            ? 'py-4 bg-black/88 backdrop-blur-[18px] border-b border-border'
            : 'py-6',
        ].join(' ')}
        role="banner"
      >
        <a href="#hero" className="flex flex-col gap-0.5 no-underline" aria-label="Andrômeda Home">
          <span className="font-serif text-cream text-[1.35rem] tracking-[.04em]">Andrômeda Home</span>
        </a>

        <ul className="hidden lg:flex gap-10 list-none">
          {NAV_LINKS.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="font-label text-[.68rem] tracking-[.18em] uppercase text-cream/65 no-underline hover:text-gold transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>


        <button
          className="lg:hidden flex flex-col gap-[5px] bg-transparent border-0 p-1 cursor-pointer"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="block w-6 h-px bg-cream" />
          <span className="block w-6 h-px bg-cream" />
          <span className="block w-6 h-px bg-cream" />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-bg/98 z-[99] flex flex-col items-center justify-center gap-10"
          role="dialog"
          aria-label="Menu de navegação"
        >
          <button
            className="absolute top-8 right-8 bg-transparent border-0 text-cream text-2xl cursor-pointer"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>
          {[...NAV_LINKS, ['#contato', 'Contato']].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="font-serif text-[2rem] text-cream no-underline hover:text-gold transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
