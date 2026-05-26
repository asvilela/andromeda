import { PROJECT } from '@/lib/constants'

export default function BookCtaBlock() {
  return (
    <div className="max-w-[1200px] mx-auto px-[8vw] py-10">
      <div className="reveal bg-charcoal rounded-2xl p-10 sm:p-14 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="relative z-10">
          <h3 className="font-serif text-white text-[1.6rem] sm:text-[1.9rem] leading-tight mb-4">
            Ainda avaliando?
          </h3>
          <p className="text-white/60 text-[1rem] leading-relaxed mb-8 max-w-[48ch] mx-auto">
            Receba o material completo do {PROJECT.name} com plantas, perspectivas, diferenciais, localização e condições comerciais.
          </p>
          <a
            href="#book"
            className="inline-flex items-center gap-3 px-10 py-[1.15rem] font-label text-[.78rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
          >
            Receber book completo
          </a>
        </div>
      </div>
    </div>
  )
}
