import { useState } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
import { NAV_LINKS } from '@/lib/constants'

interface Props {
  onOpenWaModal: () => void
}

export default function Navbar({ onOpenWaModal }: Props) {
  const scrolled = useScrolled(60)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[4vw] transition-colors transition-shadow transition-[padding] duration-[400ms]',
          scrolled
            ? 'py-4 bg-bg/95 backdrop-blur-[18px] shadow-sm border-b border-charcoal/[.06]'
            : 'py-6 bg-gradient-to-b from-black/40 to-transparent',
        ].join(' ')}
      >
        <a href="#hero" className="flex flex-col gap-0.5 no-underline" aria-label="Andrômeda Home">
          <span className={`font-serif text-[1.5rem] tracking-[.02em] transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'}`}>Andrômeda Home</span>
        </a>

        <div className="hidden lg:flex items-center gap-10">
          <ul className="flex gap-10 list-none">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`font-sans text-[.72rem] font-medium tracking-[.16em] uppercase no-underline transition-colors duration-200 ${scrolled ? 'text-text-2 hover:text-gold-dk' : 'text-white/80 hover:text-gold-lt'}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={onOpenWaModal}
            data-wa-modal
            className={`font-label text-[.65rem] tracking-[.18em] uppercase px-6 py-2.5 rounded-lg border transition-colors transition-shadow duration-200 cursor-pointer ${
              scrolled
                ? 'bg-charcoal text-white border-charcoal hover:bg-charcoal/90'
                : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm'
            }`}
          >
            Receber simulação
          </button>
        </div>

        <button
          className="lg:hidden flex flex-col items-center justify-center gap-[5px] bg-transparent border-0 w-11 h-11 cursor-pointer rounded-full"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className={`block w-6 h-px transition-colors duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'}`} />
          <span className={`block w-6 h-px transition-colors duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'}`} />
          <span className={`block w-6 h-px transition-colors duration-300 ${scrolled ? 'bg-charcoal' : 'bg-white'}`} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-bg/[.98] z-[99] flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-label="Menu de navegação"
          style={{ overscrollBehavior: 'contain' }}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-transparent border-0 text-charcoal text-2xl cursor-pointer transition-colors duration-200 hover:text-gold-dk rounded-full hover:bg-charcoal/[.04]"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          {([...NAV_LINKS, { label: 'Contato', href: '#contato' }]).map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-serif text-[2rem] text-charcoal no-underline hover:text-gold-dk transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onOpenWaModal() }}
            className="mt-4 inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-white font-label text-[.72rem] tracking-[.2em] uppercase rounded-xl border-0 cursor-pointer shadow-cta transition-colors duration-200 hover:bg-charcoal/90"
          >
            Receber simulação no WhatsApp
          </button>
        </div>
      )}
    </>
  )
}
