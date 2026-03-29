const LINKS = [
  ['#projeto',     'O Projeto'],
  ['#amenidades',  'Amenidades'],
  ['#tipologias',  'Plantas'],
  ['#localizacao', 'Localização'],
  ['#contato',     'Contato'],
]

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border px-[8vw] py-12">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-center gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-serif text-cream text-[1.2rem]">Andrômeda Home</span>
          <span className="font-label text-gold text-[.55rem] tracking-[.3em] uppercase">Alphaville · Barueri · São Paulo</span>
        </div>

        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap gap-8 list-none">
            {LINKS.map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-label text-[.62rem] tracking-[.15em] uppercase text-muted no-underline hover:text-gold transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="w-full text-center text-[.78rem] text-muted mt-6 pt-6 border-t border-border">
          © 2026 Andrômeda Home · Av. Andrômeda, 310 — Alphaville, Barueri, SP · (11)&nbsp;2149-0015
        </p>
      </div>
    </footer>
  )
}
