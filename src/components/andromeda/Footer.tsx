import { FOOTER_LINKS, PROJECT, BROKER, DISCLAIMER } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-charcoal px-[8vw] py-16">
      <div className="max-w-[1200px] mx-auto flex flex-wrap justify-between items-center gap-8">
        <div className="flex flex-col gap-1">
          {/* TODO: substituir por <img src="/logo.png" alt={PROJECT.name} className="h-6" /> */}
          <span className="font-serif text-bg text-[1.25rem]">{PROJECT.name}</span>
          <span className="font-label text-gold-lt text-[.58rem] tracking-[.3em] uppercase">
            {PROJECT.address.neighborhood} · {PROJECT.address.city} · {PROJECT.address.state}
          </span>
        </div>

        <nav aria-label="Links do rodapé">
          <ul className="flex flex-wrap gap-8 list-none">
            {FOOTER_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="font-label text-[.65rem] tracking-[.15em] uppercase text-bg/50 no-underline hover:text-gold-lt transition-colors duration-200"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-full mt-6 pt-6 border-t border-white/[.08]">
          <p className="text-[.75rem] text-bg/30 leading-[1.7] mb-4">
            {DISCLAIMER}
          </p>
          <p className="text-center text-[.82rem] text-bg/40">
            &copy; {new Date().getFullYear()} {PROJECT.name} · {PROJECT.address.street}, {PROJECT.address.neighborhood}, {PROJECT.address.city}, {PROJECT.address.state} · {PROJECT.phone}
          </p>
        </div>
      </div>
    </footer>
  )
}
