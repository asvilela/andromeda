export default function CtaBanner() {
  return (
    <section className="relative bg-charcoal py-24 sm:py-32 px-[8vw] overflow-hidden" aria-label="Chamada para ação">
      {/* Radial gradient texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(184,146,90,.08), transparent)',
        }}
      />
      <div className="relative z-10 max-w-[800px] mx-auto text-center reveal">
        <span className="block font-label text-gold-lt text-[.68rem] tracking-[.3em] uppercase mb-6">
          Atendimento personalizado
        </span>
        <h2
          className="font-serif font-normal text-white leading-[1.08] mb-6"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
        >
          Receba uma curadoria personalizada de unidades
        </h2>
        <p className="text-white/50 text-[1.05rem] leading-[1.8] mb-12 max-w-[50ch] mx-auto">
          As condições variam conforme andar, vista, final da planta e disponibilidade. Informe seu perfil e receba as opções mais alinhadas ao seu planejamento.
        </p>
        <a
          href="#unidades"
          className="inline-flex items-center gap-3 px-14 py-5 font-label text-[.85rem] tracking-[.18em] uppercase no-underline transition-colors transition-transform transition-shadow duration-300 hover:-translate-y-0.5 border-0 cursor-pointer rounded-xl bg-gold hover:bg-gold-dk text-white shadow-cta hover:shadow-cta-hover"
        >
          Montar minha simulação
        </a>
      </div>
    </section>
  )
}
