const SPECS = [
  { value: '2', desc: 'Suítes (90 m²)' },
  { value: '3', desc: 'Suítes (123 m²)' },
  { value: '2', desc: 'Vagas por unidade' },
  { value: '✓', desc: 'Depósito privativo' },
]

export default function Projeto() {
  return (
    <section id="projeto" className="relative bg-bg overflow-hidden py-32 px-[8vw]" aria-labelledby="projeto-title">
      {/* Watermark */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif font-light leading-none whitespace-nowrap pointer-events-none select-none"
        style={{
          fontSize: 'clamp(6rem, 14vw, 16rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,.06)',
        }}
        aria-hidden="true"
      >
        ANDRÔMEDA
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-[1200px]">
        {/* Visual */}
        <div className="reveal relative aspect-[4/5] bg-bg3 overflow-hidden">
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{ background: 'linear-gradient(135deg, #0d1530 0%, #1a2a50 40%, #0d1025 100%)' }}
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background: `
                radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,.08) 0%, transparent 70%),
                repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(201,168,76,.04) 40px),
                repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(201,168,76,.04) 40px)
              `,
            }}
          />
          {/* Badge */}
          <div
            className="absolute top-8 right-8 w-[90px] h-[90px] rounded-full border border-border flex flex-col items-center justify-center backdrop-blur-[10px]"
            style={{ background: 'rgba(8,8,16,.6)' }}
            aria-hidden="true"
          >
            <span className="font-serif text-gold text-[1.4rem] leading-none">A</span>
            <span className="font-label text-muted text-[.5rem] tracking-[.15em] text-center">Alphaville</span>
          </div>
          {/* Label */}
          <div
            className="absolute bottom-8 left-8 font-label text-gold text-[.6rem] tracking-[.2em] border border-border px-4 py-2 backdrop-blur-[8px]"
            style={{ background: 'rgba(8,8,16,.7)' }}
            aria-hidden="true"
          >
            Perspectiva artística
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="mb-16 reveal">
            <span className="block font-label text-gold text-[.7rem] tracking-[.25em] uppercase mb-4">O Empreendimento</span>
            <h2
              id="projeto-title"
              className="font-serif font-light text-cream leading-[1.2] max-w-[20ch]"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
            >
              A <em className="not-italic text-gold-lt">arquitetura</em> que eleva o padrão de Alphaville
            </h2>
            <div className="w-[60px] h-px mt-6" style={{ background: 'linear-gradient(to right, #c9a84c, transparent)' }} />
          </div>

          <p className="reveal reveal-delay-1 text-[.95rem] leading-[1.85] text-cream/65 mb-6">
            O Andrômeda Home é uma torre residencial única de 36 pavimentos no endereço
            mais valorizado da região — Av. Andrômeda, em Alphaville. Projetado pelo escritório
            MCAA Arquitetos, com paisagismo de Takeda Design e interiores assinados por Paula Aveiro.
          </p>
          <p className="reveal reveal-delay-2 text-[.95rem] leading-[1.85] text-cream/65 mb-6">
            Sofisticação em cada detalhe: dos elevadores semi-privativos ao acabamento
            em mármore e granito, das bancadas com água quente ao piso do terraço nivelado
            — detalhes que dispensam reformas no dia da entrega das chaves.
          </p>

          <div className="reveal reveal-delay-3 grid grid-cols-2 gap-4 mt-10 pt-10 border-t border-border">
            {SPECS.map(({ value, desc }) => (
              <div key={desc} className="p-5 bg-bg3 border border-border">
                <div className="font-serif text-gold text-[1.6rem] leading-none">{value}</div>
                <div className="font-label text-muted text-[.6rem] tracking-[.18em] uppercase mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
